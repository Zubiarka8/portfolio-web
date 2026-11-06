import type { Locale } from "@/lib/i18n";

/** Interface copy. Content that describes the owner lives in profile.ts. */
const es = {
  skipToContent: "Saltar al contenido",
  nav: {
    label: "Navegación principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    home: "Ir al inicio",
    switchLanguage: "Read in English",
    languageShort: "EN",
    theme: "Cambiar entre modo claro y oscuro",
  },
  hero: {
    eyebrow: "Portfolio",
    description:
      "Desarrollo aplicaciones web completas, del frontend al backend, con código claro y una interfaz cuidada al detalle.",
    primary: "Ver proyectos",
    secondary: "Sobre mí",
    scroll: "Desplázate",
  },
  projects: {
    title: "Proyectos destacados",
    intro:
      "Proyectos propios, ambos en desarrollo. Cada uno explica el problema que resuelve y enlaza a su repositorio.",
    demoNotice:
      "Los seis casos con la etiqueta Demo son ficticios y se sustituirán por trabajos reales.",
    website: "Web oficial",
    repository: "Repo",
    caseStudy: "Ver caso de estudio",
    pending: "Enlace pendiente de configurar",
    category: "Categoría",
    technologies: "Tecnologías",
    demo: "Demo",
    inDevelopment: "En desarrollo",
  },
  skills: {
    title: "Skills técnicas",
    intro:
      "Conocimientos agrupados por disciplina. Sin porcentajes: el trabajo de cada proyecto los demuestra mejor.",
  },
  tools: {
    title: "Herramientas",
    intro: "El entorno de trabajo diario, del primer boceto al repositorio.",
  },
  abilities: {
    title: "Habilidades profesionales",
    intro:
      "Lo que no aparece en el código pero decide la calidad del resultado. Selecciona una para ver con qué se conecta.",
    connects: "Se conecta con",
    listLabel: "Lista de habilidades",
  },
  about: {
    philosophy: "Cómo trabajo",
    interests: "Intereses profesionales",
  },
  process: {
    title: "Proceso de trabajo",
    intro:
      "Cuatro etapas que se repiten en ciclos cortos. Cada una termina con algo que se puede revisar.",
  },
  footer: {
    navigation: "Navegación",
    social: "Enlaces",
    backToTop: "Volver arriba",
    rights: "Todos los derechos reservados.",
    socialPending: "Perfiles pendientes de configurar",
    pending: "Pendiente",
    email: "Correo",
  },
  caseStudy: {
    back: "Todos los proyectos",
    demoNotice:
      "Proyecto de demostración. El contenido es ilustrativo y no corresponde a un trabajo real.",
    inDevelopmentNotice:
      "Proyecto en desarrollo: todavía no está terminado, así que lo descrito aquí puede cambiar.",
    context: "Contexto",
    objective: "Objetivo",
    problem: "Problema a resolver",
    process: "Proceso",
    solution: "Solución propuesta",
    gallery: "Galería",
    galleryOverview: "Vista general",
    galleryDetail: "Detalle",
    stack: "Tecnologías y herramientas",
    technologies: "Tecnologías",
    tools: "Herramientas",
    learnings: "Aprendizajes",
    links: "Enlaces",
    previous: "Proyecto anterior",
    next: "Siguiente proyecto",
  },
  notFound: {
    title: "Página no encontrada",
    body: "La dirección no existe o el proyecto ya no está disponible.",
    cta: "Volver al inicio",
  },
};

export type Dictionary = typeof es;

const en: Dictionary = {
  skipToContent: "Skip to content",
  nav: {
    label: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Go to home",
    switchLanguage: "Leer en español",
    languageShort: "ES",
    theme: "Switch between light and dark mode",
  },
  hero: {
    eyebrow: "Portfolio",
    description:
      "I build complete web applications, from frontend to backend, with clear code and a carefully crafted interface.",
    primary: "View projects",
    secondary: "About me",
    scroll: "Scroll",
  },
  projects: {
    title: "Featured projects",
    intro:
      "Personal projects, both in development. Each one explains the problem it solves and links to its repository.",
    demoNotice: "The six cases tagged Demo are fictional and will be replaced with real work.",
    website: "Website",
    repository: "Repo",
    caseStudy: "View case study",
    pending: "Link not configured yet",
    category: "Category",
    technologies: "Technologies",
    demo: "Demo",
    inDevelopment: "In development",
  },
  skills: {
    title: "Technical skills",
    intro:
      "Knowledge grouped by discipline. No percentages: the work in each project shows it better.",
  },
  tools: {
    title: "Tools",
    intro: "The daily working environment, from the first sketch to the repository.",
  },
  abilities: {
    title: "Professional abilities",
    intro:
      "What never shows up in the code but decides the quality of the result. Select one to see what it connects with.",
    connects: "Connects with",
    listLabel: "List of abilities",
  },
  about: {
    philosophy: "How I work",
    interests: "Professional interests",
  },
  process: {
    title: "Work process",
    intro:
      "Four stages repeated in short cycles. Each one ends with something that can be reviewed.",
  },
  footer: {
    navigation: "Navigation",
    social: "Links",
    backToTop: "Back to top",
    rights: "All rights reserved.",
    socialPending: "Profiles not configured yet",
    pending: "Pending",
    email: "Email",
  },
  caseStudy: {
    back: "All projects",
    demoNotice:
      "Demonstration project. The content is illustrative and does not describe real work.",
    inDevelopmentNotice:
      "Project in development: it is not finished yet, so what is described here may change.",
    context: "Context",
    objective: "Objective",
    problem: "Problem to solve",
    process: "Process",
    solution: "Proposed solution",
    gallery: "Gallery",
    galleryOverview: "Overview",
    galleryDetail: "Detail",
    stack: "Technologies and tools",
    technologies: "Technologies",
    tools: "Tools",
    learnings: "Learnings",
    links: "Links",
    previous: "Previous project",
    next: "Next project",
  },
  notFound: {
    title: "Page not found",
    body: "The address does not exist or the project is no longer available.",
    cta: "Back to home",
  },
};

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
