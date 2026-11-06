"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { AccentDot } from "@/components/ui/AccentDot";
import { FluidArtwork } from "@/components/ui/FluidArtwork";
import { ScrollParallax } from "@/components/ui/ScrollParallax";
import { ButtonLink } from "@/components/ui/Button";
import { sectionIds } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";
import type { Dictionary } from "@/data/dictionary";
import type { Locale } from "@/lib/i18n";

interface HeroProps {
  locale: Locale;
  dict: Dictionary["hero"];
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function Hero({ locale, dict }: HeroProps) {
  const ids = sectionIds[locale];
  const [firstName, lastName] = siteConfig.name.toUpperCase().split(" ");

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE_OUT },
  });

  return (
    <section
      id={ids.home}
      aria-labelledby="hero-title"
      className="relative isolate -mt-[var(--nav-height)] flex min-h-[min(100svh,64rem)] flex-col overflow-hidden pt-[var(--nav-height)]"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 -z-20 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />

      <div className="relative mx-auto flex w-full max-w-[var(--container)] flex-1 flex-col px-[var(--gutter)] pb-8 pt-8 md:pt-12">
        {/* Artwork: upper right on desktop, behind the copy on small screens */}
        <ScrollParallax className="pointer-events-none absolute -right-[14%] top-[2%] -z-10 w-[min(80vw,520px)] sm:-right-[6%] md:right-[2%] md:top-[4%] md:w-[min(52vw,640px)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: EASE_OUT }}
          >
            <FluidArtwork />
            <div className="crop-marks absolute inset-[6%] hidden md:block" />
            {/* Labels stay at the top: the bottom of the artwork overlaps the name. */}
            <p className="absolute right-[6%] top-[6%] hidden text-right font-mono text-[10px] leading-relaxed text-fg-muted tabular md:block">
              fig.01 / liquid form
              <br />
              x 0.618 / y 1.000
            </p>
          </motion.div>
        </ScrollParallax>

        <div className="flex max-w-xl flex-col gap-5 pt-[min(34vh,18rem)] md:max-w-sm md:pt-[6vh] lg:max-w-md">
          <motion.p {...enter(0.1)} className="flex items-center gap-3 font-mono text-xs text-fg-secondary">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {siteConfig.role[locale]}
          </motion.p>
          <motion.p
            {...enter(0.2)}
            className="max-w-[34ch] text-lg leading-relaxed text-fg-secondary md:text-xl"
          >
            {dict.description}
          </motion.p>
          <motion.div {...enter(0.3)} className="flex flex-wrap gap-3 pt-2">
            <ButtonLink
              href={`#${ids.projects}`}
              icon={<ArrowRight aria-hidden="true" className="btn-arrow btn-arrow-right size-4" />}
            >
              {dict.primary}
            </ButtonLink>
            <ButtonLink href={`#${ids.about}`} variant="secondary">
              {dict.secondary}
            </ButtonLink>
          </motion.div>
        </div>

        <h1
          id="hero-title"
          className="text-display hero-name mt-auto pt-12 text-fg md:pt-16"
        >
          <motion.span
            className="block"
            initial={{ y: "0.25em" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: EASE_OUT }}
          >
            {firstName}
          </motion.span>
          <motion.span
            className="block"
            initial={{ y: "0.25em" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.28, ease: EASE_OUT }}
          >
            {lastName}
            <AccentDot />
          </motion.span>
        </h1>

        <div className="mt-6 flex items-center justify-between border-t border-line-soft pt-4 font-mono text-[11px] text-fg-muted">
          <span>{dict.eyebrow}</span>
          <a
            href={`#${ids.projects}`}
            className="flex min-h-11 items-center gap-2 transition-colors duration-200 hover:text-fg"
          >
            {dict.scroll}
            <ArrowDown aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
