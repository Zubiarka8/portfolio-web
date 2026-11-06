import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FolderGit2 } from "lucide-react";
import type { Project } from "@/data/projects";
import { routes } from "@/data/navigation";
import { isConfiguredUrl } from "@/data/site-config";
import type { Dictionary } from "@/data/dictionary";
import type { Locale } from "@/lib/i18n";
import { ButtonLink } from "./Button";
import { withBasePath } from "@/lib/base-path";

interface ProjectCardProps {
  project: Project;
  index: number;
  locale: Locale;
  dict: Dictionary["projects"];
}

export function ProjectCard({ project, index, locale, dict }: ProjectCardProps) {
  const href = routes.project(locale, project.slug);
  const number = String(index + 1).padStart(2, "0");
  const titleId = `project-${project.slug}-title`;
  const website = isConfiguredUrl(project.links.website) ? project.links.website : undefined;
  const repository = isConfiguredUrl(project.links.repository)
    ? project.links.repository
    : undefined;

  return (
    <article
      aria-labelledby={titleId}
      className="project-card flex h-full flex-col overflow-hidden rounded-md border border-line-soft bg-surface"
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className="project-media relative block aspect-video overflow-hidden border-b border-line-soft bg-background"
      >
        <Image
          src={withBasePath(project.cover.src)}
          alt=""
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-background/80 px-2 py-1 font-mono text-[11px] text-fg-secondary backdrop-blur-sm">
          {number}
        </span>
        {project.isDemo ? (
          <span className="absolute right-3 top-3 rounded-sm border border-line bg-background/80 px-2 py-1 font-mono text-[11px] text-fg-secondary backdrop-blur-sm">
            {dict.demo}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-xs text-fg-muted">
            <span className="sr-only">{dict.category}: </span>
            {project.category[locale]}
          </p>
          <h3 id={titleId} className="font-dot text-[1.75rem] font-bold leading-none text-fg">
            <Link href={href} className="hover:text-accent focus-visible:text-accent">
              {project.name}
            </Link>
          </h3>
          <p className="min-h-[3lh] text-[0.95rem] leading-relaxed text-fg-secondary">
            {project.summary[locale]}
          </p>
        </div>

        <ul aria-label={dict.technologies} className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-sm border border-line-soft px-2 py-1 font-mono text-[11px] text-fg-secondary"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          <ButtonLink
            href={website}
            external
            variant="secondary"
            pendingLabel={dict.pending}
            srContext={project.name}
            icon={<ArrowUpRight aria-hidden="true" className="btn-arrow size-4" />}
            className="!min-h-11 !px-4"
          >
            {dict.website}
          </ButtonLink>
          <ButtonLink
            href={repository}
            external
            variant="ghost"
            pendingLabel={dict.pending}
            srContext={project.name}
            icon={<FolderGit2 aria-hidden="true" className="size-4" />}
            className="!px-3"
          >
            {dict.repository}
          </ButtonLink>
        </div>

        <Link
          href={href}
          className="group/case -mx-5 -mb-5 mt-1 flex min-h-12 items-center justify-between border-t border-line-soft px-5 font-mono text-xs text-fg transition-colors duration-200 hover:bg-surface-elevated hover:text-accent sm:-mx-6 sm:-mb-6 sm:px-6"
        >
          <span>
            {dict.caseStudy}
            <span className="sr-only">: {project.name}</span>
          </span>
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-200 ease-out group-hover/case:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
