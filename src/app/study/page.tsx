import Link from "next/link";
import { Nav } from "@/components/Nav";
import { CHAPTERS, getQuestionsByChapter } from "@/data/questions";
import { BookOpen, ChevronRight } from "lucide-react";

const chapterSummaries: Record<number, string> = {
  1: "The core values of British life — democracy, rule of law, individual liberty, and mutual tolerance.",
  2: "The geography, nations, capitals, patron saints, and symbols of the United Kingdom.",
  3: "Britain's history from the Stone Age through the 20th century — invasions, monarchs, wars, and reforms.",
  4: "Modern British society — religion, education, sport, arts, science, and the welfare state.",
  5: "Parliament, the monarchy, devolution, the legal system, your rights, and becoming a citizen.",
};

export default function StudyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-10">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Study by Chapter</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Work through each chapter — then test yourself with a chapter quiz.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {Object.entries(CHAPTERS).map(([num, name]) => {
            const chapterNum = parseInt(num, 10);
            const qCount = getQuestionsByChapter(chapterNum).length;

            return (
              <div
                key={num}
                className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-sm transition-shadow"
              >
                <div className="p-5 flex items-start gap-4">
                  <span className="h-10 w-10 rounded-xl bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                    {num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-base mb-1">{name}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {chapterSummaries[chapterNum]}
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {qCount} practice questions
                    </div>
                  </div>
                </div>
                <div className="border-t border-border px-5 py-3 bg-muted/20 flex items-center gap-3">
                  <Link
                    href={`/tests/chapter/${num}`}
                    className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Practice this chapter <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-5 text-sm">
          <p className="font-medium mb-1">💡 Study tip</p>
          <p className="text-muted-foreground">
            Use chapter mode to learn at your own pace with explanations after each answer. Once you
            score above 80% on all chapters, try a full timed test to simulate the real exam.
          </p>
        </div>
      </main>
    </div>
  );
}
