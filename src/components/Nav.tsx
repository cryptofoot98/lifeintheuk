"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const CDN = "https://images.cryptofoot98.me/britzen";

export function Nav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-2">
      <div
        className="mx-auto max-w-5xl bg-card/90 backdrop-blur-md border-2 border-border rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 4px 20px oklch(0 0 0 / 10%), 0 1px 4px oklch(0 0 0 / 6%)" }}
      >
        <div className="px-4 h-14 flex items-center gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group mr-2">
            <div className="h-8 w-8 group-hover:scale-105 transition-transform shrink-0">
              <Image src={`${CDN}/logo_britzen.png`} alt="Britzen" width={32} height={32} className="w-8 h-8 drop-shadow-sm" />
            </div>
            <span className="font-heading font-extrabold text-sm tracking-tight hidden sm:inline">
              Britzen
            </span>
          </Link>

          {/* Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-0.5 flex-1">
            <a
              href="#how-it-works"
              className="px-3 py-1.5 rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              How it works
            </a>
            <a
              href="#pricing"
              className="px-3 py-1.5 rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Pricing
            </a>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto">
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
              className="hidden sm:flex items-center px-4 py-2 rounded-xl border-2 border-border text-sm font-bold hover:bg-muted/50 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="btn-3d px-5 py-2 bg-primary text-white rounded-xl font-extrabold text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/25"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
