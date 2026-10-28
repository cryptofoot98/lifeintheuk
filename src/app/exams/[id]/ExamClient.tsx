"use client";

import { useState, useEffect } from "react";
import { QuizEngine, type QuizResult } from "@/components/quiz/QuizEngine";
import { ResultsScreen } from "@/components/quiz/ResultsScreen";
import { Paywall } from "@/components/Paywall";
import type { Question } from "@/data/questions";
import { createClient } from "@/lib/supabase/client";
import { saveAttempt } from "@/lib/attempts";

// Exam attempts are stored with testNumber = 100 + examId (101-110)
// so they don't collide with regular practice tests (1-40).
type Props = { questions: Question[]; examId: number; title: string };

type AccessState = "loading" | "allowed" | "needs-login" | "needs-unlock";

export function ExamClient({ questions, examId, title }: Props) {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [key, setKey] = useState(0);
  const [access, setAccess] = useState<AccessState>("loading");

  useEffect(() => {
    checkAccess();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkAccess() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // First real exam is a free preview for anonymous users
      if (examId === 1) { setAccess("allowed"); return; }
      setAccess("needs-login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("has_lifetime_access, is_admin")
      .eq("id", user.id)
      .single();

    if (!profile) { setAccess("allowed"); return; }
    if (profile.is_admin) { setAccess("allowed"); return; }
    if (profile.has_lifetime_access) { setAccess("allowed"); return; }

    // 1 free real exam allowed — count completed exam attempts (test_number > 100)
    const { data: examAttempts } = await supabase
      .from("test_attempts")
      .select("id")
      .eq("user_id", user.id)
      .gt("test_number", 100);

    if ((examAttempts?.length ?? 0) < 1) { setAccess("allowed"); return; }
    setAccess("needs-unlock");
  }

  const handleComplete = async (r: QuizResult) => {
    // Save before showing results so ResultsScreen reads the updated XP.
    await saveAttempt(100 + examId, "timed", r);
    setResult(r);
  };

  const handleRetry = () => { setResult(null); setKey((k) => k + 1); };

  if (access === "loading") {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }
  if (access === "needs-login") return <Paywall reason="not-logged-in" />;
  if (access === "needs-unlock") return <Paywall reason="trial-used" />;

  if (result) {
    return <ResultsScreen result={result} testNumber={100 + examId} onRetry={handleRetry} />;
  }

  return (
    <QuizEngine
      key={key}
      questions={questions}
      mode="timed"
      timeLimitSeconds={45 * 60}
      onComplete={handleComplete}
      sessionKey={`exam_${examId}`}
      onStartFresh={() => setKey((k) => k + 1)}
    />
  );
}
