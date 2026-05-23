"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { BookOpen, BarChart2, Target, Layers, Sun, Moon, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const links = [
  { href: "/tests", label: "Tests", icon: Layers },
  { href: "/study", label: "Study", icon: BookOpen },
  { href: "/weak-areas", label: "Weak Areas", icon: Target },
  { href: "/progress", label: "Progress", icon: BarChart2 },
];

export function Nav() {
  const pathname = usePathname();
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
          ? "bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 flex h-16 items-center gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <Crown className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-heading font-bold text-base tracking-tight hidden sm:inline">
            Life in the UK
          </span>
        </Link>

        <nav className="flex items-center gap-1 flex-1">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                pathname === href
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 flex items-center justify-center rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <Link
            href="/auth/login"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
          >
            Sign in
          </Link>
          <Link
            href="/auth/signup"
            className="text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-sm"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
