"use client";

import { useEffect } from "react";
import { withBasePath } from "@/lib/base-path";

const BUILD_ID = process.env.NEXT_PUBLIC_BUILD_ID ?? "dev";
const RELOAD_KEY = "reloaded-for-build";

/**
 * GitHub Pages lets browsers cache a page for 10 minutes, so a visitor can keep
 * seeing an old deploy. This compares the build baked into the page with the
 * live /version.json and reloads once when they differ.
 */
export function UpdateChecker() {
  useEffect(() => {
    if (BUILD_ID === "dev") return;

    async function check() {
      try {
        const response = await fetch(`${withBasePath("/version.json")}?t=${Date.now()}`, {
          cache: "no-store",
        });
        if (!response.ok) return;
        const { build } = (await response.json()) as { build?: string };
        if (!build || build === BUILD_ID) return;
        // One reload per new build: avoids a loop while the CDN catches up.
        if (sessionStorage.getItem(RELOAD_KEY) === build) return;
        sessionStorage.setItem(RELOAD_KEY, build);
        window.location.reload();
      } catch {
        // Offline or storage blocked: keep showing the current page.
      }
    }

    void check();
    const onVisible = () => {
      if (document.visibilityState === "visible") void check();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, []);

  return null;
}
