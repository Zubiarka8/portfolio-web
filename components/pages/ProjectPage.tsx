import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  FolderGit2,
  Info,
} from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/data/dictionary";
import { routes } from "@/data/navigation";
import { getAdjacentProjects, projects, type Project } from "@/data/projects";
import { isConfiguredUrl } from "@/data/site-config";
import type { Locale } from "@/lib/i18n";
import { withBasePath } from "@/lib/base-path";

interface ProjectPageProps {
  project: Project;
  locale: Locale;
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <AnimatedReveal
      as="section"
      className="grid gap-4 border-t border-line-soft py-10 md:grid-cols-12 md:gap-8 md:py-14"
    >
      <h2 className="font-mono text-xs text-fg-muted md:col-span-3">
        <span className="mr-2 text-[var(--project-accent)]" aria-hidden="true">
          ●
        </span>
        {label}
      </h2>
      <div className="md:col-span-9">{children}</div>
    </AnimatedReveal>
  );
}

const crops = [
  { origin: "18% 30%", key: "a" },
  { origin: "82% 70%", key: "b" },
] as const;

export function ProjectPage({ project, locale }: ProjectPageProps) {
  const dict = getDictionary(locale);
  const t = dict.caseStudy;
  const other: Locale = locale === "es" ? "en" : "es";
  const { previous, next } = getAdjacentProjects(project.slug);
  const number = String(projects.indexOf(project) + 1).padStart(2, "0");
  const study = project.caseStudy;
  const website = isConfiguredUrl(project.links.website)
    ? project.links.website
    : undefined;
  const repository = isConfiguredUrl(project.links.repository)
    ? project.links.repository
    : undefined;

  return (
    <SiteShell
      locale={locale}
      onHome={false}
      alternateHref={routes.project(other, project.slug)}
    >
      <article
        style={{ "--project-accent": project.accent } as CSSProperties}
        className="mx-auto max-w-[var(--container)] px-[var(--gutter)] pb-24 pt-10 md:pt-16"
      >
        <Link
          href={routes.section(locale, "projects", false)}
          className="inline-flex min-h-11 items-center gap-2 font-mono text-xs text-fg-secondary transition-colors duration-200 hover:text-fg"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          {t.back}
        </Link>

        <header className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="flex flex-col gap-5 md:col-span-8">
            <p className="flex flex-wrap items-center gap-3 font-mono text-xs text-fg-muted">
              <span className="tabular text-[var(--project-accent)]">
                {number}
              </span>
              <span className="h-px w-6 bg-line" aria-hidden="true" />
              <span>{project.category[locale]}</span>
            </p>
            <h1 className="text-display text-[clamp(3.25rem,12vw,10rem)] text-fg">
              {project.name}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-fg-secondary md:text-xl">
              {project.summary[locale]}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <ButtonLink
              href={website}
              external
              variant="secondary"
              pendingLabel={dict.projects.pending}
              icon={
                <ArrowUpRight aria-hidden="true" className="btn-arrow size-4" />
              }
            >
              {dict.projects.website}
            </ButtonLink>
            <ButtonLink
              href={repository}
              external
              variant="ghost"
              pendingLabel={dict.projects.pending}
              icon={<FolderGit2 aria-hidden="true" className="size-4" />}
            >
              {dict.projects.repository}
            </ButtonLink>
          </div>
        </header>

        {project.isDemo ? (
          <p className="mt-8 flex items-start gap-2 rounded-sm border border-line-soft bg-surface px-4 py-3 font-mono text-xs leading-relaxed text-fg-secondary">
            <Info
              aria-hidden="true"
              className="mt-0.5 size-3.5 shrink-0 text-orange"
            />
            {t.demoNotice}
          </p>
        ) : null}

        <figure className="crop-marks relative mt-10 aspect-video overflow-hidden rounded-sm border border-line-soft bg-surface">
          <Image
            src={withBasePath(project.cover.src)}
            alt={project.cover.alt[locale]}
            fill
            priority
            unoptimized
            sizes="(min-width: 1440px) 1376px, 100vw"
            className="object-cover"
          />
        </figure>

        <div className="mt-16">
          <Block label={t.context}>
            <p className="max-w-[62ch] text-xl leading-relaxed text-fg md:text-2xl">
              {study.context[locale]}
            </p>
          </Block>

          <Block label={t.objective}>
            <p className="max-w-[62ch] text-lg leading-relaxed text-fg-secondary">
              {study.objective[locale]}
            </p>
          </Block>

          <Block label={t.problem}>
            <p className="max-w-[62ch] text-lg leading-relaxed text-fg-secondary">
              {study.problem[locale]}
            </p>
          </Block>

          <Block label={t.process}>
            <ol className="grid gap-px overflow-hidden rounded-sm border border-line-soft bg-line-soft md:grid-cols-3">
              {study.process.map((step, index) => (
                <li
                  key={step.title.en}
                  className="flex flex-col gap-3 bg-background p-6"
                >
                  <span className="font-dot text-3xl font-bold text-[var(--project-accent)] tabular">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-medium text-fg">
                    {step.title[locale]}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-fg-secondary">
                    {step.body[locale]}
                  </p>
                </li>
              ))}
            </ol>
          </Block>

          <Block label={t.solution}>
            <p className="max-w-[62ch] text-xl leading-relaxed text-fg md:text-2xl">
              {study.solution[locale]}
            </p>
          </Block>

          <Block label={t.gallery}>
            <ul className="grid gap-4 sm:grid-cols-2">
              <li className="sm:col-span-2">
                <figure className="flex flex-col gap-2">
                  <div className="relative aspect-video overflow-hidden rounded-sm border border-line-soft bg-surface">
                    <Image
                      src={withBasePath(project.cover.src)}
                      alt={project.cover.alt[locale]}
                      fill
                      unoptimized
                      sizes="(min-width: 768px) 75vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="font-mono text-[11px] text-fg-muted">
                    {t.galleryOverview}
                  </figcaption>
                </figure>
              </li>
              {crops.map((crop, index) => (
                <li key={crop.key}>
                  <figure className="flex flex-col gap-2">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line-soft bg-surface">
                      <Image
                        src={withBasePath(project.cover.src)}
                        alt=""
                        fill
                        unoptimized
                        sizes="(min-width: 768px) 38vw, 100vw"
                        className="object-cover"
                        style={{
                          transform: "scale(1.9)",
                          transformOrigin: crop.origin,
                        }}
                      />
                    </div>
                    <figcaption className="font-mono text-[11px] text-fg-muted">
                      {t.galleryDetail} {String(index + 1).padStart(2, "0")}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </Block>

          <Block label={t.stack}>
            <dl className="grid gap-8 sm:grid-cols-2">
              {[
                { label: t.technologies, items: project.technologies },
                { label: t.tools, items: project.tools },
              ].map((group) => (
                <div key={group.label} className="flex flex-col gap-3">
                  <dt className="text-sm text-fg-secondary">{group.label}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-sm border border-line px-3 py-1.5 font-mono text-xs text-fg"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block label={t.learnings}>
            <ul className="flex max-w-[62ch] flex-col gap-4">
              {study.learnings[locale].map((learning) => (
                <li
                  key={learning}
                  className="flex gap-4 text-lg leading-relaxed text-fg-secondary"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] h-px w-5 shrink-0 bg-[var(--project-accent)]"
                  />
                  {learning}
                </li>
              ))}
            </ul>
          </Block>

          {website || repository ? (
            <Block label={t.links}>
              <div className="flex flex-wrap gap-3">
                {website ? (
                  <ButtonLink
                    href={website}
                    external
                    variant="secondary"
                    icon={
                      <ArrowUpRight
                        aria-hidden="true"
                        className="btn-arrow size-4"
                      />
                    }
                  >
                    {dict.projects.website}
                  </ButtonLink>
                ) : null}
                {repository ? (
                  <ButtonLink
                    href={repository}
                    external
                    variant="ghost"
                    icon={<FolderGit2 aria-hidden="true" className="size-4" />}
                  >
                    {dict.projects.repository}
                  </ButtonLink>
                ) : null}
              </div>
            </Block>
          ) : null}
        </div>

        {previous.slug !== project.slug ? (
          <nav
            aria-label={`${t.previous} / ${t.next}`}
            className="mt-10 grid gap-px overflow-hidden rounded-md border border-line-soft bg-line-soft sm:grid-cols-2"
          >
            {[
              {
                label: t.previous,
                project: previous,
                icon: <ArrowLeft aria-hidden="true" className="size-4" />,
                align: "",
              },
              {
                label: t.next,
                project: next,
                icon: <ArrowRight aria-hidden="true" className="size-4" />,
                align: "sm:items-end sm:text-right",
              },
            ].map((item) => (
              <Link
                key={item.label}
                href={routes.project(locale, item.project.slug)}
                rel={item.label === t.next ? "next" : "prev"}
                className={`group flex min-h-36 flex-col justify-between gap-6 bg-background p-6 transition-colors duration-200 hover:bg-surface sm:p-8 ${item.align}`}
              >
                <span className="flex items-center gap-2 font-mono text-xs text-fg-muted">
                  {item.label === t.previous ? item.icon : null}
                  {item.label}
                  {item.label === t.next ? item.icon : null}
                </span>
                <span className="font-dot text-4xl font-bold text-fg transition-colors duration-200 group-hover:text-accent md:text-5xl">
                  {item.project.name}
                </span>
              </Link>
            ))}
          </nav>
        ) : null}
      </article>
    </SiteShell>
  );
}
