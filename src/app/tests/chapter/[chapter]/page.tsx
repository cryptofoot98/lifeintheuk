import { notFound } from "next/navigation";
import { ChapterTestClient } from "./ChapterTestClient";

type Props = { params: Promise<{ chapter: string }> };

export function generateStaticParams() {
  return [1, 2, 3, 4, 5].map((n) => ({ chapter: String(n) }));
}

export default async function ChapterTestPage({ params }: Props) {
  const { chapter } = await params;
  const chapterNum = parseInt(chapter, 10);

  if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > 5) {
    notFound();
  }

  return <ChapterTestClient chapterNum={chapterNum} />;
}
