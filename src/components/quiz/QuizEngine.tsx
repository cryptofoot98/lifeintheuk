"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Question } from "@/data/questions";
import type { TestMode } from "@/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, Clock, Flame, Flag, Sparkles, Lightbulb } from "lucide-react";
import { useAI } from "@/lib/ai-context";

type AnswerState = { selected: number[]; submitted: boolean };

type QuizEngineProps = {
  questions: Question[];
  mode: TestMode;
  timeLimitSeconds?: number;
  onComplete: (results: QuizResult) => void;
  sessionKey?: string;
};

type SavedSession = {
  current: number;
  answers: AnswerState[];
  timeLeft: number;
  elapsed: number;
  savedAt: number;
  fingerprint: string;
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

export function QuizEngine({ questions, mode, timeLimitSeconds = 45 * 60, onComplete, sessionKey }: QuizEngineProps) {
  const isTimed = mode === "timed";
  const isStudy = mode === "study";
  const { openAI } = useAI();

  // Load saved session once — fingerprint prevents restoring a random quiz after page reload
  const savedRef = useRef<SavedSession | null>((() => {
    if (!sessionKey || typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(`quiz_session_${sessionKey}`);
      if (!raw) return null;
      const data: SavedSession = JSON.parse(raw);
      const fingerprint = `${questions.length}_${questions[0]?.question?.slice(0, 30)}`;
      if (data.fingerprint !== fingerprint) return null;
      if (data.answers?.length !== questions.length) return null;
      return data;
    } catch { return null; }
  })());
  const saved = savedRef.current;

  const [current, setCurrent] = useState(saved?.current ?? 0);
  const [answers, setAnswers] = useState<AnswerState[]>(
    saved?.answers ?? questions.map(() => ({ selected: [], submitted: false }))
  );
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!saved || !isTimed) return timeLimitSeconds;
    const awaySeconds = Math.floor((Date.now() - saved.savedAt) / 1000);
    return Math.max(0, saved.timeLeft - awaySeconds);
  });
  const [elapsed, setElapsed] = useState(saved?.elapsed ?? 0);
  const [combo, setCombo] = useState(0);
  const [xpFloatKey, setXpFloatKey] = useState<number | null>(null);
  const [comboFlash, setComboFlash] = useState(false);
  const [showResumedBanner, setShowResumedBanner] = useState(!!saved);
  const startTime = useRef(
    saved && !isTimed ? Date.now() - (saved.elapsed ?? 0) * 1000 : Date.now()
  );
  const hiddenAtRef = useRef<number | null>(null);

  const q = questions[current];
  const ans = answers[current];

  // Persist session on every state change
  useEffect(() => {
    if (!sessionKey) return;
    try {
      const fingerprint = `${questions.length}_${questions[0]?.question?.slice(0, 30)}`;
      const data: SavedSession = { current, answers, timeLeft, elapsed, savedAt: Date.now(), fingerprint };
      localStorage.setItem(`quiz_session_${sessionKey}`, JSON.stringify(data));
    } catch { /* ignore */ }
  }, [current, answers, timeLeft, elapsed, sessionKey, questions]);

  // Auto-dismiss the resumed banner
  useEffect(() => {
    if (!showResumedBanner) return;
    const t = setTimeout(() => setShowResumedBanner(false), 4000);
    return () => clearTimeout(t);
  }, [showResumedBanner]);

  // Pause timed countdown when user leaves the page / switches apps
  useEffect(() => {
    if (!isTimed) return;
    const handler = () => {
      if (document.hidden) {
        hiddenAtRef.current = Date.now();
      } else if (hiddenAtRef.current !== null) {
        const hiddenSecs = Math.round((Date.now() - hiddenAtRef.current) / 1000);
        hiddenAtRef.current = null;
        setTimeLeft(t => Math.min(t + hiddenSecs, timeLimitSeconds));
      }
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [isTimed, timeLimitSeconds]);

  useEffect(() => {
    if (!isTimed) {
      const id = setInterval(() => setElapsed(Math.floor((Date.now() - startTime.current) / 1000)), 1000);
      return () => clearInterval(id);
    }
    if (timeLeft <= 0) { handleFinish(); return; }
    const id = setInterval(() => {
      if (!document.hidden) setTimeLeft((t) => t - 1);
    }, 1000);
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
    const correct = q.correctAnswers;
    const isRight =
      ans.selected.length === correct.length &&
      ans.selected.every((s) => correct.includes(s));

    setAnswers((prev) => {
      const updated = [...prev];
      updated[current] = { ...updated[current], submitted: true };
      return updated;
    });

    if (isRight) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      setXpFloatKey(Date.now());
      if (newCombo >= 3) {
        setComboFlash(true);
        setTimeout(() => setComboFlash(false), 600);
      }
    } else {
      setCombo(0);
    }
  };

  const goTo = (idx: number) => setCurrent(idx);
  const goNext = () => { if (current < questions.length - 1) setCurrent(current + 1); };

  const handleFinish = useCallback(() => {
    if (sessionKey) {
      try { localStorage.removeItem(`quiz_session_${sessionKey}`); } catch { /* ignore */ }
    }
    const timeTaken = isTimed
      ? timeLimitSeconds - timeLeft
      : Math.floor((Date.now() - startTime.current) / 1000);
    const score = answers.filter((a, i) => {
      const c = questions[i].correctAnswers;
      return a.submitted && a.selected.length === c.length && a.selected.every((s) => c.includes(s));
    }).length;
    onComplete({ questions, answers, timeTaken, score });
  }, [answers, questions, onComplete, sessionKey, isTimed, timeLimitSeconds, timeLeft]);

  const getAnswerResult = (qIdx: number): boolean | null => {
    const a = answers[qIdx];
    if (!a.submitted) return null;
    const c = questions[qIdx].correctAnswers;
    return a.selected.length === c.length && a.selected.every((s) => c.includes(s));
  };

  const currentResult = getAnswerResult(current);
  const answered = answers.filter((a) => a.submitted).length;
  const progressPct = (answered / questions.length) * 100;
  const timerWarning = isTimed && timeLeft < 300;
  const isLast = current === questions.length - 1;
  const canCheck = ans.selected.length > 0 && !ans.submitted;

  return (
    <div className="flex flex-col max-w-2xl mx-auto w-full gap-4">

      {/* ── Top bar ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => current > 0 ? goTo(current - 1) : undefined}
          disabled={current === 0}
          className="h-9 w-9 flex items-center justify-center rounded-xl border-2 border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all disabled:opacity-30 shrink-0"
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 h-4 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Combo + timer */}
        <div className="flex items-center gap-1.5 shrink-0">
          {combo >= 3 && (
            <div className={cn(
              "flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2.5 py-1 rounded-full text-xs font-extrabold",
              comboFlash && "combo-pulse"
            )}>
              <Flame className="h-3.5 w-3.5" /> {combo}
            </div>
          )}
          <div className={cn(
            "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold",
            timerWarning
              ? "bg-primary/15 text-primary animate-pulse"
              : "bg-muted text-muted-foreground"
          )}>
            <Clock className="h-3.5 w-3.5" />
            {isTimed ? formatTime(timeLeft) : formatTime(elapsed)}
          </div>
        </div>
      </div>

      {/* Micro nav dots */}
      <div className="flex gap-1 flex-wrap">
        {questions.map((_, i) => {
          const r = getAnswerResult(i);
          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={`Question ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-200",
                i === current
                  ? "w-6 bg-primary"
                  : r === true  ? "w-3 bg-emerald-500"
                  : r === false ? "w-3 bg-red-400"
                  : answers[i].selected.length > 0 ? "w-3 bg-primary/40"
                  : "w-3 bg-muted-foreground/25 hover:bg-muted-foreground/50"
              )}
            />
          );
        })}
      </div>

      {/* Resumed banner */}
      {showResumedBanner && (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-200 dark:border-emerald-800 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          <span>↩️</span>
          <span>Resumed from where you left off</span>
          <button onClick={() => setShowResumedBanner(false)} className="ml-auto text-emerald-400 hover:text-emerald-600 font-extrabold">✕</button>
        </div>
      )}

      {/* ── Question ─────────────────────────────────────────────────────────── */}
      <div className="relative">
        {/* XP float */}
        {xpFloatKey && (
          <span
            key={xpFloatKey}
            className="xp-float absolute -top-1 right-2 text-sm font-extrabold text-emerald-500 z-10"
          >
            +10 XP ⭐
          </span>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
            {current + 1}/{questions.length}
          </span>
          <span className="text-[11px] font-semibold text-muted-foreground">{q.topic}</span>
          {q.correctAnswers.length > 1 && (
            <span className="text-[11px] font-extrabold text-primary bg-primary/10 px-2.5 py-1 rounded-full ml-auto">
              Select {q.correctAnswers.length}
            </span>
          )}
        </div>

        <p className="text-[17px] font-bold leading-snug">{q.question}</p>
      </div>

      {/* ── Answer options ────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3">
        {q.options.map((option, idx) => {
          const selected = ans.selected.includes(idx);
          const correctOpt = q.correctAnswers.includes(idx);
          const shown = ans.submitted;

          // Derive state for styling
          let state: "default" | "selected" | "correct" | "wrong" | "faded" = "default";
          if (!shown && selected) state = "selected";
          else if (shown && correctOpt) state = "correct";
          else if (shown && selected && !correctOpt) state = "wrong";
          else if (shown && !correctOpt) state = "faded";

          const borderBottomColor =
            state === "correct" ? "oklch(0.35 0.18 145)"
            : state === "wrong"   ? "oklch(0.45 0.20 25)"
            : state === "selected"? "oklch(0.35 0.22 25)"
            : "oklch(0.78 0.018 246)";

          return (
            <button
              key={idx}
              onClick={() => toggleOption(idx)}
              disabled={ans.submitted}
              className={cn(
                "option-card relative overflow-hidden w-full text-left rounded-2xl border-[3px] flex items-center gap-3.5 px-4 py-3.5",
                "font-bold text-sm leading-snug",
                state === "default"  && "border-border bg-card hover:border-primary/60 hover:bg-primary/4 hover:shadow-md",
                state === "selected" && "border-primary bg-card",
                state === "correct"  && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 correct-bounce",
                state === "wrong"    && "border-red-400 bg-red-50 dark:bg-red-950/40 wrong-shake",
                state === "faded"    && "border-border/40 bg-card/60 opacity-50",
              )}
              style={{ borderBottomColor, borderBottomWidth: shown ? "3px" : undefined }}
            >
              {/* Union Jack watermark — appears only when selected (pre-submit) */}
              {state === "selected" && (
                <span className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  <svg
                    viewBox="0 0 60 30"
                    preserveAspectRatio="xMidYMid slice"
                    className="w-full h-full"
                    style={{ opacity: 0.14 }}
                  >
                    {/* Blue field */}
                    <rect width="60" height="30" fill="#012169" />
                    {/* White diagonal X (St. Andrew + St. Patrick base) */}
                    <path d="M0 0L60 30M60 0L0 30" stroke="white" strokeWidth="8" />
                    {/* Red diagonal X (St. Patrick, narrower) */}
                    <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4.5" />
                    {/* White upright cross (St. George base) */}
                    <rect x="23" y="0" width="14" height="30" fill="white" />
                    <rect x="0" y="11" width="60" height="8" fill="white" />
                    {/* Red upright cross (St. George) */}
                    <rect x="25.5" y="0" width="9" height="30" fill="#C8102E" />
                    <rect x="0" y="13" width="60" height="4" fill="#C8102E" />
                  </svg>
                </span>
              )}

              {/* Content — z-10 keeps it above the SVG overlay */}
              <span className={cn(
                "relative z-10 h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-extrabold border-[3px] transition-colors",
                state === "default"  && "border-border/70 text-muted-foreground",
                state === "selected" && "border-primary bg-primary text-white",
                state === "correct"  && "border-emerald-500 bg-emerald-500 text-white",
                state === "wrong"    && "border-red-400 bg-red-400 text-white",
                state === "faded"    && "border-border/40 text-muted-foreground/50",
              )}>
                {String.fromCharCode(65 + idx)}
              </span>

              <span className={cn(
                "relative z-10 flex-1",
                state === "correct" && "text-emerald-800 dark:text-emerald-200",
                state === "wrong"   && "text-red-800 dark:text-red-300",
              )}>
                {option}
              </span>

              {state === "correct" && <span className="relative z-10 text-xl shrink-0">✅</span>}
              {state === "wrong"   && <span className="relative z-10 text-xl shrink-0">❌</span>}
            </button>
          );
        })}
      </div>

      {/* ── Feedback + action footer ──────────────────────────────────────────── */}
      {ans.submitted ? (
        <div className={cn(
          "rounded-2xl border-[3px] p-5",
          currentResult
            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40"
            : "border-red-400 bg-red-50 dark:bg-red-950/40"
        )}>
          {/* Feedback content */}
          <div className="flex gap-3 mb-4">
            <span className="text-2xl shrink-0">{currentResult ? "🎉" : "💡"}</span>
            <div>
              <div className={cn(
                "font-extrabold text-base mb-1",
                currentResult ? "text-emerald-700 dark:text-emerald-300" : "text-red-700 dark:text-red-300"
              )}>
                {currentResult
                  ? `Correct!${combo >= 3 ? ` 🔥 ${combo} in a row!` : ""} +10 XP`
                  : "Not quite!"}
              </div>
              {!currentResult && (
                <div className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 mb-1.5">
                  ✓ Correct answer: {q.correctAnswers.map((c) => q.options[c]).join(" / ")}
                </div>
              )}
              <p className={cn(
                "text-sm font-medium leading-relaxed",
                currentResult
                  ? "text-emerald-700/80 dark:text-emerald-300/80"
                  : "text-red-700/80 dark:text-red-300/80"
              )}>
                {q.explanation}
              </p>
            </div>
          </div>

          {/* Continue / Finish */}
          {isLast ? (
            <button
              onClick={handleFinish}
              className={cn(
                "btn-3d w-full py-4 rounded-2xl font-extrabold text-base text-white uppercase tracking-wide",
                currentResult ? "bg-emerald-500 hover:bg-emerald-600" : "bg-primary hover:bg-primary/90"
              )}
              style={{ borderBottomColor: currentResult ? "oklch(0.35 0.18 145)" : "oklch(0.35 0.22 25)" }}
            >
              🏁 Finish & see results
            </button>
          ) : (
            <button
              onClick={goNext}
              className={cn(
                "btn-3d w-full py-4 rounded-2xl font-extrabold text-base text-white uppercase tracking-wide",
                currentResult ? "bg-emerald-500 hover:bg-emerald-600" : "bg-primary hover:bg-primary/90"
              )}
              style={{ borderBottomColor: currentResult ? "oklch(0.35 0.18 145)" : "oklch(0.35 0.22 25)" }}
            >
              Continue →
            </button>
          )}

          {/* AI explain button */}
          <button
            onClick={() => openAI("explain", {
              question: q.question,
              correctAnswer: q.correctAnswers.map((c) => q.options[c]).join(" / "),
              userAnswer: ans.selected.map((s) => q.options[s]).join(" / "),
              isCorrect: !!currentResult,
              explanation: q.explanation,
            })}
            className="mt-1 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border-2 border-secondary/25 bg-secondary/5 text-secondary text-xs font-extrabold hover:bg-secondary/10 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Ask AI to explain this
          </button>
        </div>
      ) : (
        /* Check button — disabled until option selected */
        <div className="flex gap-3">
          {isStudy && (
            <button
              onClick={() => openAI("hint", { question: q.question, options: q.options })}
              className="flex items-center gap-1.5 px-4 py-4 rounded-2xl border-2 border-border text-sm font-extrabold text-muted-foreground hover:text-secondary hover:border-secondary/30 hover:bg-secondary/5 transition-all shrink-0"
              title="Get a hint from AI"
            >
              <Lightbulb className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={submitAnswer}
            disabled={!canCheck}
            className={cn(
              "btn-3d flex-1 py-4 rounded-2xl font-extrabold text-base uppercase tracking-wide transition-all",
              canCheck
                ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25"
                : "bg-muted text-muted-foreground cursor-not-allowed border-b-0"
            )}
            style={canCheck ? { borderBottomColor: "oklch(0.35 0.22 25)" } : undefined}
          >
            Check
          </button>
          {isLast && (
            <button
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-4 py-4 rounded-2xl border-2 border-border text-sm font-extrabold hover:bg-muted transition-colors"
            >
              <Flag className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      {/* Bottom status */}
      <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold">
        <span>{answered}/{questions.length} answered</span>
        {isStudy && <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-extrabold">Study mode</span>}
        {!isStudy && !ans.submitted && ans.selected.length > 0 && (
          <span className="text-primary font-extrabold animate-pulse">Ready to check!</span>
        )}
      </div>
    </div>
  );
}
