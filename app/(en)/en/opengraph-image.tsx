import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Arkaitz Zubizarreta, Full Stack Developer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("en");
}
