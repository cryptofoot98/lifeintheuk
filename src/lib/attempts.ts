import { createClient } from "@/lib/supabase/client";
import type { QuizResult } from "@/components/quiz/QuizEngine";
import type { TestMode } from "@/types";

// Must match what ResultsScreen shows the user.
export function xpForResult(r: QuizResult) {
  const passed = r.score / r.questions.length >= 0.75;
  return r.score * 10 + (passed ? 50 : 0);
}

// test_number: 0 = quick quiz, 1–100 = practice tests, >100 = mock exams
export async function saveAttempt(testNumber: number, mode: TestMode, r: QuizResult) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("has_lifetime_access, free_tests_used, xp, streak, last_activity_date")
      .eq("id", user.id)
      .single();

    if (profile) {
      const { data: attempt } = await supabase.from("test_attempts").insert({
        user_id: user.id,
        test_number: testNumber,
        mode,
        score: r.score,
        total_questions: r.questions.length,
        time_taken_seconds: r.timeTaken,
        completed_at: new Date().toISOString(),
      }).select("id").single();
      await recordResponses(r, attempt?.id ?? null);

      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      const profileUpdates: Record<string, unknown> = {
        xp: (profile.xp ?? 0) + xpForResult(r),
        last_activity_date: today,
      };
      if (profile.last_activity_date === yesterday) {
        profileUpdates.streak = (profile.streak ?? 0) + 1;
      } else if (profile.last_activity_date !== today) {
        profileUpdates.streak = 1;
      }
      if (!profile.has_lifetime_access) {
        profileUpdates.free_tests_used = profile.free_tests_used + 1;
      }
      await supabase.from("profiles").update(profileUpdates).eq("id", user.id);
    }
  } else {
    await recordResponses(r, null);
  }

  // Also mirror to localStorage as an offline fallback
  try {
    const attempts = JSON.parse(localStorage.getItem("liuk_attempts") || "[]");
    attempts.push({
      testNumber,
      score: r.score,
      total: r.questions.length,
      percent: Math.round((r.score / r.questions.length) * 100),
      passed: r.score / r.questions.length >= 0.75,
      timeTaken: r.timeTaken,
      completedAt: new Date().toISOString(),
    });
    localStorage.setItem("liuk_attempts", JSON.stringify(attempts));
  } catch { /* ignore */ }
}

// ─── Per-question history (drives Weak Areas) ────────────────────────────────

const LOCAL_RESPONSES = "liuk_responses";
type LocalResponse = { id: number; ok: boolean; at: number };

// Store one row per answered question. Signed-in users go to question_responses;
// signed-out users keep the history in localStorage. attemptId is null for drills.
export async function recordResponses(r: QuizResult, attemptId: string | null) {
  const rows = r.questions.flatMap((q, i) => {
    const a = r.answers[i];
    if (!a?.submitted) return [];
    const ok = a.selected.length === q.correctAnswers.length && a.selected.every((s) => q.correctAnswers.includes(s));
    return [{ question_id: q.id, is_correct: ok }];
  });
  if (!rows.length) return;

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    await supabase.from("question_responses").insert(
      rows.map((row) => ({ ...row, user_id: user.id, attempt_id: attemptId }))
    );
    return;
  }
  try {
    const now = Date.now();
    const history: LocalResponse[] = JSON.parse(localStorage.getItem(LOCAL_RESPONSES) || "[]");
    history.push(...rows.map((row) => ({ id: row.question_id, ok: row.is_correct, at: now })));
    localStorage.setItem(LOCAL_RESPONSES, JSON.stringify(history.slice(-3000)));
  } catch { /* ignore */ }
}

// A question is weak if the most recent answer to it was wrong.
// Most-missed first, then most recently missed.
export async function getWeakQuestionIds(limit = 20): Promise<number[]> {
  let history: LocalResponse[] = [];
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data } = await supabase
      .from("question_responses")
      .select("question_id, is_correct, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5000);
    history = (data ?? []).reverse().map((d) => ({ id: d.question_id, ok: d.is_correct, at: Date.parse(d.created_at) }));
  } else {
    try { history = JSON.parse(localStorage.getItem(LOCAL_RESPONSES) || "[]"); } catch { /* ignore */ }
  }

  const stats = new Map<number, { misses: number; lastOk: boolean; lastAt: number }>();
  for (const h of history) {
    const s = stats.get(h.id) ?? { misses: 0, lastOk: true, lastAt: 0 };
    if (!h.ok) s.misses++;
    s.lastOk = h.ok;
    s.lastAt = h.at;
    stats.set(h.id, s);
  }
  return [...stats.entries()]
    .filter(([, s]) => !s.lastOk)
    .sort(([, a], [, b]) => b.misses - a.misses || b.lastAt - a.lastAt)
    .slice(0, limit)
    .map(([id]) => id);
}
