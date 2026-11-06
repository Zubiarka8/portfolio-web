"use client";

import { motion, type HTMLMotionProps, type TargetAndTransition } from "motion/react";
import type { ReactNode } from "react";

type RevealTag = "div" | "section" | "li" | "header" | "article" | "p";

/**
 * Entrance presets named after Animate.css (https://animate.style), so the
 * effect reads from the name. `from` is the hidden state; every preset ends
 * fully visible at rest.
 */
const PRESETS = {
  fadeIn: { opacity: 0 },
  fadeInUp: { opacity: 0, y: 24 },
  fadeInDown: { opacity: 0, y: -24 },
  fadeInLeft: { opacity: 0, x: -40 },
  fadeInRight: { opacity: 0, x: 40 },
  zoomIn: { opacity: 0, scale: 0.8 },
  slideInUp: { opacity: 0, y: 64 },
  flipInX: { opacity: 0, rotateX: -70 },
  flipInY: { opacity: 0, rotateY: 70 },
  rotateIn: { opacity: 0, rotate: -8, scale: 0.92 },
  bounceIn: { opacity: 0, scale: 0.6 },
  lightSpeedInLeft: { opacity: 0, x: -80, skewX: 18 },
} satisfies Record<string, TargetAndTransition>;

export type RevealAnimation = keyof typeof PRESETS;

interface AnimatedRevealProps {
  children: ReactNode;
  as?: RevealTag;
  /** Entrance effect, named after Animate.css. */
  animation?: RevealAnimation;
  delay?: number;
  /** Seconds the entrance takes. */
  duration?: number;
  /** Play only the first time it enters the viewport, instead of every time. */
  once?: boolean;
  className?: string;
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const SPRING = { type: "spring", stiffness: 260, damping: 15 } as const;

const REST: TargetAndTransition = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  rotate: 0,
  rotateX: 0,
  rotateY: 0,
  skewX: 0,
};

/**
 * Animates content in whenever it scrolls into view. Out of view it returns
 * to its hidden state, so scrolling back replays the effect (`once` turns that
 * off). MotionConfig in the root layout drops the transforms for reduced motion.
 */
export function AnimatedReveal({
  children,
  as = "div",
  animation = "fadeInUp",
  delay = 0,
  duration = 0.7,
  once = false,
  className,
}: AnimatedRevealProps) {
  const props: HTMLMotionProps<"div"> = {
    className,
    initial: PRESETS[animation],
    whileInView: REST,
    viewport: { once, amount: 0.2, margin: "0px 0px -6% 0px" },
    transition:
      animation === "bounceIn"
        ? { ...SPRING, delay }
        : { duration, delay, ease: EASE_OUT },
    style: animation.startsWith("flip") ? { transformPerspective: 800 } : undefined,
  };

  const Component = motion[as] as typeof motion.div;
  return <Component {...props}>{children}</Component>;
}
