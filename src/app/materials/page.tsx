import Link from "next/link";
import Image from "next/image";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { CHAPTERS } from "@/data/materials";
import { AppNav } from "@/components/AppNav";

const CDN = "https://images.cryptofoot98.me/britzen";
const CHAPTER_ICONS: Record<number, string> = {
  1: `${CDN}/icon_unionjack.png`,
  2: `${CDN}/icon_wales.png`,
  3: `${CDN}/icon_stonehenge.png`,
  4: `${CDN}/icon_pint_pie.png`,
  5: `${CDN}/icon_bigben.png`,
};

export const metadata = { title: "Study Materials | Life in the UK" };

export default function MaterialsPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm font-extrabold text-primary mb-2">
          <BookOpen className="h-4 w-4" />
          Official Handbook
        </div>
        <h1 className="font-heading text-3xl font-black mb-2">Study Materials</h1>
        <p className="text-muted-foreground font-semibold text-sm leading-relaxed">
          Everything you need to pass, chapter by chapter. Colour-coded facts, key people, timelines, and exam tips.
        </p>
      </div>

      {/* Chapter cards */}
      <div className="flex flex-col gap-4">
        {CHAPTERS.map((ch) => (
          <Link
            key={ch.chapter}
            href={`/materials/${ch.chapter}`}
            className="group bg-card border-2 border-border rounded-2xl p-5 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
                <Image src={CHAPTER_ICONS[ch.chapter]} alt="" width={44} height={44} className="w-11 h-11" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-extrabold text-primary uppercase tracking-wider">
                    Chapter {ch.chapter}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {ch.readTime} min read
                  </span>
                </div>
                <h2 className="font-heading font-black text-base mb-1.5 leading-tight">{ch.title}</h2>
                <p className="text-xs font-semibold text-muted-foreground leading-relaxed line-clamp-2">
                  {ch.intro}
                </p>
                <div className="flex items-center gap-1 mt-3 text-xs font-extrabold text-primary">
                  Start reading <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 bg-primary/8 border-2 border-primary/20 rounded-2xl p-5 text-center">
        <div className="text-2xl mb-2">🎯</div>
        <div className="font-heading font-black text-base mb-1">Ready to test your knowledge?</div>
        <p className="text-xs font-semibold text-muted-foreground mb-4">
          After reading each chapter, take a practice test to lock in the facts.
        </p>
        <Link
          href="/tests"
          className="btn-3d inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-2xl font-extrabold text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/25"
        >
          Go to tests <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      </main>
    </div>
  );
}
