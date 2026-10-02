import { ogImageContentType, ogImageSize } from "@/lib/og-image";
import { staticOgImage } from "@/lib/og-static";
import { media } from "@/lib/data/media";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Built by campers, for curious souls.";

export default staticOgImage({
    eyebrow: "About",
    title: "Built by campers, for curious souls.",
    subtitle: "Guides, naturalists and hosts helping you feel at home in the wild.",
    chips: ["Since 2014", "Groups of eight", "Leave no trace"],
    image: media.nightSky.src,
});
