"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppNav } from "@/components/AppNav";
import { QuizEngine, type QuizResult } from "@/components/quiz/QuizEngine";
import { ResultsScreen } from "@/components/quiz/ResultsScreen";
import { questions, type Question } from "@/data/questions";
import { getWeakQuestionIds, recordResponses } from "@/lib/attempts";
import { Target, Info } from "lucide-react";

export default function WeakAreasPage() {
  // Loaded on the client only: the static HTML can't know the user's history.
  const [weakQuestions, setWeakQuestions] = useState<Question[] | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    getWeakQuestionIds().then((ids) => {
      const byId = new Map(questions.map((q) => [q.id, q]));
      setWeakQuestions(ids.map((id) => byId.get(id)).filter((q): q is Question => !!q));
    });
  }, [key]);

  const handleComplete = async (r: QuizResult) => {
    // Correct answers here take questions off the weak list.
    await recordResponses(r, null);
    setResult(r);
  };

  const handleRetry = () => {
    setResult(null);
    setWeakQuestions(null);
    setKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col min-h-screen pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-5 w-5 text-primary" />
          <div>
            <h1 className="text-xl font-bold">Weak Areas</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {weakQuestions?.length
                ? `${weakQuestions.length} question${weakQuestions.length === 1 ? "" : "s"} you got wrong last time`
                : "Questions you got wrong, until you get them right"}
            </p>
          </div>
        </div>

        {result ? (
          <ResultsScreen result={result} onRetry={handleRetry} />
        ) : weakQuestions === null ? (
          <div className="flex items-center justify-center py-24">
            <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          </div>
        ) : weakQuestions.length === 0 ? (
          <div className="rounded-2xl border-2 border-border bg-card p-8 text-center card-elevated">
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="font-heading text-lg font-black mb-2">No weak areas right now</h2>
            <p className="text-sm text-muted-foreground font-semibold mb-6">
              Every question you get wrong in a test, exam or quiz lands here so you can drill it.
              Get it right and it drops off the list.
            </p>
            <Link
              href="/tests"
              className="btn-3d inline-flex px-5 py-3 rounded-2xl bg-primary text-white text-sm font-extrabold uppercase tracking-wide"
            >
              Take a test
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-start gap-2 text-sm text-muted-foreground bg-muted/40 rounded-lg p-3">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              <span>Most-missed questions come first. Answer one correctly and it leaves this list.</span>
            </div>
            <QuizEngine
              key={key}
              questions={weakQuestions}
              mode="study"
              onComplete={handleComplete}
            />
          </>
        )}
      </main>
    </div>
  );
}
