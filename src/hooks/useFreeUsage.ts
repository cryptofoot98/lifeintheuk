"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export const FREE_LIMITS = {
  tests: 2,
  exams: 1,
  quizzes: 1,
  chapters: 1,
} as const;

export type FreeUsageData = {
  loading: boolean;
  isUnlimited: boolean;
  testsUsed: number;
  examsUsed: number;
  quizzesUsed: number;
  chaptersUsed: number;
  testsRemaining: number;
  examsRemaining: number;
  quizzesRemaining: number;
  chaptersRemaining: number;
};

const INIT: FreeUsageData = {
  loading: true,
  isUnlimited: false,
  testsUsed: 0,
  examsUsed: 0,
  quizzesUsed: 0,
  chaptersUsed: 0,
  testsRemaining: FREE_LIMITS.tests,
  examsRemaining: FREE_LIMITS.exams,
  quizzesRemaining: FREE_LIMITS.quizzes,
  chaptersRemaining: FREE_LIMITS.chapters,
};

export function useFreeUsage(): FreeUsageData {
  const [data, setData] = useState<FreeUsageData>(INIT);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setData({ ...INIT, loading: false });
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("has_lifetime_access, is_admin")
        .eq("id", user.id)
        .single();

      if (profile?.is_admin || profile?.has_lifetime_access) {
        setData({ ...INIT, loading: false, isUnlimited: true });
        return;
      }

      const [attemptsRes, chaptersRes] = await Promise.all([
        supabase
          .from("test_attempts")
          .select("test_number")
          .eq("user_id", user.id),
        supabase
          .from("material_progress")
          .select("chapter")
          .eq("user_id", user.id),
      ]);

      const attempts = attemptsRes.data ?? [];
      const testsUsed   = attempts.filter(a => a.test_number >= 1 && a.test_number <= 40).length;
      const examsUsed   = attempts.filter(a => a.test_number > 100).length;
      const quizzesUsed = attempts.filter(a => a.test_number === 0).length;
      const chaptersUsed = new Set((chaptersRes.data ?? []).map(c => c.chapter)).size;

      setData({
        loading: false,
        isUnlimited: false,
        testsUsed,
        examsUsed,
        quizzesUsed,
        chaptersUsed,
        testsRemaining:    Math.max(0, FREE_LIMITS.tests    - testsUsed),
        examsRemaining:    Math.max(0, FREE_LIMITS.exams    - examsUsed),
        quizzesRemaining:  Math.max(0, FREE_LIMITS.quizzes  - quizzesUsed),
        chaptersRemaining: Math.max(0, FREE_LIMITS.chapters - chaptersUsed),
      });
    }

    load();
  }, []);

  return data;
}
