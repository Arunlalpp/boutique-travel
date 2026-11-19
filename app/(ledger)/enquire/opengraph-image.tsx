import { ogImageContentType, ogImageSize } from "@/lib/og-image";
import { staticOgImage } from "@/lib/og-static";
import { enquiry, promises } from "@/lib/data/ledger";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Begin your entry";

export default staticOgImage({
    eyebrow: "Begin your entry",
    title: enquiry.title.join(" "),
    subtitle: enquiry.lede,
    chips: ["Personal reply", "One guest at a time"],
    image: promises.image.src,
});
