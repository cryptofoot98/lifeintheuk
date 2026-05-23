import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ArrowRight, CheckCircle, Clock, Target, BookOpen, BarChart2, Zap } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Real exam conditions",
    description: "Timed 24-question tests that mirror the actual exam — 45 minutes, pass mark 75%.",
  },
  {
    icon: Target,
    title: "Weak area detection",
    description: "We track every answer and surface the exact topics you keep getting wrong.",
  },
  {
    icon: BookOpen,
    title: "Study mode",
    description: "Read explanations as you go — no timer, instant feedback, perfect for learning.",
  },
  {
    icon: BarChart2,
    title: "Progress dashboard",
    description: "See your score history, accuracy trends, and readiness at a glance.",
  },
  {
    icon: Zap,
    title: "105+ questions",
    description: "Covering all 5 handbook chapters — history, government, culture, geography, and values.",
  },
  {
    icon: CheckCircle,
    title: "Rich explanations",
    description: "Every answer comes with a clear explanation tied to the official handbook.",
  },
];

const stats = [
  { value: "105+", label: "Practice questions" },
  { value: "5", label: "Handbook chapters" },
  { value: "75%", label: "Pass mark" },
  { value: "Free", label: "Always" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-4 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
          <span>🇬🇧</span> Updated for the 2026 exam
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl mb-6 leading-tight">
          Pass the Life in the UK Test
          <span className="text-primary block">first time</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mb-10">
          Free practice tests, study mode, and personalised weak-area tracking — built to get you
          through the real thing.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/tests"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-base hover:bg-primary/90 transition-colors"
          >
            Start practising
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/study"
            className="inline-flex items-center gap-2 border border-border bg-background px-6 py-3 rounded-lg font-semibold text-base hover:bg-muted transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            Study by chapter
          </Link>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-muted/40 py-8">
        <div className="mx-auto max-w-4xl px-4 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold text-primary">{value}</div>
              <div className="text-sm text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Everything you need to pass
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
            More than a question list — a complete preparation system.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow"
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-primary-foreground text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="mb-8 opacity-90 max-w-md mx-auto">
          Create a free account to save your progress, track weak areas, and see when you are
          exam-ready.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors"
          >
            Create free account
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/tests"
            className="inline-flex items-center gap-2 border border-primary-foreground/30 px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors"
          >
            Try without signing in
          </Link>
        </div>
      </section>

      <footer className="py-6 px-4 border-t border-border text-center text-sm text-muted-foreground">
        <p>
          Practice content based on{" "}
          <em>Life in the United Kingdom: A Guide for New Residents, 3rd edition</em>. Unofficial
          practice site — not affiliated with the Home Office.
        </p>
      </footer>
    </div>
  );
}
