"use client";

import Link from "next/link";
import Image from "next/image";
import { FreeBadge } from "@/components/FreeBadge";
import { FullPracticeCard } from "@/components/FullPracticeCard";
import { useFreeUsage } from "@/hooks/useFreeUsage";

const CDN = "https://images.cryptofoot98.me/britzen";

export function TestModeGrid() {
  const usage = useFreeUsage();

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {/* ── Quick Quiz ──────────────────────────────────────────────────── */}
      <div className="relative">
        <FreeBadge
          remaining={usage.quizzesRemaining}
          loading={usage.loading}
          isUnlimited={usage.isUnlimited}
          label="quiz"
        />
        <Link
          href="/tests/quick"
          className="rounded-2xl border-[3px] border-border bg-card p-5 hover:shadow-lg hover:border-primary/50 transition-all group card-elevated flex flex-col h-full"
        >
          <Image src={`${CDN}/icon_bus.png`} alt="" width={40} height={40} className="w-10 h-10 mb-3" />
          <h3 className="font-extrabold mb-1 text-sm group-hover:text-primary transition-colors">Quick Quiz</h3>
          <p className="text-xs text-muted-foreground font-semibold">10 random questions · no timer</p>
        </Link>
      </div>

      {/* ── Study Mode ──────────────────────────────────────────────────── */}
      <div className="relative">
        <FreeBadge
          remaining={usage.chaptersRemaining}
          loading={usage.loading}
          isUnlimited={usage.isUnlimited}
          label="chapter"
        />
        <Link
          href="/study"
          className="rounded-2xl border-[3px] border-border bg-card p-5 hover:shadow-lg hover:border-primary/50 transition-all group card-elevated flex flex-col h-full"
        >
          <Image src={`${CDN}/icon_hat_tea.png`} alt="" width={40} height={40} className="w-10 h-10 mb-3" />
          <h3 className="font-extrabold mb-1 text-sm group-hover:text-primary transition-colors">Study Mode</h3>
          <p className="text-xs text-muted-foreground font-semibold">Learn with explanations · no timer</p>
        </Link>
      </div>

      {/* ── Full Practice Test (smart-continue, already a client component) ── */}
      <div className="relative">
        <FreeBadge
          remaining={usage.testsRemaining}
          loading={usage.loading}
          isUnlimited={usage.isUnlimited}
          label="test"
        />
        <FullPracticeCard />
      </div>

      {/* ── Real Exams ──────────────────────────────────────────────────── */}
      <div className="relative">
        <FreeBadge
          remaining={usage.examsRemaining}
          loading={usage.loading}
          isUnlimited={usage.isUnlimited}
          label="exam"
        />
        <Link
          href="/exams"
          className="rounded-2xl border-[3px] border-secondary/30 bg-secondary/5 hover:bg-secondary/8 p-5 hover:shadow-lg hover:border-secondary/50 transition-all group card-elevated flex flex-col h-full"
        >
          <span className="text-4xl block mb-3">🎓</span>
          <h3 className="font-extrabold mb-1 text-sm text-secondary">Real Exams</h3>
          <p className="text-xs text-muted-foreground font-semibold">Reported by real test-takers</p>
        </Link>
      </div>
    </div>
  );
}
