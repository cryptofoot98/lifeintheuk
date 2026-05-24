"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TESTS = Array.from({ length: 40 }, (_, i) => i + 1);

type Status = "passed" | "failed" | "in-progress" | "not-started";

export function TestsGrid() {
  const { attempts } = useProgress();
  const [inProgress, setInProgress] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const nums = new Set<number>();
      for (let i = 1; i <= 40; i++) {
        if (localStorage.getItem(`quiz_session_test_${i}`)) nums.add(i);
      }
      setInProgress(nums);
    } catch { /* ignore */ }
  }, []);

  function getStatus(n: number): Status {
    const testAttempts = attempts.filter((a) => a.testNumber === n && !a.chapterFilter);
    if (testAttempts.length === 0) return inProgress.has(n) ? "in-progress" : "not-started";
    if (testAttempts.some((a) => a.passed)) return "passed";
    if (inProgress.has(n)) return "in-progress";
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

      <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2">
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
    </>
  );
}
