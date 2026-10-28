"use client";

import { AppNav } from "@/components/AppNav";
import { useState } from "react";
import { QuizEngine, type QuizResult } from "@/components/quiz/QuizEngine";
import { ResultsScreen } from "@/components/quiz/ResultsScreen";
import { getQuestionsByChapter, CHAPTERS } from "@/data/questions";

export function ChapterTestClient({ chapterNum }: { chapterNum: number }) {
  const questions = getQuestionsByChapter(chapterNum);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [key, setKey] = useState(0);

  const handleRetry = () => {
    setResult(null);
    setKey((k) => k + 1);
  };

  return (
    <div className="flex flex-col min-h-screen pb-[calc(5rem+env(safe-area-inset-bottom))] md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 py-6">
        <div className="mb-6">
          <div className="text-xs text-muted-foreground mb-1">Chapter {chapterNum}</div>
          <h1 className="text-xl font-bold">{CHAPTERS[chapterNum]}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {questions.length} questions · Study mode — explanations shown after each answer
          </p>
        </div>
        {result ? (
          <ResultsScreen result={result} onRetry={handleRetry} />
        ) : (
          <QuizEngine
            key={key}
            questions={questions}
            mode="study"
            onComplete={setResult}
            sessionKey={`chapter_${chapterNum}`}
          />
        )}
      </main>
    </div>
  );
}
