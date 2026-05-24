"use client";

type Props = {
  remaining: number;
  loading?: boolean;
  isUnlimited?: boolean;
  label?: string; // e.g. "quiz", "exam" — used in "N left" text
};

export function FreeBadge({ remaining, loading, isUnlimited, label }: Props) {
  if (loading || isUnlimited) return null;

  if (remaining <= 0) {
    return (
      <span className="absolute -top-2.5 -right-2.5 z-10 inline-flex items-center gap-0.5 bg-amber-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md shadow-amber-500/40 select-none pointer-events-none">
        🔒 Upgrade
      </span>
    );
  }

  const text = remaining === 1
    ? `1 ${label ?? "free"}`
    : `${remaining} ${label ? `${label}s` : "free"}`;

  return (
    <span
      className="absolute -top-2.5 -right-2.5 z-10 inline-flex items-center gap-0.5 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md select-none pointer-events-none"
      style={{
        background: "oklch(0.45 0.20 264)",      /* British blue */
        boxShadow: "0 2px 8px oklch(0.45 0.20 264 / 40%)",
      }}
    >
      {text}
    </span>
  );
}
