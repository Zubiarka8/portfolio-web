import type { Localized } from "@/lib/i18n";

export interface ProjectImage {
  /** Path inside /public, or a remote URL allowed in next.config.ts. */
  src: string;
  alt: Localized;
  width: number;
  height: number;
}

export interface ProjectStep {
  title: Localized;
  body: Localized;
}

export interface Project {
  slug: string;
  name: string;
  category: Localized;
  /** About two lines on the card. */
  summary: Localized;
  technologies: string[];
  tools: string[];
  /** Accent used by the project's case study page. */
  accent: string;
  cover: ProjectImage;
  links: {
    /** Official website. Leave empty while it is not confirmed. */
    website: string;
    /** Public repository. Leave empty while it is not confirmed. */
    repository: string;
  };
  /** Marks illustrative projects so they are never presented as real work. */
  isDemo: boolean;
  caseStudy: {
    context: Localized;
    objective: Localized;
    problem: Localized;
    process: ProjectStep[];
    solution: Localized;
    learnings: Localized<string[]>;
  };
}

const coverSize = { width: 1600, height: 900 } as const;

/**
 * Projects shown on the site. Edit
 * this array; every page and the sitemap read from it.
 */
export const projects: Project[] = [
  {
    slug: "mini-consumes-tokens",
    name: "mini-consumes-tokens",
    category: { es: "Herramienta para desarrolladores", en: "Developer tool" },
    summary: {
      es: "Mapa local de tu código que permite a un asistente de IA saber dónde se define algo y qué se rompería al cambiarlo, sin releer los archivos.",
      en: "A local map of your code that lets an AI assistant find where something is defined and what a change would break, without re-reading files.",
    },
    technologies: ["Rust", "tree-sitter", "SQLite", "MCP"],
    tools: ["Cargo", "GitHub Actions", "GitHub Pages"],
    accent: "#D7FF3F",
    cover: {
      src: "/images/projects/mini-consumes-tokens.svg",
      alt: {
        es: "Esquema de tres paneles: un archivo de código, un grafo de símbolos en el centro y una respuesta corta con una reducción del 70 al 98 % de tokens leídos.",
        en: "Three-panel diagram: a source file, a symbol graph in the middle and a short answer showing a 70 to 98% reduction in tokens read.",
      },
      ...coverSize,
    },
    links: {
      website: "https://zubiarka8.github.io/mini-consumes-tokens/",
      repository: "https://github.com/Zubiarka8/mini-consumes-tokens",
    },
    isDemo: false,
    caseStudy: {
      context: {
        es: "Proyecto de código abierto (licencia Apache-2.0) para quien programa con asistentes de IA. Funciona en local: el índice es un único archivo en tu equipo y nada sale de él.",
        en: "An open-source project (Apache-2.0) for people who code with AI assistants. It runs locally: the index is a single file on your machine and nothing leaves it.",
      },
      objective: {
        es: "Que un asistente responda «dónde está definido esto», «qué lo usa» y «qué se rompería si lo cambio» con una consulta precisa, en lugar de abrir y leer archivos enteros.",
        en: "Let an assistant answer “where is this defined”, “what uses it” and “what would break if I change it” with one precise query, instead of opening and reading whole files.",
      },
      problem: {
        es: "Para contestar preguntas sencillas sobre el código, un asistente suele abrir archivos o buscar en todo el proyecto. Es lento y gasta buena parte de su atención (tokens) que podría dedicar a resolver el problema real.",
        en: "To answer simple questions about code, an assistant usually opens files or searches the whole project. It is slow and spends much of its attention (tokens) that could go toward the actual problem.",
      },
      process: [
        {
          title: { es: "Leer una vez", en: "Read once" },
          body: {
            es: "Analiza el proyecto con tree-sitter y guarda funciones, clases y sus relaciones de llamada y referencia en un índice SQLite local.",
            en: "Parses the project with tree-sitter and stores functions, classes and their call and reference relations in a local SQLite index.",
          },
        },
        {
          title: { es: "Protocolo común", en: "Common protocol" },
          body: {
            es: "Expone sus herramientas por MCP, así que sirve a cualquier asistente compatible, y también como línea de comandos sin asistente.",
            en: "Exposes its tools over MCP, so it works with any compatible assistant, and also as a command-line tool with no assistant at all.",
          },
        },
        {
          title: { es: "Medir", en: "Measure" },
          body: {
            es: "Los benchmarks del repositorio comparan el texto leído con y sin índice, e incluyen también los casos en los que cuesta más.",
            en: "The repository's benchmarks compare the text read with and without the index, including the cases where it costs more.",
          },
        },
      ],
      solution: {
        es: "Un índice que entiende 17 lenguajes a la vez, 23 herramientas MCP (consulta de símbolos, búsqueda, relaciones, análisis de impacto y paquetes de contexto) y un modo de descubrimiento progresivo que evita cargar todos los esquemas de golpe. En las mediciones del proyecto, el asistente lee entre un 70 y un 98 % menos de texto.",
        en: "An index that understands 17 languages at once, 23 MCP tools (symbol lookup, search, relations, impact analysis and context packs) and progressive discovery that avoids loading every schema up front. In the project's own measurements, the assistant reads 70 to 98% less text.",
      },
      learnings: {
        es: [
          "Publicar también los casos en los que la herramienta no ahorra hace creíbles los que sí.",
          "Apoyarse en un protocolo abierto como MCP evita atar la herramienta a un solo editor o asistente.",
        ],
        en: [
          "Publishing the cases where the tool does not save anything makes the ones where it does believable.",
          "Building on an open protocol such as MCP avoids tying the tool to a single editor or assistant.",
        ],
      },
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  const count = projects.length;
  return {
    previous: projects[(index - 1 + count) % count],
    next: projects[(index + 1) % count],
  };
}
