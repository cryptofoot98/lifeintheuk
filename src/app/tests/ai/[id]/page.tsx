import { AppNav } from "@/components/AppNav";
import { AITestClient } from "./AITestClient";

type Props = { params: Promise<{ id: string }> };

export default async function AITestPage({ params }: Props) {
  const { id } = await params;
  const testNumber = Number(id);

  if (isNaN(testNumber) || testNumber < 41 || testNumber > 200) {
    return (
      <div className="flex flex-col min-h-screen">
        <AppNav />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Invalid test number.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0">
      <AppNav />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 py-6">
        <AITestClient testNumber={testNumber} />
      </main>
    </div>
  );
}
