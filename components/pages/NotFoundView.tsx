import { ArrowLeft } from "lucide-react";
import { SiteShell } from "@/components/layout/SiteShell";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary } from "@/data/dictionary";
import { routes } from "@/data/navigation";
import type { Locale } from "@/lib/i18n";

export function NotFoundView({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale).notFound;
  const other: Locale = locale === "es" ? "en" : "es";

  return (
    <SiteShell locale={locale} onHome={false} alternateHref={routes.home(other)}>
      <section className="mx-auto flex min-h-[70vh] max-w-[var(--container)] flex-col justify-center gap-6 px-[var(--gutter)] py-24">
        <p className="text-display text-[clamp(6rem,24vw,18rem)] text-fg-muted/30" aria-hidden="true">
          404
        </p>
        <h1 className="font-dot text-4xl font-bold text-fg md:text-5xl">{dict.title}</h1>
        <p className="max-w-md text-lg text-fg-secondary">{dict.body}</p>
        <div>
          <ButtonLink
            href={routes.home(locale)}
            icon={<ArrowLeft aria-hidden="true" className="size-4" />}
          >
            {dict.cta}
          </ButtonLink>
        </div>
      </section>
    </SiteShell>
  );
}
