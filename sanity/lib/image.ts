import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image as SanityImageValue } from "sanity";
import type { ImageAsset } from "@/lib/types";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * A neutral 1x1 placeholder, never a blank string — `next/image` throws if
 * given an empty `src`, so a document with a missing/deleted asset must
 * still resolve to something renderable instead of crashing the page.
 */
const FALLBACK_SRC =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiLz4=";

/**
 * Maps a Sanity image field to the site's existing `ImageAsset` shape, so
 * every component that renders a photo (SmartImage, ImageHero, Parallax,
 * Gallery, JourneyCard...) keeps working completely unchanged.
 *
 * The URL deliberately has no fixed `w`/`q` — `next/image` requests the same
 * URL once per breakpoint with a `width` argument, and the custom loader
 * (lib/image-loader.ts) stamps that actual width + the requested quality
 * onto it. Baking in a single large width here would make every srcset
 * candidate identical, defeating responsive loading entirely.
 *
 * `focal` is derived from the hotspot as a CSS object-position percentage —
 * cropping still happens client-side via `object-cover`, exactly as today.
 */
export function toImageAsset(image: RawImage | null | undefined, fallbackAlt: string): ImageAsset | undefined {
    if (!image?.asset) return undefined;

    const src = builder.image(image).auto("format").url();
    const alt = image.alt || fallbackAlt;
    const focal = image.hotspot ? `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%` : undefined;

    return { src, alt, focal };
}

/** Same as toImageAsset, but never undefined — for fields the UI always renders. */
export function toImageAssetOrFallback(image: RawImage | null | undefined, fallbackAlt: string): ImageAsset {
    return toImageAsset(image, fallbackAlt) ?? { src: FALLBACK_SRC, alt: fallbackAlt };
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
