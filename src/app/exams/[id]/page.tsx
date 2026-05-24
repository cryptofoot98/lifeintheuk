import { notFound } from "next/navigation";
import { AppNav } from "@/components/AppNav";
import { ExamClient } from "./ExamClient";
import { examSets, getExamQuestions } from "@/data/exams";

type Props = { params: Promise<{ id: string }> };

export default async function ExamPage({ params }: Props) {
  const { id } = await params;
  const examId = parseInt(id, 10);

  if (isNaN(examId) || examId < 1 || examId > examSets.length) {
    notFound();
  }

  const exam = examSets.find((e) => e.id === examId)!;
  const questions = getExamQuestions(examId);

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 py-6">
        <div className="mb-6">
          <p className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-1">
            Real Exam Questions · {exam.reportedDate}
          </p>
          <h1 className="text-xl font-bold">{exam.title}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            24 questions · 45 minutes · Pass mark 75% (18/24)
          </p>
        </div>
        <ExamClient questions={questions} examId={examId} title={exam.title} />
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return examSets.map((e) => ({ id: String(e.id) }));
}
