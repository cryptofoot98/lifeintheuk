"use client";

import Link from "next/link";
import { useState } from "react";
import { Crown, ArrowRight, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (data.session) {
      // Email confirmation disabled — user is logged in immediately
      router.push("/tests");
      router.refresh();
    } else {
      // Email confirmation still enabled — show message
      router.push("/auth/check-email?email=" + encodeURIComponent(email));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 hero-grid">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-64 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <Crown className="h-5 w-5 text-primary" />
            <span className="font-heading font-semibold">Life in the UK</span>
          </Link>
          <h1 className="font-heading text-2xl font-bold mb-1">Start your free trial</h1>
          <p className="text-muted-foreground text-sm">One test free — no card required</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-7 shadow-xl shadow-black/10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium block mb-1.5" htmlFor="email">Email</label>
              <input
                id="email" type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5" htmlFor="password">Password</label>
              <input
                id="password" type="password" required minLength={8} value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                placeholder="At least 8 characters"
              />
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 px-3.5 py-2.5 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
            >
              {loading ? "Creating account…" : (<>Create free account <ArrowRight className="h-4 w-4" /></>)}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-border flex flex-col gap-2">
            {["One test completely free", "Lifetime unlock from £19", "No subscription ever"].map((t) => (
              <div key={t} className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                {t}
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-5">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary font-medium hover:underline underline-offset-2">
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
}
