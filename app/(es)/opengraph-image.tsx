import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Arkaitz Zubizarreta, Full Stack Developer";
export const size = ogSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  return renderOgImage("es");
}
