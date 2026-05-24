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
        const completed = attempts
          .map((a) => a.testNumber)
          .filter((n) => n >= 1 && n <= 40);
        if (completed.length > 0) {
          setNextTest(Math.min(40, Math.max(...completed) + 1));
        }
      }
    } catch { /* ignore */ }
  }, []);

  return (
    <Link
      href={`/tests/${nextTest}`}
      className="rounded-2xl border-[3px] border-primary bg-primary/5 hover:bg-primary/8 p-5 hover:shadow-lg transition-all group card-elevated"
    >
      <Image src={`${CDN}/icon_royalguard.png`} alt="" width={40} height={40} className="w-10 h-10 mb-3" />
      <h3 className="font-extrabold mb-1 text-sm text-primary">Full Practice Test</h3>
      <p className="text-xs text-muted-foreground font-semibold">
        24 questions · 45 min ·{" "}
        {nextTest === 1 ? "start from test #1" : `continuing at test #${nextTest}`}
      </p>
    </Link>
  );
}
