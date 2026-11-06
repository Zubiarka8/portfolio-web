import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Tools } from "@/components/sections/Tools";
import { Abilities } from "@/components/sections/Abilities";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { getDictionary } from "@/data/dictionary";
import { routes } from "@/data/navigation";
import type { Locale } from "@/lib/i18n";
import { personJsonLd } from "@/lib/seo";

export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const other: Locale = locale === "es" ? "en" : "es";

  return (
    <SiteShell locale={locale} onHome alternateHref={routes.home(other)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)) }}
      />
      <Hero locale={locale} dict={dict.hero} />
      <Projects locale={locale} dict={dict.projects} />
      <Skills locale={locale} dict={dict.skills} />
      <Tools locale={locale} dict={dict.tools} />
      <Abilities locale={locale} dict={dict.abilities} />
      <About locale={locale} dict={dict.about} />
      <Process locale={locale} dict={dict.process} />
    </SiteShell>
  );
}
