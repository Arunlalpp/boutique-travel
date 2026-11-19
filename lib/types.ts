export interface ImageAsset {
    src: string;
    alt: string;
    /** CSS object-position, e.g. "50% 30%". */
    focal?: string;
}

export interface SiteSettings {
    name: string;
    descriptor: string;
    tagline: string;
    email: string;
    phone: string;
    whatsapp?: string;
    /** Postal address or "by appointment" note. */
    studio: string;
    hours: string;
    /** Canonical origin, no trailing slash. */
    siteUrl: string;
    socials: { label: string; href: string }[];
    /** False keeps the site out of search results (robots.txt + noindex). */
    allowIndexing: boolean;
    defaultSeoTitle: string;
    defaultSeoDescription: string;
}
