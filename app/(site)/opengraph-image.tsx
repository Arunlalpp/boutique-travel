import { generateOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";
import { getSiteSettings } from "@/sanity/lib/queries";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Boutique Travel — Private & small-group journeys";

export default async function OpengraphImage() {
    const settings = await getSiteSettings();
    return generateOgImage({ name: settings.name, descriptor: settings.descriptor, tagline: settings.tagline });
}
