"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Direction = "up" | "left" | "right" | "none";

type Props = {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
};

const variants = {
  up:    { hidden: { opacity: 0, y: 40 },   visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -40 },  visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 40 },   visible: { opacity: 1, x: 0 } },
  none:  { hidden: { opacity: 0 },           visible: { opacity: 1 } },
};

export function FadeIn({ children, direction = "up", delay = 0, className, once = true }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants[direction]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
