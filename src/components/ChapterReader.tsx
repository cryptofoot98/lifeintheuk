"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Section } from "@/data/materials";
import { MaterialRenderer } from "@/components/MaterialRenderer";

type Props = {
  chapter: number;
  sections: Section[];
};

export function ChapterReader({ chapter, sections }: Props) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [locked, setLocked] = useState(false);
  const sectionRefs = useRef<Map<string, Element>>(new Map());

  useEffect(() => {
    loadExisting();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadExisting() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setIsLoggedIn(true);

    const { data: profile } = await supabase
      .from("profiles")
      .select("has_lifetime_access, is_admin")
      .eq("id", user.id)
      .single();

    // Free users: 1 chapter allowed. Check if a DIFFERENT chapter has already been read.
    if (!profile?.is_admin && !profile?.has_lifetime_access) {
      const { data: allProgress } = await supabase
        .from("material_progress")
        .select("chapter")
        .eq("user_id", user.id);

      const readChapters = new Set((allProgress ?? []).map(r => r.chapter));
      readChapters.delete(chapter); // current chapter doesn't count as "other"
      if (readChapters.size >= 1) {
        setLocked(true);
        return;
      }
    }

    const { data } = await supabase
      .from("material_progress")
      .select("section_id")
      .eq("user_id", user.id)
      .eq("chapter", chapter);

    if (data) {
      setCompletedIds(new Set(data.map((r) => r.section_id)));
    }
  }

  const markSection = useCallback(
    async (sectionId: string) => {
      setCompletedIds((prev) => {
        if (prev.has(sectionId)) return prev;
        const next = new Set(prev);
        next.add(sectionId);
        return next;
      });

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Upsert reading progress
      await supabase.from("material_progress").upsert(
        { user_id: user.id, chapter, section_id: sectionId },
        { onConflict: "user_id,chapter,section_id" }
      );

      // Award XP for reading (5 XP per section)
      const { data: profile } = await supabase
        .from("profiles")
        .select("xp, streak, last_activity_date")
        .eq("id", user.id)
        .single();

      if (profile) {
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        const updates: Record<string, unknown> = {
          xp: (profile.xp ?? 0) + 5,
          last_activity_date: today,
        };
        if (profile.last_activity_date === yesterday) {
          updates.streak = (profile.streak ?? 0) + 1;
        } else if (profile.last_activity_date !== today) {
          updates.streak = 1;
        }
        await supabase.from("profiles").update(updates).eq("id", user.id);
      }
    },
    [chapter]
  );

  useEffect(() => {
    if (!isLoggedIn) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            const id = (entry.target as HTMLElement).dataset.sectionId;
            if (id) markSection(id);
          }
        });
      },
      { threshold: 0.75 }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isLoggedIn, markSection]);

  const completedCount = completedIds.size;
  const totalCount = sections.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (locked) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-center px-4 py-12">
        <div className="text-5xl mb-4">🔒</div>
        <h2 className="font-heading text-xl font-black mb-2">Chapter locked</h2>
        <p className="text-sm text-muted-foreground font-semibold mb-6 max-w-xs">
          Your free plan includes 1 chapter. Unlock all 5 chapters with lifetime access.
        </p>
        <Link
          href="/unlock"
          className="btn-3d px-6 py-3 bg-primary text-white rounded-2xl font-extrabold text-sm shadow-lg shadow-primary/25"
        >
          Unlock — £8.90
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar — only for logged-in users */}
      {isLoggedIn && (
        <div className="mb-6 bg-card border-2 border-border rounded-2xl px-5 py-3.5 card-elevated">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold">Reading progress</span>
            <span className="text-xs font-extrabold text-primary">
              {completedCount}/{totalCount} sections
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          {completedCount === totalCount && totalCount > 0 && (
            <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Chapter complete! +{totalCount * 5} XP earned
            </p>
          )}
        </div>
      )}

      {/* Sections */}
      {sections.map((sec, idx) => {
        const isDone = completedIds.has(sec.id);
        return (
          <section
            key={sec.id}
            id={sec.id}
            data-section-id={sec.id}
            ref={(el) => {
              if (el) sectionRefs.current.set(sec.id, el);
              else sectionRefs.current.delete(sec.id);
            }}
            className="scroll-mt-24 mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`h-8 w-8 rounded-xl flex items-center justify-center text-sm font-black shrink-0 transition-all duration-300 ${
                  isDone
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                    : "bg-primary text-white shadow-md shadow-primary/30"
                }`}
              >
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : idx + 1}
              </div>
              <h2 className="font-heading text-xl font-black flex-1">{sec.title}</h2>
              {isDone && (
                <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 hidden sm:inline">
                  ✓ Read
                </span>
              )}
            </div>
            <MaterialRenderer blocks={sec.blocks} />
          </section>
        );
      })}
    </div>
  );
}
