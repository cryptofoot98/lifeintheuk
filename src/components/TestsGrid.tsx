"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TESTS = Array.from({ length: 40 }, (_, i) => i + 1);
const AI_TESTS = Array.from({ length: 60 }, (_, i) => i + 41); // 41-100

type Status = "passed" | "failed" | "in-progress" | "not-started";

export function TestsGrid() {
  const { attempts } = useProgress();
  const [inProgress, setInProgress] = useState<Set<number>>(new Set());
  const [aiInProgress, setAiInProgress] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const nums = new Set<number>();
      const aiNums = new Set<number>();
      for (let i = 1; i <= 40; i++) {
        if (localStorage.getItem(`quiz_session_test_${i}`)) nums.add(i);
      }
      for (let i = 41; i <= 100; i++) {
        if (localStorage.getItem(`quiz_session_aitest_${i}`)) aiNums.add(i);
      }
      setInProgress(nums);
      setAiInProgress(aiNums);
    } catch { /* ignore */ }
  }, []);

  function getStatus(n: number): Status {
    const testAttempts = attempts.filter((a) => a.testNumber === n && !a.chapterFilter);
    if (testAttempts.length === 0) return inProgress.has(n) ? "in-progress" : "not-started";
    if (testAttempts.some((a) => a.passed)) return "passed";
    if (inProgress.has(n)) return "in-progress";
    return "failed";
  }

  function getAiStatus(n: number): Status {
    const testAttempts = attempts.filter((a) => a.testNumber === n);
    if (testAttempts.length === 0) return aiInProgress.has(n) ? "in-progress" : "not-started";
    if (testAttempts.some((a) => a.passed)) return "passed";
    if (aiInProgress.has(n)) return "in-progress";
    return "failed";
  }

  return (
    <>
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-3 text-xs font-semibold text-muted-foreground">
        {[
          { color: "bg-emerald-500", label: "Passed" },
          { color: "bg-red-400", label: "Failed" },
          { color: "bg-amber-400", label: "In progress" },
          { color: "bg-border", label: "Not started" },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className={cn("h-2.5 w-2.5 rounded-full inline-block", color)} />
            {label}
          </span>
        ))}
      </div>

      {/* Standard tests 1-40 */}
      <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2 mb-8">
        {TESTS.map((n) => {
          const status = getStatus(n);
          return (
            <Link
              key={n}
              href={`/tests/${n}`}
              className={cn(
                "relative flex items-center justify-center h-11 rounded-2xl border-2 text-sm font-extrabold transition-all hover:scale-105 card-elevated",
                status === "passed" &&
                  "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15",
                status === "failed" &&
                  "border-red-400 bg-red-400/10 text-red-500 hover:bg-red-400/15",
                status === "in-progress" &&
                  "border-amber-400 bg-amber-400/10 text-amber-600 dark:text-amber-400 hover:bg-amber-400/15",
                status === "not-started" &&
                  "border-border bg-card hover:border-primary hover:text-primary hover:bg-primary/5"
              )}
            >
              {n}
              {status === "in-progress" && (
                <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
              )}
            </Link>
          );
        })}
      </div>

      {/* AI-generated tests 41-100 */}
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="font-extrabold text-sm">AI-Generated Tests (41–100)</h3>
        </div>
        <p className="text-xs text-muted-foreground font-semibold mb-3">
          Each test is generated on demand by AI — unique questions every time. Requires lifetime access.
        </p>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2">
        {AI_TESTS.map((n) => {
          const status = getAiStatus(n);
          return (
            <Link
              key={n}
              href={`/tests/ai/${n}`}
              className={cn(
                "relative flex items-center justify-center h-11 rounded-2xl border-2 text-sm font-extrabold transition-all hover:scale-105",
                status === "passed" &&
                  "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15",
                status === "failed" &&
                  "border-red-400 bg-red-400/10 text-red-500 hover:bg-red-400/15",
                status === "in-progress" &&
                  "border-amber-400 bg-amber-400/10 text-amber-600 dark:text-amber-400 hover:bg-amber-400/15",
                status === "not-started" &&
                  "border-primary/30 bg-primary/5 text-primary/70 hover:border-primary hover:text-primary hover:bg-primary/10"
              )}
            >
              <Sparkles className="absolute top-1 left-1 h-2.5 w-2.5 text-primary/50" />
              {n}
              {status === "in-progress" && (
                <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
              )}
            </Link>
          );
        })}
      </div>
    </>
  );
}
