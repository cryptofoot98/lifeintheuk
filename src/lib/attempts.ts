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
      await supabase.from("test_attempts").insert({
        user_id: user.id,
        test_number: testNumber,
        mode,
        score: r.score,
        total_questions: r.questions.length,
        time_taken_seconds: r.timeTaken,
        completed_at: new Date().toISOString(),
      });

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
