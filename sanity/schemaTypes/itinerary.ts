import { defineField, defineType } from "sanity";
import { gallerySizeLimit, imageFields, imageOptions, imageSizeLimit } from "./objects/imageWithAlt";

const STYLES = ["Private journey", "Small group"];

export const itinerary = defineType({
    name: "itinerary",
    title: "Itinerary",
    type: "document",
    groups: [
        { name: "basics", title: "Basic Information", default: true },
        { name: "media", title: "Hero & Gallery" },
        { name: "overview", title: "Overview" },
        { name: "highlights", title: "Highlights" },
        { name: "days", title: "Day-by-Day Journey" },
        { name: "travel", title: "Travel Information" },
        { name: "seo", title: "SEO" },
    ],
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            group: "basics",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            group: "basics",
            options: { source: "title", maxLength: 96 },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "shortDescription",
            title: "Short description",
            type: "text",
            rows: 2,
            group: "basics",
            description: "A one-line hook shown on journey cards and used as the fallback page description.",
            validation: (Rule) => Rule.required().max(200),
        }),
        defineField({
            name: "destination",
            title: "Destination",
            type: "reference",
            to: [{ type: "destination" }],
            group: "basics",
            description: "Supplies this journey's country and region — add it to Destinations first if it doesn't exist yet.",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "style",
            title: "Travel style",
            type: "string",
            group: "basics",
            options: { list: STYLES },
            initialValue: "Private journey",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "groupSize",
            title: "Group size",
            type: "string",
            group: "basics",
            description: 'Optional, for small-group journeys, e.g. "Up to 10 guests".',
        }),
        defineField({
            name: "featured",
            title: "Featured",
            type: "boolean",
            group: "basics",
            description: "Featured journeys appear on the home page.",
            initialValue: false,
        }),
        defineField({
            name: "publishedAt",
            title: "Published at",
            type: "datetime",
            group: "basics",
            initialValue: () => new Date().toISOString(),
        }),

        defineField({
            name: "heroImage",
            title: "Hero image",
            type: "image",
            group: "media",
            description: "The full-bleed photograph at the top of the journey page. JPG, PNG or WebP — 5MB maximum — larger images can be uploaded but will block publishing until replaced.",
            options: imageOptions,
            fields: imageFields,
            validation: (Rule) => imageSizeLimit(5)(Rule).required(),
        }),
        defineField({
            name: "cardImage",
            title: "Card image",
            type: "image",
            group: "media",
            description:
                "Shown on journey listing cards. Leave blank to reuse the hero image. JPG, PNG or WebP — 2MB maximum — larger images can be uploaded but will block publishing until replaced.",
            options: imageOptions,
            fields: imageFields,
            validation: imageSizeLimit(2),
        }),
        defineField({
            name: "gallery",
            title: "Gallery",
            type: "array",
            group: "media",
            description: "JPG, PNG or WebP — 3MB maximum per image — larger images can be uploaded but will block publishing until replaced.",
            of: [{ type: "image", options: imageOptions, fields: imageFields, validation: gallerySizeLimit(3) }],
        }),
        defineField({
            name: "videoUrl",
            title: "Video URL",
            type: "url",
            group: "media",
            description: "Optional YouTube or Vimeo link.",
        }),

        defineField({
            name: "overview",
            title: "Overview",
            type: "array",
            group: "overview",
            description: "The opening narrative for this journey. The first paragraph is shown larger.",
            of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }], marks: { decorators: [{ title: "Italic", value: "em" }] } }],
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: "highlights",
            title: "Highlights",
            type: "array",
            group: "highlights",
            description: '"Moments to look forward to" — short, specific lines work best.',
            of: [{ type: "string" }],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
            name: "included",
            title: "What's included",
            type: "array",
            group: "highlights",
            of: [{ type: "string" }],
        }),

        defineField({
            name: "itineraryDays",
            title: "Days",
            type: "array",
            group: "days",
            of: [{ type: "itineraryDay" }],
        }),

        defineField({
            name: "duration",
            title: "Duration",
            type: "string",
            group: "travel",
            description: 'e.g. "11 days".',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "bestTime",
            title: "Best time to go",
            type: "string",
            group: "travel",
            description: 'e.g. "November – early December".',
        }),
        defineField({
            name: "pace",
            title: "Pace",
            type: "string",
            group: "travel",
            description: 'e.g. "Unhurried" or "Early starts, long afternoons".',
        }),
        defineField({
            name: "startingPrice",
            title: "Starting price",
            type: "string",
            group: "travel",
            description: "Optional — priced individually in practice, but useful as an indicative figure.",
        }),
        defineField({
            name: "mapImage",
            title: "Map image",
            type: "image",
            group: "travel",
            description:
                "A simple map graphic. Optional — see also the advanced route diagram below. JPG, PNG or WebP — 3MB maximum — larger images can be uploaded but will block publishing until replaced.",
            options: imageOptions,
            fields: imageFields,
            validation: imageSizeLimit(3),
        }),
        defineField({
            name: "route",
            title: "Route diagram stops (advanced)",
            type: "array",
            group: "travel",
            description:
                "Optional. Powers the animated route line on the journey page. Each stop needs a position on a 0-100 grid (x = left-to-right, y = top-to-bottom). Leave empty to hide this section and use the map image instead.",
            of: [
                {
                    type: "object",
                    name: "routeStop",
                    fields: [
                        defineField({ name: "name", title: "Stop name", type: "string", validation: (Rule) => Rule.required() }),
                        defineField({ name: "x", title: "Horizontal position (0-100)", type: "number", validation: (Rule) => Rule.required().min(0).max(100) }),
                        defineField({ name: "y", title: "Vertical position (0-100)", type: "number", validation: (Rule) => Rule.required().min(0).max(100) }),
                    ],
                    preview: {
                        select: { title: "name", x: "x", y: "y" },
                        prepare({ title, x, y }) {
                            return { title, subtitle: `x: ${x}, y: ${y}` };
                        },
                    },
                },
            ],
        }),

        defineField({
            name: "seo",
            title: "SEO",
            type: "seo",
            group: "seo",
        }),
    ],
    preview: {
        select: { title: "title", subtitle: "destination.name", media: "heroImage" },
    },
});
