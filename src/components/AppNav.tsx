"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { BookOpen, BarChart2, Target, Layers, Sun, Moon, Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";

const mainLinks = [
  { href: "/tests",      label: "Tests",           icon: Layers,   emoji: "📝" },
  { href: "/progress",   label: "Progress",        icon: BarChart2, emoji: "📊" },
  { href: "/study",      label: "Study by chapter", icon: BookOpen, emoji: "📖" },
  { href: "/materials",  label: "Study materials",  icon: BookOpen, emoji: "📚" },
];

const tabLinks = [
  { href: "/tests",       label: "Tests",      icon: Layers,   emoji: "📝" },
  { href: "/progress",    label: "Progress",   icon: BarChart2, emoji: "📊" },
  { href: "/study",       label: "Study",      icon: BookOpen, emoji: "📖" },
  { href: "/materials",   label: "Materials",  icon: BookOpen, emoji: "📚" },
];

export function AppNav() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [row2Visible, setRow2Visible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current && y > 60) {
        setRow2Visible(false);
      } else {
        setRow2Visible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const row2Height = row2Visible ? 52 : 0;

  return (
    <>
      {/* ── Top header ─────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 nav-glass border-b-2 border-border overflow-hidden"
        style={{ transition: "height 0.3s cubic-bezier(0.4,0,0.2,1)" }}
      >
        {/* Row 1 — always visible */}
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center gap-3">
          {/* Logo */}
          <Link href="/tests" className="flex items-center gap-2 shrink-0 group mr-1">
            <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center text-sm shadow-md shadow-primary/30 group-hover:scale-105 transition-transform">
              🇬🇧
            </div>
            <span className="font-heading font-extrabold text-sm tracking-tight hidden sm:inline">
              Life in the UK
            </span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 flex items-center gap-2 bg-muted/60 border-2 border-border rounded-2xl px-3 py-2 max-w-xs text-sm text-muted-foreground font-semibold cursor-text hover:border-primary/30 transition-colors">
            <Search className="h-3.5 w-3.5 shrink-0" />
            <span className="text-xs">Search questions…</span>
          </div>

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
          </div>
        </div>

        {/* Row 2 — collapses on scroll (desktop nav links) */}
        <div
          className="hidden md:block overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: row2Visible ? 52 : 0, opacity: row2Visible ? 1 : 0 }}
        >
          <div className="mx-auto max-w-6xl px-4 h-[52px] flex items-center gap-1 border-t border-border/50">
            {mainLinks.map(({ href, label, emoji, icon: Icon }) => {
              const active = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold transition-all",
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
      </header>

      {/* Spacer — accounts for header height */}
      <div
        className="md:block hidden"
        style={{ height: 14 + 52 + (row2Visible ? 52 : 0), transition: "height 0.3s cubic-bezier(0.4,0,0.2,1)" }}
      />
      <div className="md:hidden" style={{ height: 56 }} />

      {/* ── Bottom tab bar (mobile only) ───────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t-2 border-border">
        <div className="flex">
          {tabLinks.map(({ href, label, emoji, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex-1 flex flex-col items-center justify-center py-2.5 gap-1 transition-all",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <span className={cn("text-xl", active && "scale-110 transition-transform")}>{emoji}</span>
                <span className={cn("text-[10px] font-bold", active ? "text-primary" : "text-muted-foreground")}>
                  {label}
                </span>
                {active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
        {/* Safe area spacer for iOS home bar */}
        <div className="h-safe-area-inset-bottom" style={{ height: "env(safe-area-inset-bottom)" }} />
      </nav>

    </>
  );
}
