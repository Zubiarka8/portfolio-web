"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { navItems, navOwner, routes, sectionIds, type SectionKey } from "@/data/navigation";
import type { Dictionary } from "@/data/dictionary";
import { siteConfig } from "@/data/site-config";
import type { Locale } from "@/lib/i18n";
import { LOCALE_STORAGE_KEY } from "@/lib/locale-redirect";
import { pageHref } from "@/lib/base-path";

interface NavbarProps {
  locale: Locale;
  dict: Dictionary["nav"];
  /** True on the one-page home, where links are plain hashes. */
  onHome: boolean;
  /** Same page in the other locale. */
  alternateHref: string;
}

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

function useActiveSection(locale: Locale, enabled: boolean): SectionKey | null {
  const [active, setActive] = useState<SectionKey | null>(enabled ? "home" : null);

  useEffect(() => {
    if (!enabled) return;
    const entries = Object.entries(sectionIds[locale]) as [SectionKey, string][];
    const keyById = new Map(entries.map(([key, id]) => [id, key]));
    const elements = entries
      .map(([, id]) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (!entry.isIntersecting) continue;
          const key = keyById.get(entry.target.id);
          if (key) setActive(navOwner[key]);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [enabled, locale]);

  return active;
}

/** Saves the visitor's choice so the root URL stops auto-redirecting by browser language. */
function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage blocked: the switch still navigates, it just is not remembered.
  }
}

export function Navbar({ locale, dict, onHome, alternateHref }: NavbarProps) {
  const active = useActiveSection(locale, onHome);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const closeOnDesktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => closeOnDesktop.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    closeOnDesktop.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      closeOnDesktop.removeEventListener("change", onChange);
    };
  }, [open]);

  const hrefFor = (key: SectionKey) => routes.section(locale, key, onHome);

  return (
    <header
      className={`sticky top-0 z-50 h-[var(--nav-height)] border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line-soft bg-background/75 backdrop-blur-xl"
          : "border-transparent bg-background/30 backdrop-blur-md"
      }`}
    >
      <nav
        aria-label={dict.label}
        className="mx-auto flex h-full max-w-[var(--container)] items-center justify-between gap-6 px-[var(--gutter)]"
      >
        <Link
          href={onHome ? `#${sectionIds[locale].home}` : routes.home(locale)}
          aria-label={`${siteConfig.name}: ${dict.home}`}
          className="font-dot text-[1.65rem] font-black leading-none text-fg transition-colors duration-200 hover:text-accent"
        >
          AZ<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.key;
            return (
              <li key={item.key} className="relative">
                <a
                  href={pageHref(hrefFor(item.key))}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative z-10 flex h-9 items-center gap-2 rounded-full px-3.5 font-mono text-[0.78rem] transition-colors duration-200 ${
                    isActive ? "text-fg" : "text-fg-secondary hover:text-fg"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 -z-10 rounded-full border border-line bg-surface-elevated"
                      transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                    />
                  ) : null}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-dot"
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-accent"
                      transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                    />
                  ) : null}
                  {item.label[locale]}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          {/* One button: it shows the language you would switch to. */}
          <a
            href={pageHref(alternateHref)}
            hrefLang={otherLocale}
            lang={otherLocale}
            aria-label={dict.switchLanguage}
            onClick={() => rememberLocale(otherLocale)}
            className="flex h-11 min-w-11 items-center justify-center rounded-full border border-line px-3 font-mono text-xs text-fg-secondary transition-colors duration-200 hover:border-accent hover:text-fg"
          >
            {dict.languageShort}
          </a>
          <ThemeToggle label={dict.theme} />
          <button
            ref={toggleRef}
            type="button"
            className="flex size-11 items-center justify-center rounded-full border border-line text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.closeMenu : dict.openMenu}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="absolute inset-x-0 top-full border-b border-line-soft bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col px-[var(--gutter)] py-4">
              {navItems.map((item, index) => {
                const isActive = active === item.key;
                return (
                  <li key={item.key} className="border-b border-line-soft last:border-b-0">
                    <a
                      href={pageHref(hrefFor(item.key))}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => setOpen(false)}
                      className="flex min-h-14 items-center justify-between font-dot text-2xl font-bold text-fg"
                    >
                      {item.label[locale]}
                      <span className="font-mono text-xs font-normal text-fg-muted">
                        {isActive ? <span className="mr-2 text-accent">●</span> : null}
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
