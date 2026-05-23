import Link from "next/link";
import { AppNav } from "@/components/AppNav";
import { DailyGoal } from "@/components/DailyGoal";
import { CHAPTERS } from "@/data/questions";
import { BookOpen, Layers, Zap } from "lucide-react";

const PRACTICE_TESTS = Array.from({ length: 40 }, (_, i) => i + 1);

const modes = [
  {
    href: "/tests/quick",
    icon: Zap,
    emoji: "⚡",
    title: "Quick Quiz",
    desc: "10 random questions · no timer",
    accent: false,
  },
  {
    href: "/tests/1",
    icon: Layers,
    emoji: "📝",
    title: "Full Practice Test",
    desc: "24 questions · 45 min · exam conditions",
    accent: true,
  },
  {
    href: "/study",
    icon: BookOpen,
    emoji: "📖",
    title: "Study Mode",
    desc: "Learn with explanations after each answer",
    accent: false,
  },
];

export default function TestsPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-5xl w-full px-4 py-6">

        {/* Page header */}
        <div className="mb-5">
          <h1 className="font-heading text-2xl font-black">Practice Tests 📝</h1>
          <p className="text-sm text-muted-foreground font-semibold mt-1">
            24 questions per test · pass mark 75% (18/24) · real exam conditions
          </p>
        </div>

        {/* Daily goal */}
        <DailyGoal />

        {/* Mode selector */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {modes.map(({ href, emoji, title, desc, accent }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-2xl border-[3px] p-5 hover:shadow-lg transition-all group card-elevated",
                accent
                  ? "border-primary bg-primary/5 hover:bg-primary/8"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <div className="text-3xl mb-3">{emoji}</div>
              <h3 className={`font-extrabold mb-1 text-sm group-hover:text-primary transition-colors ${accent ? "text-primary" : ""}`}>
                {title}
              </h3>
              <p className="text-xs text-muted-foreground font-semibold">{desc}</p>
            </Link>
          ))}
        </div>

        {/* Chapter tests */}
        <h2 className="font-extrabold text-base mb-3">📚 By Chapter</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {Object.entries(CHAPTERS).map(([num, name]) => (
            <Link
              key={num}
              href={`/tests/chapter/${num}`}
              className="rounded-2xl border-2 border-border bg-card p-4 hover:border-primary/50 hover:shadow-md transition-all flex gap-3 items-start group card-elevated"
            >
              <span className="h-9 w-9 rounded-2xl bg-primary text-white text-xs font-black flex items-center justify-center shrink-0 shadow-sm shadow-primary/25 group-hover:scale-105 transition-transform">
                {num}
              </span>
              <div>
                <div className="text-sm font-bold leading-snug group-hover:text-primary transition-colors">{name}</div>
                <div className="text-xs text-muted-foreground mt-0.5 font-semibold">Chapter {num} test</div>
              </div>
            </Link>
          ))}
        </div>

        {/* All 40 tests grid */}
        <h2 className="font-extrabold text-base mb-3">🗂️ All 40 Practice Tests</h2>
        <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2">
          {PRACTICE_TESTS.map((n) => (
            <Link
              key={n}
              href={`/tests/${n}`}
              className="flex items-center justify-center h-11 rounded-2xl border-2 border-border bg-card text-sm font-extrabold hover:border-primary hover:text-primary hover:bg-primary/5 transition-all hover:scale-105 card-elevated"
            >
              {n}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
