"use client";
import Link from "next/link";
import { CheckCircle, ArrowRight, Lock } from "lucide-react";

type Props = { reason?: "trial-used" | "not-logged-in" };

export function Paywall({ reason = "trial-used" }: Props) {
  const isGuest = reason === "not-logged-in";

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm text-center">

        {/* Icon */}
        <div className="text-6xl mb-5">{isGuest ? "🔐" : "🏆"}</div>

        <h2 className="font-heading text-2xl font-black mb-2">
          {isGuest ? "Create a free account to continue" : "Unlock the full app"}
        </h2>

        <p className="text-muted-foreground font-semibold mb-7 leading-relaxed text-sm">
          {isGuest
            ? "Sign up free and get one full practice test. Unlock everything for £19 — one-time, forever."
            : "You've used your free trial. Unlock all 40 tests, study mode, weak-area tracking, and your progress dashboard for a one-time payment of £19."}
        </p>

        {/* Pricing card */}
        <div className="bg-card border-2 border-primary rounded-2xl p-6 mb-5 text-left shadow-xl shadow-primary/15">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-extrabold text-primary uppercase tracking-wider mb-0.5">Lifetime unlock</div>
              <div className="font-heading text-4xl font-black">£19</div>
              <div className="text-xs text-muted-foreground font-semibold">one-time · no subscription</div>
            </div>
            <span className="text-4xl">🎖️</span>
          </div>
          <ul className="flex flex-col gap-2">
            {[
              "All 40 practice tests",
              "Chapter study mode",
              "Weak-area drill sessions",
              "Progress dashboard",
              "Streak tracking + XP",
              "All future updates",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col gap-3">
          {isGuest ? (
            <>
              <Link
                href="/auth/signup"
                className="btn-3d w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-2xl font-extrabold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
              >
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth/login"
                className="w-full flex items-center justify-center border-2 border-border py-3.5 rounded-2xl text-sm font-extrabold hover:bg-muted/50 transition-colors"
              >
                Sign in
              </Link>
            </>
          ) : (
            <Link
              href="/unlock"
              className="btn-3d w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-2xl font-extrabold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              <Lock className="h-4 w-4" />
              Unlock lifetime access — £19
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
