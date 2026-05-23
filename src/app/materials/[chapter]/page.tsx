import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, BookOpen } from "lucide-react";
import { CHAPTERS, getChapter } from "@/data/materials";
import { ChapterReader } from "@/components/ChapterReader";
import { AppNav } from "@/components/AppNav";

type Props = { params: Promise<{ chapter: string }> };

export async function generateStaticParams() {
  return CHAPTERS.map((ch) => ({ chapter: String(ch.chapter) }));
}

export async function generateMetadata({ params }: Props) {
  const { chapter } = await params;
  const ch = getChapter(Number(chapter));
  if (!ch) return {};
  return { title: `Chapter ${ch.chapter}: ${ch.title} | Life in the UK` };
}

export default async function ChapterPage({ params }: Props) {
  const { chapter } = await params;
  const ch = getChapter(Number(chapter));
  if (!ch) notFound();

  const prev = getChapter(ch.chapter - 1);
  const next = getChapter(ch.chapter + 1);

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
      {/* Back breadcrumb */}
      <Link
        href="/materials"
        className="inline-flex items-center gap-1.5 text-sm font-extrabold text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Study materials
      </Link>

      {/* Chapter hero */}
      <div className="bg-card border-2 border-border rounded-2xl p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl shrink-0">
            {ch.emoji}
          </div>
          <div>
            <div className="text-xs font-extrabold text-primary uppercase tracking-wider mb-1">
              Chapter {ch.chapter}
            </div>
            <h1 className="font-heading text-2xl font-black leading-tight mb-2">{ch.title}</h1>
            <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {ch.readTime} min read
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" /> {ch.sections.length} sections
              </span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm font-semibold text-muted-foreground leading-relaxed">
          {ch.intro}
        </p>

        {/* Section jump links */}
        <div className="mt-4 pt-4 border-t-2 border-border">
          <div className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-2">In this chapter</div>
          <div className="flex flex-wrap gap-2">
            {ch.sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-primary/8 text-primary hover:bg-primary/15 transition-colors"
              >
                {sec.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content sections — tracked reading with IntersectionObserver */}
      <ChapterReader chapter={ch.chapter} sections={ch.sections} />

      {/* Take test CTA */}
      <div className="mt-8 bg-primary/8 border-2 border-primary/20 rounded-2xl p-5 text-center">
        <div className="text-2xl mb-2">✅</div>
        <div className="font-heading font-black text-base mb-1">Finished Chapter {ch.chapter}?</div>
        <p className="text-xs font-semibold text-muted-foreground mb-4">
          Lock in what you've learned with a practice test on this topic.
        </p>
        <Link
          href={`/tests?chapter=${ch.chapter}`}
          className="btn-3d inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-2xl font-extrabold text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/25"
        >
          Take chapter test <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Prev / Next navigation */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div>
          {prev && (
            <Link
              href={`/materials/${prev.chapter}`}
              className="flex items-center gap-2 bg-card border-2 border-border rounded-2xl p-3.5 hover:border-primary/50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-primary shrink-0" />
              <div>
                <div className="text-xs font-semibold text-muted-foreground">Previous</div>
                <div className="text-sm font-extrabold leading-tight line-clamp-1">{prev.title}</div>
              </div>
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link
              href={`/materials/${next.chapter}`}
              className="flex items-center gap-2 bg-card border-2 border-border rounded-2xl p-3.5 hover:border-primary/50 transition-colors text-right justify-end"
            >
              <div>
                <div className="text-xs font-semibold text-muted-foreground">Next</div>
                <div className="text-sm font-extrabold leading-tight line-clamp-1">{next.title}</div>
              </div>
              <ArrowRight className="h-4 w-4 text-primary shrink-0" />
            </Link>
          )}
        </div>
      </div>
      </main>
    </div>
  );
}
