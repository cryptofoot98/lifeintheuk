"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, CheckCircle, ArrowRight, Lock, Star } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  reason?: "tests" | "exams" | "quiz" | "chapters" | "general";
  isLoggedIn?: boolean;
};

const REASON_COPY: Record<string, { headline: string; sub: string }> = {
  tests:    { headline: "You've used your 2 free practice tests", sub: "Unlock all 40 tests and keep your momentum going." },
  exams:    { headline: "You've used your free real exam set",     sub: "Access all 10 reported exam sets, same format as the real thing." },
  quiz:     { headline: "You've used your free quick quiz",        sub: "Unlimited quick quizzes come with the lifetime unlock." },
  chapters: { headline: "You've read your free chapter",           sub: "All 5 handbook chapters are included in the lifetime unlock." },
  general:  { headline: "Unlock the full Britzen experience",      sub: "Everything you need to pass — one small payment, forever." },
};

const FEATURES = [
  "All 40 practice tests",
  "All 10 real exam question sets",
  "Unlimited quick quizzes",
  "All 5 study material chapters",
  "Weak-area drill sessions",
  "Progress dashboard & streak tracking",
  "All future updates — forever",
];

export function UpgradeModal({ open, onClose, reason = "general", isLoggedIn = false }: Props) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const copy = REASON_COPY[reason];

  if (!open) return null;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = email
      ? `/auth/signup?email=${encodeURIComponent(email)}`
      : "/auth/signup";
    router.push(dest);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Sheet */}
      <div
        className="relative w-full sm:max-w-md bg-card border-2 border-border rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile drag handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-0">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full border-2 border-border text-muted-foreground hover:bg-muted/50 transition-colors"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="px-6 py-5">
          {/* Stars */}
          <div className="flex gap-0.5 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
            ))}
            <span className="text-xs font-bold text-muted-foreground ml-1.5">87% pass first time</span>
          </div>

          {/* Headline */}
          <h2 className="font-heading text-xl font-black mb-1 pr-8">{copy.headline}</h2>
          <p className="text-sm text-muted-foreground font-semibold mb-5 leading-relaxed">{copy.sub}</p>

          {/* Price pill */}
          <div className="flex items-center gap-3 mb-5 p-4 rounded-2xl border-2 border-primary/20 bg-primary/5">
            <div>
              <div className="text-xs font-extrabold text-primary uppercase tracking-wider">Lifetime unlock</div>
              <div className="font-heading text-3xl font-black leading-none mt-0.5">£8.90</div>
              <div className="text-xs text-muted-foreground font-semibold mt-0.5">one-time · no subscription · forever</div>
            </div>
            <div className="ml-auto text-4xl">🎖️</div>
          </div>

          {/* Feature list */}
          <ul className="flex flex-col gap-2 mb-5">
            {FEATURES.map(f => (
              <li key={f} className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          {/* CTA section */}
          {isLoggedIn ? (
            /* Logged-in: only needs to unlock */
            <a
              href="/unlock"
              className="btn-3d w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-2xl font-extrabold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              <Lock className="h-4 w-4" />
              Unlock lifetime access — £8.90
            </a>
          ) : (
            /* Not logged in: email capture form → signup */
            <form onSubmit={handleSignup} className="flex flex-col gap-3">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-0.5">
                Start free — no card needed
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 px-4 py-3 rounded-xl border-2 border-border bg-background text-sm font-semibold placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  type="submit"
                  className="btn-3d px-4 py-3 bg-primary text-white rounded-xl font-extrabold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 shrink-0"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => router.push("/auth/login")}
                className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors text-center"
              >
                Already have an account? Sign in →
              </button>
            </form>
          )}
        </div>

        {/* Bottom safe area */}
        <div className="sm:hidden" style={{ height: "env(safe-area-inset-bottom)" }} />
      </div>
    </div>
  );
}
