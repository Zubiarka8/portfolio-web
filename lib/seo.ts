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

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.url).toString();
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
      canonical: paths[locale],
      languages: { es: paths.es, en: paths.en, "x-default": paths.es },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: ogLocale[locale === "es" ? "en" : "es"],
      url: paths[locale],
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
    metadataBase: new URL(siteConfig.url),
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
