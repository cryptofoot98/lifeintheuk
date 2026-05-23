import Link from "next/link";
import { AppNav } from "@/components/AppNav";
import { CHAPTERS, getQuestionsByChapter } from "@/data/questions";
import { ChevronRight } from "lucide-react";

const chapterEmojis: Record<number, string> = {
  1: "🏛️",
  2: "🗺️",
  3: "📜",
  4: "🎭",
  5: "⚖️",
};

const chapterSummaries: Record<number, string> = {
  1: "The core values of British life — democracy, rule of law, individual liberty, and mutual tolerance.",
  2: "Geography, nations, capitals, patron saints, and symbols of the United Kingdom.",
  3: "Britain's history from the Stone Age through the 20th century — invasions, monarchs, wars, and reforms.",
  4: "Modern British society — religion, education, sport, arts, science, and the welfare state.",
  5: "Parliament, the monarchy, devolution, the legal system, your rights, and becoming a citizen.",
};

export default function StudyPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-6">

        {/* Page header */}
        <div className="mb-6">
          <h1 className="font-heading text-2xl font-black">Study by Chapter 📖</h1>
          <p className="text-sm text-muted-foreground font-semibold mt-1">
            Work through each chapter at your own pace — explanations after every answer.
          </p>
        </div>

        {/* Chapter cards */}
        <div className="flex flex-col gap-4">
          {Object.entries(CHAPTERS).map(([num, name]) => {
            const chapterNum = parseInt(num, 10);
            const qCount = getQuestionsByChapter(chapterNum).length;

            return (
              <div
                key={num}
                className="rounded-2xl border-2 border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <div className="p-5 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center text-2xl shrink-0 shadow-md shadow-primary/25 group-hover:scale-105 transition-transform">
                    {chapterEmojis[chapterNum]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-extrabold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                        Chapter {num}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">{qCount} questions</span>
                    </div>
                    <h2 className="font-extrabold text-base mb-1 group-hover:text-primary transition-colors">{name}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      {chapterSummaries[chapterNum]}
                    </p>
                  </div>
                </div>
                <div className="border-t-2 border-border px-5 py-3 bg-muted/20 flex items-center">
                  <Link
                    href={`/tests/chapter/${num}`}
                    className="flex items-center gap-1.5 text-sm font-extrabold text-primary hover:underline underline-offset-2"
                  >
                    Start chapter test <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Study tip */}
        <div className="mt-6 rounded-2xl border-2 border-primary/25 bg-primary/5 p-5">
          <p className="font-extrabold mb-1 text-sm">💡 Study tip</p>
          <p className="text-sm text-muted-foreground font-medium leading-relaxed">
            Once you score above 80% in all 5 chapters, try a full timed test to simulate the real exam. Most people are ready after 7–10 days of consistent study.
          </p>
        </div>
      </main>
    </div>
  );
}
