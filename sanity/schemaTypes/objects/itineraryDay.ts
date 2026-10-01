import { defineField, defineType } from "sanity";
import { imageFields, imageOptions } from "./imageWithAlt";

export const itineraryDay = defineType({
    name: "itineraryDay",
    title: "Day",
    type: "object",
    fields: [
        defineField({
            name: "dayNumber",
            title: "Day number",
            type: "number",
            description: 'The first day this entry covers, e.g. 1, or 3 for a "Days 3-4" entry.',
            validation: (Rule) => Rule.required().min(1).integer(),
        }),
        defineField({
            name: "dayLabel",
            title: "Day label",
            type: "string",
            description: 'How the day range is displayed, e.g. "Days 3-4" or "Day 7". Leave blank to show just the day number.',
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "string",
            description: "The place this day is centred on, e.g. Kyoto.",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 4,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            options: imageOptions,
            fields: imageFields,
        }),
        defineField({
            name: "accommodation",
            title: "Accommodation",
            type: "string",
            description: "Where guests stay this night, if applicable.",
        }),
        defineField({
            name: "meals",
            title: "Meals included",
            type: "string",
            description: 'e.g. "Breakfast" or "Breakfast, dinner".',
        }),
    ],
    preview: {
        select: { title: "title", subtitle: "dayLabel", location: "location" },
        prepare({ title, subtitle, location }) {
            return {
                title: title || "Untitled day",
                subtitle: [subtitle, location].filter(Boolean).join(" · "),
            };
        },
    },
});
