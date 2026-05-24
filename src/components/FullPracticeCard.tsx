"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const CDN = "https://images.cryptofoot98.me/britzen";

export function FullPracticeCard() {
  const [nextTest, setNextTest] = useState(1);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("liuk_attempts");
      if (raw) {
        const attempts: { testNumber: number }[] = JSON.parse(raw);
        const completedSet = new Set(
          attempts.map((a) => a.testNumber).filter((n) => n >= 1 && n <= 100)
        );
        // Find the first uncompleted test 1-100
        for (let i = 1; i <= 100; i++) {
          if (!completedSet.has(i)) { setNextTest(i); break; }
        }
      }
    } catch { /* ignore */ }
  }, []);

  return (
    <Link
      href={`/tests/${nextTest}`}
      className="rounded-2xl border-[3px] border-primary bg-primary/5 hover:bg-primary/8 p-5 hover:shadow-lg transition-all group card-elevated flex flex-col h-full"
    >
      <Image src={`${CDN}/icon_royalguard.png`} alt="" width={40} height={40} className="w-10 h-10 mb-3" />
      <h3 className="font-extrabold mb-1 text-sm text-primary">Full Practice Test</h3>
      <p className="text-xs text-muted-foreground font-semibold">
        24 questions · 45 min ·{" "}
        {nextTest === 1 ? "start from test #1" : `next up: test #${nextTest}`}
      </p>
    </Link>
  );
}
