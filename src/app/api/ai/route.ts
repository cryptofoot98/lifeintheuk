import { NextRequest } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response("OpenAI API key not configured", { status: 500 });
  }

  try {
    const body = await req.json();
    const { mode, context, messages } = body as {
      mode: string;
      context: Context;
      messages: { role: "user" | "assistant"; content: string }[];
    };

    const systemPrompt = buildSystemPrompt(mode ?? "general", context ?? {});

    const stream = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      stream: true,
      max_tokens: 400,
      messages: [
        { role: "system", content: systemPrompt },
        ...(messages ?? []),
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
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err) {
    console.error("AI route error:", err);
    return new Response("AI request failed", { status: 500 });
  }
}
