"use client";

import Link from "next/link";
import type { QuizResult } from "./QuizEngine";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, RotateCcw, ArrowRight } from "lucide-react";

type ResultsScreenProps = {
  result: QuizResult;
  testNumber?: number;
  onRetry: () => void;
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export function ResultsScreen({ result, testNumber, onRetry }: ResultsScreenProps) {
  const { questions, answers, timeTaken, score } = result;
  const total = questions.length;
  const percent = Math.round((score / total) * 100);
  const passed = percent >= 75;
  const xp = score * 10 + (passed ? 50 : 0);

  return (
    <div className="max-w-2xl mx-auto w-full flex flex-col gap-5">

      {/* ── Score card ─────────────────────────────────────────────────────── */}
      <div
        className={cn(
          "rounded-2xl border-2 p-7 text-center",
          passed
            ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-700 dark:bg-emerald-900/15"
            : "border-red-300 bg-red-50/60 dark:border-red-700 dark:bg-red-900/15"
        )}
      >
        <div className="text-5xl mb-3">{passed ? "🏆" : "📚"}</div>

        <div
          className="font-heading text-6xl font-black mb-1 leading-none"
          style={{ color: passed ? "#059669" : "#dc2626" }}
        >
          {percent}%
        </div>

        <div
          className={cn(
            "inline-block font-extrabold text-sm px-4 py-1.5 rounded-full mb-4",
            passed
              ? "bg-emerald-500 text-white"
              : "bg-red-500 text-white"
          )}
        >
          {passed ? "✓ PASSED" : "✗ NOT PASSED — keep going!"}
        </div>

        <p className="text-sm font-semibold text-muted-foreground mb-5">
          {score} correct out of {total} · {formatTime(timeTaken)} · Pass mark: 75%
        </p>

        {/* Progress bar */}
        <div className="relative h-4 rounded-full bg-muted overflow-hidden mb-2">
          <div
            className={cn("h-full rounded-full transition-all duration-700", passed ? "bg-emerald-500" : "bg-red-400")}
            style={{ width: `${percent}%` }}
          />
          {/* Pass mark line */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-foreground/30" style={{ left: "75%" }} />
        </div>
        <div className="flex justify-between text-[11px] font-bold text-muted-foreground">
          <span>0%</span>
          <span className="text-primary">75% pass mark</span>
          <span>100%</span>
        </div>

        {/* XP earned */}
        <div className="mt-5 inline-flex items-center gap-2 bg-background border-2 border-border rounded-2xl px-5 py-2.5 text-sm font-extrabold">
          <span className="text-xl">⭐</span>
          +{xp} XP earned{passed ? " — Streak extended! 🔥" : ""}
        </div>
      </div>

      {/* ── Stats row ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { emoji: "✅", value: score, label: "Correct", color: "text-emerald-600" },
          { emoji: "❌", value: total - score, label: "Wrong", color: "text-red-500" },
          { emoji: "⏱️", value: formatTime(timeTaken), label: "Time", color: "text-primary" },
        ].map(({ emoji, value, label, color }) => (
          <div key={label} className="rounded-2xl border-2 border-border bg-card p-4 text-center">
            <div className="text-xl mb-1">{emoji}</div>
            <div className={cn("font-heading text-2xl font-black", color)}>{value}</div>
            <div className="text-xs font-bold text-muted-foreground mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* ── Actions ────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-border bg-background text-sm font-extrabold hover:bg-muted transition-colors"
        >
          <RotateCcw className="h-4 w-4" /> Try again
        </button>
        {testNumber && testNumber < 40 && (
          <Link
            href={`/tests/${testNumber + 1}`}
            className="btn-3d flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-sm font-extrabold hover:bg-primary/90 transition-colors shadow-md shadow-primary/25"
          >
            Next test <ArrowRight className="h-4 w-4" />
          </Link>
        )}
        <Link
          href="/weak-areas"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-border bg-background text-sm font-extrabold hover:bg-muted transition-colors"
        >
          🎯 Weak areas
        </Link>
        <Link
          href="/tests"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-border bg-background text-sm font-extrabold hover:bg-muted transition-colors"
        >
          📝 All tests
        </Link>
      </div>

      {/* ── Per-question review ─────────────────────────────────────────────── */}
      <div>
        <h2 className="font-extrabold text-base mb-3">📋 Question Review</h2>
        <div className="flex flex-col gap-3">
          {questions.map((q, i) => {
            const ans = answers[i];
            const correct = q.correctAnswers;
            const wasCorrect =
              ans.submitted &&
              ans.selected.length === correct.length &&
              ans.selected.every((s) => correct.includes(s));
            const skipped = !ans.submitted || ans.selected.length === 0;

            return (
              <div
                key={q.id}
                className={cn(
                  "rounded-2xl border-2 p-4 text-sm",
                  skipped
                    ? "border-border bg-muted/30"
                    : wasCorrect
                    ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-900/10"
                    : "border-red-200 bg-red-50/60 dark:border-red-800 dark:bg-red-900/10"
                )}
              >
                <div className="flex items-start gap-3">
                  <span className="text-base shrink-0 mt-0.5">
                    {skipped ? "⬜" : wasCorrect ? "✅" : "❌"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-foreground leading-snug mb-1.5">
                      {i + 1}. {q.question}
                    </div>
                    {!skipped && !wasCorrect && (
                      <div className="text-xs font-semibold text-muted-foreground mb-1">
                        <span className="text-red-600 dark:text-red-400 font-extrabold">Your answer: </span>
                        {ans.selected.map((s) => q.options[s]).join(", ") || "—"}
                      </div>
                    )}
                    <div className="text-xs font-semibold text-muted-foreground">
                      <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">Correct: </span>
                      {correct.map((c) => q.options[c]).join(", ")}
                    </div>
                    {(!wasCorrect || skipped) && (
                      <div className="mt-2 text-xs font-medium text-muted-foreground leading-relaxed bg-background/60 rounded-xl p-2.5 border border-border/50">
                        {q.explanation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
