"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Question } from "@/data/questions";
import type { TestMode } from "@/types";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, ChevronRight, ChevronLeft, Flag, Clock, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type AnswerState = {
  selected: number[];
  submitted: boolean;
};

type QuizEngineProps = {
  questions: Question[];
  mode: TestMode;
  timeLimitSeconds?: number; // default 45*60
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

  // Timer
  useEffect(() => {
    if (!isTimed) {
      const id = setInterval(() => setElapsed(Math.floor((Date.now() - startTime.current) / 1000)), 1000);
      return () => clearInterval(id);
    }
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimed, timeLeft]);

  const toggleOption = (idx: number) => {
    if (ans.submitted) return;
    setAnswers((prev) => {
      const updated = [...prev];
      const sel = updated[current].selected;
      const multiSelect = q.correctAnswers.length > 1;
      updated[current] = {
        ...updated[current],
        selected: multiSelect
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
      return (
        a.selected.length === correct.length &&
        a.selected.every((s) => correct.includes(s))
      );
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

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto w-full">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {isStudy ? (
            <><BookOpen className="h-4 w-4" /> Study mode</>
          ) : (
            <><Clock className="h-4 w-4" />
              <span className={cn(isTimed && timeLeft < 300 && "text-red-500 font-semibold")}>
                {isTimed ? formatTime(timeLeft) : formatTime(elapsed)}
              </span>
            </>
          )}
        </div>
        <div className="text-sm font-medium">
          {current + 1} / {questions.length}
        </div>
        <div className="text-sm text-muted-foreground">
          {answered} answered
        </div>
      </div>

      {/* Progress bar */}
      <Progress value={progressPercent} className="h-1.5" />

      {/* Question nav dots */}
      <div className="flex flex-wrap gap-1.5">
        {questions.map((_, i) => {
          const state = isCorrect(i);
          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "h-7 w-7 rounded text-xs font-medium transition-colors",
                i === current
                  ? "bg-primary text-primary-foreground"
                  : state === true
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400"
                  : state === false
                  ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                  : answers[i].selected.length > 0
                  ? "bg-muted text-muted-foreground border border-primary/30"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Question card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        {q.correctAnswers.length > 1 && (
          <div className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full inline-block mb-3">
            Select {q.correctAnswers.length} answers
          </div>
        )}
        <div className="text-xs text-muted-foreground mb-2">
          Chapter {q.chapter} · {q.topic}
        </div>
        <p className="text-base font-medium mb-5 leading-relaxed">{q.question}</p>

        <div className="flex flex-col gap-2">
          {q.options.map((option, idx) => {
            const isSelected = ans.selected.includes(idx);
            const isCorrectOption = q.correctAnswers.includes(idx);
            const showResult = ans.submitted;

            return (
              <button
                key={idx}
                onClick={() => toggleOption(idx)}
                disabled={ans.submitted}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg border text-sm transition-all",
                  !showResult && !isSelected && "border-border bg-background hover:border-primary/50 hover:bg-primary/5",
                  !showResult && isSelected && "border-primary bg-primary/10 text-primary font-medium",
                  showResult && isCorrectOption && "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300",
                  showResult && isSelected && !isCorrectOption && "border-red-400 bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300",
                  showResult && !isSelected && !isCorrectOption && "border-border bg-background opacity-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold",
                      !showResult && isSelected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/30",
                      showResult && isCorrectOption && "border-emerald-500 bg-emerald-500 text-white",
                      showResult && isSelected && !isCorrectOption && "border-red-400 bg-red-400 text-white"
                    )}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation (shown after submission) */}
        {ans.submitted && (
          <div
            className={cn(
              "mt-4 p-4 rounded-lg flex gap-3 text-sm",
              isCorrect(current)
                ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300"
                : "bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300"
            )}
          >
            {isCorrect(current) ? (
              <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
            ) : (
              <XCircle className="h-4 w-4 mt-0.5 shrink-0" />
            )}
            <div>
              <div className="font-medium mb-1">{isCorrect(current) ? "Correct!" : "Incorrect"}</div>
              <div className="opacity-90">{q.explanation}</div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => goTo(Math.max(0, current - 1))}
          disabled={current === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </button>

        <div className="flex items-center gap-2">
          {!ans.submitted && !isStudy && (
            <button
              onClick={submitAnswer}
              disabled={ans.selected.length === 0}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Check answer
            </button>
          )}
          {current === questions.length - 1 ? (
            <button
              onClick={handleFinish}
              className="flex items-center gap-1 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              <Flag className="h-4 w-4" /> Finish test
            </button>
          ) : (
            <button
              onClick={() => goTo(current + 1)}
              className="flex items-center gap-1 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
