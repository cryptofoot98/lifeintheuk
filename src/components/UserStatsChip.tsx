"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getLevelForXP, getProgressToNextLevel } from "@/lib/levels";
import Link from "next/link";

export function UserStatsChip() {
  const [stats, setStats] = useState<{ streak: number; xp: number } | null>(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("streak, xp")
        .eq("id", user.id)
        .single();
      if (data) setStats({ streak: data.streak ?? 0, xp: data.xp ?? 0 });
    }
    load();
  }, []);

  if (!stats) return null;

  const level = getLevelForXP(stats.xp);
  const { pct } = getProgressToNextLevel(stats.xp);

  return (
    <Link
      href="/progress"
      className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity"
    >
      {stats.streak > 0 && (
        <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2.5 py-1.5 rounded-full text-xs font-extrabold">
          🔥 {stats.streak}
        </div>
      )}
      <div className="flex items-center gap-1.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2.5 py-1.5 rounded-full text-xs font-extrabold">
        <span>{level.emoji}</span>
        <span>Lv.{level.level}</span>
        {/* Mini progress bar */}
        <div className="w-10 h-1.5 rounded-full bg-yellow-200 dark:bg-yellow-900/60 overflow-hidden">
          <div
            className="h-full rounded-full bg-yellow-500 dark:bg-yellow-400"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </Link>
  );
}
