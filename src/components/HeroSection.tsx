"use client";

import { useAnimate } from "framer-motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const CDN = "https://images.cryptofoot98.me/britzen";

// Each icon: starting angle (degrees), orbit radius, size, revolution duration (seconds)
const ORBIT = [
  { src: `${CDN}/icon_royalguard.png`,      a: -90, r: 200, s: 60, d: 18 },
  { src: `${CDN}/icon_blackcab.png`,         a: -18, r: 220, s: 52, d: 24 },
  { src: `${CDN}/icon_bigben.png`,           a:  54, r: 196, s: 56, d: 21 },
  { src: `${CDN}/icon_telephonecabin.png`,   a: 126, r: 214, s: 48, d: 19 },
  { src: `${CDN}/icon_unionjack.png`,        a: 198, r: 190, s: 44, d: 26 },
];

export function HeroSection() {
  const [logoRef, animateLogo] = useAnimate();

  async function handleLogoClick() {
    await animateLogo(logoRef.current, {
      rotate: [0, -10, 10, -7, 7, -3, 3, 0],
      scale:  [1,   1.14, 0.9, 1.08, 0.97, 1],
    }, { duration: 0.55 });
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 overflow-hidden hero-dots">
      {/* Glow blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[700px] h-[500px] bg-primary/7 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-secondary/7 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Interactive icon cluster ─────────────────────────────────── */}
      <div className="relative mb-8 shrink-0" style={{ width: 480, height: 480 }}>
        {/* Dashed orbit ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-border/35 pointer-events-none" />

        {/* Orbiting icons: arm technique — arm rotates, icon counter-rotates to stay upright */}
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
              <Image src={src} alt="" width={s} height={s} className="drop-shadow-md opacity-80" />
            </motion.div>
          </motion.div>
        ))}

        {/* Floating main logo */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.button
            ref={logoRef}
            onClick={handleLogoClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.88 }}
            className="cursor-pointer focus:outline-none relative group"
            aria-label="Tap the logo"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 rounded-full bg-primary/25 blur-2xl scale-[1.8] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <Image
              src={`${CDN}/logo_britzen.png`}
              alt="Britzen"
              width={200}
              height={200}
              className="relative drop-shadow-2xl"
              priority
            />
          </motion.button>
        </motion.div>
      </div>

      {/* ── Wordmark ─────────────────────────────────────────────────── */}
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.55 }}
        className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black tracking-[0.18em] uppercase text-center mb-3"
      >
        BRITZEN
      </motion.h1>

      {/* ── Tagline ──────────────────────────────────────────────────── */}
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

      {/* ── CTA buttons ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.55 }}
        className="flex flex-col sm:flex-row gap-3 mb-7"
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
          className="inline-flex items-center justify-center gap-2 border-2 border-border bg-background px-8 py-3.5 rounded-2xl font-bold text-base hover:bg-muted/50 transition-colors"
        >
          How it works
        </Link>
      </motion.div>

      {/* ── Trust signals ────────────────────────────────────────────── */}
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
    </section>
  );
}
