"use client";

import { useEffect, useState } from "react";
import { AppNav } from "@/components/AppNav";
import { BarChart2, CheckCircle, XCircle, TrendingUp, Lock } from "lucide-react";
import Link from "next/link";

type AttemptRecord = {
  testNumber: number;
  score: number;
  total: number;
  percent: number;
  passed: boolean;
  timeTaken: number;
  completedAt: string;
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export default function ProgressPage() {
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("liuk_attempts");
      if (raw) setAttempts(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const avg = attempts.length
    ? Math.round(attempts.reduce((sum, a) => sum + a.percent, 0) / attempts.length)
    : 0;
  const best = attempts.length ? Math.max(...attempts.map((a) => a.percent)) : 0;
  const passed = attempts.filter((a) => a.passed).length;

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-6">
        <div className="flex items-center gap-3 mb-8">
          <BarChart2 className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Your Progress</h1>
            <p className="text-sm text-muted-foreground">Track your scores and readiness</p>
          </div>
        </div>

        {/* Sign-in nudge */}
        <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-start gap-3 text-sm">
          <Lock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <span className="font-medium">Sign in to sync across devices. </span>
            <span className="text-muted-foreground">
              Currently showing browser-only history.{" "}
            </span>
            <Link href="/auth/signup" className="text-primary underline underline-offset-2">
              Create a free account →
            </Link>
          </div>
        </div>

        {attempts.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="font-medium mb-1">No tests completed yet</p>
            <p className="text-sm mb-6">Complete a practice test to see your progress here.</p>
            <Link
              href="/tests"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Start a test
            </Link>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Tests taken", value: attempts.length },
                { label: "Average score", value: `${avg}%` },
                { label: "Best score", value: `${best}%` },
                { label: "Passed", value: `${passed} / ${attempts.length}` },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-border bg-card p-4 text-center"
                >
                  <div className="text-2xl font-bold text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{label}</div>
                </div>
              ))}
            </div>

            {/* Score chart (simple CSS bars) */}
            <div className="rounded-xl border border-border bg-card p-5 mb-6">
              <h2 className="text-sm font-semibold mb-4">Score history</h2>
              <div className="flex items-end gap-2 h-28">
                {attempts.slice(-20).map((a, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t"
                      style={{
                        height: `${Math.max(4, (a.percent / 100) * 112)}px`,
                        background: a.passed ? "hsl(var(--primary))" : "#ef4444",
                        opacity: 0.85,
                      }}
                    />
                    <span className="text-xs text-muted-foreground">{a.percent}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-xs text-muted-foreground text-right">
                Dashed line at 75% pass mark · last {Math.min(20, attempts.length)} tests
              </div>
            </div>

            {/* Attempt list */}
            <h2 className="text-sm font-semibold mb-3">All attempts</h2>
            <div className="flex flex-col gap-2">
              {[...attempts].reverse().map((a, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-3 text-sm"
                >
                  {a.passed ? (
                    <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                  )}
                  <span className="font-medium w-28 shrink-0">
                    {a.testNumber === 0 ? "Quick Quiz" : `Test ${a.testNumber}`}
                  </span>
                  <span
                    className={
                      a.passed ? "text-emerald-600 font-semibold" : "text-red-500 font-semibold"
                    }
                  >
                    {a.percent}%
                  </span>
                  <span className="text-muted-foreground">
                    {a.score}/{a.total}
                  </span>
                  <span className="text-muted-foreground ml-auto">{formatTime(a.timeTaken)}</span>
                  <span className="text-muted-foreground text-xs">
                    {new Date(a.completedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
