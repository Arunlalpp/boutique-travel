import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image as SanityImageValue } from "sanity";
import type { ImageAsset } from "@/lib/types";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Maps a Sanity image field to the site's existing `ImageAsset` shape, so
 * every component that renders a photo (SmartImage, ImageHero, Parallax,
 * Gallery, JourneyCard...) keeps working completely unchanged.
 *
 * `focal` is derived from the hotspot as a CSS object-position percentage —
 * cropping still happens client-side via `object-cover`, exactly as today.
 */
export function toImageAsset(image: RawImage | null | undefined, fallbackAlt: string): ImageAsset | undefined {
    if (!image?.asset) return undefined;

    const src = builder.image(image).width(2000).fit("max").auto("format").url();
    const alt = image.alt || fallbackAlt;
    const focal = image.hotspot ? `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%` : undefined;

    return { src, alt, focal };
}

export function toImageAssetList(images: RawImage[] | null | undefined, fallbackAlt: string): ImageAsset[] {
    if (!images?.length) return [];
    return images
        .map((image) => toImageAsset(image, fallbackAlt))
        .filter((image): image is ImageAsset => image !== undefined);
}

export type RawImage = SanityImageValue & {
    alt?: string;
};
