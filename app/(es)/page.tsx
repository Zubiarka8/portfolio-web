import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { siteConfig } from "@/data/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  title: `${siteConfig.name} | ${siteConfig.role.es}`,
  description: siteConfig.description.es,
  paths: { es: "/", en: "/en" },
  absoluteTitle: true,
});

export default function Page() {
  return <HomePage locale="es" />;
}
