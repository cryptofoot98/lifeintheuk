"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type AiMode = "general" | "explain" | "hint" | "coach";

export type AiTrigger = {
  mode: AiMode;
  // Explain / Hint
  question?: string;
  options?: string[];
  correctAnswer?: string;
  userAnswer?: string;
  isCorrect?: boolean;
  explanation?: string;
  // Coach
  avgScore?: number;
  testCount?: number;
  passedCount?: number;
  chapterSummary?: string;
};

type AiContextType = {
  isOpen: boolean;
  trigger: AiTrigger | null;
  sessionId: number;
  openAI: (mode: AiMode, data?: Omit<AiTrigger, "mode">) => void;
  closeAI: () => void;
};

const AiContext = createContext<AiContextType | null>(null);

export function AiProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [trigger, setTrigger] = useState<AiTrigger | null>(null);
  const [sessionId, setSessionId] = useState(0);

  function openAI(mode: AiMode, data?: Omit<AiTrigger, "mode">) {
    setTrigger({ mode, ...data });
    setSessionId((s) => s + 1);
    setIsOpen(true);
  }

  function closeAI() {
    setIsOpen(false);
  }

  return (
    <AiContext.Provider value={{ isOpen, trigger, sessionId, openAI, closeAI }}>
      {children}
    </AiContext.Provider>
  );
}

export function useAI() {
  const ctx = useContext(AiContext);
  if (!ctx) throw new Error("useAI must be used within AiProvider");
  return ctx;
}
