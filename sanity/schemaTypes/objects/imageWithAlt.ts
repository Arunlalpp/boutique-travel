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
 * A hard, publish-blocking size limit for an image field: rejects oversized
 * uploads with an error naming the actual file size and the limit, so the
 * document can't be published until the image is compressed or replaced.
 * The Free Sanity plan's 100GB asset quota is a hard cap with no overage —
 * once it's hit, no new assets can be uploaded at all — so this is deliberate
 * enforcement, not just a nudge.
 *
 * Two entry points exist only because Sanity types a top-level `image` field's
 * `validation` as `ImageRule` but an array-of-images member's `validation` as
 * the plain `Rule` — the two aren't assignable to each other, even though the
 * check itself is identical. Use `imageSizeLimit` for a single image field
 * (`validation: imageSizeLimit(5)`) and `gallerySizeLimit` for an image inside
 * an array's `of` (`of: [{ type: "image", validation: gallerySizeLimit(3) }]`).
 */
function sizeValidator(maxBytes: number, maxMB: number): CustomValidator<{ asset?: { _ref?: string } } | undefined> {
    return async (value, context) => {
        const assetRef = value?.asset?._ref;
        if (!assetRef) return true;
        const client = context.getClient({ apiVersion: "2024-10-01" });
        const asset = await client.fetch<{ size?: number }>(`*[_id == $id][0]{size}`, { id: assetRef });
        if (asset?.size && asset.size > maxBytes) {
            const actualMB = (asset.size / (1024 * 1024)).toFixed(1);
            return `This image is ${actualMB}MB, over the ${maxMB}MB limit. Compress it or choose a smaller file before publishing.`;
        }
        return true;
    };
}

export function imageSizeLimit(maxMB: number) {
    const maxBytes = maxMB * 1024 * 1024;
    return (Rule: ImageRule): ImageRule => Rule.custom(sizeValidator(maxBytes, maxMB)).error();
}

export function gallerySizeLimit(maxMB: number) {
    const maxBytes = maxMB * 1024 * 1024;
    return (Rule: Rule): Rule => Rule.custom(sizeValidator(maxBytes, maxMB)).error();
}
