import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { FadeIn } from "@/components/FadeIn";
import { PhoneMockup } from "@/components/PhoneMockup";
import { CheckCircle, ArrowRight, Star, Lock } from "lucide-react";

const CDN = "https://images.cryptofoot98.me/britzen";

const features = [
  {
    iconUrl: `${CDN}/icon_bigben.png`,
    title: "Real exam conditions",
    body: "24 questions, 45 minutes — exactly like the real test. You'll know exactly what to expect on test day.",
    dir: "left" as const,
  },
  {
    iconUrl: `${CDN}/icon_policeofficer.png`,
    title: "Tracks your weak spots",
    body: "Every wrong answer is remembered. We surface the topics you keep missing so you fix them before it matters.",
    dir: "up" as const,
  },
  {
    iconUrl: `${CDN}/icon_hat_tea.png`,
    title: "Study mode",
    body: "No timer, instant explanations. Perfect for building solid knowledge before testing yourself under pressure.",
    dir: "right" as const,
  },
  {
    iconUrl: `${CDN}/icon_telephonecabin.png`,
    title: "Progress dashboard",
    body: "Score trends, accuracy by chapter, streak counter. Know exactly how ready you are before you book the test.",
    dir: "left" as const,
  },
  {
    iconUrl: `${CDN}/icon_unionjack.png`,
    title: "105+ real questions",
    body: "Covering all five official handbook chapters — history, government, values, culture, and geography.",
    dir: "up" as const,
  },
  {
    iconUrl: `${CDN}/icon_breakfast.png`,
    title: "Explained, not just tested",
    body: "Every answer has a clear explanation from the official handbook. Understanding beats memorising every time.",
    dir: "right" as const,
  },
];

const steps = [
  {
    n: "1",
    iconUrl: `${CDN}/icon_bus.png`,
    title: "Try it free",
    body: "Take a full 24-question timed practice test right now — no account needed. Zero commitment.",
  },
  {
    n: "2",
    iconUrl: `${CDN}/icon_blackcab.png`,
    title: "Unlock for life",
    body: "One small payment. All 40 tests, study mode, weak-area drills, and progress dashboard. Forever.",
  },
  {
    n: "3",
    iconUrl: `${CDN}/icon_royalguard.png`,
    title: "Pass with confidence",
    body: "Study smart, track your progress, and walk into the exam room knowing you are genuinely ready.",
  },
];

const testimonials = [
  {
    name: "Amara O.",
    country: "🇳🇬",
    quote: "I'd failed twice before. Two weeks with this app and I passed 23/24. The weak-area tracking genuinely changed how I studied.",
  },
  {
    name: "Tomasz W.",
    country: "🇵🇱",
    quote: "The design alone made me want to open it every day. The explanations are brilliant — I actually understand the answers now.",
  },
  {
    name: "Priya M.",
    country: "🇮🇳",
    quote: "Finally an app that doesn't look like it was built in 2005. Passed first time, worth every single penny.",
  },
];

