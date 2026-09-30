import { generateOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";
import { site } from "@/lib/data/site";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = `${site.name} — ${site.descriptor}`;

export default async function OpengraphImage() {
  return generateOgImage();
}
