import { defineField, defineType } from "sanity";
import { gallerySizeLimit, imageFields, imageOptions, imageSizeLimit } from "./objects/imageWithAlt";

const REGIONS = ["Asia", "Europe", "Africa", "The North"];

export const destination = defineType({
    name: "destination",
    title: "Destination",
    type: "document",
    groups: [
        { name: "content", title: "Content", default: true },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            group: "content",
            options: { source: "name", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "country",
            title: "Country",
            type: "string",
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "region",
            title: "Region",
            type: "string",
            group: "content",
            options: { list: REGIONS },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "shortDescription",
            title: "Short description",
            type: "text",
            rows: 2,
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 6,
            group: "content",
        }),
        defineField({
            name: "heroImage",
            title: "Hero image",
            type: "image",
            group: "content",
            description: "JPG, PNG or WebP — 5MB maximum — larger images can be uploaded but will block publishing until replaced.",
            options: imageOptions,
            fields: imageFields,
            validation: (Rule) => imageSizeLimit(5)(Rule).required(),
        }),
        defineField({
            name: "gallery",
            title: "Gallery",
            type: "array",
            group: "content",
            description: "JPG, PNG or WebP — 3MB maximum per image — larger images can be uploaded but will block publishing until replaced.",
            of: [{ type: "image", options: imageOptions, fields: imageFields, validation: gallerySizeLimit(3) }],
        }),
        defineField({
            name: "featured",
            title: "Featured",
            type: "boolean",
            group: "content",
            initialValue: false,
        }),
        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
            group: "seo",
        }),
    ],
    preview: {
        select: { title: "name", subtitle: "country", media: "heroImage" },
    },
});
