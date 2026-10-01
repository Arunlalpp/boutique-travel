import { defineField, defineType } from "sanity";

const STATUSES = ["New", "Contacted", "Qualified", "Closed"];

export const enquiry = defineType({
    name: "enquiry",
    title: "Enquiry",
    type: "document",
    description: "Submitted automatically by the website's enquiry form. Not edited by visitors.",
    fields: [
        defineField({ name: "name", title: "Name", type: "string", readOnly: true, validation: (Rule) => Rule.required() }),
        defineField({ name: "email", title: "Email", type: "string", readOnly: true, validation: (Rule) => Rule.required() }),
        defineField({ name: "phone", title: "Phone", type: "string", readOnly: true }),
        defineField({ name: "nationality", title: "Nationality", type: "string", readOnly: true }),
        defineField({ name: "travelStyle", title: "Preferred style", type: "string", readOnly: true }),
        defineField({ name: "travelDates", title: "Travel dates", type: "string", readOnly: true }),
        defineField({ name: "groupSize", title: "Group size", type: "number", readOnly: true }),
        defineField({ name: "budget", title: "Budget", type: "string", readOnly: true }),
        defineField({ name: "interests", title: "Interests", type: "array", of: [{ type: "string" }], readOnly: true }),
        defineField({ name: "message", title: "Message", type: "text", rows: 5, readOnly: true }),
        defineField({
            name: "journey",
            title: "Journey enquired about",
            type: "reference",
            to: [{ type: "itinerary" }],
            readOnly: true,
        }),
        defineField({ name: "preferredContact", title: "Preferred contact method", type: "string", readOnly: true }),
        defineField({ name: "submittedAt", title: "Submitted at", type: "datetime", readOnly: true }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: { list: STATUSES, layout: "radio" },
            initialValue: "New",
        }),
    ],
    orderings: [
        {
            title: "Newest first",
            name: "submittedAtDesc",
            by: [{ field: "submittedAt", direction: "desc" }],
        },
    ],
    preview: {
        select: { title: "name", subtitle: "email", status: "status" },
        prepare({ title, subtitle, status }) {
            return { title, subtitle: `${subtitle} · ${status}` };
        },
    },
});
