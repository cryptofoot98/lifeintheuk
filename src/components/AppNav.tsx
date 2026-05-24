"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Bell, Search, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import { UserStatsChip } from "@/components/UserStatsChip";
import { AiFab } from "@/components/AiFab";
import { SearchModal } from "@/components/SearchModal";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const CDN = "https://images.cryptofoot98.me/britzen";

const mainLinks = [
  { href: "/tests",     label: "Tests",            emoji: "📝" },
  { href: "/exams",     label: "Real Exams",        emoji: "🎓" },
  { href: "/progress",  label: "Progress",         emoji: "📊" },
  { href: "/study",     label: "Study by chapter", emoji: "📖" },
  { href: "/materials", label: "Study materials",  emoji: "📚" },
];

const tabLinks = [
  { href: "/tests",     label: "Tests",     emoji: "📝" },
  { href: "/progress",  label: "Progress",  emoji: "📊" },
  { href: "/study",     label: "Study",     emoji: "📖" },
  { href: "/materials", label: "Materials", emoji: "📚" },
];

export function AppNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [row2Visible, setRow2Visible] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const lastScrollY = useRef(0);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  }

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    async function loadAvatar() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      // Prefer profile row avatar, fall back to OAuth provider avatar
      const { data } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single();
      const url =
        data?.avatar_url ||
        user.user_metadata?.avatar_url ||
        user.user_metadata?.picture ||
        null;
      if (url) setAvatarUrl(url);
    }
    loadAvatar();
  }, []);

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

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 60) setRow2Visible(false);
      else setRow2Visible(true);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── Floating header ───────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-2">
        {/* Floating card — bg-card is distinctly lighter/darker than page bg */}
        <div
          className="mx-auto max-w-5xl bg-card border-2 border-border rounded-2xl overflow-hidden"
          style={{
            boxShadow: "0 4px 20px oklch(0 0 0 / 10%), 0 1px 4px oklch(0 0 0 / 6%)",
            transition: "box-shadow 0.2s",
          }}
        >
          {/* Row 1 — always visible */}
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

            {/* XP + streak chip */}
            <UserStatsChip />

            {/* Right icons */}
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                className="h-9 w-9 flex items-center justify-center rounded-xl border-2 border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all relative"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
              </button>
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

          {/* Row 2 — collapses on scroll, desktop only */}
          <div
            className="hidden md:block overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: row2Visible ? 52 : 0, opacity: row2Visible ? 1 : 0 }}
          >
            <div className="px-4 h-[52px] flex items-center gap-1 border-t border-border/50">
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
        </div>
      </header>

      {/* Spacer — pt-2(8) + h-14(56) + row2(52) */}
      <div
        className="hidden md:block"
        style={{ height: 8 + 56 + (row2Visible ? 52 : 0), transition: "height 0.3s cubic-bezier(0.4,0,0.2,1)" }}
      />
      {/* Mobile spacer — pt-2(8) + h-14(56) = 64 */}
      <div className="md:hidden" style={{ height: 64 }} />

      {/* AI FAB — shown on all authenticated pages */}
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
