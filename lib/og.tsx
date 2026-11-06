import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site-config";
import type { Locale } from "./i18n";

export const ogSize = { width: 1200, height: 630 };

/** Shared Open Graph card: name, role and the iridescent light. */
export function renderOgImage(locale: Locale) {
  const [first, last] = siteConfig.name.toUpperCase().split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#09090D",
          color: "#F5F5F7",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -80,
            top: -120,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background:
              "radial-gradient(circle at 35% 35%, rgba(150,85,255,0.9), rgba(65,105,255,0.55) 45%, rgba(255,135,87,0.35) 65%, rgba(9,9,13,0) 75%)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#A4A4B2" }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#D7FF3F", display: "flex" }} />
          {siteConfig.role[locale]}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 128, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4 }}>
          <span>{first}</span>
          <span>
            {last}
            <span style={{ color: "#D7FF3F" }}>.</span>
          </span>
        </div>
      </div>
    ),
    ogSize,
  );
}
