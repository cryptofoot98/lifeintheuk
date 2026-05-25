"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Bell, Search, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { AiFab } from "@/components/AiFab";
import { SearchModal } from "@/components/SearchModal";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { getLevelForXP, getProgressToNextLevel } from "@/lib/levels";

const CDN = "https://images.cryptofoot98.me/britzen";

// Goals row collapses over the first 70px of scroll
const COLLAPSE_AT = 70;

const mainLinks = [
  { href: "/tests",     label: "Tests",            emoji: "📝" },
  { href: "/exams",     label: "Real Exams",        emoji: "🎓" },
  { href: "/progress",  label: "Progress",          emoji: "📊" },
  { href: "/study",     label: "Study by chapter",  emoji: "📖" },
  { href: "/materials", label: "Study materials",   emoji: "📚" },
];

const tabLinks = [
  { href: "/tests",     label: "Tests",     emoji: "📝" },
  { href: "/progress",  label: "Progress",  emoji: "📊" },
  { href: "/study",     label: "Study",     emoji: "📖" },
  { href: "/materials", label: "Materials", emoji: "📚" },
];

type UserStats = {
  streak: number;
  xp: number;
  testsToday: number;
};

export function AppNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [navRowVisible, setNavRowVisible] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifRead, setNotifRead] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Framer-motion scroll value — drives goals row collapse at native frame rate
  const scrollY = useMotionValue(0);
  const progress = useTransform(scrollY, [0, COLLAPSE_AT], [0, 1], { clamp: true });

  // Goals row
  const goalsHeight  = useTransform(progress, [0.25, 1], [52, 0]);
  const goalsOpacity = useTransform(progress, [0, 0.55], [1, 0]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [profileRes, todayRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("streak, xp")
          .eq("id", user.id)
          .single(),
        supabase
          .from("test_attempts")
          .select("id")
          .eq("user_id", user.id)
          .gte("created_at", today.toISOString()),
      ]);

      const profile = profileRes.data;
      if (profile) {
        setStats({
          streak: profile.streak ?? 0,
          xp: profile.xp ?? 0,
          testsToday: todayRes.data?.length ?? 0,
        });
      }
    }
    loadProfile();
  }, []);

  // Close notifications on outside click
  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  // Cmd+K shortcut
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  // Single scroll listener: drives both the framer-motion goals row and the boolean nav row
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      scrollY.set(y);
      if (y > lastScrollY.current && y > 60) setNavRowVisible(false);
      else setNavRowVisible(true);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  const notifications = [
    stats
      ? stats.streak > 0
        ? { icon: "🔥", text: `${stats.streak}-day streak — keep it going!`, sub: "Daily reminder" }
        : { icon: "📅", text: "Start your streak today — take a test!", sub: "No active streak" }
      : { icon: "📝", text: "Complete a practice test to track your progress.", sub: "Getting started" },
    stats && stats.testsToday === 0
      ? { icon: "📝", text: "You haven't taken a test today yet.", sub: "Daily goal" }
      : stats && stats.testsToday > 0
        ? { icon: "✅", text: `${stats.testsToday} test${stats.testsToday > 1 ? "s" : ""} completed today!`, sub: "Daily goal met" }
        : null,
    { icon: "💡", text: "History (Ch. 3) is the most tested section in real exams.", sub: "Study tip" },
    { icon: "🎓", text: "Try a Real Exam to simulate test day conditions.", sub: "Practice tip" },
  ].filter(Boolean) as { icon: string; text: string; sub: string }[];

  const level         = stats ? getLevelForXP(stats.xp) : null;
  const levelProgress = stats ? getProgressToNextLevel(stats.xp) : null;
  const hasStats      = stats !== null && level !== null && levelProgress !== null;

  return (
    <>
      {/* ── Floating header ───────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-2">
        <div
          className="mx-auto max-w-5xl bg-card border-2 border-border rounded-2xl"
          style={{ boxShadow: "0 4px 20px oklch(0 0 0 / 10%), 0 1px 4px oklch(0 0 0 / 6%)" }}
        >
          {/* ── Row 1: logo · search · actions (always visible) ──────────── */}
          <div className="px-4 h-14 flex items-center gap-3">
            {/* Logo */}
            <Link href="/tests" className="flex items-center gap-2 shrink-0 group mr-1">
              <div className="h-8 w-8 group-hover:scale-105 transition-transform shrink-0">
                <Image src={`${CDN}/logo_britzen.png`} alt="Britzen" width={32} height={32} className="w-8 h-8 drop-shadow-sm" />
              </div>
              <span className="font-heading font-extrabold text-sm tracking-tight hidden sm:inline">
                Britzen
              </span>
            </Link>

            {/* Search bar */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex-1 flex items-center gap-2 bg-muted/60 border-2 border-border rounded-xl px-3 py-2 max-w-xs text-sm text-muted-foreground font-semibold cursor-pointer hover:border-primary/30 transition-colors"
            >
              <Search className="h-3.5 w-3.5 shrink-0" />
              <span className="text-xs flex-1 text-left">Search questions…</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md border border-border text-[9px] font-extrabold">
                ⌘K
              </kbd>
            </button>

            {/* Right icons */}
            <div className="flex items-center gap-1.5 ml-auto">
              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => { setNotifOpen((o) => !o); setNotifRead(true); }}
                  className="h-9 w-9 flex items-center justify-center rounded-xl border-2 border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all relative"
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  {!notifRead && <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 top-11 z-[60] w-72 bg-card border-2 border-border rounded-2xl shadow-xl shadow-black/12 flex flex-col overflow-hidden">
                    <div className="px-4 py-3 border-b border-border/60">
                      <span className="text-xs font-extrabold text-muted-foreground uppercase tracking-widest">Notifications</span>
                    </div>
                    {notifications.map((n, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border/30 last:border-b-0">
                        <span className="text-xl shrink-0 mt-0.5">{n.icon}</span>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold leading-snug">{n.text}</div>
                          <div className="text-[11px] text-muted-foreground font-medium mt-0.5">{n.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="h-9 w-9 flex items-center justify-center rounded-xl border-2 border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="h-9 w-9 flex items-center justify-center rounded-xl border-2 border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 hover:bg-destructive/8 transition-all"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>

          </div>

          {/* ── Row 2: Daily Goals (collapses smoothly with framer-motion) ── */}
          {hasStats && (
            <motion.div
              className="overflow-hidden border-t border-border/40"
              style={{ height: goalsHeight, opacity: goalsOpacity }}
            >
              <div className="px-4 h-[52px] flex items-center gap-3 sm:gap-4">

                {/* Streak */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-lg leading-none">🔥</span>
                  <div className="leading-none">
                    <div className="font-heading text-sm font-black">{stats!.streak}</div>
                    <div className="text-[9px] text-muted-foreground font-bold mt-0.5">day streak</div>
                  </div>
                </div>

                <div className="h-6 w-px bg-border/60 shrink-0" />

                {/* Today's test goal */}
                <div className="flex items-center gap-1.5 shrink-0">
                  {stats!.testsToday >= 1 ? (
                    <>
                      <span className="text-lg leading-none">✅</span>
                      <div className="leading-none">
                        <div className="font-heading text-sm font-black text-emerald-600 dark:text-emerald-400">
                          {stats!.testsToday}
                        </div>
                        <div className="text-[9px] text-muted-foreground font-bold mt-0.5">
                          test{stats!.testsToday > 1 ? "s" : ""} today
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="text-lg leading-none">📝</span>
                      <div className="leading-none">
                        <div className="font-heading text-sm font-black text-muted-foreground">0/1</div>
                        <div className="text-[9px] text-muted-foreground font-bold mt-0.5">today</div>
                      </div>
                    </>
                  )}
                </div>

                <div className="h-6 w-px bg-border/60 shrink-0" />

                {/* XP level progress bar (fills remaining space) */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-extrabold">
                      {level!.emoji} {level!.name}
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground">
                      {level!.maxXP !== Infinity
                        ? `${levelProgress!.xpInLevel} / ${levelProgress!.xpNeeded} XP`
                        : `${stats!.xp.toLocaleString()} XP`}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700"
                      style={{ width: `${levelProgress!.pct}%` }}
                    />
                  </div>
                </div>

                <div className="h-6 w-px bg-border/60 shrink-0" />

                {/* Level badge */}
                <div className="shrink-0 text-center">
                  <div className="font-heading text-sm font-black">Lv.{level!.level}</div>
                  <div className="text-[9px] text-muted-foreground font-bold mt-0.5">
                    {stats!.xp.toLocaleString()} XP
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Row 3: Nav links (desktop only, boolean collapse) ─────────── */}
          <div
            className="hidden md:block overflow-hidden transition-all duration-300 ease-in-out border-t border-border/40"
            style={{ maxHeight: navRowVisible ? 52 : 0, opacity: navRowVisible ? 1 : 0 }}
          >
            <div className="px-4 h-[52px] flex items-center gap-1">
              {mainLinks.map(({ href, label, emoji }) => {
                const active = pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all",
                      active
                        ? "bg-primary/10 text-primary border-2 border-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-2 border-transparent"
                    )}
                  >
                    <span className="text-base">{emoji}</span>
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ── Persistent daily progress bar — always visible at card bottom ── */}
          {hasStats && (
            <div className="h-[3px] w-full overflow-hidden bg-muted/40 rounded-b-2xl" aria-hidden>
              <div
                className="h-full transition-all duration-700"
                style={{
                  width: `${levelProgress!.pct}%`,
                  background: stats!.testsToday >= 1
                    ? "oklch(0.52 0.16 145)"   /* emerald — daily goal met */
                    : "var(--primary)",          /* British red — streak at risk */
                }}
              />
            </div>
          )}
        </div>
      </header>

      {/* ── Spacers ───────────────────────────────────────────────────────── */}
      {/* Desktop: pt-2(8) + Row1(56) + GoalsRow(52 when loaded) + NavRow(52 when visible) */}
      <div
        className="hidden md:block transition-all duration-300"
        style={{ height: 8 + 56 + (hasStats ? 52 : 0) + (navRowVisible ? 52 : 0) }}
      />
      {/* Mobile: pt-2(8) + Row1(56) + GoalsRow(52 when loaded) */}
      <div
        className="md:hidden transition-all duration-300"
        style={{ height: 8 + 56 + (hasStats ? 52 : 0) }}
      />

      {/* AI FAB */}
      <AiFab />

      {/* Search modal */}
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── Floating tab bar (mobile only) ────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3">
        <div
          className="bg-card border-2 border-border rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 -2px 20px oklch(0 0 0 / 10%), 0 8px 24px oklch(0 0 0 / 12%)" }}
        >
          <div className="flex">
            {tabLinks.map(({ href, label, emoji }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all"
                >
                  <div className={cn(
                    "flex items-center justify-center h-9 w-9 rounded-xl transition-all duration-200",
                    active ? "bg-primary/12 scale-105" : "bg-transparent"
                  )}>
                    <span className="text-[22px] leading-none">{emoji}</span>
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold transition-colors",
                    active ? "text-primary font-extrabold" : "text-muted-foreground"
                  )}>
                    {label}
                  </span>
                </Link>
              );
            })}
            {/* Profile tab */}
            {(() => {
              const active = pathname === "/profile";
              return (
                <Link
                  href="/profile"
                  className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all"
                >
                  <div className={cn(
                    "flex items-center justify-center h-9 w-9 rounded-xl transition-all duration-200",
                    active ? "bg-primary/12 scale-105" : "bg-transparent"
                  )}>
                    <span className="text-[22px] leading-none">👤</span>
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold transition-colors",
                    active ? "text-primary font-extrabold" : "text-muted-foreground"
                  )}>
                    Profile
                  </span>
                </Link>
              );
            })()}
          </div>
          {/* iOS safe area */}
          <div style={{ height: "env(safe-area-inset-bottom)" }} />
        </div>
      </nav>
    </>
  );
}
