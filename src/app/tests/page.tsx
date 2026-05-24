import Link from "next/link";
import Image from "next/image";
import { AppNav } from "@/components/AppNav";
import { FullPracticeCard } from "@/components/FullPracticeCard";
import { TestsGrid } from "@/components/TestsGrid";

const CDN = "https://images.cryptofoot98.me/britzen";

export default function TestsPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-5xl w-full px-4 py-6">

        {/* ── 2×2 mode grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Quick Quiz */}
          <Link
            href="/tests/quick"
            className="rounded-2xl border-[3px] border-border bg-card p-5 hover:shadow-lg hover:border-primary/50 transition-all group card-elevated"
          >
            <Image src={`${CDN}/icon_bus.png`} alt="" width={40} height={40} className="w-10 h-10 mb-3" />
            <h3 className="font-extrabold mb-1 text-sm group-hover:text-primary transition-colors">Quick Quiz</h3>
            <p className="text-xs text-muted-foreground font-semibold">10 random questions · no timer</p>
          </Link>

          {/* Study Mode */}
          <Link
            href="/study"
            className="rounded-2xl border-[3px] border-border bg-card p-5 hover:shadow-lg hover:border-primary/50 transition-all group card-elevated"
          >
            <Image src={`${CDN}/icon_hat_tea.png`} alt="" width={40} height={40} className="w-10 h-10 mb-3" />
            <h3 className="font-extrabold mb-1 text-sm group-hover:text-primary transition-colors">Study Mode</h3>
            <p className="text-xs text-muted-foreground font-semibold">Learn with explanations · no timer</p>
          </Link>

          {/* Full Practice Test — smart continue */}
          <FullPracticeCard />

          {/* Real Exams */}
          <Link
            href="/exams"
            className="rounded-2xl border-[3px] border-secondary/30 bg-secondary/5 hover:bg-secondary/8 p-5 hover:shadow-lg hover:border-secondary/50 transition-all group card-elevated"
          >
            <span className="text-4xl block mb-3">🎓</span>
            <h3 className="font-extrabold mb-1 text-sm text-secondary">Real Exams</h3>
            <p className="text-xs text-muted-foreground font-semibold">Reported by real test-takers</p>
          </Link>
        </div>

        {/* ── All 40 practice tests ──────────────────────────────────────── */}
        <h2 className="font-extrabold text-base mb-3">🗂️ All 40 Practice Tests</h2>
        <TestsGrid />
      </main>
    </div>
  );
}
