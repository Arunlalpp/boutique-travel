import { domainOf, generateOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";
import { hero } from "@/lib/data/ledger";
import { site } from "@/lib/site";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Paths first walked by us: journeys across India designed for one guest at a time";

export default async function Image() {
    const settings = site;
    return generateOgImage({
        siteName: settings.name,
        eyebrow: hero.eyebrow,
        title: hero.title.join(" "),
        subtitle: hero.lede,
        chips: ["Ten Entries", "Walked first", "One guest at a time"],
        image: hero.clips[0].image.src,
        domain: domainOf(settings.siteUrl),
    });
}
