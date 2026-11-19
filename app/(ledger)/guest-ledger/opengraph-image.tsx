import { ogImageContentType, ogImageSize } from "@/lib/og-image";
import { staticOgImage } from "@/lib/og-static";
import { guestPage, guestStories } from "@/lib/data/ledger-pages";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = guestPage.title;

export default staticOgImage({
    eyebrow: guestPage.kicker,
    title: guestPage.title,
    subtitle: "Short films and handwritten pages from people who have already walked the routes.",
    chips: ["Guest films", "Ledger pages"],
    image: guestStories[0].poster.src,
});
