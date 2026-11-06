"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";

interface ScrollParallaxProps {
  children: ReactNode;
  className?: string;
  /** Vertical travel in px over the first viewport of scroll. */
  distance?: number;
}

/** Moves its content slower than the page while the first screen scrolls away. */
export function ScrollParallax({ children, className, distance = 120 }: ScrollParallaxProps) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, reduce ? 0 : distance]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
