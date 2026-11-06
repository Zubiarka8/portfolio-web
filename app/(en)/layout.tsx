import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RootDocument } from "@/components/layout/RootDocument";
import { rootMetadata } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = rootMetadata("en");

export const viewport: Viewport = {
  themeColor: "#09090D",
  colorScheme: "dark",
};

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
