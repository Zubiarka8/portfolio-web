import { Doto, Space_Grotesk, Space_Mono } from "next/font/google";

/** Dot-matrix display face for headlines. */
export const doto = Doto({
  subsets: ["latin", "latin-ext"],
  axes: ["ROND"],
  variable: "--font-doto",
  display: "swap",
});

export const spaceMono = Space_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const fontVariables = `${doto.variable} ${spaceMono.variable} ${spaceGrotesk.variable}`;
