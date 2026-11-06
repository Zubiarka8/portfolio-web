import type { Localized } from "@/lib/i18n";

/* ------------------------------------------------------------------ */
/* Professional abilities                                              */
/* ------------------------------------------------------------------ */

export type AbilityId =
  | "problem-solving"
  | "strategy"
  | "creativity"
  | "communication"
  | "research"
  | "user-centred"
  | "collaboration"
  | "detail";

export interface Ability {
  id: AbilityId;
  name: Localized;
  description: Localized;
  /** Abilities this one feeds into; drawn as links in the diagram. */
  related: AbilityId[];
}

export const abilities: Ability[] = [
  {
    id: "user-centred",
    name: { es: "Pensar en quien lo usa", en: "Thinking about the user" },
    description: {
      es: "Cada decisión técnica parte de quién va a usar el producto y de lo que necesita conseguir.",
      en: "Every technical decision starts with who will use the product and what they need to achieve.",
    },
    related: ["research", "problem-solving", "detail"],
  },
  {
    id: "problem-solving",
    name: { es: "Resolución de problemas", en: "Problem solving" },
    description: {
      es: "Separar el síntoma de la causa antes de escribir código.",
      en: "Separating the symptom from the cause before writing code.",
    },
    related: ["strategy", "creativity"],
  },
  {
    id: "strategy",
    name: { es: "Visión de producto", en: "Product thinking" },
    description: {
      es: "Conectar cada funcionalidad con los objetivos del producto y del negocio.",
      en: "Connecting every feature with product and business goals.",
    },
    related: ["communication", "research"],
  },
  {
    id: "creativity",
    name: { es: "Creatividad", en: "Creativity" },
    description: {
      es: "Explorar varias soluciones antes de quedarse con la primera que funciona.",
      en: "Exploring several solutions before settling on the first one that works.",
    },
    related: ["detail", "collaboration"],
  },
  {
    id: "communication",
    name: { es: "Comunicación", en: "Communication" },
    description: {
      es: "Explicar el porqué de una decisión técnica con la misma claridad que el qué.",
      en: "Explaining the why of a technical decision as clearly as the what.",
    },
    related: ["collaboration"],
  },
  {
    id: "research",
    name: { es: "Investigación", en: "Research" },
    description: {
      es: "Leer la documentación, probar y contrastar antes de dar algo por supuesto.",
      en: "Reading the docs, testing and cross-checking before taking anything for granted.",
    },
    related: ["problem-solving"],
  },
  {
    id: "collaboration",
    name: { es: "Trabajo colaborativo", en: "Collaboration" },
    description: {
      es: "Trabajar con diseño, producto y negocio en la misma conversación.",
      en: "Working with design, product and business in the same conversation.",
    },
    related: ["user-centred"],
  },
  {
    id: "detail",
    name: { es: "Atención al detalle", en: "Attention to detail" },
    description: {
      es: "Los errores, los estados vacíos y los textos también son parte del producto.",
      en: "Errors, empty states and copy are part of the product too.",
    },
    related: ["communication"],
  },
];

/* ------------------------------------------------------------------ */
/* Work process                                                        */
/* ------------------------------------------------------------------ */

export interface ProcessStage {
  number: string;
  title: Localized;
  description: Localized;
  activities: Localized<string[]>;
}

export const processStages: ProcessStage[] = [
  {
    number: "01",
    title: { es: "Entender", en: "Understand" },
    description: {
      es: "Aclarar qué problema hay que resolver y para quién.",
      en: "Clarify which problem needs solving and for whom.",
    },
    activities: {
      es: ["Requisitos", "Revisión de lo existente", "Preguntas abiertas"],
      en: ["Requirements", "Review of what exists", "Open questions"],
    },
  },
  {
    number: "02",
    title: { es: "Planificar", en: "Plan" },
    description: {
      es: "Dividir el trabajo en tareas pequeñas y decidir la arquitectura.",
      en: "Split the work into small tasks and decide the architecture.",
    },
    activities: {
      es: ["Modelo de datos", "Priorización", "Criterios de éxito"],
      en: ["Data model", "Prioritisation", "Success criteria"],
    },
  },
  {
    number: "03",
    title: { es: "Construir", en: "Build" },
    description: {
      es: "Programar el frontend y el backend en ciclos cortos.",
      en: "Code the frontend and the backend in short cycles.",
    },
    activities: {
      es: ["Frontend", "API y backend", "Control de versiones"],
      en: ["Frontend", "API and backend", "Version control"],
    },
  },
  {
    number: "04",
    title: { es: "Probar y publicar", en: "Test and ship" },
    description: {
      es: "Probar lo construido, publicarlo y mejorarlo con lo aprendido.",
      en: "Test what was built, ship it and improve it with what was learned.",
    },
    activities: {
      es: ["Pruebas", "Revisión de código", "Despliegue"],
      en: ["Testing", "Code review", "Deployment"],
    },
  },
];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export interface AboutContent {
  title: Localized;
  intro: Localized;
  philosophy: Localized;
  interests: Localized<string[]>;
  /**
   * Real photo of the owner. Leave `src` empty to show the abstract
   * placeholder artwork instead.
   */
  photo: { src: string; alt: Localized };
}

/** Provisional copy: replace freely. */
export const about: AboutContent = {
  title: { es: "Del frontend al backend.", en: "From frontend to backend." },
  intro: {
    es: "Soy Arkaitz Zubizarreta, desarrollador full stack. Construyo aplicaciones web con JavaScript, PHP, Python, Django y FastAPI. Antes de escribir código me intereso por entender el problema, para que el resultado sea útil.",
    en: "I'm Arkaitz Zubizarreta, a full stack developer. I build web applications with JavaScript, PHP, Python, Django and FastAPI. Before writing code I make sure I understand the problem, so the result is useful.",
  },
  philosophy: {
    es: "Un buen producto funciona sin que nadie piense en cómo está hecho. Busco código claro, que otra persona pueda leer y mantener, y una interfaz cuidada en los detalles.",
    en: "A good product works without anyone thinking about how it is built. I aim for clear code that someone else can read and maintain, and an interface that is polished down to the details.",
  },
  interests: {
    es: ["APIs con FastAPI", "Aplicaciones con Django", "Herramientas para desarrolladores", "Accesibilidad", "Arte digital y motion"],
    en: ["APIs with FastAPI", "Django applications", "Developer tools", "Accessibility", "Digital art and motion"],
  },
  photo: {
    src: "",
    alt: { es: "Retrato de Arkaitz Zubizarreta", en: "Portrait of Arkaitz Zubizarreta" },
  },
};
