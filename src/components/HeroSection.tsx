"use client";

import { useAnimate, motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState, useCallback } from "react";

const CDN = "https://images.cryptofoot98.me/britzen";

const ORBIT = [
  { src: `${CDN}/icon_royalguard.png`,    a: -90, r: 220, s: 64, d: 18 },
  { src: `${CDN}/icon_blackcab.png`,       a: -18, r: 242, s: 54, d: 24 },
  { src: `${CDN}/icon_bigben.png`,         a:  54, r: 216, s: 58, d: 21 },
  { src: `${CDN}/icon_telephonecabin.png`, a: 126, r: 238, s: 50, d: 19 },
  { src: `${CDN}/icon_unionjack.png`,      a: 198, r: 210, s: 46, d: 26 },
];

const BURST = ["❤️","🇬🇧","⭐","🎉","🏆","🌟","🎓","✨","🦅","💙","🏅","🎊"];

type Particle = { id: number; emoji: string; tx: number; ty: number; rotate: number; size: number };

export function HeroSection() {
  const [logoRef, animateLogo] = useAnimate();
  const [particles, setParticles] = useState<Particle[]>([]);

  const triggerBurst = useCallback(async () => {
    // Start press animation
    const anim = animateLogo(
      logoRef.current,
      { scale: [1, 0.72, 1.18, 0.92, 1.06, 0.98, 1] },
      { duration: 0.55, ease: "easeOut" }
    );

    // Emit particles ~100ms in (logo at deepest press)
    setTimeout(() => {
      const count = 14;
      const fresh: Particle[] = Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * 360 + (Math.random() - 0.5) * 22;
        const dist  = 140 + Math.random() * 130;
        const rad   = (angle * Math.PI) / 180;
        return {
          id: Date.now() + i,
          emoji: BURST[Math.floor(Math.random() * BURST.length)],
          tx: Math.cos(rad) * dist,
          ty: Math.sin(rad) * dist,
          rotate: -220 + Math.random() * 440,
          size: 22 + Math.floor(Math.random() * 20),
        };
      });
      setParticles((p) => [...p, ...fresh]);
      setTimeout(() => setParticles((p) => p.filter((x) => !fresh.find((f) => f.id === x.id))), 1500);
    }, 100);

    await anim;
  }, [animateLogo, logoRef]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-10 overflow-hidden hero-dots">
      {/* Glow blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[800px] h-[600px] bg-primary/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[400px] bg-secondary/6 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Icon cluster ─────────────────────────────────────────────────── */}
      <div
        className="relative mb-4 shrink-0"
        style={{ width: "min(560px, 96vw)", height: "min(560px, 96vw)" }}
      >
        {/* Dashed orbit ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-border/25 pointer-events-none" />

        {/* Orbiting icons — arm technique */}
        {ORBIT.map(({ src, a, r, s, d }, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none select-none"
            style={{ left: "50%", top: "50%", width: 0, height: 0 }}
            initial={{ rotate: a }}
            animate={{ rotate: a + 360 }}
            transition={{ duration: d, repeat: Infinity, ease: "linear" }}
          >
            <motion.div
              style={{ position: "absolute", left: r - s / 2, top: -s / 2 }}
              initial={{ rotate: -a }}
              animate={{ rotate: -a - 360 }}
              transition={{ duration: d, repeat: Infinity, ease: "linear" }}
            >
              <Image src={src} alt="" width={s} height={s} className="drop-shadow-xl opacity-90" />
            </motion.div>
          </motion.div>
        ))}

        {/* Burst particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute pointer-events-none select-none z-20"
              style={{ left: "50%", top: "50%", fontSize: p.size, lineHeight: 1 }}
              initial={{ x: -p.size / 2, y: -p.size / 2, scale: 0, opacity: 1, rotate: 0 }}
              animate={{
                x: p.tx - p.size / 2,
                y: p.ty - p.size / 2,
                scale: [0, 1.6, 1.2, 0.6],
                opacity: [1, 1, 0.85, 0],
                rotate: p.rotate,
              }}
              transition={{ duration: 1.15, ease: "easeOut" }}
            >
              {p.emoji}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Floating main logo */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.button
            ref={logoRef}
            onClick={triggerBurst}
            className="cursor-pointer focus:outline-none relative group"
            whileHover={{ scale: 1.05 }}
            aria-label="Tap me!"
          >
            {/* Pulse glow ring */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-[1.9] opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
            <Image
              src={`${CDN}/logo_britzen.png`}
              alt="Britzen"
              width={240}
              height={240}
              className="relative drop-shadow-2xl"
              priority
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Wordmark */}
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.55 }}
        className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black tracking-[0.18em] uppercase text-center mb-3"
      >
        BRITZEN
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.55 }}
        className="text-xl sm:text-2xl font-bold text-muted-foreground text-center max-w-md mb-8 leading-snug"
      >
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
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.55 }}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <Link
          href="/auth/signup"
          className="btn-3d inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3.5 rounded-2xl font-extrabold text-base hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
        >
          Start free trial
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="#how-it-works"
          className="inline-flex items-center justify-center gap-2 border-2 border-border bg-background/80 backdrop-blur-sm px-8 py-3.5 rounded-2xl font-bold text-base hover:bg-muted/50 transition-colors"
        >
          How it works
        </Link>
      </motion.div>

      {/* Trust signals */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.32, duration: 0.55 }}
        className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold text-muted-foreground"
      >
        {["1 test free", "Lifetime unlock · £8.90", "No subscription"].map((t) => (
          <span key={t} className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-primary" />
            {t}
          </span>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-border/50 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-muted-foreground/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
