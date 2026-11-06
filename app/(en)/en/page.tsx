import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { siteConfig } from "@/data/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  title: `${siteConfig.name} | ${siteConfig.role.en}`,
  description: siteConfig.description.en,
  paths: { es: "/", en: "/en" },
  absoluteTitle: true,
});

export default function Page() {
  return <HomePage locale="en" />;
}
