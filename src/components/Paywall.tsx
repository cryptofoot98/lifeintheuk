"use client";
import Link from "next/link";
import { Lock, CheckCircle, ArrowRight, Crown } from "lucide-react";

type Props = { reason?: "trial-used" | "not-logged-in" };

export function Paywall({ reason = "trial-used" }: Props) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <Lock className="h-8 w-8 text-primary" />
        </div>

        <h2 className="font-heading text-2xl font-bold mb-3">
          {reason === "not-logged-in" ? "Create a free account to continue" : "Unlock the full app"}
        </h2>

        <p className="text-muted-foreground mb-8 leading-relaxed">
          {reason === "not-logged-in"
            ? "Sign up for free and get one full practice test. Unlock everything for £19 — one-time, forever."
            : "You've used your free trial. Unlock all 40 tests, study mode, weak-area tracking, and your progress dashboard for a one-time payment of £19."}
        </p>

        <div className="bg-card border-2 border-primary rounded-2xl p-6 mb-6 text-left shadow-lg shadow-primary/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-0.5">Lifetime unlock</div>
              <div className="font-heading text-3xl font-bold">£19</div>
            </div>
            <Crown className="h-8 w-8 text-primary/40" />
          </div>
          <ul className="flex flex-col gap-2">
            {[
              "All 40 practice tests",
              "Chapter study mode",
              "Weak-area drill sessions",
              "Progress dashboard",
              "All future updates",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          {reason === "not-logged-in" ? (
            <>
              <Link
                href="/auth/signup"
                className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
              >
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/auth/login"
                className="w-full flex items-center justify-center border border-border py-3 rounded-xl text-sm font-medium hover:bg-muted/50 transition-all"
              >
                Sign in
              </Link>
            </>
          ) : (
            <Link
              href="/unlock"
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
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
