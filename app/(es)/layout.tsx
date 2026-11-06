import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RootDocument } from "@/components/layout/RootDocument";
import { rootMetadata } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = rootMetadata("es");

export const viewport: Viewport = {
  themeColor: "#09090D",
  colorScheme: "dark",
};

export default function SpanishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="es">{children}</RootDocument>;
}
