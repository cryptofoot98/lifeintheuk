import { AppNav } from "@/components/AppNav";
import { TestModeGrid } from "@/components/TestModeGrid";
import { TestsGrid } from "@/components/TestsGrid";

export default function TestsPage() {
  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-5xl w-full px-4 py-6">
        <TestModeGrid />
        <h2 className="font-extrabold text-base mb-3">🗂️ All 40 Practice Tests</h2>
        <TestsGrid />
      </main>
    </div>
  );
}
