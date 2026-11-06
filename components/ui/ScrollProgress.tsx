"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Thin accent bar fixed to the top that fills as the page scrolls.
 * Animates transform only. With reduced motion it follows the scroll
 * position directly instead of easing through a spring.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  const scaleX = reduce ? scrollYProgress : smooth;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
    />
  );
}
