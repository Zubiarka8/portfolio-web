import type { ReactNode } from "react";
import { fontVariables } from "@/lib/fonts";
import { htmlLang, type Locale } from "@/lib/i18n";
import { localeRedirectScript } from "@/lib/locale-redirect";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MotionProvider } from "./MotionProvider";

interface RootDocumentProps {
  locale: Locale;
  children: ReactNode;
}

/** Shared <html> shell for each locale's root layout. */
export function RootDocument({ locale, children }: RootDocumentProps) {
  return (
    // Browser extensions inject attributes on <html> before hydration
    // (e.g. data-mbtss-nonce); this only silences attribute diffs on this tag.
    <html lang={htmlLang[locale]} className={fontVariables} suppressHydrationWarning>
      {/* App Router root layouts render <head> directly; this rule targets the Pages Router. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        {/* The site is already dark: tells Dark Reader to stay off so it does
            not rewrite inline SVG attributes and break hydration. */}
        <meta name="darkreader-lock" />
        {/* Static hosting has no server: the language redirect runs in the browser. */}
        {locale === "es" ? (
          <script
            dangerouslySetInnerHTML={{
              __html: localeRedirectScript(process.env.NEXT_PUBLIC_BASE_PATH ?? ""),
            }}
          />
        ) : null}
        {/* Applies a saved light theme before first paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <MotionProvider>
          <ScrollProgress />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
