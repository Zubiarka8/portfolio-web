import { NextResponse, type NextRequest } from "next/server";

/**
 * First-visit language selection. The Spanish site lives at the root and
 * English under /en (and also under /es), so only root-level Spanish URLs
 * are redirected.
 *
 * Priority: the visitor's saved choice (cookie set by the language switch),
 * then the browser's Accept-Language ranking. The first listed language that
 * is Spanish or English wins; if the browser lists neither, English is used.
 * Requests with no Accept-Language header at all (crawlers, link previews)
 * are served the URL they asked for, so Spanish pages stay indexable.
 */
export const LOCALE_COOKIE = "locale";

type SiteLocale = "es" | "en";

function isSiteLocale(value: string | undefined): value is SiteLocale {
  return value === "es" || value === "en";
}

/** Returns the preferred site locale, or null when the header is absent. */
function negotiate(header: string | null): SiteLocale | null {
  if (!header) return null;

  const ranked = header
    .split(",")
    .map((part, position) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.map((param) => param.trim()).find((param) => param.startsWith("q="));
      const quality = q ? Number.parseFloat(q.slice(2)) : 1;
      return { base: tag.trim().toLowerCase().split("-")[0], quality, position };
    })
    .filter((entry) => entry.base && entry.base !== "*" && entry.quality > 0)
    .sort((a, b) => b.quality - a.quality || a.position - b.position);

  const match = ranked.find((entry) => entry.base === "es" || entry.base === "en");
  return match ? (match.base as SiteLocale) : "en";
}

/** English counterpart of a Spanish root-level path. */
function toEnglishPath(pathname: string): string {
  if (pathname === "/") return "/en";
  if (pathname.startsWith("/proyectos/")) return `/en/projects/${pathname.slice("/proyectos/".length)}`;
  return pathname;
}

/**
 * /es mirrors /en: the Spanish pages are served under it as well. The URL is
 * kept and the content is rewritten to the root, whose canonical stays "/".
 */
function toRootPath(pathname: string): string {
  const rest = pathname.slice("/es".length);
  return rest === "" ? "/" : rest;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const url = request.nextUrl.clone();
    url.pathname = toRootPath(pathname);
    return NextResponse.rewrite(url);
  }

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const preferred = isSiteLocale(saved) ? saved : negotiate(request.headers.get("accept-language"));

  if (preferred !== "en") return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = toEnglishPath(request.nextUrl.pathname);
  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  matcher: ["/", "/proyectos/:path*", "/es", "/es/:path*"],
};
