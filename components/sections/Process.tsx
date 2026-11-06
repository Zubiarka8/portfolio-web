"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processStages } from "@/data/profile";
import { sectionIds } from "@/data/navigation";
import type { Dictionary } from "@/data/dictionary";
import type { Locale } from "@/lib/i18n";

interface ProcessProps {
  locale: Locale;
  dict: Dictionary["process"];
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function Process({ locale, dict }: ProcessProps) {
  const trackRef = useRef<HTMLOListElement>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 85%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section
      id={sectionIds[locale].process}
      aria-labelledby="process-title"
      className="mx-auto max-w-[var(--container)] px-[var(--gutter)] py-24 md:py-32"
    >
      <SectionHeading index="06" id="process-title" title={dict.title} intro={dict.intro} />

      <ol
        ref={trackRef}
        className="relative mt-16 grid gap-0 md:grid-cols-4 md:gap-6"
        onMouseLeave={() => setFocused(null)}
      >
        {/* Track: vertical on mobile, horizontal from md */}
        <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-line md:inset-x-0 md:bottom-auto md:left-0 md:top-[7px] md:h-px md:w-auto" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: progress }}
          className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-accent md:hidden"
        />
        <motion.span
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-[7px] hidden h-px origin-left bg-accent md:block"
        />

        {processStages.map((stage, index) => {
          const dimmed = focused !== null && focused !== index;
          return (
            <motion.li
              key={stage.number}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: EASE_OUT }}
              onMouseEnter={() => setFocused(index)}
              className={`relative flex flex-col gap-4 pb-12 pl-10 transition-opacity duration-300 md:pb-0 md:pl-0 md:pt-12 ${
                dimmed ? "md:opacity-45" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 flex size-[15px] items-center justify-center rounded-full border border-fg-muted bg-background"
              >
                <span className="size-[5px] rounded-full bg-accent" />
              </span>
              <span className="text-display text-[clamp(3rem,6vw,5rem)] text-fg-muted/40 tabular" aria-hidden="true">
                {stage.number}
              </span>
              <h3 className="font-dot text-3xl font-bold text-fg">
                <span className="sr-only">{stage.number}. </span>
                {stage.title[locale]}
              </h3>
              <p className="max-w-[28ch] text-[0.95rem] leading-relaxed text-fg-secondary">
                {stage.description[locale]}
              </p>
              <ul className="flex flex-col gap-1.5 border-t border-line-soft pt-4">
                {stage.activities[locale].map((activity) => (
                  <li key={activity} className="flex items-center gap-2 font-mono text-xs text-fg-muted">
                    <span aria-hidden="true" className="h-px w-3 bg-fg-muted" />
                    {activity}
                  </li>
                ))}
              </ul>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
