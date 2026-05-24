import Link from "next/link";
import { AppNav } from "@/components/AppNav";
import { examSets } from "@/data/exams";

export default function ExamsPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-4xl w-full px-4 py-6">

        {/* Page header */}
        <div className="mb-5">
          <h1 className="font-heading text-2xl font-black">Real Exam Questions 🎓</h1>
          <p className="text-sm text-muted-foreground font-semibold mt-1">
            Questions reported by candidates after sitting their actual Life in the UK test.
          </p>
        </div>

        {/* Info banner */}
        <div className="rounded-2xl border-2 border-secondary/20 bg-secondary/5 p-4 mb-6 flex gap-3 items-start text-sm card-elevated">
          <span className="text-xl shrink-0">💡</span>
          <div>
            <p className="font-extrabold text-secondary mb-0.5">How these work</p>
            <p className="text-muted-foreground font-semibold leading-relaxed">
              These are sets of questions that real test-takers reported seeing in their official Life in the UK tests.
              Each set has 24 questions and a 45-minute timer — identical to the real exam. Use them to get a feel for which topics come up most often.
            </p>
          </div>
        </div>

        {/* Exam grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {examSets.map((exam) => (
            <Link
              key={exam.id}
              href={`/exams/${exam.id}`}
              className="rounded-2xl border-2 border-border bg-card p-5 hover:border-primary/50 hover:shadow-lg transition-all group card-elevated flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 text-base group-hover:scale-105 transition-transform">
                    🎓
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm group-hover:text-primary transition-colors">
                      {exam.title}
                    </h3>
                    <p className="text-[11px] text-muted-foreground font-semibold">
                      Reported: {exam.reportedDate}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-[11px] font-extrabold px-2 py-0.5 rounded-lg bg-secondary/10 text-secondary border border-secondary/20">
                  Real exam
                </span>
              </div>

              <p className="text-xs text-muted-foreground font-semibold">{exam.description}</p>

              <div className="flex items-center gap-3 text-[11px] font-semibold text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span>📝</span> 24 questions
                </span>
                <span className="flex items-center gap-1">
                  <span>⏱️</span> 45 min
                </span>
                <span className="flex items-center gap-1">
                  <span>🎯</span> Pass at 75%
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
