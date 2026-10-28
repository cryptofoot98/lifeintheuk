"use client";

import { useState, useEffect } from "react";
import { QuizEngine, type QuizResult } from "@/components/quiz/QuizEngine";
import { ResultsScreen } from "@/components/quiz/ResultsScreen";
import { Paywall } from "@/components/Paywall";
import type { Question } from "@/data/questions";
import { createClient } from "@/lib/supabase/client";
import { saveAttempt } from "@/lib/attempts";

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

    // Logged in — check lifetime access or free tier (2 practice tests)
    const { data: profile } = await supabase
      .from("profiles")
      .select("has_lifetime_access, is_admin")
      .eq("id", user.id)
      .single();

    if (!profile) { setAccess("allowed"); return; }
    if (profile.is_admin) { setAccess("allowed"); return; }
    if (profile.has_lifetime_access) { setAccess("allowed"); return; }

    // Count completed practice tests (1–40) from test_attempts
    const { data: practiceAttempts } = await supabase
      .from("test_attempts")
      .select("id")
      .eq("user_id", user.id)
      .gte("test_number", 1)
      .lte("test_number", 100);

    if ((practiceAttempts?.length ?? 0) < 2) { setAccess("allowed"); return; }
    setAccess("needs-unlock");
  }

  const handleComplete = async (r: QuizResult) => {
    // Save before showing results so ResultsScreen reads the updated XP.
    await saveAttempt(testNumber, "timed", r);
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

  if (result) return <ResultsScreen result={result} testNumber={testNumber} onRetry={handleRetry} />;

  return (
    <QuizEngine
      key={key}
      questions={questions}
      mode="timed"
      timeLimitSeconds={45 * 60}
      onComplete={handleComplete}
      sessionKey={`test_${testNumber}`}
      onStartFresh={() => setKey((k) => k + 1)}
    />
  );
}
