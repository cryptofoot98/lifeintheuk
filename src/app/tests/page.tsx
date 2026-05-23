import Link from "next/link";
import { AppNav } from "@/components/AppNav";
import { CHAPTERS } from "@/data/questions";
import { Clock, BookOpen, Layers } from "lucide-react";

const PRACTICE_TESTS = Array.from({ length: 40 }, (_, i) => i + 1);

export default function TestsPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-5xl w-full px-4 py-6">
        <h1 className="text-2xl font-bold mb-1">Practice Tests</h1>
        <p className="text-muted-foreground mb-8">
          Each test has 24 questions drawn from all chapters. The real exam requires 75% to pass.
        </p>

        {/* Mode selector cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <Link
            href="/tests/quick"
            className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow group"
          >
            <Clock className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
              Quick Quiz
            </h3>
            <p className="text-sm text-muted-foreground">10 random questions, no timer.</p>
          </Link>
          <Link
            href="/tests/1"
            className="rounded-xl border border-primary/40 bg-primary/5 p-5 hover:shadow-sm transition-shadow group"
          >
            <Layers className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-semibold mb-1">Full Practice Test</h3>
            <p className="text-sm text-muted-foreground">24 questions, 45 min, exam conditions.</p>
          </Link>
          <Link
            href="/study"
            className="rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow group"
          >
            <BookOpen className="h-5 w-5 text-primary mb-3" />
            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
              Study Mode
            </h3>
            <p className="text-sm text-muted-foreground">Learn with explanations after each answer.</p>
          </Link>
        </div>

        {/* Chapter-specific tests */}
        <h2 className="text-lg font-semibold mb-4">By Chapter</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {Object.entries(CHAPTERS).map(([num, name]) => (
            <Link
              key={num}
              href={`/tests/chapter/${num}`}
              className="rounded-lg border border-border bg-card p-4 hover:shadow-sm transition-shadow flex gap-3 items-start"
            >
              <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                {num}
              </span>
              <div>
                <div className="text-sm font-medium leading-snug">{name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Chapter {num} test</div>
              </div>
            </Link>
          ))}
        </div>

        {/* All 40 practice tests */}
        <h2 className="text-lg font-semibold mb-4">All Practice Tests</h2>
        <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2">
          {PRACTICE_TESTS.map((n) => (
            <Link
              key={n}
              href={`/tests/${n}`}
              className="flex items-center justify-center h-10 rounded-lg border border-border bg-card text-sm font-medium hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
            >
              {n}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
