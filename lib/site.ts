import type { SiteSettings } from "./types";

/**
 * Site-wide settings: brand, contact details, SEO defaults. These used to
 * live in the CMS; they are now plain config, edited here.
 *
 * PLACEHOLDERS: email, phone and the social links are still the design
 * preview's dummy values. Replace them with the client's real details.
 */

/**
 * The canonical origin. Set NEXT_PUBLIC_SITE_URL when the site moves to a
 * custom domain; canonical links, the sitemap and share cards follow it.
 */
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://boutique-travel.vercel.app").replace(/\/+$/, "");

/**
 * Vercel preview deployments must never be indexed (they would compete with
 * production as duplicates). Production and local builds are indexable.
 */
const allowIndexing = process.env.VERCEL_ENV !== "preview" && process.env.NEXT_PUBLIC_NOINDEX !== "1";

export const site: SiteSettings = {
    name: "Backroad Ledger",
    descriptor: "Journeys first walked by us",
    tagline: "Paths first walked by us.",
    email: "journeys@example.com",
    phone: "+44 (0)20 0000 0000",
    whatsapp: undefined,
    studio: "London · by appointment",
    hours: "Mon–Fri, 9am–6pm",
    siteUrl,
    socials: [
        { label: "Instagram", href: "https://instagram.com" },
        { label: "Vimeo", href: "https://vimeo.com" },
        { label: "LinkedIn", href: "https://linkedin.com" },
    ],
    allowIndexing,
    defaultSeoTitle: "Backroad Ledger · Paths first walked by us",
    defaultSeoDescription:
        "Journeys across India, personally walked first and then designed for one guest at a time. Ten Entries, one for every kind of traveller.",
};

/** WhatsApp number (falls back to the phone), digits only for wa.me links. */
export const whatsappNumber = site.whatsapp || site.phone;
export const whatsappDigits = whatsappNumber.replace(/[^\d]/g, "");
