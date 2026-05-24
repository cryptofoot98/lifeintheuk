"use client";

import { useState, useEffect } from "react";
import { AppNav } from "@/components/AppNav";
import { QuizEngine, type QuizResult } from "@/components/quiz/QuizEngine";
import { ResultsScreen } from "@/components/quiz/ResultsScreen";
import { Paywall } from "@/components/Paywall";
import { getRandomQuestions } from "@/data/questions";
import { createClient } from "@/lib/supabase/client";

type AccessState = "loading" | "allowed" | "needs-unlock";

export default function QuickQuizPage() {
  const [questions] = useState(() => getRandomQuestions(10));
  const [result, setResult] = useState<QuizResult | null>(null);
  const [key, setKey] = useState(0);
  const [access, setAccess] = useState<AccessState>("loading");

  useEffect(() => {
    async function checkAccess() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      // Anonymous users can try freely (no account = no tracking)
      if (!user) { setAccess("allowed"); return; }

      const { data: profile } = await supabase
        .from("profiles")
        .select("has_lifetime_access, is_admin")
        .eq("id", user.id)
        .single();

      if (!profile || profile.is_admin || profile.has_lifetime_access) {
        setAccess("allowed");
        return;
      }

      // 1 free quick quiz (test_number = 0)
      const { data: quizAttempts } = await supabase
        .from("test_attempts")
        .select("id")
        .eq("user_id", user.id)
        .eq("test_number", 0);

      setAccess((quizAttempts?.length ?? 0) < 1 ? "allowed" : "needs-unlock");
    }
    checkAccess();
  }, []);

  const handleRetry = () => {
    setResult(null);
    setKey((k) => k + 1);
  };

  if (access === "loading") {
    return (
      <div className="flex flex-col min-h-screen pb-20 md:pb-0">
        <AppNav />
        <div className="flex-1 flex items-center justify-center py-24">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 py-6">
        {access === "needs-unlock" ? (
          <Paywall reason="trial-used" />
        ) : result ? (
          <ResultsScreen result={result} onRetry={handleRetry} />
        ) : (
          <>
            <div className="mb-6">
              <h1 className="text-xl font-bold">Quick Quiz</h1>
              <p className="text-sm text-muted-foreground mt-0.5">10 random questions · No timer</p>
            </div>
            <QuizEngine
              key={key}
              questions={questions}
              mode="untimed"
              onComplete={setResult}
              sessionKey="quick"
            />
          </>
        )}
      </main>
    </div>
  );
}
