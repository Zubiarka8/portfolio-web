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
    name: { es: "Diseño centrado en el usuario", en: "User-centred design" },
    description: {
      es: "Cada decisión parte de quién va a usar el producto y de lo que necesita conseguir.",
      en: "Every decision starts with who will use the product and what they need to achieve.",
    },
    related: ["research", "problem-solving", "detail"],
  },
  {
    id: "problem-solving",
    name: { es: "Resolución de problemas", en: "Problem solving" },
    description: {
      es: "Separar el síntoma de la causa antes de proponer una pantalla.",
      en: "Separating the symptom from the cause before proposing a screen.",
    },
    related: ["strategy", "creativity"],
  },
  {
    id: "strategy",
    name: { es: "Pensamiento estratégico", en: "Strategic thinking" },
    description: {
      es: "Conectar cada interfaz con los objetivos del producto y del negocio.",
      en: "Connecting every interface with product and business goals.",
    },
    related: ["communication", "research"],
  },
  {
    id: "creativity",
    name: { es: "Creatividad", en: "Creativity" },
    description: {
      es: "Explorar varias direcciones antes de quedarse con la primera idea válida.",
      en: "Exploring several directions before settling on the first valid idea.",
    },
    related: ["detail", "collaboration"],
  },
  {
    id: "communication",
    name: { es: "Comunicación", en: "Communication" },
    description: {
      es: "Explicar el porqué de una decisión con la misma claridad que el qué.",
      en: "Explaining the why of a decision as clearly as the what.",
    },
    related: ["collaboration"],
  },
  {
    id: "research",
    name: { es: "Investigación", en: "Research" },
    description: {
      es: "Preguntar, observar y contrastar antes de dar algo por supuesto.",
      en: "Asking, observing and cross-checking before taking anything for granted.",
    },
    related: ["problem-solving"],
  },
  {
    id: "collaboration",
    name: { es: "Trabajo colaborativo", en: "Collaboration" },
    description: {
      es: "Diseñar con desarrollo, producto y negocio en la misma conversación.",
      en: "Designing with engineering, product and business in the same conversation.",
    },
    related: ["user-centred"],
  },
  {
    id: "detail",
    name: { es: "Atención al detalle", en: "Attention to detail" },
    description: {
      es: "Los estados, los textos y los márgenes también son parte de la experiencia.",
      en: "States, copy and spacing are part of the experience too.",
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
    title: { es: "Descubrir", en: "Discover" },
    description: {
      es: "Investigar usuarios, necesidades y contexto.",
      en: "Research users, needs and context.",
    },
    activities: {
      es: ["Entrevistas", "Análisis del contexto", "Revisión de lo existente"],
      en: ["Interviews", "Context analysis", "Review of what exists"],
    },
  },
  {
    number: "02",
    title: { es: "Definir", en: "Define" },
    description: {
      es: "Identificar problemas, oportunidades y objetivos.",
      en: "Identify problems, opportunities and goals.",
    },
    activities: {
      es: ["Mapas de recorrido", "Priorización", "Criterios de éxito"],
      en: ["Journey maps", "Prioritisation", "Success criteria"],
    },
  },
  {
    number: "03",
    title: { es: "Diseñar", en: "Design" },
    description: {
      es: "Explorar ideas, construir interfaces y prototipos.",
      en: "Explore ideas, build interfaces and prototypes.",
    },
    activities: {
      es: ["Wireframes", "Interfaz visual", "Prototipos interactivos"],
      en: ["Wireframes", "Visual interface", "Interactive prototypes"],
    },
  },
  {
    number: "04",
    title: { es: "Validar", en: "Validate" },
    description: {
      es: "Probar soluciones, recoger feedback e iterar.",
      en: "Test solutions, gather feedback and iterate.",
    },
    activities: {
      es: ["Tests con usuarios", "Revisión de accesibilidad", "Iteración"],
      en: ["User testing", "Accessibility review", "Iteration"],
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
  title: { es: "Más allá de la interfaz.", en: "Beyond the interface." },
  intro: {
    es: "Soy Arkaitz Zubizarreta, un profesional apasionado por el diseño de productos digitales y la creación de experiencias que combinan claridad, funcionalidad y personalidad. Me interesa comprender los problemas, explorar soluciones y transformar ideas en experiencias útiles.",
    en: "I'm Arkaitz Zubizarreta, a professional passionate about digital product design and about creating experiences that combine clarity, functionality and personality. I care about understanding problems, exploring solutions and turning ideas into useful experiences.",
  },
  philosophy: {
    es: "Una buena interfaz no se nota: deja que la persona haga lo que ha venido a hacer. Busco ese equilibrio entre orden, criterio visual y detalles que hacen que un producto se sienta propio.",
    en: "A good interface goes unnoticed: it lets people do what they came to do. I look for the balance between order, visual judgement and the details that make a product feel like its own.",
  },
  interests: {
    es: ["Sistemas de diseño", "Interfaces de datos", "Prototipado con código", "Accesibilidad", "Arte digital y motion"],
    en: ["Design systems", "Data interfaces", "Prototyping in code", "Accessibility", "Digital art and motion"],
  },
  photo: {
    src: "",
    alt: { es: "Retrato de Arkaitz Zubizarreta", en: "Portrait of Arkaitz Zubizarreta" },
  },
};
