"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DailyGoal() {
  const [status, setStatus] = useState<"loading" | "done" | "pending" | "guest">("loading");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function check() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        // Check localStorage for a test done today
        try {
          const raw = localStorage.getItem("liuk_attempts");
          if (raw) {
            const attempts = JSON.parse(raw);
            const today = new Date().toDateString();
            const doneToday = attempts.some(
              (a: { completedAt: string }) => new Date(a.completedAt).toDateString() === today
            );
            setStatus(doneToday ? "done" : "pending");
          } else {
            setStatus("pending");
          }
        } catch {
          setStatus("pending");
        }
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("streak, last_activity_date")
        .eq("id", user.id)
        .single();

      const today = new Date().toISOString().split("T")[0];
      const doneToday = profile?.last_activity_date === today;
      setStreak(profile?.streak ?? 0);
      setStatus(doneToday ? "done" : "pending");
    }
    check();
  }, []);

  if (status === "loading") return null;

  if (status === "done") {
    return (
      <div className="mb-5 rounded-2xl border-[3px] border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-5 py-3.5 flex items-center gap-3">
        <span className="text-2xl">✅</span>
        <div className="flex-1">
          <div className="font-extrabold text-sm text-emerald-700 dark:text-emerald-300">
            Daily goal complete!{streak > 0 ? ` 🔥 ${streak}-day streak` : ""}
          </div>
          <div className="text-xs font-semibold text-emerald-600/70 dark:text-emerald-400/70">
            Come back tomorrow to extend your streak.
          </div>
        </div>
        <Link
          href="/progress"
          className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300 flex items-center gap-1 hover:underline"
        >
          View <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-5 rounded-2xl border-[3px] border-primary/30 bg-primary/5 px-5 py-3.5 flex items-center gap-3">
      <span className="text-2xl">🎯</span>
      <div className="flex-1">
        <div className="font-extrabold text-sm">Today&apos;s goal</div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-0 rounded-full bg-primary" />
          </div>
          <span className="text-xs font-extrabold text-muted-foreground">0/1 tests</span>
        </div>
        <div className="text-xs font-semibold text-muted-foreground mt-0.5">
          {streak > 0 ? `🔥 Keep your ${streak}-day streak alive!` : "Complete 1 test to start your streak!"}
        </div>
      </div>
      <Link
        href="/tests/1"
        className="btn-3d text-xs font-extrabold bg-primary text-white px-3 py-2 rounded-xl"
        style={{ borderBottomColor: "oklch(0.35 0.22 25)" }}
      >
        Start
      </Link>
    </div>
  );
}
