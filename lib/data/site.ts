import type { NavItem } from "@/lib/types";

/**
 * Contact details, social links and SEO defaults live in Sanity (the
 * siteSettings singleton, see sanity/lib/queries.ts#getSiteSettings).
 * Navigation isn't part of the content model the client manages, so it
 * stays in code.
 */
/** Where "Plan a trip" and the Contact nav item point. */
export const contactHref = "/enquire";

/** Journeys and Stories are linked from the footer and page content, per the minimal redesign. */
export const mainNav: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Destinations", href: "/destinations" },
    { label: "Packages", href: "/packages" },
    { label: "Contact", href: contactHref },
];

export function isActive(pathname: string, href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
}
