"use client";

import React from "react";
import type { Block } from "@/data/materials";

function parseBold(text: string): React.ReactNode[] {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="text-primary font-extrabold">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

function TextBlock({ text }: { text: string }) {
  return (
    <p className="text-base font-semibold leading-relaxed text-foreground/90 mb-4">
      {parseBold(text)}
    </p>
  );
}

function HeadingBlock({ text }: { text: string }) {
  return (
    <h3 className="font-heading text-lg font-black mt-6 mb-3 pl-3 border-l-4 border-primary text-foreground">
      {text}
    </h3>
  );
}

function KeyFactBlock({ emoji, title, body }: { emoji: string; title: string; body: string }) {
  return (
    <div className="flex gap-3 bg-primary/8 border-l-4 border-primary rounded-r-2xl px-4 py-3.5 mb-4">
      <span className="text-2xl shrink-0 mt-0.5">{emoji}</span>
      <div>
        <div className="font-heading font-black text-sm text-primary mb-1">{title}</div>
        <div className="text-sm font-semibold leading-relaxed text-foreground/85">{parseBold(body)}</div>
      </div>
    </div>
  );
}

function ListBlock({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 mb-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm font-semibold leading-relaxed">
          <span className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
          <span>{parseBold(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function PersonBlock({
  name,
  dates,
  emoji,
  facts,
}: {
  name: string;
  dates: string;
  emoji: string;
  facts: string[];
}) {
  return (
    <div className="bg-secondary/5 border-2 border-secondary/20 rounded-2xl p-4 mb-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-12 w-12 rounded-2xl bg-secondary/15 flex items-center justify-center text-2xl shrink-0">
          {emoji}
        </div>
        <div>
          <div className="font-heading font-black text-base">{name}</div>
          <div className="text-xs font-semibold text-muted-foreground">{dates}</div>
        </div>
      </div>
      <ul className="flex flex-col gap-1.5">
        {facts.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm font-semibold">
            <span className="text-secondary mt-0.5">▸</span>
            <span>{parseBold(f)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimelineBlock({ items }: { items: { year: string; event: string }[] }) {
  return (
    <div className="relative mb-4 pl-2">
      <div className="absolute left-[2.15rem] top-0 bottom-0 w-0.5 bg-border" />
      <div className="flex flex-col gap-0">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 mb-3 relative">
            <div className="shrink-0 bg-primary text-white text-xs font-extrabold px-2 py-1 rounded-lg min-w-[3.5rem] text-center z-10">
              {item.year}
            </div>
            <div className="text-sm font-semibold leading-snug pt-1">{parseBold(item.event)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const calloutConfig = {
  remember: { emoji: "🧠", bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-400", label: "Remember", labelColor: "text-amber-700 dark:text-amber-400" },
  tip: { emoji: "💡", bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-400", label: "Exam tip", labelColor: "text-emerald-700 dark:text-emerald-400" },
  warning: { emoji: "⚠️", bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-400", label: "Watch out", labelColor: "text-red-700 dark:text-red-400" },
};

function CalloutBlock({ variant, text }: { variant: "remember" | "tip" | "warning"; text: string }) {
  const cfg = calloutConfig[variant];
  return (
    <div className={`flex gap-3 ${cfg.bg} border-l-4 ${cfg.border} rounded-r-2xl px-4 py-3.5 mb-4`}>
      <span className="text-xl shrink-0 mt-0.5">{cfg.emoji}</span>
      <div>
        <div className={`text-xs font-extrabold uppercase tracking-wide mb-1 ${cfg.labelColor}`}>{cfg.label}</div>
        <div className="text-sm font-semibold leading-relaxed">{parseBold(text)}</div>
      </div>
    </div>
  );
}

function NumbersBlock({ items }: { items: { value: string; label: string; emoji: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
      {items.map((item, i) => (
        <div key={i} className="bg-card border-2 border-border rounded-2xl p-3 text-center">
          <div className="text-2xl mb-1">{item.emoji}</div>
          <div className="font-heading font-black text-lg text-primary">{item.value}</div>
          <div className="text-xs font-semibold text-muted-foreground leading-tight">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

function TwoColBlock({
  left,
  right,
}: {
  left: { heading: string; items: string[] };
  right: { heading: string; items: string[] };
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
      {[left, right].map((col, i) => (
        <div key={i} className="bg-card border-2 border-border rounded-2xl p-4">
          <div className="font-heading font-black text-sm mb-2">{col.heading}</div>
          <ul className="flex flex-col gap-1.5">
            {col.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-sm font-semibold">
                <span className="text-primary mt-0.5">•</span>
                <span>{parseBold(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function MaterialRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "text":
            return <TextBlock key={i} text={block.text} />;
          case "heading":
            return <HeadingBlock key={i} text={block.text} />;
          case "keyFact":
            return <KeyFactBlock key={i} emoji={block.emoji} title={block.title} body={block.body} />;
          case "list":
            return <ListBlock key={i} items={block.items} />;
          case "person":
            return <PersonBlock key={i} name={block.name} dates={block.dates} emoji={block.emoji} facts={block.facts} />;
          case "timeline":
            return <TimelineBlock key={i} items={block.items} />;
          case "callout":
            return <CalloutBlock key={i} variant={block.variant} text={block.text} />;
          case "numbers":
            return <NumbersBlock key={i} items={block.items} />;
          case "twoCol":
            return <TwoColBlock key={i} left={block.left} right={block.right} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
