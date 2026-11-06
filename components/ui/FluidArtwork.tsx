"use client";

import { useEffect, useId } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

const BLOB =
  "M318 92C412 96 506 160 512 262C518 352 470 410 420 452C362 500 280 520 210 492C132 460 88 392 92 314C96 232 130 178 186 136C226 106 268 90 318 92Z";
const HOLE =
  "M326 204C382 204 418 242 416 292C414 340 380 372 332 380C280 388 236 358 228 312C220 264 268 204 326 204Z";
const DROPLET =
  "M498 86C522 86 540 104 538 128C536 150 518 166 496 164C474 162 458 146 460 124C462 102 476 86 498 86Z";

const SPRING = { stiffness: 60, damping: 18, mass: 0.6 };

function useDepth(source: MotionValue<number>, depth: number) {
  return useTransform(source, (value) => value * depth);
}

interface FluidArtworkProps {
  className?: string;
}

/**
 * Iridescent liquid-glass form. Every animated property is a transform or an
 * opacity on its own layer, so motion stays on the compositor.
 */
export function FluidArtwork({ className }: FluidArtworkProps) {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, SPRING);
  const y = useSpring(pointerY, SPRING);

  const glowX = useDepth(x, -18);
  const glowY = useDepth(y, -18);
  const bodyX = useDepth(x, 10);
  const bodyY = useDepth(y, 10);
  const lightX = useDepth(x, 22);
  const lightY = useDepth(y, 22);
  const dropX = useDepth(x, 38);
  const dropY = useDepth(y, 38);

  useEffect(() => {
    if (reduceMotion) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    let frame = 0;
    const handleMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
        pointerY.set((event.clientY / window.innerHeight) * 2 - 1);
      });
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
    };
  }, [pointerX, pointerY, reduceMotion]);

  const id = (name: string) => `${uid}-${name}`;

  return (
    <div className={className} aria-hidden="true">
      <div className="relative aspect-square w-full">
        {/* Ambient light */}
        <motion.div
          className="absolute inset-[8%] rounded-full opacity-70 blur-[60px]"
          style={{
            x: glowX,
            y: glowY,
            background:
              "radial-gradient(circle at 32% 38%, rgb(150 85 255 / 0.75), transparent 55%), radial-gradient(circle at 70% 55%, rgb(65 105 255 / 0.6), transparent 50%), radial-gradient(circle at 52% 82%, rgb(255 135 87 / 0.5), transparent 45%)",
          }}
        />

        <div className="artwork-drift absolute inset-0">
          {/* Body, cool reflection */}
          <motion.svg
            viewBox="0 0 600 600"
            className="absolute inset-0 h-full w-full"
            style={{ x: bodyX, y: bodyY }}
          >
            <defs>
              <linearGradient id={id("iri-a")} x1="0.1" y1="0" x2="0.9" y2="1">
                <stop offset="0" stopColor="#2b1763" />
                <stop offset="0.24" stopColor="#9655ff" />
                <stop offset="0.48" stopColor="#4169ff" />
                <stop offset="0.6" stopColor="#9fd8ff" />
                <stop offset="0.76" stopColor="#ff8757" />
                <stop offset="0.9" stopColor="#ffd6bd" />
                <stop offset="1" stopColor="#7a3df0" />
              </linearGradient>
              <radialGradient id={id("shade")} cx="0.3" cy="0.85" r="0.75">
                <stop offset="0" stopColor="var(--background)" stopOpacity="0.85" />
                <stop offset="0.6" stopColor="var(--background)" stopOpacity="0.15" />
                <stop offset="1" stopColor="var(--background)" stopOpacity="0" />
              </radialGradient>
              <filter id={id("soft")} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="14" />
              </filter>
              <clipPath id={id("clip")}>
                <path d={BLOB} />
              </clipPath>
            </defs>
            <g clipPath={`url(#${id("clip")})`}>
              <rect width="600" height="600" fill={`url(#${id("iri-a")})`} />
              <rect width="600" height="600" fill={`url(#${id("shade")})`} />
              <path d={HOLE} fill="var(--background)" filter={`url(#${id("soft")})`} />
              <path d={HOLE} fill="var(--background)" opacity="0.9" />
            </g>
          </motion.svg>

          {/* Body, warm reflection crossfading over the cool one */}
          <motion.svg
            viewBox="0 0 600 600"
            className="absolute inset-0 h-full w-full"
            style={{ x: bodyX, y: bodyY }}
            initial={{ opacity: 0 }}
            animate={reduceMotion ? { opacity: 0 } : { opacity: [0, 0.85, 0] }}
            transition={{ duration: 14, ease: "easeInOut", repeat: Infinity }}
          >
            <defs>
              <linearGradient id={id("iri-b")} x1="1" y1="0.1" x2="0" y2="0.9">
                <stop offset="0" stopColor="#ff8757" />
                <stop offset="0.3" stopColor="#ffc9a8" />
                <stop offset="0.46" stopColor="#9655ff" />
                <stop offset="0.7" stopColor="#4169ff" />
                <stop offset="1" stopColor="#1d1f6b" />
              </linearGradient>
              <filter id={id("soft-b")} x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="14" />
              </filter>
              <clipPath id={id("clip-b")}>
                <path d={BLOB} />
              </clipPath>
            </defs>
            <g clipPath={`url(#${id("clip-b")})`}>
              <rect width="600" height="600" fill={`url(#${id("iri-b")})`} opacity="0.75" />
              <rect width="600" height="600" fill={`url(#${id("shade")})`} />
              <path d={HOLE} fill="var(--background)" filter={`url(#${id("soft-b")})`} />
              <path d={HOLE} fill="var(--background)" opacity="0.9" />
            </g>
          </motion.svg>

          {/* Specular highlights and rim */}
          <motion.svg
            viewBox="0 0 600 600"
            className="absolute inset-0 h-full w-full"
            style={{ x: lightX, y: lightY }}
          >
            <defs>
              <linearGradient id={id("rim")} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.8" />
                <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.05" />
                <stop offset="1" stopColor="#ffd6bd" stopOpacity="0.5" />
              </linearGradient>
              <filter id={id("glint")} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>
            <path d={BLOB} fill="none" stroke={`url(#${id("rim")})`} strokeWidth="1.5" />
            <path
              d="M150 190C180 140 236 108 300 104"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.75"
              strokeWidth="7"
              strokeLinecap="round"
              filter={`url(#${id("glint")})`}
            />
            <path
              d="M470 210C492 250 498 292 486 330"
              fill="none"
              stroke="#ffe3d3"
              strokeOpacity="0.45"
              strokeWidth="4"
              strokeLinecap="round"
              filter={`url(#${id("glint")})`}
            />
            <path
              d="M246 344C268 374 304 386 340 380"
              fill="none"
              stroke="#c8d6ff"
              strokeOpacity="0.5"
              strokeWidth="3"
              strokeLinecap="round"
              filter={`url(#${id("glint")})`}
            />
            <ellipse cx="196" cy="178" rx="16" ry="9" fill="#fff" opacity="0.85" filter={`url(#${id("glint")})`} />
          </motion.svg>
        </div>

        {/* Floating droplet */}
        <motion.svg
          viewBox="0 0 600 600"
          className="absolute inset-0 h-full w-full"
          style={{ x: dropX, y: dropY }}
        >
          <defs>
            <radialGradient id={id("drop")} cx="0.35" cy="0.3" r="0.8">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="0.25" stopColor="#9fd8ff" />
              <stop offset="0.6" stopColor="#9655ff" />
              <stop offset="1" stopColor="#ff8757" />
            </radialGradient>
          </defs>
          <path d={DROPLET} fill={`url(#${id("drop")})`} />
        </motion.svg>
      </div>
    </div>
  );
}
