import { domainOf, generateOgImage } from "./og-image";
import { getSiteSettings } from "@/sanity/lib/queries";

interface StaticOg {
    eyebrow: string;
    title: string;
    subtitle?: string;
    chips?: string[];
    image?: string;
}

/** Builds the default export for a static page's opengraph-image.tsx. */
export function staticOgImage(card: StaticOg) {
    return async function Image() {
        const settings = await getSiteSettings();
        return generateOgImage({ ...card, siteName: settings.name, domain: domainOf(settings.siteUrl) });
    };
}
