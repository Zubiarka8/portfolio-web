import type { Localized } from "@/lib/i18n";

export type SocialId = "github" | "linkedin";

export interface SocialLink {
  id: SocialId;
  label: string;
  /** Full profile URL. Leave empty until the real profile is known. */
  href: string;
}

export interface SiteConfig {
  name: string;
  logo: string;
  role: Localized;
  description: Localized;
  /** Public production URL, used for canonical URLs, Open Graph and the sitemap. */
  url: string;
  contact: {
    /** Public contact email. Leave empty until it is confirmed. */
    email: string;
  };
  social: SocialLink[];
}

/** NEXT_PUBLIC_SITE_URL wins; Vercel's production domain is the fallback. */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

/**
 * Editable personal data. Every empty value renders as a disabled,
 * clearly labelled "pending" state instead of a fake link.
 */
export const siteConfig: SiteConfig = {
  name: "Arkaitz Zubizarreta",
  logo: "AZ.",
  role: {
    es: "Desarrollador Full Stack",
    en: "Full Stack Developer",
  },
  description: {
    es: "Portfolio de Arkaitz Zubizarreta, desarrollador full stack. Aplicaciones web con JavaScript, PHP, Python, Django y FastAPI.",
    en: "Portfolio of Arkaitz Zubizarreta, full stack developer. Web applications built with JavaScript, PHP, Python, Django and FastAPI.",
  },
  url: resolveSiteUrl(),
  contact: {
    email: "",
  },
  social: [
    { id: "github", label: "GitHub", href: "https://github.com/Zubiarka8" },
    { id: "linkedin", label: "LinkedIn", href: "" },
  ],
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isConfiguredUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
