import type { ReactNode } from "react";
import { AnimatedReveal } from "./AnimatedReveal";

interface SectionHeadingProps {
  /** Section index in the page sequence, e.g. "02". */
  index: string;
  title: string;
  id?: string;
  intro?: ReactNode;
  aside?: ReactNode;
  className?: string;
}

export function SectionHeading({
  index,
  title,
  id,
  intro,
  aside,
  className = "",
}: SectionHeadingProps) {
  return (
    <AnimatedReveal
      as="header"
      className={`grid gap-6 border-t border-line pt-6 md:grid-cols-12 md:gap-8 ${className}`}
    >
      <p className="font-mono text-xs text-fg-muted md:col-span-2" aria-hidden="true">
        <span className="text-accent">●</span> {index}
      </p>
      <div className="md:col-span-10 lg:col-span-6">
        <h2
          id={id}
          className="text-display text-[clamp(2.25rem,5vw,4.75rem)] text-fg"
        >
          {title}
        </h2>
      </div>
      {(intro || aside) && (
        <div className="flex flex-col gap-4 md:col-span-8 md:col-start-3 lg:col-span-4 lg:col-start-auto lg:pt-2">
          {intro ? (
            <p className="max-w-md text-base leading-relaxed text-fg-secondary">{intro}</p>
          ) : null}
          {aside}
        </div>
      )}
    </AnimatedReveal>
  );
}
