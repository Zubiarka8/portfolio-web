import type { ReactNode } from "react";
import { getDictionary } from "@/data/dictionary";
import type { Locale } from "@/lib/i18n";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface SiteShellProps {
  locale: Locale;
  onHome: boolean;
  alternateHref: string;
  children: ReactNode;
}

export function SiteShell({ locale, onHome, alternateHref, children }: SiteShellProps) {
  const dict = getDictionary(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-background"
      >
        {dict.skipToContent}
      </a>
      <span id="top" aria-hidden="true" className="absolute top-0" />
      <Navbar locale={locale} dict={dict.nav} onHome={onHome} alternateHref={alternateHref} />
      <main id="main" tabIndex={-1} className="overflow-x-clip outline-none">
        {children}
      </main>
      <Footer locale={locale} dict={dict.footer} onHome={onHome} />
    </>
  );
}
