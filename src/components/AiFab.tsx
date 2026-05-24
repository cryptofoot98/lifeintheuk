"use client";

import { useState, useEffect, useRef } from "react";
import { useAI, type AiTrigger } from "@/lib/ai-context";
import { X, Send, Sparkles, Loader2, Bot, Lightbulb, GraduationCap, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

function getAutoMessage(trigger: AiTrigger): string {
  if (trigger.mode === "explain")
    return trigger.isCorrect
      ? "Can you explain why that's correct and give me some context?"
      : "Can you explain why I got that wrong and what the right answer means?";
  if (trigger.mode === "hint") return "Can you give me a hint without revealing the answer?";
  if (trigger.mode === "coach") return "Can you analyse my progress and give me a personalised study plan?";
  return "";
}

function ModeChip({ mode }: { mode: AiTrigger["mode"] }) {
  const labels: Record<string, { label: string; Icon: React.ElementType }> = {
    explain: { label: "Explaining answer", Icon: MessageCircle },
    hint:    { label: "Giving a hint",     Icon: Lightbulb },
    coach:   { label: "Study coach",       Icon: GraduationCap },
    general: { label: "AI Tutor",          Icon: Sparkles },
  };
  const { label, Icon } = labels[mode] ?? labels.general;
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-[11px] font-extrabold shrink-0">
      <Icon className="h-3 w-3" />
      {label}
    </div>
  );
}

export function AiFab() {
  const { isOpen, trigger, sessionId, openAI, closeAI } = useAI();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setPanelVisible(true);
      setTimeout(() => inputRef.current?.focus(), 350);
    } else {
      setTimeout(() => setPanelVisible(false), 300);
    }
  }, [isOpen]);

  // New session: reset messages and auto-send initial query
  useEffect(() => {
    if (sessionId === 0) return;
    setMessages([]);
    setInput("");
    if (trigger) {
      const auto = getAutoMessage(trigger);
      if (auto) setTimeout(() => sendMessage(auto), 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;
    setInput("");

    const userMsg: Message = { role: "user", content: trimmed };
    const history = [...messages, userMsg];
    setMessages([...history, { role: "assistant", content: "" }]);
    setStreaming(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: trigger?.mode ?? "general", context: trigger ?? {}, messages: history }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { ...next[next.length - 1], content: next[next.length - 1].content + chunk };
          return next;
        });
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { ...next[next.length - 1], content: "Sorry, something went wrong. Please try again." };
        return next;
      });
    }

    setStreaming(false);
  }

  if (!panelVisible && !isOpen) {
    return (
      <button
        onClick={() => openAI("general")}
        className="fixed z-50 bottom-24 right-4 md:bottom-6 md:right-6 btn-3d h-14 w-14 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg shadow-secondary/30 transition-all hover:scale-105"
        aria-label="Open AI tutor"
      >
        <Sparkles className="h-6 w-6" />
      </button>
    );
  }

  return (
    <>
      {/* Backdrop (mobile) */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeAI}
      />

      {/* Chat panel */}
      <div
        className={cn(
          "fixed z-50 flex flex-col transition-all duration-300",
          // Mobile: full-width sheet from bottom
          "inset-x-0 bottom-0 rounded-t-3xl",
          // Desktop: floating panel above FAB
          "md:inset-x-auto md:bottom-20 md:right-6 md:w-[390px] md:rounded-2xl",
          // Height
          "h-[72vh] md:h-[520px]",
          // Styling
          "bg-card border-2 border-border shadow-2xl shadow-black/20",
          // Visibility
          isOpen ? "translate-y-0 opacity-100" : "translate-y-full md:translate-y-6 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 py-3 border-b-2 border-border shrink-0 rounded-t-3xl md:rounded-t-2xl">
          <div className="h-8 w-8 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
            <Bot className="h-4 w-4 text-secondary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-sm">AI Tutor</p>
            <p className="text-[10px] text-muted-foreground font-semibold leading-none mt-0.5">GPT-4o mini · Life in the UK expert</p>
          </div>
          {trigger && <ModeChip mode={trigger.mode} />}
          <button
            onClick={closeAI}
            className="h-8 w-8 flex items-center justify-center rounded-xl border-2 border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {messages.length === 0 && !streaming && (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-8">
              <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <Bot className="h-7 w-7 text-secondary/60" />
              </div>
              <div>
                <p className="font-extrabold text-sm">Ask me anything</p>
                <p className="text-xs text-muted-foreground font-semibold mt-1">British history, government, culture — I&apos;ve got you covered.</p>
              </div>
              <div className="flex flex-col gap-2 w-full mt-2">
                {["What year did the Second World War end?", "Who can stand for Parliament?", "What is the NHS?"].map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left text-xs font-semibold px-3 py-2.5 rounded-xl border-2 border-border bg-muted/30 hover:border-primary/30 hover:bg-muted/60 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm font-medium leading-relaxed max-w-[88%] whitespace-pre-wrap",
                msg.role === "user"
                  ? "bg-primary text-white self-end rounded-br-sm"
                  : "bg-muted text-foreground self-start rounded-bl-sm"
              )}
            >
              {msg.content
                ? msg.content
                : streaming && i === messages.length - 1
                  ? (
                    <span className="flex gap-1 items-center h-4">
                      {[0, 150, 300].map((d) => (
                        <span
                          key={d}
                          className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce"
                          style={{ animationDelay: `${d}ms` }}
                        />
                      ))}
                    </span>
                  )
                  : null}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t-2 border-border shrink-0">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder="Ask a follow-up…"
              disabled={streaming}
              className="flex-1 rounded-2xl border-2 border-border bg-background px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-primary transition-all disabled:opacity-50 min-w-0"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || streaming}
              className="btn-3d h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 disabled:opacity-50 disabled:shadow-none"
            >
              {streaming ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* FAB — shown even when panel is open, acts as close toggle on desktop */}
      <button
        onClick={isOpen ? closeAI : () => openAI("general")}
        className={cn(
          "fixed z-50 bottom-24 right-4 md:bottom-6 md:right-6 btn-3d h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300",
          isOpen
            ? "bg-muted border-2 border-border text-foreground shadow-none scale-90"
            : "bg-secondary text-white shadow-secondary/30 hover:scale-105"
        )}
        aria-label={isOpen ? "Close AI tutor" : "Open AI tutor"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Sparkles className="h-6 w-6" />}
      </button>
    </>
  );
}
