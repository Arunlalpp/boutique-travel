import { defineField } from "sanity";
import type { FieldDefinition } from "sanity";

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
