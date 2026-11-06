import type { Metadata } from "next";
import { isConfiguredUrl, isValidEmail, siteConfig } from "@/data/site-config";
import { ogLocale, type Locale } from "./i18n";

interface PageMetadataInput {
  locale: Locale;
  title: string;
  description: string;
  /** Paths of this page in each locale. */
  paths: Record<Locale, string>;
  /** Overrides the default Open Graph image route. */
  image?: { url: string; alt: string };
  /** Skip the "%s | Name" template, for titles that already contain the name. */
  absoluteTitle?: boolean;
}

/** Pages are exported as <route>/index.html, so every route ends with a slash. */
function withTrailingSlash(path: string): string {
  return path === "/" || path.endsWith("/") ? path : `${path}/`;
}

/** Joins a route to the site URL, keeping the base path of a project site. */
export function absoluteUrl(path: string): string {
  const base = siteConfig.url.endsWith("/") ? siteConfig.url : `${siteConfig.url}/`;
  const route = path.endsWith(".xml") || path.endsWith(".txt") ? path : withTrailingSlash(path);
  return new URL(route.replace(/^\//, ""), base).toString();
}

export function pageMetadata({
  locale,
  title,
  description,
  paths,
  image,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: withTrailingSlash(paths[locale]),
      languages: {
        es: withTrailingSlash(paths.es),
        en: withTrailingSlash(paths.en),
        "x-default": withTrailingSlash(paths.es),
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: ogLocale[locale === "es" ? "en" : "es"],
      url: withTrailingSlash(paths[locale]),
      siteName: siteConfig.name,
      title,
      description,
      ...(image ? { images: [{ url: image.url, alt: image.alt }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function rootMetadata(locale: Locale): Metadata {
  const title = `${siteConfig.name} | ${siteConfig.role[locale]}`;
  return {
    metadataBase: new URL(siteConfig.url.endsWith("/") ? siteConfig.url : `${siteConfig.url}/`),
    title: { default: title, template: `%s | ${siteConfig.name}` },
    description: siteConfig.description[locale],
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    formatDetection: { email: false, telephone: false, address: false },
  };
}

export function personJsonLd(locale: Locale) {
  const sameAs = siteConfig.social.map((profile) => profile.href).filter(isConfiguredUrl);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role[locale],
    url: absoluteUrl(locale === "es" ? "/" : "/en"),
    ...(isValidEmail(siteConfig.contact.email) ? { email: `mailto:${siteConfig.contact.email}` } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}
