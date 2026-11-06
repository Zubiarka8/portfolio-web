import {
  ClaudeCodeIcon,
  CSharpIcon,
  CssIcon,
  CursorIcon,
  DjangoIcon,
  FastApiIcon,
  FigmaIcon,
  GitHubCopilotIcon,
  GitHubIcon,
  GitIcon,
  Html5Icon,
  IntelliJIdeaIcon,
  JavaIcon,
  JavaScriptIcon,
  NotionIcon,
  OpenAiIcon,
  PhpIcon,
  PythonIcon,
  VsCodeIcon,
  XamlIcon,
  type IconComponent,
} from "@/components/ui/BrandIcons";
import type { Localized } from "@/lib/i18n";

export type SkillCategoryId = "languages" | "ai" | "tools";

export interface SkillCategory {
  id: SkillCategoryId;
  /** Short code shown next to each skill. */
  code: string;
  label: Localized;
  description: Localized;
}

export interface Skill {
  name: Localized;
  category: SkillCategoryId;
  /** Official brand mark (see components/ui/BrandIcons). */
  icon: IconComponent;
  /** Official brand color. */
  color: string;
  /** Replacement when the official color is unreadable on the dark theme. */
  onDark?: string;
  /** Replacement when the official color is unreadable on the light theme. */
  onLight?: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    code: "LG",
    label: { es: "Lenguajes y frameworks", en: "Languages & frameworks" },
    description: {
      es: "Marcado, lenguajes y frameworks con los que construyo del frontend al backend.",
      en: "Markup, languages and frameworks I use to build from frontend to backend.",
    },
  },
  {
    id: "ai",
    code: "AI",
    label: { es: "Herramientas con IA", en: "AI tools" },
    description: {
      es: "Asistentes que uso para programar, revisar y documentar más rápido.",
      en: "Assistants I use to code, review and document faster.",
    },
  },
  {
    id: "tools",
    code: "TL",
    label: { es: "Herramientas", en: "Tools" },
    description: {
      es: "El entorno de trabajo diario, del primer boceto al repositorio.",
      en: "The daily working environment, from the first sketch to the repository.",
    },
  },
];

/** Brand names are not translated. */
const same = (name: string): Localized => ({ es: name, en: name });

export const skills: Skill[] = [
  { name: same("HTML"), category: "languages", icon: Html5Icon, color: "#E34F26" },
  { name: same("CSS"), category: "languages", icon: CssIcon, color: "#1572B6", onDark: "#2D9CDB" },
  { name: same("JavaScript"), category: "languages", icon: JavaScriptIcon, color: "#F7DF1E", onLight: "#B89F00" },
  { name: same("PHP"), category: "languages", icon: PhpIcon, color: "#777BB4" },
  { name: same("Python"), category: "languages", icon: PythonIcon, color: "#3776AB", onDark: "#4B8BBE" },
  { name: same("Java"), category: "languages", icon: JavaIcon, color: "#ED8B00" },
  { name: same("C#"), category: "languages", icon: CSharpIcon, color: "#512BD4", onDark: "#9B7BFF" },
  { name: same("XAML"), category: "languages", icon: XamlIcon, color: "#512BD4", onDark: "#9B7BFF" },
  { name: same("Django"), category: "languages", icon: DjangoIcon, color: "#092E20", onDark: "#44B78B" },
  { name: same("FastAPI"), category: "languages", icon: FastApiIcon, color: "#009688" },

  { name: same("GitHub Copilot"), category: "ai", icon: GitHubCopilotIcon, color: "#000000", onDark: "#FFFFFF" },
  { name: same("Cursor"), category: "ai", icon: CursorIcon, color: "#000000", onDark: "#FFFFFF" },
  { name: same("Claude Code"), category: "ai", icon: ClaudeCodeIcon, color: "#D97757" },
  { name: same("ChatGPT / Codex"), category: "ai", icon: OpenAiIcon, color: "#10A37F" },

  { name: same("VS Code"), category: "tools", icon: VsCodeIcon, color: "#007ACC", onDark: "#2EA8F0" },
  { name: same("IntelliJ IDEA"), category: "tools", icon: IntelliJIdeaIcon, color: "#000000", onDark: "#FFFFFF" },
  { name: same("Git"), category: "tools", icon: GitIcon, color: "#F05032" },
  { name: same("GitHub"), category: "tools", icon: GitHubIcon, color: "#181717", onDark: "#FFFFFF" },
  { name: same("Figma"), category: "tools", icon: FigmaIcon, color: "#F24E1E" },
  { name: same("Notion"), category: "tools", icon: NotionIcon, color: "#000000", onDark: "#FFFFFF" },
];

export function getSkillsByCategory(category: SkillCategoryId): Skill[] {
  return skills.filter((skill) => skill.category === category);
}

export function getCategory(id: SkillCategoryId): SkillCategory {
  const category = skillCategories.find((item) => item.id === id);
  if (!category) throw new Error(`Unknown skill category: ${id}`);
  return category;
}
