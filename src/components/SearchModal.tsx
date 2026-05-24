"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, ArrowRight } from "lucide-react";
import { questions, CHAPTERS } from "@/data/questions";

type Props = { open: boolean; onClose: () => void };

export function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const results = query.trim().length > 1
    ? questions.filter((q) =>
        q.question.toLowerCase().includes(query.toLowerCase()) ||
        q.topic.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 7)
    : [];

  function navigate(path: string) {
    router.push(path);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[12vh] px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-card border-2 border-border rounded-2xl shadow-2xl overflow-hidden">

        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b-2 border-border">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, topics…"
            className="flex-1 bg-transparent text-sm font-semibold focus:outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-border text-[10px] font-extrabold text-muted-foreground">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="h-7 w-7 flex items-center justify-center rounded-lg border-2 border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <ul className="max-h-80 overflow-y-auto">
            {results.map((q) => (
              <li key={q.id}>
                <button
                  onClick={() => navigate(`/tests/chapter/${q.chapter}`)}
                  className="w-full text-left px-4 py-3 hover:bg-muted/50 transition-colors flex items-start gap-3 border-b border-border/40 last:border-0"
                >
                  <BookOpen className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-snug line-clamp-2">{q.question}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 font-semibold">
                      {q.topic} · Ch.{q.chapter}: {CHAPTERS[q.chapter]}
                    </p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                </button>
              </li>
            ))}
          </ul>
        ) : query.trim().length > 1 ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground font-semibold">
            No results for &ldquo;{query}&rdquo;
          </p>
        ) : (
          <div className="px-4 py-4">
            <p className="text-xs font-extrabold text-muted-foreground uppercase tracking-wider mb-3">Jump to chapter</p>
            <div className="flex flex-col gap-1">
              {Object.entries(CHAPTERS).map(([num, name]) => (
                <button
                  key={num}
                  onClick={() => navigate(`/tests/chapter/${num}`)}
                  className="flex items-center gap-2 text-left py-1.5 px-2 rounded-xl text-sm font-semibold hover:bg-muted/50 hover:text-primary transition-colors"
                >
                  <span className="text-xs font-extrabold text-muted-foreground w-10 shrink-0">Ch.{num}</span>
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
