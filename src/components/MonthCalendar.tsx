"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AttemptRecord } from "@/hooks/useProgress";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_LABELS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

type DayStatus = "passed" | "failed" | "mixed" | "missed" | "today-empty" | "future" | "inactive";

type DayCell = {
  date: Date;
  inMonth: boolean;
  isToday: boolean;
  isPast: boolean;
  attempts: AttemptRecord[];
  status: DayStatus;
};

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}m ${sec < 10 ? "0" : ""}${sec}s`;
}

function testLabel(a: AttemptRecord) {
  if (a.testNumber === 0) return "Quick Quiz";
  if (a.testNumber > 100) return `Real Exam #${a.testNumber - 100}`;
  return `Test ${a.testNumber}`;
}

export function MonthCalendar({ attempts }: { attempts: AttemptRecord[] }) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState<DayCell | null>(null);

  // Group attempts by YYYY-MM-DD key
  const byDay = useMemo(() => {
    const map: Record<string, AttemptRecord[]> = {};
    for (const a of attempts) {
      const key = a.completedAt.slice(0, 10);
      if (!map[key]) map[key] = [];
      map[key].push(a);
    }
    return map;
  }, [attempts]);

  // Earliest attempt date — days before this are "inactive", not "missed"
  const firstStudyDate = useMemo(() => {
    if (!attempts.length) return null;
    return new Date(
      Math.min(...attempts.map((a) => new Date(a.completedAt).getTime()))
    );
  }, [attempts]);

  function resolveStatus(date: Date, dayAttempts: AttemptRecord[], isPast: boolean, isToday: boolean): DayStatus {
    if (dayAttempts.length > 0) {
      const p = dayAttempts.filter((a) => a.passed).length;
      const f = dayAttempts.filter((a) => !a.passed).length;
      if (p > 0 && f === 0) return "passed";
      if (f > 0 && p === 0) return "failed";
      return "mixed";
    }
    if (isToday) return "today-empty";
    if (!isPast) return "future";
    // Past with no attempts — only "missed" after user's first study date
    if (firstStudyDate && date >= firstStudyDate) return "missed";
    return "inactive";
  }

  // Build 6-row × 7-col grid
  const cells = useMemo<DayCell[]>(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const startOffset = (first.getDay() + 6) % 7; // 0=Mon
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const result: DayCell[] = [];

    // Leading filler from previous month
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = new Date(viewYear, viewMonth, -i);
      result.push({ date: d, inMonth: false, isToday: false, isPast: true, attempts: [], status: "inactive" });
    }

    // Current month days
    for (let n = 1; n <= daysInMonth; n++) {
      const d = new Date(viewYear, viewMonth, n);
      const key = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(n).padStart(2, "0")}`;
      const dayAttempts = byDay[key] ?? [];
      const isPast = d < today;
      const isToday = d.getTime() === today.getTime();
      result.push({
        date: d,
        inMonth: true,
        isToday,
        isPast,
        attempts: dayAttempts,
        status: resolveStatus(d, dayAttempts, isPast, isToday),
      });
    }

    // Trailing filler
    const trailing = 42 - result.length;
    for (let i = 1; i <= trailing; i++) {
      const d = new Date(viewYear, viewMonth + 1, i);
      result.push({ date: d, inMonth: false, isToday: false, isPast: false, attempts: [], status: "inactive" });
    }

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewYear, viewMonth, byDay, today, firstStudyDate]);

  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  function prev() {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
    setSelected(null);
  }
  function next() {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
    setSelected(null);
  }
  function goToday() {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setSelected(null);
  }

  // Stats for this month
  const monthKey = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`;
  const monthAttempts = attempts.filter((a) => a.completedAt.startsWith(monthKey));
  const monthPassed = monthAttempts.filter((a) => a.passed).length;
  const activeDaysThisMonth = new Set(monthAttempts.map((a) => a.completedAt.slice(0, 10))).size;

  return (
    <>
      {/* Month header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-extrabold text-base">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h3>
          {!isCurrentMonth && (
            <button
              onClick={goToday}
              className="text-[11px] font-extrabold text-primary px-2 py-0.5 rounded-lg bg-primary/10 hover:bg-primary/15 transition-colors"
            >
              Today
            </button>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            className="h-7 w-7 flex items-center justify-center rounded-lg border-2 border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={next}
            className="h-7 w-7 flex items-center justify-center rounded-lg border-2 border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Month stats */}
      <div className="flex gap-4 mb-3 text-xs font-semibold text-muted-foreground">
        <span><span className="font-extrabold text-foreground">{monthAttempts.length}</span> tests</span>
        <span><span className="font-extrabold text-emerald-500">{monthPassed}</span> passed</span>
        <span><span className="font-extrabold text-foreground">{activeDaysThisMonth}</span> active days</span>
      </div>

      {/* Day-of-week labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((l) => (
          <div key={l} className="text-center text-[10px] font-extrabold text-muted-foreground py-1">
            {l}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => (
          <button
            key={i}
            disabled={!cell.inMonth}
            onClick={() => cell.inMonth && setSelected(cell)}
            className={cn(
              "relative flex items-center justify-center rounded-xl text-xs font-bold transition-all select-none",
              "h-9 w-full",
              !cell.inMonth && "opacity-0 pointer-events-none",
              cell.inMonth && "cursor-pointer hover:scale-105 active:scale-95",
              cell.status === "passed"      && "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500/50",
              cell.status === "failed"      && "bg-red-400/15 text-red-500 border-2 border-red-400/50",
              cell.status === "mixed"       && "bg-amber-400/15 text-amber-600 dark:text-amber-400 border-2 border-amber-400/50",
              cell.status === "missed"      && "bg-muted/30 text-muted-foreground/40 border-2 border-border/20",
              cell.status === "today-empty" && "border-2 border-primary text-primary font-extrabold",
              cell.status === "future"      && "text-muted-foreground border-2 border-transparent hover:border-border/50",
              cell.status === "inactive"    && "text-muted-foreground/30 border-2 border-transparent",
              // Ring on today even if it has activity
              cell.isToday && cell.status !== "today-empty" && "ring-2 ring-primary ring-offset-1",
            )}
          >
            {cell.date.getDate()}
            {/* Activity dot */}
            {cell.attempts.length > 0 && (
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-current opacity-60" />
            )}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3 text-[11px] font-semibold text-muted-foreground">
        {([
          { cls: "bg-emerald-500/15 border-emerald-500/50", label: "Passed" },
          { cls: "bg-red-400/15 border-red-400/50",         label: "Failed" },
          { cls: "bg-amber-400/15 border-amber-400/50",     label: "Mixed" },
          { cls: "bg-muted/30 border-border/20",            label: "Missed" },
        ] as const).map(({ cls, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-sm border inline-block ${cls}`} />
            {label}
          </span>
        ))}
      </div>

      {/* ── Day detail overlay ────────────────────────────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative w-full sm:max-w-sm bg-card border-2 border-border rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle (mobile) */}
            <div className="sm:hidden flex justify-center pt-2 pb-0">
              <div className="h-1 w-8 rounded-full bg-border" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between px-5 py-4 border-b-2 border-border">
              <div>
                <p className="font-extrabold">
                  {selected.date.toLocaleDateString("en-GB", {
                    weekday: "long", day: "numeric", month: "long",
                  })}
                </p>
                <p className="text-xs text-muted-foreground font-semibold mt-0.5">
                  {selected.attempts.length === 0
                    ? selected.isToday   ? "No tests yet today"
                    : selected.isPast   ? "No activity"
                    :                     "Upcoming"
                    : `${selected.attempts.length} test${selected.attempts.length > 1 ? "s" : ""} taken`}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="h-7 w-7 flex items-center justify-center rounded-lg border-2 border-border text-muted-foreground hover:bg-muted/50 transition-colors shrink-0 ml-3 mt-0.5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {selected.attempts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <span className="text-3xl mb-2">
                    {selected.isToday ? "📝" : selected.isPast ? "😴" : "📅"}
                  </span>
                  <p className="text-sm font-semibold text-muted-foreground">
                    {selected.isToday
                      ? "Start a test to log today's activity"
                      : selected.isPast
                      ? "Rest day — no tests recorded"
                      : "Future date"}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {selected.attempts.map((a, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl border-2 border-border bg-muted/30 px-3 py-2.5"
                    >
                      <span className="text-lg shrink-0">{a.passed ? "✅" : "❌"}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-extrabold leading-none mb-0.5">{testLabel(a)}</p>
                        <p className="text-xs text-muted-foreground font-semibold">
                          {a.score}/{a.total} correct · {formatTime(a.timeTaken)}
                        </p>
                      </div>
                      <span className={cn(
                        "font-extrabold text-sm shrink-0",
                        a.passed ? "text-emerald-500" : "text-red-500"
                      )}>
                        {a.percent}%
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
