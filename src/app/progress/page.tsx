"use client";

import { AppNav } from "@/components/AppNav";
import { useProgress } from "@/hooks/useProgress";
import { CHAPTERS as MATERIAL_CHAPTERS } from "@/data/materials";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { useAI } from "@/lib/ai-context";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s < 10 ? "0" : ""}${s}s`;
}

export default function ProgressPage() {
  const { loading, isLoggedIn, attempts, materialProgress, streak, xp } = useProgress();
  const { openAI } = useAI();

  const avg = attempts.length
    ? Math.round(attempts.reduce((sum, a) => sum + a.percent, 0) / attempts.length)
    : 0;
  const best = attempts.length ? Math.max(...attempts.map((a) => a.percent)) : 0;
  const passed = attempts.filter((a) => a.passed).length;
  const totalXP = isLoggedIn ? xp : attempts.length * 120;
  const displayStreak = isLoggedIn ? streak : Math.min(attempts.length, 7);

  // Per-chapter section counts
  const sectionTotals: Record<number, number> = {};
  MATERIAL_CHAPTERS.forEach((ch) => { sectionTotals[ch.chapter] = ch.sections.length; });

  const materialByChapter: Record<number, number> = {};
  materialProgress.forEach((m) => {
    materialByChapter[m.chapter] = (materialByChapter[m.chapter] ?? 0) + 1;
  });

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen pb-20 md:pb-0">
        <AppNav />
        <div className="flex-1 flex items-center justify-center py-24">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-6">

        {/* Page header */}
        <div className="mb-5">
          <h1 className="font-heading text-2xl font-black">Your Progress 📊</h1>
          <p className="text-sm text-muted-foreground font-semibold mt-1">
            {isLoggedIn ? "Synced across all your devices." : "Sign in to sync across devices."}
          </p>
        </div>

        {/* Sign-in nudge — only when not logged in */}
        {!isLoggedIn && (
          <div className="mb-5 rounded-2xl border-2 border-primary/20 bg-primary/5 p-4 flex items-start gap-3 text-sm card-elevated">
            <span className="text-lg shrink-0">🔒</span>
            <div>
              <span className="font-extrabold">Create a free account to save your progress. </span>
              <span className="text-muted-foreground font-semibold">Currently showing browser-only history. </span>
              <Link href="/auth/signup" className="text-primary font-extrabold underline underline-offset-2">
                Sign up free →
              </Link>
            </div>
          </div>
        )}

        {attempts.length === 0 && materialProgress.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📈</div>
            <p className="font-extrabold text-lg mb-1">No activity yet</p>
            <p className="text-sm text-muted-foreground font-semibold mb-6">
              Complete a test or read a study chapter to see your progress here.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/tests"
                className="btn-3d inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl text-sm font-extrabold hover:bg-primary/90 transition-colors shadow-md shadow-primary/25"
              >
                Start a test
              </Link>
              <Link
                href="/materials"
                className="inline-flex items-center gap-2 border-2 border-border px-6 py-3 rounded-2xl text-sm font-extrabold hover:bg-muted/50 transition-colors"
              >
                <BookOpen className="h-4 w-4" /> Study materials
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Streak / summary card */}
            <div className="rounded-2xl bg-primary p-5 mb-5 card-elevated" style={{
              background: "linear-gradient(135deg, oklch(0.47 0.22 25) 0%, oklch(0.40 0.22 15) 100%)"
            }}>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">🔥</span>
                  <div>
                    <div className="font-heading text-3xl font-black text-white leading-none">{displayStreak}</div>
                    <div className="text-sm text-white/75 font-semibold">day streak</div>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-heading text-2xl font-black text-white">{avg}%</div>
                    <div className="text-sm text-white/75 font-semibold">avg score</div>
                  </div>
                  <div className="text-right">
                    <div className="font-heading text-2xl font-black text-white">{passed}/{attempts.length}</div>
                    <div className="text-sm text-white/75 font-semibold">passed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Coach card */}
            <div className="rounded-2xl border-2 border-secondary/20 bg-secondary/5 p-4 mb-5 flex items-center gap-3 card-elevated">
              <div className="h-10 w-10 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                <GraduationCap className="h-5 w-5 text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-extrabold text-sm">AI Study Coach</p>
                <p className="text-xs text-muted-foreground font-semibold">Personalised study plan based on your results</p>
              </div>
              <button
                onClick={() => {
                  const chapterSummary = MATERIAL_CHAPTERS.map((ch) => {
                    const done = materialByChapter[ch.chapter] ?? 0;
                    const total = sectionTotals[ch.chapter];
                    return `${ch.title}: ${done}/${total} sections read`;
                  }).join(", ");
                  openAI("coach", { avgScore: avg, testCount: attempts.length, passedCount: passed, chapterSummary });
                }}
                className="btn-3d px-4 py-2 rounded-xl bg-secondary text-white text-xs font-extrabold hover:bg-secondary/90 transition-colors shadow-md shadow-secondary/20 shrink-0"
              >
                Get plan
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {[
                { emoji: "📝", label: "Tests taken",   value: attempts.length },
                { emoji: "📊", label: "Avg score",     value: `${avg}%` },
                { emoji: "🏆", label: "Best score",    value: `${best}%` },
                { emoji: "⭐", label: "XP earned",     value: totalXP.toLocaleString() },
              ].map(({ emoji, label, value }) => (
                <div key={label} className="rounded-2xl border-2 border-border bg-card p-4 text-center card-elevated">
                  <div className="text-xl mb-1">{emoji}</div>
                  <div className="font-heading text-2xl font-black text-primary">{value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 font-bold">{label}</div>
                </div>
              ))}
            </div>

            {/* ── Materials progress ─────────────────────────────────────────── */}
            <div className="rounded-2xl border-2 border-border bg-card p-5 mb-5 card-elevated">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-extrabold text-sm flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Study materials progress
                </h2>
                <Link
                  href="/materials"
                  className="text-xs font-extrabold text-primary flex items-center gap-1 hover:underline underline-offset-2"
                >
                  Open <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                {MATERIAL_CHAPTERS.map((ch) => {
                  const done = materialByChapter[ch.chapter] ?? 0;
                  const total = sectionTotals[ch.chapter];
                  const pct = Math.round((done / total) * 100);
                  return (
                    <Link
                      key={ch.chapter}
                      href={`/materials/${ch.chapter}`}
                      className="group flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                      <span className="text-xl shrink-0">{ch.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-extrabold truncate">{ch.title}</span>
                          <span className="text-xs font-extrabold text-primary ml-2 shrink-0">
                            {done}/{total}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${pct}%`,
                              background: pct === 100
                                ? "oklch(0.52 0.16 145)"   /* emerald when complete */
                                : "oklch(0.47 0.22 25)"    /* red otherwise */
                            }}
                          />
                        </div>
                      </div>
                      {pct === 100 && <span className="text-lg shrink-0">✅</span>}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Score chart */}
            {attempts.length > 0 && (
              <div className="rounded-2xl border-2 border-border bg-card p-5 mb-5 card-elevated">
                <h2 className="font-extrabold text-sm mb-4">
                  Score history (last {Math.min(20, attempts.length)} tests)
                </h2>
                <div className="flex items-end gap-2 h-28 mb-2">
                  {attempts.slice(-20).map((a, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t-lg transition-all"
                        style={{
                          height: `${Math.max(6, (a.percent / 100) * 100)}px`,
                          background: a.passed
                            ? "linear-gradient(180deg, oklch(0.47 0.22 25) 0%, oklch(0.38 0.20 25) 100%)"
                            : "oklch(0.64 0.20 25)",
                        }}
                      />
                      <span className="text-[9px] font-bold text-muted-foreground">{a.percent}%</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-4 bg-primary rounded" />
                    Passed (≥75%)
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-4 rounded" style={{ background: "oklch(0.64 0.20 25)" }} />
                    Below pass
                  </div>
                </div>
              </div>
            )}

            {/* Attempt list */}
            {attempts.length > 0 && (
              <>
                <h2 className="font-extrabold text-sm mb-3">All test attempts</h2>
                <div className="flex flex-col gap-2">
                  {[...attempts].reverse().map((a, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-2xl border-2 border-border bg-card px-4 py-3 text-sm card-elevated"
                    >
                      <span className="text-base">{a.passed ? "✅" : "❌"}</span>
                      <span className="font-extrabold w-24 shrink-0">
                        {a.testNumber === 0 ? "Quick Quiz" : `Test ${a.testNumber}`}
                      </span>
                      <span className={`font-extrabold ${a.passed ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
                        {a.percent}%
                      </span>
                      <span className="text-muted-foreground font-semibold">{a.score}/{a.total}</span>
                      <span className="text-muted-foreground font-semibold ml-auto">{formatTime(a.timeTaken)}</span>
                      <span className="text-muted-foreground text-xs font-semibold hidden sm:inline">
                        {new Date(a.completedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
