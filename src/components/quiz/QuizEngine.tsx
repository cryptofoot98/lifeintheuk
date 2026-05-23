"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Question } from "@/data/questions";
import type { TestMode } from "@/types";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, ChevronRight, ChevronLeft, Flag, Clock, BookOpen } from "lucide-react";

type AnswerState = {
  selected: number[];
  submitted: boolean;
};

type QuizEngineProps = {
  questions: Question[];
  mode: TestMode;
  timeLimitSeconds?: number;
  onComplete: (results: QuizResult) => void;
};

export type QuizResult = {
  questions: Question[];
  answers: AnswerState[];
  timeTaken: number;
  score: number;
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function QuizEngine({ questions, mode, timeLimitSeconds = 45 * 60, onComplete }: QuizEngineProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>(
    questions.map(() => ({ selected: [], submitted: false }))
  );
  const [timeLeft, setTimeLeft] = useState(timeLimitSeconds);
  const [elapsed, setElapsed] = useState(0);
  const startTime = useRef(Date.now());

  const isTimed = mode === "timed";
  const isStudy = mode === "study";
  const q = questions[current];
  const ans = answers[current];

  useEffect(() => {
    if (!isTimed) {
      const id = setInterval(() => setElapsed(Math.floor((Date.now() - startTime.current) / 1000)), 1000);
      return () => clearInterval(id);
    }
    if (timeLeft <= 0) { handleFinish(); return; }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimed, timeLeft]);

  const toggleOption = (idx: number) => {
    if (ans.submitted) return;
    setAnswers((prev) => {
      const updated = [...prev];
      const sel = updated[current].selected;
      const multi = q.correctAnswers.length > 1;
      updated[current] = {
        ...updated[current],
        selected: multi
          ? sel.includes(idx) ? sel.filter((s) => s !== idx) : [...sel, idx]
          : sel.includes(idx) ? [] : [idx],
      };
      return updated;
    });
  };

  const submitAnswer = () => {
    if (ans.selected.length === 0) return;
    setAnswers((prev) => {
      const updated = [...prev];
      updated[current] = { ...updated[current], submitted: true };
      return updated;
    });
  };

  const goTo = (idx: number) => {
    if (isStudy && !answers[current].submitted && answers[current].selected.length > 0) {
      submitAnswer();
    }
    setCurrent(idx);
  };

  const handleFinish = useCallback(() => {
    const timeTaken = Math.floor((Date.now() - startTime.current) / 1000);
    const score = answers.filter((a, i) => {
      const correct = questions[i].correctAnswers;
      return a.selected.length === correct.length && a.selected.every((s) => correct.includes(s));
    }).length;
    onComplete({ questions, answers, timeTaken, score });
  }, [answers, questions, onComplete]);

  const isCorrect = (qIdx: number) => {
    const a = answers[qIdx];
    if (!a.submitted) return null;
    const correct = questions[qIdx].correctAnswers;
    return a.selected.length === correct.length && a.selected.every((s) => correct.includes(s));
  };

  const answered = answers.filter((a) => a.submitted).length;
  const progressPercent = (answered / questions.length) * 100;
  const timerWarning = isTimed && timeLeft < 300;

  return (
    <div className="flex flex-col gap-5 max-w-2xl mx-auto w-full">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-3">
        {/* Mode / timer badge */}
        <div
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-sm font-bold",
            isStudy
              ? "bg-secondary/10 text-secondary dark:text-secondary"
              : timerWarning
              ? "bg-primary/15 text-primary animate-pulse"
              : "bg-muted text-muted-foreground"
          )}
        >
          {isStudy ? (
            <><BookOpen className="h-3.5 w-3.5" /> Study mode</>
          ) : (
            <><Clock className="h-3.5 w-3.5" />
              <span>{isTimed ? formatTime(timeLeft) : formatTime(elapsed)}</span>
            </>
          )}
        </div>

        {/* Q counter */}
        <div className="font-extrabold text-sm tabular-nums">
          {current + 1} <span className="text-muted-foreground font-semibold">/ {questions.length}</span>
        </div>

        {/* Answered count */}
        <div className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1.5 rounded-2xl">
          {answered} done
        </div>
      </div>

      {/* ── Progress bar ───────────────────────────────────────────────────── */}
      <div className="h-3 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* ── Question nav dots ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-1.5">
        {questions.map((_, i) => {
          const state = isCorrect(i);
          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "h-8 w-8 rounded-xl text-xs font-extrabold transition-all border-2",
                i === current
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/30 scale-110"
                  : state === true
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : state === false
                  ? "bg-red-400 text-white border-red-400"
                  : answers[i].selected.length > 0
                  ? "bg-muted border-primary/40 text-primary"
                  : "bg-muted border-border text-muted-foreground hover:border-primary/30"
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* ── Question card ──────────────────────────────────────────────────── */}
      <div className="rounded-2xl border-2 border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-wide bg-muted px-2.5 py-1 rounded-full">
            Ch. {q.chapter}
          </span>
          <span className="text-[11px] font-semibold text-muted-foreground">{q.topic}</span>
          {q.correctAnswers.length > 1 && (
            <span className="text-[11px] font-extrabold text-primary bg-primary/10 px-2.5 py-1 rounded-full ml-auto">
              Select {q.correctAnswers.length}
            </span>
          )}
        </div>

        <p className="text-base font-bold leading-relaxed mb-5">{q.question}</p>

        <div className="flex flex-col gap-2.5">
          {q.options.map((option, idx) => {
            const isSelected = ans.selected.includes(idx);
            const isCorrectOpt = q.correctAnswers.includes(idx);
            const shown = ans.submitted;

            return (
              <button
                key={idx}
                onClick={() => toggleOption(idx)}
                disabled={ans.submitted}
                className={cn(
                  "w-full text-left px-4 py-3.5 rounded-2xl border-2 text-sm font-semibold transition-all flex items-center gap-3",
                  !shown && !isSelected && "border-border bg-background hover:border-primary/40 hover:bg-primary/5 active:scale-[0.99]",
                  !shown && isSelected && "border-primary bg-primary/10 text-primary",
                  shown && isCorrectOpt && "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300",
                  shown && isSelected && !isCorrectOpt && "border-red-400 bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300",
                  shown && !isSelected && !isCorrectOpt && "border-border bg-background opacity-40"
                )}
              >
                {/* Letter badge */}
                <span
                  className={cn(
                    "h-7 w-7 rounded-xl border-2 flex items-center justify-center shrink-0 text-xs font-extrabold transition-all",
                    !shown && isSelected
                      ? "border-primary bg-primary text-white"
                      : !shown
                      ? "border-border/60 text-muted-foreground"
                      : isCorrectOpt
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : isSelected
                      ? "border-red-400 bg-red-400 text-white"
                      : "border-border/60 text-muted-foreground"
                  )}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{option}</span>
                {shown && isCorrectOpt && <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />}
                {shown && isSelected && !isCorrectOpt && <XCircle className="h-4 w-4 text-red-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {ans.submitted && (
          <div
            className={cn(
              "mt-4 p-4 rounded-2xl flex gap-3 text-sm border-2 font-semibold",
              isCorrect(current)
                ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800"
                : "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800"
            )}
          >
            <span className="text-xl shrink-0">{isCorrect(current) ? "✅" : "❌"}</span>
            <div>
              <div className="font-extrabold mb-1">{isCorrect(current) ? "Correct! +10 XP" : "Not quite — here's why:"}</div>
              <div className="font-medium opacity-90">{q.explanation}</div>
            </div>
          </div>
        )}
      </div>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => goTo(Math.max(0, current - 1))}
          disabled={current === 0}
          className="flex items-center gap-1.5 px-4 py-3 rounded-2xl border-2 border-border text-sm font-extrabold hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        <div className="flex items-center gap-2 flex-1 justify-end">
          {!ans.submitted && !isStudy && (
            <button
              onClick={submitAnswer}
              disabled={ans.selected.length === 0}
              className="btn-3d flex-1 sm:flex-none px-6 py-3 rounded-2xl bg-primary text-white text-sm font-extrabold hover:bg-primary/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:border-b-0 shadow-md shadow-primary/25"
            >
              Check answer
            </button>
          )}
          {current === questions.length - 1 ? (
            <button
              onClick={handleFinish}
              className="btn-3d flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white text-sm font-extrabold hover:bg-primary/90 transition-colors shadow-md shadow-primary/25"
              style={{ borderBottomColor: "oklch(0.35 0.22 25)" }}
            >
              <Flag className="h-4 w-4" /> Finish test
            </button>
          ) : (
            <button
              onClick={() => goTo(current + 1)}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl border-2 border-border text-sm font-extrabold hover:bg-muted transition-colors"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
