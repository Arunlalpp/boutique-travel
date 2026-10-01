import type { Highlight, NavItem } from "@/lib/types";

/**
 * Contact details, social links, and SEO defaults now live in Sanity
 * (siteSettings singleton — see sanity/lib/queries.ts#getSiteSettings).
 * Navigation and the two content blocks below aren't part of the content
 * model the client asked to manage, so they stay in code.
 */
export const mainNav: NavItem[] = [
    { label: "Journeys", href: "/itineraries" },
    { label: "Destinations", href: "/destinations" },
    { label: "Guest Stories", href: "/stories" },
    { label: "Our Story", href: "/about" },
];

export const whyChooseUs: Highlight[] = [
    {
        icon: "compass",
        title: "Designed, never packaged",
        text: "Every route starts as a blank page and a conversation. Nothing is lifted from a brochure.",
    },
    {
        icon: "users",
        title: "Private or a party of ten",
        text: "Travel alone, as a family, or with a small group of like-minded guests — never a coach tour.",
    },
    {
        icon: "leaf",
        title: "Local, and lightly done",
        text: "Independent guides, family-run stays and time built in to let a place come to you.",
    },
    {
        icon: "phone",
        title: "One person, start to finish",
        text: "A single designer plans your journey and stays reachable, day and night, while you travel.",
    },
];

export const aboutStats = [
    { value: "14", label: "years designing journeys" },
    { value: "38", label: "countries we know first-hand" },
    { value: "10", label: "guests, our largest group" },
    { value: "1", label: "designer from first call to home" },
];
