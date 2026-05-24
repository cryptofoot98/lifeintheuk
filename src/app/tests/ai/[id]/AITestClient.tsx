"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { QuizEngine, type QuizResult } from "@/components/quiz/QuizEngine";
import { ResultsScreen } from "@/components/quiz/ResultsScreen";
import { Paywall } from "@/components/Paywall";
import { createClient } from "@/lib/supabase/client";
import type { Question } from "@/data/questions";

type Props = { testNumber: number };
type PageState = "loading" | "generating" | "ready" | "done" | "needs-login" | "needs-unlock";

export function AITestClient({ testNumber }: Props) {
  const [state, setState] = useState<PageState>("loading");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [key, setKey] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAccessThenLoad();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testNumber]);

  async function checkAccessThenLoad() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) { setState("needs-login"); return; }

    const { data: profile } = await supabase
      .from("profiles")
      .select("has_lifetime_access, is_admin")
      .eq("id", user.id)
      .single();

    if (!profile?.is_admin && !profile?.has_lifetime_access) {
      setState("needs-unlock");
      return;
    }

    await loadOrGenerate();
  }

  async function loadOrGenerate() {
    setState("loading");

    // First check if test is already cached in DB
    const supabase = createClient();
    const { data: cached } = await supabase
      .from("ai_tests")
      .select("questions")
      .eq("test_number", testNumber)
      .single();

    if (cached?.questions) {
      setQuestions(cached.questions as Question[]);
      setState("ready");
      return;
    }

    // Need to generate
    setState("generating");
    try {
      const res = await fetch("/api/generate-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testNumber }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setQuestions(data.questions as Question[]);
      setState("ready");
    } catch (err) {
      console.error(err);
      setError("Failed to generate test. Please try again.");
      setState("loading");
    }
  }

  const handleComplete = async (r: QuizResult) => {
    setResult(r);
    setState("done");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("xp, streak, last_activity_date")
      .eq("id", user.id)
      .single();

    if (profile) {
      await supabase.from("test_attempts").insert({
        user_id: user.id,
        test_number: testNumber,
        mode: "timed",
        score: r.score,
        total_questions: r.questions.length,
        time_taken_seconds: r.timeTaken,
        completed_at: new Date().toISOString(),
      });

      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      const updates: Record<string, unknown> = {
        xp: (profile.xp ?? 0) + r.score * 10,
        last_activity_date: today,
      };
      if (profile.last_activity_date === yesterday) updates.streak = (profile.streak ?? 0) + 1;
      else if (profile.last_activity_date !== today) updates.streak = 1;
      await supabase.from("profiles").update(updates).eq("id", user.id);
    }
  };

  const handleRetry = () => { setResult(null); setKey(k => k + 1); setState("ready"); };

  if (state === "needs-login") return <Paywall reason="not-logged-in" />;
  if (state === "needs-unlock") return <Paywall reason="trial-used" />;

  if (state === "generating") {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-5">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <Sparkles className="absolute inset-0 m-auto h-7 w-7 text-primary" />
        </div>
        <div className="text-center">
          <p className="font-extrabold text-lg mb-1">Generating Test {testNumber}</p>
          <p className="text-sm text-muted-foreground font-semibold">AI is crafting 24 unique questions…</p>
          <p className="text-xs text-muted-foreground mt-1">This takes about 15 seconds</p>
        </div>
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        {error && (
          <div className="text-center">
            <p className="text-sm text-red-500 font-semibold mb-3">{error}</p>
            <button
              onClick={loadOrGenerate}
              className="btn-3d px-6 py-3 bg-primary text-white rounded-2xl font-extrabold text-sm"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    );
  }

  if (state === "done" && result) {
    return <ResultsScreen result={result} testNumber={testNumber} onRetry={handleRetry} />;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">✨</span>
        <div>
          <h1 className="text-xl font-extrabold">AI Test {testNumber}</h1>
          <p className="text-xs text-muted-foreground font-semibold">24 AI-generated questions · 45 min</p>
        </div>
      </div>
      <QuizEngine
        key={key}
        questions={questions}
        mode="timed"
        timeLimitSeconds={45 * 60}
        onComplete={handleComplete}
        sessionKey={`aitest_${testNumber}`}
      />
    </div>
  );
}
