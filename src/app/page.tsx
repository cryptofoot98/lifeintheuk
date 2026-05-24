import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { FadeIn } from "@/components/FadeIn";
import { HeroSection } from "@/components/HeroSection";
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
    body: "Take one full 24-question timed practice test — create a free account and start immediately.",
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
    a: "Yes — one full 24-question timed test, completely free. You get the real experience before deciding whether to unlock.",
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

function Wave({
  from,
  to,
  flip = false,
}: {
  from: string;
  to: string;
  flip?: boolean;
}) {
  const d = flip
    ? "M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z"
    : "M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z";
  return (
    <div className={`${from} overflow-hidden leading-none -mb-px`}>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ width: "100%", height: 60, display: "block" }}
        aria-hidden
      >
        <path d={d} style={{ fill: to }} />
      </svg>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Nav />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* Wave: background → card */}
      <Wave from="bg-background" to="var(--card)" />

      {/* ── Stats bar ──────────────────────────────────────────────────────── */}
      <section className="py-14 bg-card">
        <div className="mx-auto max-w-5xl px-4">
          <FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: "105+", label: "Practice questions", emoji: "❓" },
                { value: "40", label: "Full-length tests", emoji: "📝" },
                { value: "5", label: "Handbook chapters", emoji: "📚" },
                { value: "75%", label: "Pass mark to beat", emoji: "🎯" },
              ].map(({ value, label, emoji }) => (
                <div key={label} className="p-5 rounded-2xl border-2 border-border bg-background text-center hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="text-2xl mb-2">{emoji}</div>
                  <div className="font-heading text-3xl font-black text-primary mb-1">{value}</div>
                  <div className="text-sm text-muted-foreground font-semibold">{label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Wave: card → background */}
      <Wave from="bg-card" to="var(--background)" flip />

      {/* ── How it works ───────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 px-4 bg-background">
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

      {/* Wave: background → card */}
      <Wave from="bg-background" to="var(--card)" />

      {/* ── Features ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-card">
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
                <div className="p-5 rounded-2xl border-2 border-border bg-background hover:border-primary/25 hover:shadow-lg transition-all group h-full">
                  <Image src={iconUrl} alt="" width={48} height={48} className="mb-3 w-12 h-12" />
                  <h3 className="font-heading font-extrabold text-base mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Wave: card → primary */}
      <div className="bg-card overflow-hidden leading-none -mb-px">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: 60, display: "block" }} aria-hidden>
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" style={{ fill: "var(--primary)" }} />
        </svg>
      </div>

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

      {/* Wave: primary → background */}
      <div className="bg-primary overflow-hidden leading-none -mb-px">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: 60, display: "block" }} aria-hidden>
          <path d="M0,20 C360,60 1080,0 1440,40 L1440,60 L0,60 Z" style={{ fill: "var(--background)" }} />
        </svg>
      </div>

      {/* ── Testimonials ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-background">
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

      {/* Wave: background → card */}
      <Wave from="bg-background" to="var(--card)" flip />

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4 bg-card">
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
              <div className="p-8 rounded-2xl border-2 border-primary bg-background flex flex-col shadow-xl shadow-primary/15">
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
                    "First test always free",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm font-semibold">
                      <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/login"
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

      {/* Wave: card → background */}
      <Wave from="bg-card" to="var(--background)" />

      {/* ── App Download ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-background">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-block bg-secondary/10 text-secondary text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              Mobile app
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-black mb-3">
              Study anywhere
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto font-medium">
              Britzen is coming to iOS and Android. Study on the bus, on your lunch break — keep your streak alive wherever you are.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {/* Apple App Store badge */}
              <a
                href="#"
                aria-label="Download on the App Store (coming soon)"
                className="inline-flex items-center gap-3 bg-foreground text-background px-5 py-3 rounded-[14px] hover:opacity-80 transition-opacity"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" className="fill-current shrink-0">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[10px] font-medium opacity-70">Download on the</div>
                  <div className="text-base font-extrabold tracking-tight">App Store</div>
                </div>
              </a>

              {/* Google Play badge */}
              <a
                href="#"
                aria-label="Get it on Google Play (coming soon)"
                className="inline-flex items-center gap-3 bg-foreground text-background px-5 py-3 rounded-[14px] hover:opacity-80 transition-opacity"
              >
                <svg width="22" height="26" viewBox="0 0 22 24" className="shrink-0">
                  <path fill="#EA4335" d="M0.02 0.35L11.42 12 0.02 23.65A1.98 1.98 0 0 1 0 23V1C0 .74.01.54.02.35Z" />
                  <path fill="#FBBC04" d="M21.56 10.54L18.44 8.73 14.38 12l4.06 3.27 3.12-1.81A2 2 0 0 0 21.56 10.54Z" />
                  <path fill="#4285F4" d="M11.42 12L0.02 23.65C.47 23.88 1.02 23.82 1.43 23.59L14.38 16.24 11.42 12Z" />
                  <path fill="#34A853" d="M14.38 7.76L1.43.41C1.02.18.47.12.02.35L11.42 12l2.96-4.24Z" />
                </svg>
                <div className="text-left leading-tight">
                  <div className="text-[10px] font-medium opacity-70">Get it on</div>
                  <div className="text-base font-extrabold tracking-tight">Google Play</div>
                </div>
              </a>
            </div>
            <p className="mt-5 text-xs text-muted-foreground font-semibold">
              Coming soon — web app available now
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Wave: background → card */}
      <Wave from="bg-background" to="var(--card)" flip />

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 bg-card">
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
                <div className="p-5 rounded-2xl border-2 border-border bg-background hover:border-primary/20 transition-colors">
                  <h3 className="font-extrabold mb-2 text-sm">{q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">{a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Wave: card → background */}
      <Wave from="bg-card" to="var(--background)" />

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="py-28 px-4 bg-background relative overflow-hidden">
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
              Don&apos;t leave it to chance. Your first test is free — no commitment. If you like what you see, unlock everything for £8.90. One-time. Forever.
            </p>
            <Link
              href="/auth/login"
              className="btn-3d inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-2xl font-extrabold text-lg hover:bg-primary/90 transition-colors shadow-xl shadow-primary/30"
            >
              Get started
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-4 text-xs text-muted-foreground font-semibold">
              1 test free · Lifetime access £8.90 · No subscription
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Wave into footer */}
      <Wave from="bg-background" to="var(--card)" flip />

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="py-8 px-4 bg-card">
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
