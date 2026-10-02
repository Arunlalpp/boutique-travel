import { ogImageContentType, ogImageSize } from "@/lib/og-image";
import { staticOgImage } from "@/lib/og-static";
import { media } from "@/lib/data/media";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Routes we know by heart";

export default staticOgImage({
    eyebrow: "Journeys",
    title: "Routes we know by heart",
    subtitle: "Private and small-group journeys, each reshaped around your dates and pace.",
    chips: ["Private", "Small group"],
    image: media.icelandCoast.src,
});
