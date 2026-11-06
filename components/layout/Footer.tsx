import { cacheLife } from "next/cache";
import { ArrowUp, ArrowUpRight, Mail, UserRound } from "lucide-react";
import { GitHubIcon, type IconComponent } from "@/components/ui/BrandIcons";
import { AccentDot } from "@/components/ui/AccentDot";
import { navItems, routes, sectionIds } from "@/data/navigation";
import { isConfiguredUrl, isValidEmail, siteConfig } from "@/data/site-config";
import type { Dictionary } from "@/data/dictionary";
import type { Locale } from "@/lib/i18n";

interface FooterProps {
  locale: Locale;
  dict: Dictionary["footer"];
  onHome: boolean;
}

interface FooterLink {
  id: string;
  label: string;
  icon: IconComponent;
  /** Empty while the real address is unknown: renders a disabled row. */
  href: string;
  display?: string;
  external: boolean;
}

/** "https://github.com/Zubiarka8" -> "github.com/Zubiarka8" */
function displayUrl(href: string): string {
  const url = new URL(href);
  return `${url.host}${url.pathname}`.replace(/\/$/, "");
}

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer({ locale, dict, onHome }: FooterProps) {
  const email = isValidEmail(siteConfig.contact.email) ? siteConfig.contact.email.trim() : "";
  const links: FooterLink[] = [
    {
      id: "email",
      label: dict.email,
      icon: Mail,
      href: email ? `mailto:${email}` : "",
      display: email || undefined,
      external: false,
    },
    ...siteConfig.social.map((profile) => {
      const href = isConfiguredUrl(profile.href) ? profile.href : "";
      return {
        id: profile.id,
        label: profile.label,
        icon: profile.id === "github" ? GitHubIcon : UserRound,
        href,
        display: href ? displayUrl(href) : undefined,
        external: true,
      };
    }),
  ];
  const topHref = onHome ? `#${sectionIds[locale].home}` : "#top";

  return (
    <footer className="relative overflow-hidden border-t border-line-soft bg-background">
      <div className="mx-auto grid max-w-[var(--container)] gap-14 px-[var(--gutter)] pb-10 pt-20 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="flex flex-col gap-4 md:col-span-6">
            <p className="font-mono text-xs text-fg-muted">{siteConfig.role[locale]}</p>
            <p className="max-w-sm text-2xl font-medium leading-snug text-fg">{siteConfig.name}</p>
          </div>

          <nav aria-label={dict.navigation} className="md:col-span-3">
            <h2 className="font-mono text-xs text-fg-muted">{dict.navigation}</h2>
            <ul className="mt-4 flex flex-col">
              {navItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={routes.section(locale, item.key, onHome)}
                    className="inline-flex min-h-10 items-center text-fg-secondary transition-colors duration-200 hover:text-fg"
                  >
                    {item.label[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className="font-mono text-xs text-fg-muted">{dict.social}</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {links.map((link) => {
                const Icon = link.icon;
                const row = (
                  <>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-fg-secondary transition-colors duration-200 group-hover:border-accent/60 group-hover:text-fg">
                      <Icon aria-hidden="true" className="size-4" strokeWidth={1.5} />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-sm font-medium text-fg">{link.label}</span>
                      <span className="truncate font-mono text-[11px] text-fg-muted">
                        {link.display ?? dict.pending}
                      </span>
                    </span>
                    {link.href ? (
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 shrink-0 text-fg-muted transition-[color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                      />
                    ) : null}
                  </>
                );
                return (
                  <li key={link.id}>
                    {link.href ? (
                      <a
                        href={link.href}
                        {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex min-h-12 items-center gap-3 rounded-md pr-2 transition-colors duration-200 hover:bg-surface"
                      >
                        {row}
                      </a>
                    ) : (
                      <div
                        aria-disabled="true"
                        title={dict.socialPending}
                        className="group flex min-h-12 items-center gap-3 rounded-md pr-2 opacity-55"
                      >
                        {row}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="text-display select-none text-[clamp(7rem,34vw,30rem)] leading-[0.75] text-fg"
        >
          AZ
          <AccentDot />
        </p>

        <div className="flex flex-col-reverse gap-4 border-t border-line-soft pt-6 font-mono text-xs text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.name}. {dict.rights}
          </p>
          <a
            href={topHref}
            className="group inline-flex min-h-11 items-center gap-2 self-start text-fg-secondary transition-colors duration-200 hover:text-fg sm:self-auto"
          >
            {dict.backToTop}
            <span className="flex size-8 items-center justify-center rounded-full border border-line transition-[border-color,transform] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:border-accent">
              <ArrowUp aria-hidden="true" className="size-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
