import type { MetadataRoute } from "next";
import { routes } from "@/data/navigation";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl(routes.home("es")),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: { es: absoluteUrl(routes.home("es")), en: absoluteUrl(routes.home("en")) },
    },
  };

  const homeEn: MetadataRoute.Sitemap[number] = {
    ...home,
    url: absoluteUrl(routes.home("en")),
    priority: 0.9,
  };

  const projectEntries = projects.flatMap((project) => {
    const languages = {
      es: absoluteUrl(routes.project("es", project.slug)),
      en: absoluteUrl(routes.project("en", project.slug)),
    };
    return (["es", "en"] as const).map((locale) => ({
      url: languages[locale],
      changeFrequency: "yearly" as const,
      priority: 0.7,
      alternates: { languages },
    }));
  });

  return [home, homeEn, ...projectEntries];
}
