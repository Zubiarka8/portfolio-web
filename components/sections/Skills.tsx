import { brandColorStyle } from "@/components/ui/brand-color";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { getSkillsByCategory, skillCategories } from "@/data/skills";
import { sectionIds } from "@/data/navigation";
import type { Dictionary } from "@/data/dictionary";
import type { Locale } from "@/lib/i18n";

interface SkillsProps {
  locale: Locale;
  dict: Dictionary["skills"];
}

/** Languages and AI tools as a spec sheet. Everyday tools have their own section. */
const SHEET_CATEGORIES = ["languages", "ai"] as const;

export function Skills({ locale, dict }: SkillsProps) {
  const categories = skillCategories.filter((category) =>
    (SHEET_CATEGORIES as readonly string[]).includes(category.id),
  );

  return (
    <section
      id={sectionIds[locale].skills}
      aria-labelledby="skills-title"
      className="mx-auto max-w-[var(--container)] px-[var(--gutter)] py-24 md:py-32"
    >
      <SectionHeading index="02" id="skills-title" title={dict.title} intro={dict.intro} />

      <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-line-soft bg-line-soft lg:grid-cols-2">
        {categories.map((category, categoryIndex) => {
          const items = getSkillsByCategory(category.id);
          const headingId = `skills-${category.id}`;
          return (
            <AnimatedReveal
              key={category.id}
              animation={categoryIndex === 0 ? "fadeInLeft" : "fadeInRight"}
              delay={categoryIndex * 0.1}
              className="relative flex flex-col bg-background"
            >
              <div className="grain relative grid grid-cols-[auto_1fr] items-end gap-x-6 gap-y-3 overflow-hidden border-b border-line-soft p-6 sm:p-8">
                <span
                  aria-hidden="true"
                  className="text-display row-span-2 text-[clamp(4rem,9vw,7.5rem)] text-surface-elevated [-webkit-text-stroke:1px_var(--border)]"
                >
                  {category.code}
                </span>
                <h3 id={headingId} className="font-dot text-3xl font-bold text-fg">
                  {category.label[locale]}
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-fg-secondary">
                  {category.description[locale]}
                </p>
              </div>

              <ul aria-labelledby={headingId} className="grid sm:grid-cols-2">
                {items.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <AnimatedReveal
                      as="li"
                      key={skill.name.en}
                      animation="zoomIn"
                      delay={(index % 2) * 0.06}
                      duration={0.5}
                      className="group flex min-h-20 items-center gap-4 border-b border-line-soft px-6 py-4 transition-colors duration-200 hover:bg-surface sm:px-8 sm:odd:border-r"
                    >
                      <span
                        className="brand-icon flex size-11 shrink-0 items-center justify-center rounded-md border border-line bg-surface transition-colors duration-200 group-hover:border-accent/60"
                        style={brandColorStyle(skill)}
                      >
                        <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col">
                        <span className="text-[0.95rem] font-medium text-fg">{skill.name[locale]}</span>
                        <span className="font-mono text-[11px] text-fg-muted">
                          {category.label[locale]}
                        </span>
                      </span>
                      <span aria-hidden="true" className="font-mono text-[11px] text-fg-muted tabular">
                        {category.code}.{String(index + 1).padStart(2, "0")}
                      </span>
                    </AnimatedReveal>
                  );
                })}
              </ul>
            </AnimatedReveal>
          );
        })}
      </div>
    </section>
  );
}
