import { domainOf, generateOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";
import { hero } from "@/lib/data/home";
import { getSiteSettings } from "@/sanity/lib/queries";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Small-group adventures, curated camps and wildlife trails";

export default async function Image() {
    const settings = await getSiteSettings();
    return generateOgImage({
        siteName: settings.name,
        eyebrow: settings.descriptor || "Boutique adventures",
        title: hero.title,
        subtitle: hero.lede,
        chips: ["Curated camps", "Small-group treks", "Wildlife trails"],
        // The client can override the photo with Site Settings → Default share image in the Studio.
        image: settings.defaultOgImage?.src ?? hero.image.src,
        domain: domainOf(settings.siteUrl),
    });
}
