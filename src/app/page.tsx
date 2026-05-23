import Link from "next/link";
import { Nav } from "@/components/Nav";
import { FadeIn } from "@/components/FadeIn";
import { HeroParticles } from "@/components/HeroParticles";
import {
  Crown, CheckCircle, Target, BookOpen, BarChart2,
  Clock, ArrowRight, Star, Zap, Shield, Lock
} from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "Real exam conditions",
    body: "24 questions, 45 minutes — exactly like the real thing. You'll know exactly what to expect on test day.",
    dir: "left" as const,
  },
  {
    icon: Target,
    title: "Knows your weak spots",
    body: "Every wrong answer is tracked. We surface the topics you keep getting wrong so you fix them before it matters.",
    dir: "up" as const,
  },
  {
    icon: BookOpen,
    title: "Study mode",
    body: "No timer, instant explanations. Perfect for building knowledge before you test yourself under pressure.",
    dir: "right" as const,
  },
  {
    icon: BarChart2,
    title: "Progress dashboard",
    body: "See your score trend, accuracy by chapter, and a readiness score so you know when you're actually ready.",
    dir: "left" as const,
  },
  {
    icon: Zap,
    title: "105+ exam questions",
    body: "Covering all five official handbook chapters — history, government, culture, geography, and values.",
    dir: "up" as const,
  },
  {
    icon: Shield,
    title: "Explained, not just answered",
    body: "Every answer comes with a clear explanation rooted in the official handbook. Understanding beats memorising.",
    dir: "right" as const,
  },
];

const steps = [
  { n: "01", title: "Try it free", body: "Take a full 24-question practice test — no account needed. See exactly what you're dealing with." },
  { n: "02", title: "Unlock for life", body: "One payment. All 40 tests, study mode, chapter tests, weak-area drills, and your progress dashboard. Forever." },
  { n: "03", title: "Pass with confidence", body: "Study smart, track your progress, and walk into the exam knowing you're ready." },
];

const testimonials = [
  { name: "Amara O.", quote: "I'd failed twice before. Two weeks with this app and I passed with 23/24. The weak-area tracking is genius." },
  { name: "Tomasz W.", quote: "The design alone made me want to study. Everything else — the explanations, the progress tracking — just worked." },
  { name: "Priya M.", quote: "Finally an app that doesn't look like it was built in 2009. Passed first time, worth every penny." },
];

