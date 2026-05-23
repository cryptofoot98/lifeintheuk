"use client";

import { useEffect, useState } from "react";
import { AppNav } from "@/components/AppNav";
import { CheckCircle, XCircle, TrendingUp, Lock } from "lucide-react";
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
    } catch { /* ignore */ }
  }, []);

  const avg = attempts.length
    ? Math.round(attempts.reduce((sum, a) => sum + a.percent, 0) / attempts.length)
    : 0;
  const best = attempts.length ? Math.max(...attempts.map((a) => a.percent)) : 0;
  const passed = attempts.filter((a) => a.passed).length;
  const streak = Math.min(attempts.length, 7);

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-6">

        {/* Page header */}
        <div className="mb-5">
          <h1 className="font-heading text-2xl font-black">Your Progress 📊</h1>
          <p className="text-sm text-muted-foreground font-semibold mt-1">Track your scores and see how ready you are.</p>
        </div>

        {/* Sign-in nudge */}
        <div className="mb-5 rounded-2xl border-2 border-primary/20 bg-primary/5 p-4 flex items-start gap-3 text-sm">
          <Lock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold">Sign in to sync across devices. </span>
            <span className="text-muted-foreground font-semibold">
              Currently showing browser-only history.{" "}
            </span>
            <Link href="/auth/signup" className="text-primary font-extrabold underline underline-offset-2">
              Create a free account →
            </Link>
          </div>
        </div>

        {attempts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📈</div>
            <p className="font-extrabold text-lg mb-1">No tests completed yet</p>
            <p className="text-sm text-muted-foreground font-semibold mb-6">Complete a practice test to see your progress here.</p>
            <Link
              href="/tests"
              className="btn-3d inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl text-sm font-extrabold hover:bg-primary/90 transition-colors shadow-md shadow-primary/25"
            >
              Start a test
            </Link>
          </div>
        ) : (
          <>
            {/* Streak card */}
            <div className="rounded-2xl bg-primary p-5 mb-5 flex items-center gap-4 shadow-lg shadow-primary/25">
              <span className="text-4xl">🔥</span>
              <div>
                <div className="font-heading text-3xl font-black text-white leading-none">{streak}</div>
                <div className="text-sm text-white/75 font-semibold">day streak</div>
              </div>
              <div className="ml-auto text-right">
                <div className="font-heading text-2xl font-black text-white">{avg}%</div>
                <div className="text-sm text-white/75 font-semibold">avg score</div>
              </div>
              <div className="text-right">
                <div className="font-heading text-2xl font-black text-white">{passed}/{attempts.length}</div>
                <div className="text-sm text-white/75 font-semibold">passed</div>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {[
                { emoji: "📝", label: "Tests taken", value: attempts.length },
                { emoji: "📊", label: "Average score", value: `${avg}%` },
                { emoji: "🏆", label: "Best score", value: `${best}%` },
                { emoji: "⭐", label: "XP earned", value: `${attempts.length * 120}` },
              ].map(({ emoji, label, value }) => (
                <div key={label} className="rounded-2xl border-2 border-border bg-card p-4 text-center">
                  <div className="text-xl mb-1">{emoji}</div>
                  <div className="font-heading text-2xl font-black text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 font-bold">{label}</div>
                </div>
              ))}
            </div>

            {/* Score chart */}
            <div className="rounded-2xl border-2 border-border bg-card p-5 mb-5">
              <h2 className="font-extrabold text-sm mb-4">Score history (last {Math.min(20, attempts.length)} tests)</h2>
              <div className="flex items-end gap-2 h-28 mb-2">
                {attempts.slice(-20).map((a, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-lg transition-all"
                      style={{
                        height: `${Math.max(6, (a.percent / 100) * 100)}px`,
                        background: a.passed
                          ? "linear-gradient(180deg, oklch(0.47 0.22 25) 0%, oklch(0.38 0.20 25) 100%)"
                          : "#f87171",
                      }}
                    />
                    <span className="text-[9px] font-bold text-muted-foreground">{a.percent}%</span>
                  </div>
                ))}
              </div>
              {/* Pass mark line label */}
              <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                <div className="h-0.5 w-4 bg-primary/50 rounded" />
                75% pass mark
                <div className="h-0.5 w-4 bg-red-400/50 rounded ml-2" />
                Below pass
              </div>
            </div>

            {/* Attempt list */}
            <h2 className="font-extrabold text-sm mb-3">All attempts</h2>
            <div className="flex flex-col gap-2">
              {[...attempts].reverse().map((a, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border-2 border-border bg-card px-4 py-3 text-sm"
                >
                  <span className="text-base">{a.passed ? "✅" : "❌"}</span>
                  <span className="font-extrabold w-24 shrink-0">
                    {a.testNumber === 0 ? "Quick Quiz" : `Test ${a.testNumber}`}
                  </span>
                  <span className={`font-extrabold ${a.passed ? "text-emerald-600" : "text-red-500"}`}>
                    {a.percent}%
                  </span>
                  <span className="text-muted-foreground font-semibold">{a.score}/{a.total}</span>
                  <span className="text-muted-foreground font-semibold ml-auto">{formatTime(a.timeTaken)}</span>
                  <span className="text-muted-foreground text-xs font-semibold">
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
