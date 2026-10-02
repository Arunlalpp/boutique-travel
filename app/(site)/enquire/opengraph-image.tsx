import { ogImageContentType, ogImageSize } from "@/lib/og-image";
import { staticOgImage } from "@/lib/og-static";
import { media } from "@/lib/data/media";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Let’s plan your next escape.";

export default staticOgImage({
    eyebrow: "Plan a trip",
    title: "Let’s plan your next escape.",
    subtitle: "Tell us about your dream trip in three quick steps. A trip designer replies personally.",
    chips: ["Three quick steps", "Personal reply"],
    image: media.heroMountains.src,
});