const faqs = [
  {
    q: "Is the free trial really free?",
    a: "Yes — one full 24-question timed test, no card required. You get the complete experience before deciding.",
  },
  {
    q: "What does 'lifetime unlock' mean?",
    a: "One payment, no subscription, no renewal. You get full access to everything — all 40 tests, all features — forever.",
  },
  {
    q: "Is the content up to date?",
    a: "Yes. Questions are based on Life in the United Kingdom: A Guide for New Residents, 3rd edition — the current official handbook.",
  },
  {
    q: "Can I use it on my phone?",
    a: "Absolutely — the app is fully responsive and feels completely native on any mobile device.",
  },
  {
    q: "What if I fail the real test?",
    a: "Your lifetime access doesn't expire — keep practising as long as you need. Most consistent users pass in their first or second attempt.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Nav />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center px-4 pt-20 pb-16 hero-dots overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-6xl w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left — copy */}
          <div className="flex flex-col items-start">
            <FadeIn delay={0}>
              <div className="mb-5">
                <Image
                  src={`${CDN}/logo_britzen.png`}
                  alt="Britzen"
                  width={96}
                  height={96}
                  className="drop-shadow-2xl"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-sm font-bold mb-8">
                Updated for the 2026 exam
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1 className="font-heading text-5xl sm:text-6xl font-black tracking-tight leading-[1.1] mb-5">
                Pass your Life in the UK test.{" "}
                <span
                  style={{
                    background: "linear-gradient(105deg, #C8102E 20%, #e83050 50%, #C8102E 80%)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmer 3s linear infinite",
                  }}
                >
                  First time.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed font-medium">
                Most people fail because they study the wrong way. We built the app we wish existed — beautiful, focused, and brutally effective.
              </p>
            </FadeIn>

            <FadeIn delay={0.22}>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/auth/signup"
                  className="btn-3d inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-2xl font-extrabold text-base hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                >
                  Start free trial
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 border-2 border-border bg-background px-8 py-3.5 rounded-2xl font-bold text-base hover:bg-muted/50 transition-colors"
                >
                  How it works
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.28}>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-muted-foreground">
                {["No card required", "One test free", "Lifetime unlock — £8.90"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-primary" />
                    {t}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right — phone mockup with floating icons */}
          <FadeIn delay={0.1} direction="right">
            <div className="flex justify-center lg:justify-end relative">
              {/* Decorative floating icons — desktop only */}
              <div className="absolute -top-6 left-6 opacity-80 -rotate-12 pointer-events-none hidden lg:block">
                <Image src={`${CDN}/icon_royalguard.png`} alt="" width={60} height={60} className="drop-shadow-lg" />
              </div>
              <div className="absolute top-20 -left-2 opacity-70 rotate-6 pointer-events-none hidden lg:block">
                <Image src={`${CDN}/icon_blackcab.png`} alt="" width={52} height={52} className="drop-shadow-md" />
              </div>
              <div className="absolute bottom-36 -left-4 opacity-75 -rotate-8 pointer-events-none hidden lg:block">
                <Image src={`${CDN}/icon_telephonecabin.png`} alt="" width={50} height={50} className="drop-shadow-md" />
              </div>
              <div className="absolute bottom-16 left-4 opacity-70 rotate-10 pointer-events-none hidden lg:block">
                <Image src={`${CDN}/icon_whisky.png`} alt="" width={46} height={46} className="drop-shadow-sm" />
              </div>
              <PhoneMockup />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────────────── */}
      <section className="py-14 border-y border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-4">
          <FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
              {[
                { value: "105+", label: "Practice questions", emoji: "❓" },
                { value: "40", label: "Full-length tests", emoji: "📝" },
                { value: "5", label: "Handbook chapters", emoji: "📚" },
                { value: "75%", label: "Pass mark to beat", emoji: "🎯" },
              ].map(({ value, label, emoji }) => (
                <div key={label}>
                  <div className="text-2xl mb-1">{emoji}</div>
                  <div className="font-heading text-3xl font-black text-primary mb-1">{value}</div>
                  <div className="text-sm text-muted-foreground font-semibold">{label}</div>
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
            <div className="text-center mb-14">
              <div className="inline-block bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                How it works
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black">Simple. Focused. Effective.</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-5">
            {steps.map(({ n, iconUrl, title, body }, i) => (
              <FadeIn key={n} direction="up" delay={i * 0.1}>
                <div className="relative p-6 rounded-2xl border-2 border-border bg-card hover:border-primary/30 hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-md shadow-primary/30">
                      {n}
                    </div>
                    <Image src={iconUrl} alt="" width={40} height={40} className="w-10 h-10" />
                  </div>
                  <h3 className="font-heading text-xl font-extrabold mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-muted/20">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="inline-block bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                Features
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black mb-3">
                Everything you need. Nothing you don&apos;t.
              </h2>
              <p className="text-muted-foreground max-w-lg mx-auto font-medium">
                Other sites give you a list of questions. We give you a system designed to make you pass.
              </p>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ iconUrl, title, body, dir }, i) => (
              <FadeIn key={title} direction={dir} delay={i * 0.07}>
                <div className="p-5 rounded-2xl border-2 border-border bg-card hover:border-primary/25 hover:shadow-lg transition-all group h-full">
                  <Image src={iconUrl} alt="" width={48} height={48} className="mb-3 w-12 h-12" />
                  <h3 className="font-heading font-extrabold text-base mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Streak / Social proof strip ───────────────────────────────────── */}
      <section className="py-14 px-4 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(white 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }} />
        <FadeIn>
          <div className="relative z-10 mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
            {[
              { icon: "🔥", stat: "7 day", label: "average streak" },
              { icon: "✅", stat: "87%", label: "of users pass first time" },
              { icon: "⭐", stat: "4.9/5", label: "average rating" },
            ].map(({ icon, stat, label }) => (
              <div key={label} className="text-center sm:text-left flex items-center gap-4">
                <span className="text-4xl">{icon}</span>
                <div>
                  <div className="font-heading text-2xl font-black">{stat}</div>
                  <div className="text-sm text-white/75 font-semibold">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-5xl">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="inline-block bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                Real stories
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black">They passed. You&apos;re next.</h2>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map(({ name, country, quote }, i) => (
              <FadeIn key={name} direction="up" delay={i * 0.1}>
                <div className="p-6 rounded-2xl border-2 border-border bg-card h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground flex-1 mb-5 font-medium">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{country}</span>
                    <span className="text-sm font-extrabold">{name}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4 bg-muted/20">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <div className="text-center mb-14">
              <div className="inline-block bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                Pricing
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black mb-3">Simple. Honest. Once.</h2>
              <p className="text-muted-foreground max-w-md mx-auto font-medium">
                No subscription. No monthly fees. Pay once and own it forever.
              </p>
            </div>
          </FadeIn>

          <div className="max-w-md mx-auto">
            <FadeIn>
              <div className="p-8 rounded-2xl border-2 border-primary bg-card flex flex-col shadow-xl shadow-primary/15">
                <Image src={`${CDN}/icon_royalguard.png`} alt="" width={56} height={56} className="w-14 h-14 mb-4" />
                <div className="text-xs font-extrabold text-primary uppercase tracking-wider mb-3">Lifetime unlock</div>
                <div className="flex items-end gap-2 mb-1">
                  <div className="font-heading text-5xl font-black">£8.90</div>
                </div>
                <div className="text-sm text-muted-foreground font-semibold mb-6">One-time · yours forever · no subscription</div>
                <ul className="flex flex-col gap-3 mb-8">
                  {[
                    "All 40 practice tests",
                    "Chapter-by-chapter study mode",
                    "Weak-area drill sessions",
                    "Progress dashboard & analytics",
                    "Streak tracking & XP",
                    "All future updates included",
                    "First test always free — no card needed",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm font-semibold">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/signup"
                  className="btn-3d w-full text-center bg-primary text-white py-3.5 rounded-2xl font-extrabold text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Get lifetime access — £8.90
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
            <div className="text-center mb-12">
              <div className="inline-block bg-primary/10 text-primary text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                FAQ
              </div>
              <h2 className="font-heading text-3xl font-black">Quick answers</h2>
            </div>
          </FadeIn>
          <div className="flex flex-col gap-3">
            {faqs.map(({ q, a }, i) => (
              <FadeIn key={q} direction="up" delay={i * 0.06}>
                <div className="p-5 rounded-2xl border-2 border-border bg-card hover:border-primary/20 transition-colors">
                  <h3 className="font-extrabold mb-2 text-sm">{q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">{a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 hero-dots opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary/8 rounded-full blur-3xl" />
        <FadeIn>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <Image src={`${CDN}/logo_britzen.png`} alt="Britzen" width={96} height={96} className="mx-auto mb-6 drop-shadow-2xl" />
            <h2 className="font-heading text-4xl sm:text-5xl font-black mb-4">
              Your citizenship is worth
              <br />
              <span className="text-primary">getting right.</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed font-medium">
              Don&apos;t leave it to chance. Try one test for free — no card, no commitment. If you like what you see, unlock everything for £8.90. One-time. Forever.
            </p>
            <Link
              href="/auth/signup"
              className="btn-3d inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-2xl font-extrabold text-lg hover:bg-primary/90 transition-colors shadow-xl shadow-primary/30"
            >
              Start free trial now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-4 text-xs text-muted-foreground font-semibold">
              No card required · Lifetime access from £8.90 · Cancel any time
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="py-8 px-4 border-t-2 border-border">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-semibold">
          <div className="flex items-center gap-2">
            <Image src={`${CDN}/logo_britzen.png`} alt="Britzen" width={20} height={20} className="w-5 h-5 shrink-0" />
            <span className="font-extrabold text-foreground">Britzen</span>
          </div>
          <p className="text-center">
            Based on <em>Life in the United Kingdom: A Guide for New Residents, 3rd edition</em>. Unofficial practice site.
          </p>
          <div className="flex flex-col items-end gap-1">
            <div className="flex gap-5">
              <Link href="/auth/login" className="hover:text-foreground transition-colors">Sign in</Link>
              <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            </div>
            <span className="text-muted-foreground/60">Developed by Eric Tavares</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
