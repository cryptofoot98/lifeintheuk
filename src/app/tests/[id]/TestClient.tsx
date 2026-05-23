"use client";

import { useState, useEffect } from "react";
import { QuizEngine, type QuizResult } from "@/components/quiz/QuizEngine";
import { ResultsScreen } from "@/components/quiz/ResultsScreen";
import { Paywall } from "@/components/Paywall";
import type { Question } from "@/data/questions";
import { createClient } from "@/lib/supabase/client";

type Props = { questions: Question[]; testNumber: number };

type AccessState = "loading" | "allowed" | "needs-login" | "needs-unlock";

export function TestClient({ questions, testNumber }: Props) {
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
      // Allow test 1 as a totally anonymous preview
      if (testNumber === 1) { setAccess("allowed"); return; }
      setAccess("needs-login");
      return;
    }

    // Logged in — check lifetime access or free trial
    const { data: profile } = await supabase
      .from("profiles")
      .select("has_lifetime_access, free_tests_used")
      .eq("id", user.id)
      .single();

    if (!profile) { setAccess("allowed"); return; }
    if (profile.has_lifetime_access) { setAccess("allowed"); return; }
    if (profile.free_tests_used < 1) { setAccess("allowed"); return; }
    setAccess("needs-unlock");
  }

  const handleComplete = async (r: QuizResult) => {
    setResult(r);
    // Increment free_tests_used for logged-in users on first completion
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("has_lifetime_access, free_tests_used")
        .eq("id", user.id)
        .single();
      if (profile && !profile.has_lifetime_access) {
        await supabase
          .from("profiles")
          .update({ free_tests_used: profile.free_tests_used + 1 })
          .eq("id", user.id);
      }
    }
    // Save to localStorage for progress page
    try {
      const attempts = JSON.parse(localStorage.getItem("liuk_attempts") || "[]");
      attempts.push({
        testNumber,
        score: r.score,
        total: r.questions.length,
        percent: Math.round((r.score / r.questions.length) * 100),
        passed: r.score / r.questions.length >= 0.75,
        timeTaken: r.timeTaken,
        completedAt: new Date().toISOString(),
      });
      localStorage.setItem("liuk_attempts", JSON.stringify(attempts));
    } catch { /* ignore */ }
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

  if (result) return <ResultsScreen result={result} testNumber={testNumber} onRetry={handleRetry} />;

  return (
    <QuizEngine
      key={key}
      questions={questions}
      mode="timed"
      timeLimitSeconds={45 * 60}
      onComplete={handleComplete}
    />
  );
}
