import { defineField } from "sanity";
import type { CustomValidator, FieldDefinition, ImageRule, Rule } from "sanity";

/**
 * Standard image field: hotspot cropping + an alt-text field, used by the
 * frontend's `toImageAsset()` helper to build the existing `ImageAsset`
 * shape. Spread the result's `fields`/`options` into a field definition
 * rather than nesting, so `defineField` still sees a flat `image` field.
 */
export const altField = defineField({
    name: "alt",
    title: "Alternative text",
    type: "string",
    description: "Describes the image for screen readers and search engines.",
    validation: (Rule) => Rule.required(),
});

export const imageOptions = { hotspot: true } as const;
export const imageFields: FieldDefinition[] = [altField];

/**
 * A soft, non-blocking size check for an image field: flags oversized
 * uploads with a warning (never an error, so an editor can never get stuck
 * unable to publish) that names the actual file size and the recommended
 * ceiling.
 *
 * Two entry points exist only because Sanity types a top-level `image` field's
 * `validation` as `ImageRule` but an array-of-images member's `validation` as
 * the plain `Rule` — the two aren't assignable to each other, even though the
 * check itself is identical. Use `imageSizeWarning` for a single image field
 * (`validation: imageSizeWarning(5)`) and `gallerySizeWarning` for an image
 * inside an array's `of` (`of: [{ type: "image", validation: gallerySizeWarning(3) }]`).
 */
function sizeValidator(maxBytes: number, recommendedMaxMB: number): CustomValidator<{ asset?: { _ref?: string } } | undefined> {
    return async (value, context) => {
        const assetRef = value?.asset?._ref;
        if (!assetRef) return true;
        const client = context.getClient({ apiVersion: "2024-10-01" });
        const asset = await client.fetch<{ size?: number }>(`*[_id == $id][0]{size}`, { id: assetRef });
        if (asset?.size && asset.size > maxBytes) {
            const actualMB = (asset.size / (1024 * 1024)).toFixed(1);
            return `This image is ${actualMB}MB. For faster page loads, ${recommendedMaxMB}MB or smaller is recommended — consider compressing it before uploading.`;
        }
        return true;
    };
}

export function imageSizeWarning(recommendedMaxMB: number) {
    const maxBytes = recommendedMaxMB * 1024 * 1024;
    return (Rule: ImageRule): ImageRule => Rule.custom(sizeValidator(maxBytes, recommendedMaxMB)).warning();
}

export function gallerySizeWarning(recommendedMaxMB: number) {
    const maxBytes = recommendedMaxMB * 1024 * 1024;
    return (Rule: Rule): Rule => Rule.custom(sizeValidator(maxBytes, recommendedMaxMB)).warning();
}
