import { defineField, defineType } from "sanity";

export const subscriber = defineType({
    name: "subscriber",
    title: "Newsletter subscriber",
    type: "document",
    description: "Added automatically by the newsletter form in the site footer.",
    fields: [
        defineField({ name: "email", title: "Email", type: "string", readOnly: true, validation: (Rule) => Rule.required() }),
        defineField({ name: "subscribedAt", title: "Subscribed at", type: "datetime", readOnly: true }),
    ],
    orderings: [
        {
            title: "Newest first",
            name: "subscribedAtDesc",
            by: [{ field: "subscribedAt", direction: "desc" }],
        },
    ],
    preview: {
        select: { title: "email", subtitle: "subscribedAt" },
    },
});
