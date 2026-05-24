"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const CDN = "https://images.cryptofoot98.me/britzen";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/tests");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 hero-dots">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="h-14 w-14 flex items-center justify-center">
              <Image src={`${CDN}/logo_britzen.png`} alt="Britzen" width={56} height={56} className="drop-shadow-xl" />
            </div>
            <span className="font-heading font-black text-base">Britzen</span>
          </Link>
          <h1 className="font-heading text-2xl font-black mt-4 mb-1">Welcome back!</h1>
          <p className="text-muted-foreground text-sm font-semibold">Sign in to continue your preparation</p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center rounded-2xl border-2 border-border overflow-hidden text-sm font-extrabold mb-5">
          <Link
            href="/auth/login"
            className={cn("flex-1 text-center px-4 py-2.5 transition-colors", "bg-primary text-white")}
          >
            Sign in
          </Link>
          <div className="w-px h-6 bg-border shrink-0" />
          <Link
            href="/auth/signup"
            className={cn("flex-1 text-center px-4 py-2.5 transition-colors", "text-muted-foreground hover:text-foreground hover:bg-muted/60")}
          >
            Sign up
          </Link>
        </div>

        {/* Card */}
        <div className="bg-card border-2 border-border rounded-2xl p-7 shadow-xl shadow-black/8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-extrabold block mb-1.5" htmlFor="email">Email</label>
              <input
                id="email" type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border-2 border-border bg-background px-4 py-3 text-sm font-semibold focus:outline-none focus:border-primary transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-extrabold block mb-1.5" htmlFor="password">Password</label>
              <input
                id="password" type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border-2 border-border bg-background px-4 py-3 text-sm font-semibold focus:outline-none focus:border-primary transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-sm font-semibold text-destructive bg-destructive/10 px-4 py-3 rounded-2xl border-2 border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              className="btn-3d w-full bg-primary text-white py-3 rounded-2xl font-extrabold text-sm hover:bg-primary/90 transition-colors shadow-md shadow-primary/25 disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
            >
              {loading ? "Signing in…" : (<>Sign in <ArrowRight className="h-4 w-4" /></>)}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
