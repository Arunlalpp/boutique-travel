import { ogImageContentType, ogImageSize } from "@/lib/og-image";
import { staticOgImage } from "@/lib/og-static";
import { media } from "@/lib/data/media";
import { plans } from "@/lib/data/packages";
import { money } from "@/lib/format";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Pick your kind of adventure";

export default staticOgImage({
    eyebrow: "Packages",
    title: "Pick your kind of adventure",
    subtitle: "All-inclusive packages with guides, meals, stays and transfers. No hidden costs.",
    chips: [`From ${money(Math.min(...plans.map((p) => p.price)))}`, "Guides & meals", "Stays & transfers"],
    image: media.alpineLake.src,
});
