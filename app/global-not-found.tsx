import type { Metadata } from "next";
import { RootDocument } from "@/components/layout/RootDocument";
import { NotFoundView } from "@/components/pages/NotFoundView";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 | Arkaitz Zubizarreta",
  robots: { index: false },
};

/** Unmatched URLs: there are two root layouts, so this composes its own. */
export default function GlobalNotFound() {
  return (
    <RootDocument locale="es">
      <NotFoundView locale="es" />
    </RootDocument>
  );
}
