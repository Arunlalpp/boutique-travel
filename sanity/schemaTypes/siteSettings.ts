import { defineField, defineType } from "sanity";
import { imageFields, imageOptions } from "./objects/imageWithAlt";

export const siteSettings = defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    groups: [
        { name: "brand", title: "Brand", default: true },
        { name: "contact", title: "Contact" },
        { name: "social", title: "Social" },
        { name: "general", title: "General" },
        { name: "footer", title: "Footer" },
    ],
    fields: [
        defineField({
            name: "companyName",
            title: "Company name",
            type: "string",
            group: "brand",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "tagline",
            title: "Tagline",
            type: "string",
            group: "brand",
            description: 'Short brand line, e.g. "Journeys composed slowly, for the few."',
        }),
        defineField({
            name: "descriptor",
            title: "Descriptor",
            type: "string",
            group: "brand",
            description: 'e.g. "Private & small-group journeys" — used in the browser title and share previews.',
        }),
        defineField({
            name: "logo",
            title: "Logo",
            type: "image",
            group: "brand",
            description: "Stored for future use — the site currently uses a text wordmark in the header.",
        }),
        defineField({
            name: "favicon",
            title: "Favicon",
            type: "image",
            group: "brand",
            description: "Stored for future use — the site currently uses a static favicon file.",
        }),

        defineField({ name: "email", title: "Email", type: "string", group: "contact", validation: (Rule) => Rule.required().email() }),
        defineField({ name: "phone", title: "Phone", type: "string", group: "contact" }),
        defineField({ name: "whatsapp", title: "WhatsApp", type: "string", group: "contact", description: "Optional." }),
        defineField({ name: "address", title: "Address", type: "string", group: "contact", description: 'e.g. "London · by appointment".' }),
        defineField({ name: "hours", title: "Hours", type: "string", group: "contact", description: 'e.g. "Mon–Fri, 9am–6pm".' }),

        defineField({
            name: "socials",
            title: "Social links",
            type: "array",
            group: "social",
            of: [
                {
                    type: "object",
                    name: "socialLink",
                    fields: [
                        defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
                        defineField({ name: "url", title: "URL", type: "url", validation: (Rule) => Rule.required() }),
                    ],
                    preview: { select: { title: "label", subtitle: "url" } },
                },
            ],
        }),

        defineField({ name: "siteUrl", title: "Site URL", type: "url", group: "general", description: "The live site's canonical URL, used to build sitemap/robots/OG links." }),
        defineField({ name: "defaultSeoTitle", title: "Default SEO title", type: "string", group: "general" }),
        defineField({ name: "defaultSeoDescription", title: "Default SEO description", type: "text", rows: 2, group: "general" }),
        defineField({
            name: "defaultOgImage",
            title: "Default share image",
            type: "image",
            group: "general",
            options: imageOptions,
            fields: imageFields,
        }),
        defineField({
            name: "allowIndexing",
            title: "Allow search engines to index this site",
            type: "boolean",
            group: "general",
            description: "Turn on when the site is ready to go live publicly.",
            initialValue: false,
        }),

        defineField({ name: "footerText", title: "Footer description", type: "text", rows: 2, group: "footer" }),
        defineField({ name: "copyrightText", title: "Copyright line", type: "string", group: "footer", description: 'e.g. "Design preview — placeholder brand, copy and photography."' }),
    ],
    preview: {
        prepare() {
            return { title: "Site Settings" };
        },
    },
});
