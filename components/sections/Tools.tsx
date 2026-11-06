import { brandColorStyle } from "@/components/ui/brand-color";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { getCategory, getSkillsByCategory } from "@/data/skills";
import { sectionIds } from "@/data/navigation";
import type { Dictionary } from "@/data/dictionary";
import type { Locale } from "@/lib/i18n";

interface ToolsProps {
  locale: Locale;
  dict: Dictionary["tools"];
}

/** The tools category of skills, laid out as a single instrument strip. */
export function Tools({ locale, dict }: ToolsProps) {
  const category = getCategory("tools");
  const tools = getSkillsByCategory("tools");

  return (
    <section
      id={sectionIds[locale].tools}
      aria-labelledby="tools-title"
      className="mx-auto max-w-[var(--container)] px-[var(--gutter)] pb-24 md:pb-32"
    >
      <AnimatedReveal className="relative overflow-hidden rounded-md border border-line-soft bg-surface">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-electric/15 blur-3xl"
        />
        <div className="relative flex flex-col gap-3 border-b border-line-soft p-6 sm:flex-row sm:items-end sm:justify-between sm:p-8">
          <div>
            <p className="font-mono text-xs text-fg-muted" aria-hidden="true">
              <span className="text-accent">●</span> 03
            </p>
            <h2 id="tools-title" className="mt-3 font-dot text-4xl font-bold text-fg md:text-5xl">
              {dict.title}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-fg-secondary">{dict.intro}</p>
        </div>

        <ul className="relative grid grid-cols-2 gap-px bg-line-soft sm:grid-cols-3 lg:grid-cols-6">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <AnimatedReveal
                as="li"
                key={tool.name.en}
                animation="flipInX"
                delay={index * 0.07}
                className="group relative flex min-h-44 flex-col justify-between gap-6 bg-surface p-5 transition-colors duration-200 hover:bg-surface-elevated"
              >
                <div className="flex items-start justify-between">
                  <span className="brand-icon" style={brandColorStyle(tool)}>
                    <Icon
                      aria-hidden="true"
                      className="size-8 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                      strokeWidth={1.25}
                    />
                  </span>
                  <span aria-hidden="true" className="font-mono text-[11px] text-fg-muted tabular">
                    {category.code}.{String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <p className="text-[0.95rem] font-medium leading-snug text-fg">{tool.name[locale]}</p>
                  <p className="font-mono text-[11px] text-fg-muted">{category.label[locale]}</p>
                </div>
              </AnimatedReveal>
            );
          })}
        </ul>
      </AnimatedReveal>
    </section>
  );
}
