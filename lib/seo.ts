import type { Metadata } from "next";
import type { SiteSettings } from "./types";

interface PageSeo {
    title: string;
    description: string;
    /** Site-relative path, e.g. "/packages". Becomes the canonical URL and og:url. */
    path: string;
    siteName: string;
    type?: "website" | "article";
    /** Set for pages that should stay out of search results (e.g. thank-you pages). */
    noindex?: boolean;
}

/** Site-wide defaults (title template, description, share cards, indexing), shared by every layout. */
export function siteMetadata(settings: SiteSettings): Metadata {
    return {
        metadataBase: new URL(settings.siteUrl),
        title: {
            default: settings.defaultSeoTitle,
            template: `%s · ${settings.name}`,
        },
        description: settings.defaultSeoDescription,
        alternates: { canonical: "/" },
        openGraph: {
            title: settings.name,
            description: settings.defaultSeoDescription,
            type: "website",
            url: "/",
            siteName: settings.name,
            locale: "en_IN",
        },
        twitter: {
            card: "summary_large_image",
            title: settings.name,
            description: settings.defaultSeoDescription,
        },
        applicationName: settings.name,
        authors: [{ name: settings.name, url: settings.siteUrl }],
        creator: settings.name,
        publisher: settings.name,
        category: "travel",
        formatDetection: { telephone: false, email: false, address: false },
        robots: settings.allowIndexing
            ? {
                  index: true,
                  follow: true,
                  googleBot: {
                      index: true,
                      follow: true,
                      "max-image-preview": "large",
                      "max-snippet": -1,
                      "max-video-preview": -1,
                  },
              }
            : { index: false, follow: false },
        // Search Console: paste the content value of Google's HTML-tag verification into this env var.
        verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
            ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
            : undefined,
    };
}

/**
 * Consistent metadata for every page: title, description, canonical link and
 * matching Open Graph / X card text. The share image itself comes from the
 * route's opengraph-image.tsx file, so it's never set here.
 */
export function pageMetadata({ title, description, path, siteName, type = "website", noindex }: PageSeo): Metadata {
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: { title, description, url: path, siteName, type, locale: "en_IN" },
        twitter: { card: "summary_large_image", title, description },
        ...(noindex ? { robots: { index: false, follow: false } } : {}),
    };
}

/** Absolute URL for structured data. */
export const absolute = (settings: SiteSettings, path: string) => new URL(path, settings.siteUrl).toString();

/** schema.org BreadcrumbList for a trail of [label, path] pairs. */
export function breadcrumbs(settings: SiteSettings, trail: [string, string][]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map(([name, path], i) => ({
            "@type": "ListItem",
            position: i + 1,
            name,
            item: absolute(settings, path),
        })),
    };
}

/** Dummy contact values from the design preview never go into structured data. */
const real = (v?: string) => (v && !/example\.|0000/.test(v) ? v : undefined);

/** The business itself, rendered once in the site layout. */
export function organization(settings: SiteSettings) {
    return {
        "@context": "https://schema.org",
        "@type": "TravelAgency",
        "@id": absolute(settings, "/#organization"),
        name: settings.name,
        description: settings.defaultSeoDescription || settings.tagline || undefined,
        url: settings.siteUrl,
        logo: absolute(settings, "/icon.svg"),
        image: absolute(settings, "/opengraph-image"),
        areaServed: "India",
        email: real(settings.email),
        telephone: real(settings.phone),
        sameAs: settings.socials.map((s) => s.href).filter((href) => /^https?:\/\/.+\/.+/.test(href)),
    };
}

export function website(settings: SiteSettings) {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: settings.name,
        url: settings.siteUrl,
        publisher: { "@id": absolute(settings, "/#organization") },
    };
}
