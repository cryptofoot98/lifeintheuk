// AI tutor — Supabase Edge Function (replaces the old Next.js /api/ai route).
// Streams plain text back to the client. Requires a signed-in user so the
// OpenAI key can't be used anonymously.
//
// Deploy:  supabase functions deploy ai
// Secret:  supabase secrets set OPENAI_API_KEY=sk-...
import OpenAI from "npm:openai@6";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

type Context = Record<string, unknown>;

function buildSystemPrompt(mode: string, ctx: Context): string {
  const base = `You are an expert tutor for the Life in the UK citizenship test, based on "Life in the United Kingdom: A Guide for New Residents, 3rd edition". Be concise, friendly, and accurate. Use simple British English.`;

  if (mode === "explain") {
    return `${base}

A student just answered a question. Help them understand it deeply.
Question: ${ctx.question}
Correct answer: ${ctx.correctAnswer}
Student's answer: ${ctx.userAnswer}
Result: ${ctx.isCorrect ? "CORRECT ✓" : "INCORRECT ✗"}
Official explanation: ${ctx.explanation}

In 2–3 short paragraphs, explain WHY this is the answer. Add interesting historical or cultural context if relevant. Keep it under 150 words.`;
  }

  if (mode === "hint") {
    return `${base}

The student is stuck and needs a hint. Do NOT reveal the answer.
Question: ${ctx.question}
Options: ${(ctx.options as string[])?.join(" | ")}

Give exactly ONE helpful nudge (1–2 sentences) pointing them in the right direction without giving away the answer.`;
  }

  if (mode === "coach") {
    return `${base}

You are a personal study coach. Analyse the student's performance and give actionable advice.
Tests completed: ${ctx.testCount}
Average score: ${ctx.avgScore}%
Passed: ${ctx.passedCount} of ${ctx.testCount} tests
Chapter progress: ${ctx.chapterSummary}

Provide: (1) a brief 1-sentence performance assessment, (2) 3 specific, numbered study tips based on their weakest areas, (3) one encouraging closing sentence. Max 180 words. Be warm and motivating.`;
  }

  return `${base}

Answer questions about the Life in the UK citizenship test concisely and helpfully. If asked something off-topic, gently redirect to exam preparation. Keep responses under 150 words.`;
}


Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: req.headers.get("Authorization") ?? "" } } },
  );
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new Response("Sign in to use the AI tutor", { status: 401, headers: corsHeaders });

  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) return new Response("OpenAI API key not configured", { status: 500, headers: corsHeaders });

  try {
    const { mode, context, messages } = (await req.json()) as {
      mode: string;
      context: Context;
      messages: { role: "user" | "assistant"; content: string }[];
    };

    const history = (messages ?? [])
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-MAX_MESSAGES)
      .map((m) => ({ role: m.role, content: String(m.content).slice(0, MAX_CHARS) }));

    const openai = new OpenAI({ apiKey });
    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      max_tokens: 400,
      messages: [
        { role: "system", content: buildSystemPrompt(mode ?? "general", context ?? {}) },
        ...history,
      ],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            if (text) controller.enqueue(encoder.encode(text));
          }
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: { ...corsHeaders, "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("AI function error:", err);
    return new Response("AI request failed", { status: 500, headers: corsHeaders });
  }
});
