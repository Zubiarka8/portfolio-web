import type { CSSProperties } from "react";
import type { Skill } from "@/data/skills";

/** Feeds a skill's brand colors to the `.brand-icon` rule in globals.css. */
export function brandColorStyle(skill: Skill): CSSProperties {
  return {
    "--brand-dark": skill.onDark ?? skill.color,
    "--brand-light": skill.onLight ?? skill.color,
  } as CSSProperties;
}
