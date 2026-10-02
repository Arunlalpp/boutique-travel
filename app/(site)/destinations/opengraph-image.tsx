import { ogImageContentType, ogImageSize } from "@/lib/og-image";
import { staticOgImage } from "@/lib/og-static";
import { media } from "@/lib/data/media";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Where will you wake up next?";

export default staticOgImage({
    eyebrow: "Destinations",
    title: "Where will you wake up next?",
    subtitle: "From misty tea hills to high-altitude deserts. Pick a landscape and we’ll build the journey around it.",
    chips: [],
    image: media.summit.src,
});
