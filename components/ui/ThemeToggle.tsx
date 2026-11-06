"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";
const getServerSnapshot = (): Theme => "dark";

/** Dark is the default; the choice is saved in localStorage and applied by an inline script in <head>. */
export function ThemeToggle({ label }: { label: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    if (next === "light") document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked: the theme still changes for this visit.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={theme === "light"}
      className="flex size-11 items-center justify-center rounded-full border border-line text-fg-secondary transition-colors duration-200 hover:border-fg-secondary hover:text-fg"
    >
      <Moon aria-hidden="true" className="theme-icon-moon size-4" />
      <Sun aria-hidden="true" className="theme-icon-sun size-4" />
    </button>
  );
}
