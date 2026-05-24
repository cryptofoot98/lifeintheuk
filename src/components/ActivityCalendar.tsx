"use client";

import { useMemo } from "react";
import { AttemptRecord } from "@/hooks/useProgress";

const WEEKS = 12;
const DAYS = WEEKS * 7;

function dayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

type DayData = { date: Date; count: number; passed: number; failed: number };

function buildGrid(attempts: AttemptRecord[]): DayData[] {
  const byDay: Record<string, { count: number; passed: number; failed: number }> = {};
  for (const a of attempts) {
    const key = a.completedAt.slice(0, 10);
    if (!byDay[key]) byDay[key] = { count: 0, passed: 0, failed: 0 };
    byDay[key].count++;
    if (a.passed) byDay[key].passed++;
    else byDay[key].failed++;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Start on a Monday
  const offset = (today.getDay() + 6) % 7; // days since last Monday
  const start = new Date(today);
  start.setDate(today.getDate() - offset - (WEEKS - 1) * 7);

  return Array.from({ length: DAYS }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = dayKey(d);
    return { date: d, ...(byDay[key] ?? { count: 0, passed: 0, failed: 0 }) };
  });
}

function cellColor(day: DayData): string {
  if (day.count === 0) return "bg-muted/60 border-border/30";
  if (day.passed > 0 && day.failed === 0) return "bg-emerald-500/90 border-emerald-500";
  if (day.failed > 0 && day.passed === 0) return "bg-red-400/90 border-red-400";
  // mixed day
  return "bg-amber-400/90 border-amber-400";
}

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS = ["Mon","","Wed","","Fri","","Sun"];

export function ActivityCalendar({ attempts }: { attempts: AttemptRecord[] }) {
  const grid = useMemo(() => buildGrid(attempts), [attempts]);

  // Month labels — placed at the column where month changes
  const monthLabels: { col: number; label: string }[] = [];
  for (let w = 0; w < WEEKS; w++) {
    const day = grid[w * 7];
    if (w === 0 || day.date.getDate() <= 7) {
      monthLabels.push({ col: w, label: MONTH_NAMES[day.date.getMonth()] });
    }
  }

  const total = attempts.length;
  const passed = attempts.filter((a) => a.passed).length;
  const activeDays = grid.filter((d) => d.count > 0).length;

  return (
    <div>
      {/* Summary line */}
      <div className="flex flex-wrap gap-4 mb-3 text-xs font-semibold text-muted-foreground">
        <span><span className="font-extrabold text-foreground">{total}</span> tests in 12 weeks</span>
        <span><span className="font-extrabold text-emerald-500">{passed}</span> passed</span>
        <span><span className="font-extrabold text-foreground">{activeDays}</span> active days</span>
      </div>

      {/* Grid wrapper */}
      <div className="overflow-x-auto">
        <div style={{ display: "grid", gridTemplateColumns: `24px repeat(${WEEKS}, 1fr)`, gap: 3 }}>
          {/* Day labels column */}
          <div style={{ display: "grid", gridTemplateRows: `16px repeat(7, 1fr)`, gap: 3 }}>
            <div /> {/* month label row spacer */}
            {DAY_LABELS.map((l, i) => (
              <div key={i} className="flex items-center justify-end pr-1 text-[9px] font-bold text-muted-foreground" style={{ minHeight: 12 }}>
                {l}
              </div>
            ))}
          </div>

          {/* Week columns */}
          {Array.from({ length: WEEKS }, (_, w) => (
            <div key={w} style={{ display: "grid", gridTemplateRows: `16px repeat(7, 1fr)`, gap: 3 }}>
              {/* Month label */}
              <div className="text-[9px] font-bold text-muted-foreground flex items-end">
                {monthLabels.find((m) => m.col === w)?.label ?? ""}
              </div>
              {/* 7 day cells */}
              {Array.from({ length: 7 }, (_, d) => {
                const day = grid[w * 7 + d];
                return (
                  <div
                    key={d}
                    title={day.count > 0 ? `${dayKey(day.date)}: ${day.count} test${day.count > 1 ? "s" : ""} (${day.passed} passed, ${day.failed} failed)` : dayKey(day.date)}
                    className={`rounded-[3px] border ${cellColor(day)} transition-opacity hover:opacity-80`}
                    style={{ minHeight: 12, aspectRatio: "1" }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-3 text-xs font-semibold text-muted-foreground">
        {[
          { cls: "bg-muted/60 border-border/30", label: "None" },
          { cls: "bg-emerald-500/90 border-emerald-500", label: "All passed" },
          { cls: "bg-amber-400/90 border-amber-400", label: "Mixed" },
          { cls: "bg-red-400/90 border-red-400", label: "Failed" },
        ].map(({ cls, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-sm border inline-block ${cls}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
