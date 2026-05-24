"use client";

import { useState } from "react";
import { AppNav } from "@/components/AppNav";
import { QuizEngine, type QuizResult } from "@/components/quiz/QuizEngine";
import { ResultsScreen } from "@/components/quiz/ResultsScreen";
import { getRandomQuestions } from "@/data/questions";

export default function QuickQuizPage() {
  const [questions] = useState(() => getRandomQuestions(10));
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
        <div className="mb-6">
          <h1 className="text-xl font-bold">Quick Quiz</h1>
          <p className="text-sm text-muted-foreground mt-0.5">10 random questions · No timer</p>
        </div>
        {result ? (
          <ResultsScreen result={result} onRetry={handleRetry} />
        ) : (
          <QuizEngine
            key={key}
            questions={questions}
            mode="untimed"
            onComplete={setResult}
            sessionKey="quick"
          />
        )}
      </main>
    </div>
  );
}
