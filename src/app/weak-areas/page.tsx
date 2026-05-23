"use client";

import { useState } from "react";
import { AppNav } from "@/components/AppNav";
import { QuizEngine, type QuizResult } from "@/components/quiz/QuizEngine";
import { ResultsScreen } from "@/components/quiz/ResultsScreen";
import { questions, getRandomQuestions } from "@/data/questions";
import { Target, Info } from "lucide-react";

function getWeakQuestions() {
  if (typeof window === "undefined") return getRandomQuestions(10);
  try {
    const raw = localStorage.getItem("liuk_weak_ids");
    if (!raw) return getRandomQuestions(10);
    const weakIds: number[] = JSON.parse(raw);
    const weak = questions.filter((q) => weakIds.includes(q.id));
    return weak.length >= 5 ? weak : getRandomQuestions(10);
  } catch {
    return getRandomQuestions(10);
  }
}

export default function WeakAreasPage() {
  const [weakQuestions] = useState(() => getWeakQuestions());
  const [result, setResult] = useState<QuizResult | null>(null);
  const [key, setKey] = useState(0);

  const handleRetry = () => {
    setResult(null);
    setKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Target className="h-5 w-5 text-primary" />
          <div>
            <h1 className="text-xl font-bold">Weak Areas</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {weakQuestions.length} questions you have struggled with most
            </p>
          </div>
        </div>

        {!result && (
          <div className="mb-6 flex items-start gap-2 text-sm text-muted-foreground bg-muted/40 rounded-lg p-3">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              Weak areas are tracked as you complete tests. Sign in to persist your data across
              devices — currently using browser storage only.
            </span>
          </div>
        )}

        {result ? (
          <ResultsScreen result={result} onRetry={handleRetry} />
        ) : (
          <QuizEngine
            key={key}
            questions={weakQuestions}
            mode="study"
            onComplete={setResult}
          />
        )}
      </main>
    </div>
  );
}
