import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { routes } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  locale: "es",
  title: `${siteConfig.name} | ${siteConfig.role.es}`,
  description: siteConfig.description.es,
  paths: { es: routes.home("es"), en: routes.home("en") },
  absoluteTitle: true,
});

export default function Page() {
  return <HomePage locale="es" />;
}
