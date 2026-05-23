import { notFound } from "next/navigation";
import { AppNav } from "@/components/AppNav";
import { TestClient } from "./TestClient";
import { getTestQuestions } from "@/data/questions";

type Props = { params: Promise<{ id: string }> };

export default async function TestPage({ params }: Props) {
  const { id } = await params;
  const testNumber = parseInt(id, 10);

  if (isNaN(testNumber) || testNumber < 1 || testNumber > 40) {
    notFound();
  }

  const questions = getTestQuestions(testNumber);

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold">Practice Test {testNumber}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            24 questions · 45 minutes · Pass mark 75% (18/24)
          </p>
        </div>
        <TestClient questions={questions} testNumber={testNumber} />
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return Array.from({ length: 40 }, (_, i) => ({ id: String(i + 1) }));
}