const faqs = [
  { q: "Is the free trial really free?", a: "Yes — one full 24-question timed test, no card required. You'll get a feel for the whole experience before deciding." },
  { q: "What does 'lifetime unlock' mean?", a: "One payment, no subscription, no renewal. You get full access to everything — all tests, all features — forever." },
  { q: "Is the content up to date?", a: "Yes. Questions are based on the 3rd edition of Life in the United Kingdom: A Guide for New Residents, the current official handbook." },
  { q: "Can I use it on my phone?", a: "Absolutely — the app is fully responsive and works beautifully on any device." },
  { q: "What if I fail the real test?", a: "Keep practising — your lifetime access doesn't expire. Most people who use the app consistently pass within their first or second attempt." },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Nav />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 hero-grid overflow-hidden">
        <HeroParticles />

        {/* Glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <FadeIn delay={0}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-8">
              <Crown className="h-3.5 w-3.5" />
              Updated for the 2026 exam
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
              Pass your Life in the UK
              <br />
              test{" "}
              <span className="gold-shimmer">first time.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Most people fail because they study the wrong way. We built the app we
              wish existed — beautifully designed, brutally effective, with a
              dashboard that shows you exactly where you stand.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02]"
              >
                Try one test free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 border border-border bg-background/50 backdrop-blur-sm px-7 py-3.5 rounded-xl font-semibold text-base hover:bg-muted/50 transition-all"
              >
                See how it works
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              {["No card required", "One test free", "Lifetime unlock available"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-primary" />
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/50">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-primary/40" />
          <span className="text-xs">scroll</span>
        </div>
      </section>

      {/* ── Social proof ───────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-border/50 bg-muted/20">
        <div className="mx-auto max-w-5xl px-4">
          <FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {[
                { value: "105+", label: "Practice questions" },
                { value: "40", label: "Full-length tests" },
                { value: "5", label: "Handbook chapters" },
                { value: "75%", label: "Pass mark to beat" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-heading text-3xl font-bold text-primary mb-1">{value}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">How it works</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold">Simple. Focused. Effective.</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-8">
            {steps.map(({ n, title, body }, i) => (
              <FadeIn key={n} direction="up" delay={i * 0.12}>
                <div className="relative p-6 rounded-2xl border border-border bg-card hover:border-primary/30 transition-colors group">
                  <div className="font-heading text-5xl font-bold text-primary/20 mb-4 group-hover:text-primary/30 transition-colors">
                    {n}
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-muted/10">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
                Everything you need. Nothing you don&apos;t.
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Other sites give you a list of questions. We give you a system.
              </p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, body, dir }, i) => (
              <FadeIn key={title} direction={dir} delay={i * 0.08}>
                <div className="p-5 rounded-2xl border border-border bg-card hover:border-primary/25 hover:shadow-md transition-all group h-full">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold text-base mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Stories</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold">They passed. You can too.</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map(({ name, quote }, i) => (
              <FadeIn key={name} direction="up" delay={i * 0.1}>
                <div className="p-6 rounded-2xl border border-border bg-card h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground flex-1 mb-4">&ldquo;{quote}&rdquo;</p>
                  <span className="text-sm font-semibold">{name}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4 bg-muted/10">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Pricing</p>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">Simple. Honest. Once.</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                No subscription. No monthly fees. Pay once, own it forever.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <FadeIn direction="left">
              <div className="p-7 rounded-2xl border border-border bg-card h-full flex flex-col">
                <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Free trial</div>
                <div className="font-heading text-4xl font-bold mb-1">£0</div>
                <div className="text-sm text-muted-foreground mb-6">No card needed</div>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {["1 full practice test (24 questions)", "Timed exam conditions", "Instant results and explanations"].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-muted-foreground/50 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className="w-full text-center border border-border py-2.5 rounded-xl font-semibold text-sm hover:bg-muted/50 transition-all"
                >
                  Start free trial
                </Link>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="relative p-7 rounded-2xl border-2 border-primary bg-card h-full flex flex-col shadow-lg shadow-primary/10">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Most popular
                </div>
                <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Lifetime unlock</div>
                <div className="font-heading text-4xl font-bold mb-1">£19</div>
                <div className="text-sm text-muted-foreground mb-6">One-time payment · yours forever</div>
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {[
                    "All 40 practice tests",
                    "Chapter-by-chapter study mode",
                    "Weak-area drill sessions",
                    "Progress dashboard & analytics",
                    "All future updates included",
                    "Works on any device",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className="w-full text-center bg-primary text-primary-foreground py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Unlock lifetime access
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-2xl">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
              <h2 className="font-heading text-3xl font-bold">Quick answers</h2>
            </div>
          </FadeIn>
          <div className="flex flex-col gap-4">
            {faqs.map(({ q, a }, i) => (
              <FadeIn key={q} direction="up" delay={i * 0.07}>
                <div className="p-5 rounded-2xl border border-border bg-card">
                  <h3 className="font-semibold mb-2">{q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-3xl" />
        <FadeIn>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <Crown className="h-10 w-10 text-primary mx-auto mb-6" />
            <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
              Your citizenship is worth
              <br />
              <span className="gold-shimmer">getting right.</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
              Don&apos;t leave it to chance. Try one test for free — no card, no commitment.
              If you like what you see, unlock everything for £19. One-time. Forever.
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-base hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:scale-[1.02]"
            >
              Try one test free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">No card required · Cancel any time · Lifetime access from £19</p>
          </div>
        </FadeIn>
      </section>

      <footer className="py-8 px-4 border-t border-border/50">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Crown className="h-3.5 w-3.5 text-primary" />
            <span>Life in the UK Test</span>
          </div>
          <p>
            Based on <em>Life in the United Kingdom: A Guide for New Residents, 3rd edition</em>. Unofficial practice site.
          </p>
          <div className="flex gap-4">
            <Link href="/auth/login" className="hover:text-foreground transition-colors">Sign in</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
