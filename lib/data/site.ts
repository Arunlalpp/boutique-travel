import type { NavItem } from "@/lib/types";

/**
 * Contact details, social links and SEO defaults live in Sanity (the
 * siteSettings singleton, see sanity/lib/queries.ts#getSiteSettings).
 * Navigation isn't part of the content model the client manages, so it
 * stays in code.
 */
export const mainNav: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "Journeys", href: "/itineraries" },
    { label: "Packages", href: "/packages" },
    { label: "Stories", href: "/stories" },
    { label: "About", href: "/about" },
];

/** Where "Plan a Trip" and the mobile Contact tab point. */
export const contactHref = "/enquire";

export function isActive(pathname: string, href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
}
