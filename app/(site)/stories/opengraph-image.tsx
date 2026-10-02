import { ogImageContentType, ogImageSize } from "@/lib/og-image";
import { staticOgImage } from "@/lib/og-static";
import { media } from "@/lib/data/media";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Told around the campfire.";

export default staticOgImage({
    eyebrow: "Guest stories",
    title: "Told around the campfire.",
    subtitle: "Films and reflections from guests who have travelled with us.",
    chips: [],
    image: media.safariPlains.src,
});
