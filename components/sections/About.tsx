import Image from "next/image";
import { AccentDot } from "@/components/ui/AccentDot";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { about } from "@/data/profile";
import { sectionIds } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";
import type { Dictionary } from "@/data/dictionary";
import type { Locale } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";

interface AboutProps {
  locale: Locale;
  dict: Dictionary["about"];
}

export function About({ locale, dict }: AboutProps) {
  const hasPhoto = about.photo.src.length > 0;

  return (
    <section
      id={sectionIds[locale].about}
      aria-labelledby="about-title"
      className="mx-auto max-w-[var(--container)] px-[var(--gutter)] py-24 md:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <AnimatedReveal animation="fadeInLeft" className="lg:col-span-5">
          <figure className="crop-marks relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm border border-line-soft bg-surface lg:max-w-none">
            {hasPhoto ? (
              <Image
                src={withBasePath(about.photo.src)}
                alt={about.photo.alt[locale]}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            ) : (
              <>
                <div className="dot-grid absolute inset-0 opacity-70" aria-hidden="true" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_25%,rgb(106_47_224/0.35),transparent_60%),radial-gradient(ellipse_at_75%_70%,rgb(255_107_61/0.25),transparent_55%)]"
                />
                <p
                  aria-hidden="true"
                  className="text-display absolute inset-0 flex select-none items-center justify-center text-[clamp(7rem,22vw,14rem)] text-fg"
                >
                  AZ
                  <AccentDot />
                </p>
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 border-t border-line-soft bg-background/70 px-4 py-3 font-mono text-[11px] text-fg-secondary backdrop-blur-sm">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {siteConfig.name} · {siteConfig.role[locale]}
                </figcaption>
              </>
            )}
          </figure>
        </AnimatedReveal>

        <div className="flex flex-col gap-10 lg:col-span-7 lg:pl-6">
          <AnimatedReveal as="header" className="flex flex-col gap-6">
            <p className="font-mono text-xs text-fg-muted" aria-hidden="true">
              <span className="text-accent">●</span> 05
            </p>
            <h2 id="about-title" className="text-display text-[clamp(2.5rem,7vw,5.75rem)] text-fg">
              {about.title[locale]}
            </h2>
          </AnimatedReveal>

          <AnimatedReveal animation="fadeInRight" delay={0.08}>
            <p className="max-w-[60ch] text-lg leading-relaxed text-fg md:text-xl">{about.intro[locale]}</p>
          </AnimatedReveal>

          <AnimatedReveal animation="fadeInRight" delay={0.12}>
            <dl className="grid gap-8 border-t border-line-soft pt-8 sm:grid-cols-2">
              <div className="flex flex-col gap-3">
                <dt className="font-mono text-xs text-fg-muted">{dict.philosophy}</dt>
                <dd className="text-[0.95rem] leading-relaxed text-fg-secondary">
                  {about.philosophy[locale]}
                </dd>
              </div>
              <div className="flex flex-col gap-3">
                <dt className="font-mono text-xs text-fg-muted">{dict.interests}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {about.interests[locale].map((interest) => (
                      <li
                        key={interest}
                        className="rounded-full border border-line px-3 py-1.5 text-sm text-fg-secondary"
                      >
                        {interest}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </AnimatedReveal>
        </div>
      </div>
    </section>
  );
}
