"use client";

import { useState } from "react";
import { QuizEngine, type QuizResult } from "@/components/quiz/QuizEngine";
import { ResultsScreen } from "@/components/quiz/ResultsScreen";
import type { Question } from "@/data/questions";

type Props = {
  questions: Question[];
  testNumber: number;
};

export function TestClient({ questions, testNumber }: Props) {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [key, setKey] = useState(0);

  const handleRetry = () => {
    setResult(null);
    setKey((k) => k + 1);
  };

  if (result) {
    return <ResultsScreen result={result} testNumber={testNumber} onRetry={handleRetry} />;
  }

  return (
    <QuizEngine
      key={key}
      questions={questions}
      mode="timed"
      timeLimitSeconds={45 * 60}
      onComplete={setResult}
    />
  );
}
