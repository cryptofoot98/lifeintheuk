"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { QuizResult } from "./QuizEngine";
import { cn } from "@/lib/utils";
import { RotateCcw, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { getLevelForXP, getProgressToNextLevel, LEVELS } from "@/lib/levels";

type ResultsScreenProps = {
  result: QuizResult;
  testNumber?: number;
  onRetry: () => void;
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s < 10 ? "0" : ""}${s}s`;
}

export function ResultsScreen({ result, testNumber, onRetry }: ResultsScreenProps) {
  const { questions, answers, timeTaken, score } = result;
  const total = questions.length;
  const percent = Math.round((score / total) * 100);
  const passed = percent >= 75;
  const earnedXP = score * 10 + (passed ? 50 : 0);

  const [userXP, setUserXP] = useState<number | null>(null);
  const [prevXP, setPrevXP] = useState<number | null>(null);

  useEffect(() => {
    async function fetchXP() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("xp")
        .eq("id", user.id)
        .single();
      if (data) {
        setUserXP(data.xp ?? 0);
        setPrevXP((data.xp ?? 0) - earnedXP);
      }
    }
    fetchXP();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentLevel = userXP !== null ? getLevelForXP(userXP) : null;
  const prevLevel    = prevXP  !== null ? getLevelForXP(prevXP)  : null;
  const leveledUp = currentLevel && prevLevel && currentLevel.level > prevLevel.level;
  const { pct: xpPct } = userXP !== null ? getProgressToNextLevel(userXP) : { pct: 0 };

  return (
    <div className="max-w-2xl mx-auto w-full flex flex-col gap-5">

      {/* ── Level-up banner ─────────────────────────────────────────────────── */}
      {leveledUp && currentLevel && (
        <div className="rounded-2xl border-[3px] border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 p-5 text-center">
          <div className="text-4xl mb-2">{currentLevel.emoji}</div>
          <div className="font-heading font-black text-xl text-yellow-700 dark:text-yellow-300">
            Level Up! You reached Level {currentLevel.level}
          </div>
          <div className="text-sm font-extrabold text-yellow-600 dark:text-yellow-400 mt-1">
            {currentLevel.name}
          </div>
        </div>
      )}

      {/* ── Score card ──────────────────────────────────────────────────────── */}
      <div className={cn(
        "rounded-2xl border-[3px] p-7 text-center",
        passed
          ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30"
          : "border-red-400 bg-red-50/60 dark:bg-red-950/30"
      )}>
        <div className="text-5xl mb-3">{passed ? "🏆" : "📚"}</div>

        <div
          className="font-heading text-6xl font-black mb-1 leading-none"
          style={{ color: passed ? "oklch(0.52 0.16 145)" : "oklch(0.56 0.22 25)" }}
        >
          {percent}%
        </div>

        <div className={cn(
          "inline-block font-extrabold text-sm px-4 py-1.5 rounded-full mb-4",
          passed ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
        )}>
          {passed ? "✓ PASSED" : "✗ NOT PASSED — keep going!"}
        </div>

        <p className="text-sm font-semibold text-muted-foreground mb-5">
          {score} correct out of {total} · {formatTime(timeTaken)} · Pass mark: 75%
        </p>

        {/* Score bar */}
        <div className="relative h-4 rounded-full bg-muted overflow-hidden mb-1">
          <div
            className={cn("h-full rounded-full transition-all duration-1000", passed ? "bg-emerald-500" : "bg-red-400")}
            style={{ width: `${percent}%` }}
          />
          <div className="absolute top-0 bottom-0 w-0.5 bg-foreground/20" style={{ left: "75%" }} />
        </div>
        <div className="flex justify-between text-[11px] font-bold text-muted-foreground mb-5">
          <span>0%</span>
          <span className="text-primary font-extrabold">75% pass mark</span>
          <span>100%</span>
        </div>

        {/* XP earned */}
        <div className="inline-flex items-center gap-2 bg-card border-2 border-border rounded-2xl px-5 py-2.5 text-sm font-extrabold">
          <span className="text-xl">⭐</span>
          +{earnedXP} XP{passed ? " · Streak extended! 🔥" : ""}
        </div>
      </div>

      {/* ── Level progress ──────────────────────────────────────────────────── */}
      {userXP !== null && currentLevel && (
        <div className="rounded-2xl border-2 border-border bg-card p-4 card-elevated">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{currentLevel.emoji}</span>
              <div>
                <div className="text-sm font-extrabold">Level {currentLevel.level} · {currentLevel.name}</div>
                <div className="text-xs text-muted-foreground font-semibold">{userXP.toLocaleString()} XP total</div>
              </div>
            </div>
            {currentLevel.level < LEVELS.length && (
              <div className="text-xs font-extrabold text-muted-foreground">
                Lv.{currentLevel.level + 1} →
              </div>
            )}
          </div>
          <div className="h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-yellow-400 transition-all duration-1000"
              style={{ width: `${xpPct}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Stats row ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { emoji: "✅", value: score,             label: "Correct", color: "text-emerald-600 dark:text-emerald-400" },
          { emoji: "❌", value: total - score,      label: "Wrong",   color: "text-red-500" },
          { emoji: "⏱️", value: formatTime(timeTaken), label: "Time", color: "text-primary" },
        ].map(({ emoji, value, label, color }) => (
          <div key={label} className="rounded-2xl border-2 border-border bg-card p-4 text-center card-elevated">
            <div className="text-xl mb-1">{emoji}</div>
            <div className={cn("font-heading text-2xl font-black", color)}>{value}</div>
            <div className="text-xs font-bold text-muted-foreground mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* ── Actions ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onRetry}
          className="btn-3d flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-border bg-card text-sm font-extrabold hover:bg-muted transition-colors"
          style={{ borderBottomColor: "oklch(0.84 0.018 246)" }}
        >
          <RotateCcw className="h-4 w-4" /> Try again
        </button>
        {testNumber && testNumber < 40 && (
          <Link
            href={`/tests/${testNumber + 1}`}
            className="btn-3d flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-white text-sm font-extrabold hover:bg-primary/90 transition-colors shadow-md shadow-primary/25"
            style={{ borderBottomColor: "oklch(0.35 0.22 25)" }}
          >
            Next test <ArrowRight className="h-4 w-4" />
          </Link>
        )}
        <Link
          href="/weak-areas"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-border bg-card text-sm font-extrabold hover:bg-muted transition-colors"
        >
          🎯 Weak areas
        </Link>
        <Link
          href="/progress"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-border bg-card text-sm font-extrabold hover:bg-muted transition-colors"
        >
          📊 Progress
        </Link>
      </div>

      {/* ── Per-question review ─────────────────────────────────────────────── */}
      <div>
        <h2 className="font-extrabold text-base mb-3">📋 Question Review</h2>
        <div className="flex flex-col gap-3">
          {questions.map((q, i) => {
            const a = answers[i];
            const correct = q.correctAnswers;
            const wasCorrect =
              a.submitted &&
              a.selected.length === correct.length &&
              a.selected.every((s) => correct.includes(s));
            const skipped = !a.submitted || a.selected.length === 0;

            return (
              <div
                key={q.id}
                className={cn(
                  "rounded-2xl border-2 p-4 text-sm card-elevated",
                  skipped   ? "border-border bg-muted/30"
                  : wasCorrect
                    ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/20"
                    : "border-red-300 bg-red-50/60 dark:border-red-800 dark:bg-red-950/20"
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
                        {a.selected.map((s) => q.options[s]).join(", ") || "—"}
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
