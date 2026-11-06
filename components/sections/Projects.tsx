import { Info } from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { projects } from "@/data/projects";
import { sectionIds } from "@/data/navigation";
import type { Dictionary } from "@/data/dictionary";
import type { Locale } from "@/lib/i18n";

interface ProjectsProps {
  locale: Locale;
  dict: Dictionary["projects"];
}

export function Projects({ locale, dict }: ProjectsProps) {
  const hasDemo = projects.some((project) => project.isDemo);

  return (
    <section
      id={sectionIds[locale].projects}
      aria-labelledby="projects-title"
      className="mx-auto max-w-[var(--container)] px-[var(--gutter)] py-24 md:py-32"
    >
      <SectionHeading
        index="01"
        id="projects-title"
        title={dict.title}
        intro={dict.intro}
        aside={
          hasDemo ? (
            <p className="flex items-start gap-2 font-mono text-xs leading-relaxed text-fg-muted">
              <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-orange" />
              {dict.demoNotice}
            </p>
          ) : null
        }
      />

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {projects.map((project, index) => (
          <AnimatedReveal as="li" key={project.slug} animation={(["fadeInLeft", "fadeInUp", "fadeInRight"] as const)[index % 3]}
            delay={(index % 3) * 0.08}
            className="h-full">
            <ProjectCard project={project} index={index} locale={locale} dict={dict} />
          </AnimatedReveal>
        ))}
      </ul>
    </section>
  );
}
