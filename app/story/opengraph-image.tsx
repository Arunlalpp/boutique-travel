import { ogImageContentType, ogImageSize } from "@/lib/og-image";
import { staticOgImage } from "@/lib/og-static";
import { story } from "@/lib/data/ledger";
import { storyPage } from "@/lib/data/ledger-pages";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = storyPage.title;

export default staticOgImage({
    eyebrow: storyPage.kicker,
    title: storyPage.title,
    subtitle: story.intro,
    chips: ["Walked first", "Fair pay for hosts"],
    image: story.images.main.src,
});
