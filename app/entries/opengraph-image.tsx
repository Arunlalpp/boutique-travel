import { ogImageContentType, ogImageSize } from "@/lib/og-image";
import { staticOgImage } from "@/lib/og-static";
import { entriesPage } from "@/lib/data/ledger-pages";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = entriesPage.title;

export default staticOgImage({
    eyebrow: entriesPage.kicker,
    title: entriesPage.title,
    subtitle: entriesPage.lede,
    chips: ["Ten Entries", "Two tags each"],
    image: entriesPage.image.src,
});
