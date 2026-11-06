import type { Locale, Localized } from "@/lib/i18n";

export type SectionKey =
  | "home"
  | "projects"
  | "skills"
  | "tools"
  | "abilities"
  | "about"
  | "process";

export interface NavItem {
  key: SectionKey;
  label: Localized;
}

/** DOM ids of each home section, per locale. */
export const sectionIds: Record<Locale, Record<SectionKey, string>> = {
  es: {
    home: "inicio",
    projects: "proyectos",
    skills: "skills",
    tools: "herramientas",
    abilities: "habilidades",
    about: "sobre-mi",
    process: "proceso",
  },
  en: {
    home: "home",
    projects: "projects",
    skills: "skills",
    tools: "tools",
    abilities: "abilities",
    about: "about",
    process: "process",
  },
};

export const navItems: NavItem[] = [
  { key: "home", label: { es: "Inicio", en: "Home" } },
  { key: "projects", label: { es: "Proyectos", en: "Projects" } },
  { key: "skills", label: { es: "Skills", en: "Skills" } },
  { key: "abilities", label: { es: "Habilidades", en: "Abilities" } },
  { key: "about", label: { es: "Sobre mí", en: "About" } },
];

/**
 * Sections without their own menu entry highlight the closest item.
 */
export const navOwner: Record<SectionKey, SectionKey> = {
  home: "home",
  projects: "projects",
  skills: "skills",
  tools: "skills",
  abilities: "abilities",
  about: "about",
  process: "about",
};

export const routes = {
  home: (locale: Locale) => (locale === "es" ? "/" : "/en"),
  project: (locale: Locale, slug: string) =>
    locale === "es" ? `/proyectos/${slug}` : `/en/projects/${slug}`,
  section: (locale: Locale, key: SectionKey, fromHome: boolean) => {
    const hash = `#${sectionIds[locale][key]}`;
    return fromHome ? hash : `${routes.home(locale)}${hash}`;
  },
};
