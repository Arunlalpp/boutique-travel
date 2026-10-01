import { defineField, defineType } from "sanity";
import { imageFields, imageOptions } from "./imageWithAlt";

export const seo = defineType({
    name: "seo",
    title: "SEO",
    type: "object",
    fields: [
        defineField({
            name: "metaTitle",
            title: "Meta title",
            type: "string",
            description: "Overrides the page title used by search engines and social previews. Leave blank to use the main title.",
            validation: (Rule) => Rule.max(70).warning("Search engines usually truncate titles beyond ~70 characters."),
        }),
        defineField({
            name: "metaDescription",
            title: "Meta description",
            type: "text",
            rows: 3,
            description: "Shown under the title in search results. Leave blank to use the short description.",
            validation: (Rule) =>
                Rule.max(160).warning("Search engines usually truncate descriptions beyond ~160 characters."),
        }),
        defineField({
            name: "ogImage",
            title: "Social share image",
            type: "image",
            description: "Shown when this page is shared on social media. Leave blank to use the hero image.",
            options: imageOptions,
            fields: imageFields,
        }),
    ],
    options: {
        collapsible: true,
        collapsed: true,
    },
});
