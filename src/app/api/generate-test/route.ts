import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SYSTEM_PROMPT = `You are an expert on the UK Life in the UK citizenship test, based on the official handbook "Life in the United Kingdom: A Guide for New Residents, 3rd edition".

Generate exactly 24 multiple-choice questions that mirror the real test. Follow these rules strictly:
- Cover all 5 handbook chapters in proportion: ch1 (2q), ch2 (3q), ch3 (9q), ch4 (7q), ch5 (3q)
- Each question must have exactly 4 options and 1 or 2 correct answers
- Questions must be factually accurate and sourced from the official handbook
- Mix difficulties: ~8 easy, ~10 medium, ~6 hard
- Vary topics widely — do NOT repeat topics from: British Values, Magna Carta, NHS founding, Battle of Hastings (these are overused)
- Include questions from underused topics: Bronze Age, Roman Britain, Anglo-Saxons, Viking Danelaw, Crusades, Wars of the Roses, Reformation, Civil War details, Act of Union 1707, Industrial inventors, Suffragettes details, Commonwealth, devolved powers, jury system, local government
- correctAnswers is an array of zero-based indices into the options array

Return ONLY a valid JSON array with this exact structure (no markdown, no explanation):
[
  {
    "id": 1,
    "chapter": 1,
    "topic": "string",
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "correctAnswers": [0],
    "explanation": "string (2-3 sentences)",
    "difficulty": "easy"
  }
]`;

export async function POST(req: NextRequest) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "AI not configured" }, { status: 500 });
  }

  let testNumber: number;
  try {
    const body = await req.json();
    testNumber = Number(body.testNumber);
    if (!testNumber || testNumber < 41 || testNumber > 200) {
      return NextResponse.json({ error: "Invalid test number" }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Check if already generated
  const { data: existing } = await supabaseAdmin
    .from("ai_tests")
    .select("questions")
    .eq("test_number", testNumber)
    .single();

  if (existing?.questions) {
    return NextResponse.json({ questions: existing.questions, cached: true });
  }

  // Generate with OpenAI
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 6000,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Generate test number ${testNumber}. Use a unique combination of questions not seen in earlier tests. Seed variation: ${testNumber * 13}.`,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";

    // Strip any markdown fences
    const jsonStr = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const questions = JSON.parse(jsonStr);

    if (!Array.isArray(questions) || questions.length < 20) {
      return NextResponse.json({ error: "Invalid AI response" }, { status: 500 });
    }

    // Save to DB (fire and forget — don't fail if DB write fails)
    supabaseAdmin
      .from("ai_tests")
      .insert({ test_number: testNumber, questions, model: "gpt-4o-mini" })
      .then(({ error }) => {
        if (error) console.error("Failed to cache AI test:", error.message);
      });

    return NextResponse.json({ questions, cached: false });
  } catch (err) {
    console.error("generate-test error:", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
