"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { abilities, type AbilityId } from "@/data/profile";
import { sectionIds } from "@/data/navigation";
import type { Dictionary } from "@/data/dictionary";
import type { Locale } from "@/lib/i18n";

interface AbilitiesProps {
  locale: Locale;
  dict: Dictionary["abilities"];
}

const SIZE = 400;
const CENTER = SIZE / 2;
const RADIUS = 150;
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const nodes = abilities.map((ability, index) => {
  const angle = (-90 + (index * 360) / abilities.length) * (Math.PI / 180);
  return {
    id: ability.id,
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
});

const nodeById = new Map(nodes.map((node) => [node.id, node]));

const links = abilities.flatMap((ability) =>
  ability.related.map((target) => ({ from: ability.id, to: target })),
);

function curve(fromId: AbilityId, toId: AbilityId): string {
  const a = nodeById.get(fromId)!;
  const b = nodeById.get(toId)!;
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const cx = CENTER + (mx - CENTER) * 0.35;
  const cy = CENTER + (my - CENTER) * 0.35;
  return `M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
}

function connectionsOf(id: AbilityId): AbilityId[] {
  const set = new Set<AbilityId>();
  for (const link of links) {
    if (link.from === id) set.add(link.to);
    if (link.to === id) set.add(link.from);
  }
  return [...set];
}

export function Abilities({ locale, dict }: AbilitiesProps) {
  const [selected, setSelected] = useState<AbilityId>(abilities[0].id);
  const connected = useMemo(() => new Set(connectionsOf(selected)), [selected]);
  const selectedIndex = abilities.findIndex((ability) => ability.id === selected);
  const nameOf = (id: AbilityId) => abilities.find((ability) => ability.id === id)?.name[locale] ?? "";

  return (
    <section
      id={sectionIds[locale].abilities}
      aria-labelledby="abilities-title"
      className="relative overflow-hidden border-y border-line-soft bg-surface/40 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[var(--container)] px-[var(--gutter)]">
        <SectionHeading index="04" id="abilities-title" title={dict.title} intro={dict.intro} />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Diagram: a visual echo of the list, which is the accessible control */}
          <div className="relative mx-auto w-full max-w-[460px] lg:sticky lg:top-28 lg:col-span-5 lg:max-w-none">
            <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-auto w-full" aria-hidden="true">
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="var(--border-soft)" />
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS * 0.55}
                fill="none"
                stroke="var(--border-soft)"
                strokeDasharray="2 6"
              />
              {links.map((link) => {
                const active = link.from === selected || link.to === selected;
                return (
                  <path
                    key={`${link.from}-${link.to}`}
                    d={curve(link.from, link.to)}
                    fill="none"
                    stroke={active ? "var(--accent)" : "var(--border)"}
                    strokeOpacity={active ? 0.9 : 0.6}
                    strokeWidth={active ? 1.4 : 1}
                    style={{ transition: "stroke 250ms ease, stroke-opacity 250ms ease" }}
                  />
                );
              })}
              {nodes.map((node, index) => {
                const isSelected = node.id === selected;
                const isConnected = connected.has(node.id);
                return (
                  <g
                    key={node.id}
                    onClick={() => setSelected(node.id)}
                    className="cursor-pointer"
                  >
                    <circle cx={node.x} cy={node.y} r={18} fill="transparent" />
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isSelected ? 9 : 5}
                      fill={isSelected ? "var(--accent)" : isConnected ? "var(--text-primary)" : "var(--background)"}
                      stroke={isSelected ? "var(--accent)" : "var(--text-muted)"}
                      style={{ transition: "r 250ms cubic-bezier(0.23,1,0.32,1), fill 250ms ease" }}
                    />
                    {isSelected ? (
                      <circle cx={node.x} cy={node.y} r={16} fill="none" stroke="var(--accent)" strokeOpacity="0.35" />
                    ) : null}
                    <text
                      x={CENTER + (node.x - CENTER) * 1.2}
                      y={CENTER + (node.y - CENTER) * 1.2 + 4}
                      textAnchor="middle"
                      className="font-mono"
                      fontSize="11"
                      fill={isSelected ? "var(--accent)" : "var(--text-muted)"}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </text>
                  </g>
                );
              })}
              <text
                x={CENTER}
                y={CENTER + 18}
                textAnchor="middle"
                className="font-dot"
                fontSize="64"
                fontWeight="800"
                fill="var(--text-primary)"
              >
                {String(selectedIndex + 1).padStart(2, "0")}
              </text>
            </svg>
          </div>

          <ol aria-label={dict.listLabel} className="lg:col-span-7">
            {abilities.map((ability, index) => {
              const isSelected = ability.id === selected;
              const panelId = `ability-panel-${ability.id}`;
              const related = connectionsOf(ability.id);
              return (
                <AnimatedReveal
                  as="li"
                  key={ability.id}
                  animation="lightSpeedInLeft"
                  delay={index * 0.05}
                  className="border-b border-line-soft first:border-t"
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isSelected}
                      aria-controls={panelId}
                      onClick={() => setSelected(ability.id)}
                      className="group flex min-h-16 w-full items-center gap-5 py-4 text-left"
                    >
                      <span
                        className={`font-mono text-xs tabular transition-colors duration-200 ${
                          isSelected ? "text-accent" : "text-fg-muted"
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 text-[clamp(1.25rem,2.4vw,1.9rem)] font-medium leading-tight tracking-tight transition-colors duration-200 ${
                          isSelected ? "text-fg" : "text-fg-secondary group-hover:text-fg"
                        }`}
                      >
                        {ability.name[locale]}
                      </span>
                      <Plus
                        aria-hidden="true"
                        className={`size-5 shrink-0 transition-transform duration-300 ease-out ${
                          isSelected ? "rotate-45 text-accent" : "text-fg-muted"
                        }`}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isSelected ? (
                      <motion.div
                        id={panelId}
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-4 pb-6 pl-[calc(2ch+1.25rem)]">
                          <p className="max-w-xl text-base leading-relaxed text-fg-secondary">
                            {ability.description[locale]}
                          </p>
                          <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-fg-muted">
                            <span>{dict.connects}</span>
                            {related.map((id) => (
                              <span key={id} className="rounded-full border border-line px-2.5 py-1 text-fg-secondary">
                                {nameOf(id)}
                              </span>
                            ))}
                          </p>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </AnimatedReveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
