"use client";

import Link from "next/link";
import type { QuizResult } from "./QuizEngine";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, RotateCcw, Home, ArrowRight } from "lucide-react";

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

  return (
    <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">
      {/* Score card */}
      <div
        className={cn(
          "rounded-xl border p-8 text-center",
          passed
            ? "border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-900/10"
            : "border-red-400/40 bg-red-50/50 dark:bg-red-900/10"
        )}
      >
        <div className="text-5xl font-bold mb-2" style={{ color: passed ? "#059669" : "#dc2626" }}>
          {percent}%
        </div>
        <div
          className={cn(
            "text-xl font-semibold mb-3",
            passed ? "text-emerald-700 dark:text-emerald-400" : "text-red-700 dark:text-red-400"
          )}
        >
          {passed ? "Pass" : "Not quite — keep practising"}
        </div>
        <p className="text-sm text-muted-foreground">
          {score} correct out of {total} · {formatTime(timeTaken)} · Pass mark: 75%
        </p>

        {/* Score bar */}
        <div className="mt-5 h-3 rounded-full bg-muted overflow-hidden">
          <div
            className={cn("h-full rounded-full transition-all", passed ? "bg-emerald-500" : "bg-red-400")}
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="mt-1 text-xs text-muted-foreground flex justify-between">
          <span>0%</span>
          <span className="text-primary font-medium">75% pass mark</span>
          <span>100%</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted transition-colors"
        >
          <RotateCcw className="h-4 w-4" /> Try again
        </button>
        {testNumber && testNumber < 40 && (
          <Link
            href={`/tests/${testNumber + 1}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Next test <ArrowRight className="h-4 w-4" />
          </Link>
        )}
        <Link
          href="/weak-areas"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted transition-colors"
        >
          Practise weak areas
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted transition-colors"
        >
          <Home className="h-4 w-4" /> Home
        </Link>
      </div>

      {/* Per-question breakdown */}
      <div>
        <h2 className="text-base font-semibold mb-3">Question Review</h2>
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
                  "rounded-lg border p-4 text-sm",
                  skipped
                    ? "border-border bg-muted/30"
                    : wasCorrect
                    ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-900/10"
                    : "border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/10"
                )}
              >
                <div className="flex items-start gap-3">
                  {skipped ? (
                    <span className="text-muted-foreground mt-0.5">—</span>
                  ) : wasCorrect ? (
                    <CheckCircle className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground leading-snug mb-1">
                      {i + 1}. {q.question}
                    </div>
                    {!skipped && !wasCorrect && (
                      <div className="text-muted-foreground mt-1">
                        <span className="text-red-600 dark:text-red-400">Your answer: </span>
                        {ans.selected.map((s) => q.options[s]).join(", ") || "—"}
                      </div>
                    )}
                    <div className="text-muted-foreground">
                      <span className="text-emerald-700 dark:text-emerald-400">Correct: </span>
                      {correct.map((c) => q.options[c]).join(", ")}
                    </div>
                    {(!wasCorrect || skipped) && (
                      <div className="mt-2 text-muted-foreground italic text-xs leading-relaxed">
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
