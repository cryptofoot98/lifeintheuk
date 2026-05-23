"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export type AttemptRecord = {
  id?: string;
  testNumber: number;
  chapterFilter?: number | null;
  score: number;
  total: number;
  percent: number;
  passed: boolean;
  timeTaken: number;
  completedAt: string;
};

export type MaterialProgress = {
  chapter: number;
  sectionId: string;
  completedAt: string;
};

export type ProgressData = {
  loading: boolean;
  isLoggedIn: boolean;
  attempts: AttemptRecord[];
  materialProgress: MaterialProgress[];
  streak: number;
  xp: number;
  refresh: () => void;
};

export function useProgress(): ProgressData {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [materialProgress, setMaterialProgress] = useState<MaterialProgress[]>([]);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [tick, setTick] = useState(0);

  const refresh = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  async function load() {
    setLoading(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      try {
        const raw = localStorage.getItem("liuk_attempts");
        if (raw) setAttempts(JSON.parse(raw));
      } catch { /* ignore */ }
      setIsLoggedIn(false);
      setLoading(false);
      return;
    }

    setIsLoggedIn(true);

    const [attemptsRes, materialRes, profileRes] = await Promise.all([
      supabase
        .from("test_attempts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true }),
      supabase
        .from("material_progress")
        .select("chapter, section_id, completed_at")
        .eq("user_id", user.id),
      supabase
        .from("profiles")
        .select("streak, xp")
        .eq("id", user.id)
        .single(),
    ]);

    if (attemptsRes.data) {
      setAttempts(
        attemptsRes.data.map((a) => ({
          id: a.id,
          testNumber: a.test_number,
          chapterFilter: a.chapter_filter,
          score: a.score,
          total: a.total_questions,
          percent: Math.round((a.score / a.total_questions) * 100),
          passed: a.passed,
          timeTaken: a.time_taken_seconds,
          completedAt: a.created_at,
        }))
      );
    }

    if (materialRes.data) {
      setMaterialProgress(
        materialRes.data.map((m) => ({
          chapter: m.chapter,
          sectionId: m.section_id,
          completedAt: m.completed_at,
        }))
      );
    }

    if (profileRes.data) {
      setStreak(profileRes.data.streak ?? 0);
      setXp(profileRes.data.xp ?? 0);
    }

    setLoading(false);
  }

  return { loading, isLoggedIn, attempts, materialProgress, streak, xp, refresh };
}
