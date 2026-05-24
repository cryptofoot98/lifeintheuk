"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Nav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b-2 border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center text-white font-black text-sm shadow-md shadow-primary/30 group-hover:scale-105 transition-transform">
            🇬🇧
          </div>
          <span className="font-heading font-extrabold text-base tracking-tight hidden sm:inline">
            Britzen
          </span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-2.5">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 flex items-center justify-center rounded-xl border-2 border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <Link
            href="/auth/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2 font-bold"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="btn-3d text-sm bg-primary text-white px-5 py-2.5 rounded-2xl font-extrabold hover:bg-primary/90 transition-colors shadow-md shadow-primary/25"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
