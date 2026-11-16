import { domainOf, generateOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";
import { hero } from "@/lib/data/ledger";
import { getSiteSettings } from "@/sanity/lib/queries";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Paths first walked by us: journeys across India designed for one guest at a time";

export default async function Image() {
    const settings = await getSiteSettings();
    return generateOgImage({
        siteName: settings.name,
        eyebrow: hero.eyebrow,
        title: hero.title.join(" "),
        subtitle: hero.lede,
        chips: ["Ten Entries", "Walked first", "One guest at a time"],
        // The client can override the photo with Site Settings → Default share image in the Studio.
        image: settings.defaultOgImage?.src ?? hero.clips[0].image.src,
        domain: domainOf(settings.siteUrl),
    });
}
