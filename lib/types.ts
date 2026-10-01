import type { PortableTextBlock } from "@portabletext/types";

export interface ImageAsset {
    src: string;
    alt: string;
    focal?: string;
}

export type Region = "Asia" | "Europe" | "Africa" | "The North";

export type TravelStyle = "Private journey" | "Small group";

export interface RoutePoint {
    name: string;
    x: number;
    y: number;
}

export interface ItineraryDay {
    label: string;
    title: string;
    location: string;
    description: string;
    image?: ImageAsset;
    stay?: string;
    meals?: string;
}

export interface Destination {
    slug: string;
    name: string;
    country: string;
    region: Region;
    shortDescription: string;
    description?: string;
    heroImage: ImageAsset;
    gallery: ImageAsset[];
    featured: boolean;
    seo?: Seo;
}

export interface Itinerary {
    slug: string;
    title: string;
    hook: string;
    region: Region;
    country: string;
    destinationSlug?: string;
    duration: string;
    style: TravelStyle;
    groupSize?: string;
    bestTime: string;
    pace: string;
    startingPrice?: string;
    heroImage: ImageAsset;
    cardImage: ImageAsset;
    gallery: ImageAsset[];
    overview: PortableTextBlock[];
    highlights: string[];
    days: ItineraryDay[];
    route: RoutePoint[];
    mapImage?: ImageAsset;
    included: string[];
    video?: VideoEmbed;
    featured: boolean;
    seo?: Seo;
}

export interface Seo {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: ImageAsset;
}

export interface VideoEmbed {
    provider: "youtube" | "vimeo";
    id: string;
}

export interface GuestStory {
    slug: string;
    guestName: string;
    homeTown: string;
    journeySlug?: string;
    journeyTitle?: string;
    travelled: string;
    quote: string;
    excerpt: string;
    body: string[];
    video?: VideoEmbed;
    poster: ImageAsset;
    portrait: ImageAsset;
    featured: boolean;
    seo?: Seo;
}

export interface SiteSettings {
    name: string;
    descriptor: string;
    tagline: string;
    email: string;
    phone: string;
    whatsapp?: string;
    studio: string;
    hours: string;
    siteUrl: string;
    socials: { label: string; href: string }[];
    allowIndexing: boolean;
    defaultSeoTitle: string;
    defaultSeoDescription: string;
    defaultOgImage?: ImageAsset;
    footerText: string;
    copyrightText: string;
}

/**
 * The subset of fields every listing/card view actually renders (JourneyCard,
 * JourneyIndex, FeaturedJourneys, the "next journey" teaser, destination
 * pages' journey grids). Listing queries project only these fields instead
 * of the full document, so a page with many cards doesn't pull every
 * itinerary's overview, day-by-day, gallery and route data over the wire.
 */
export type ItineraryCard = Pick<
    Itinerary,
    "slug" | "title" | "hook" | "region" | "country" | "destinationSlug" | "duration" | "style" | "cardImage" | "featured"
>;

/** Same idea as ItineraryCard, for StoryEntry/StoriesTeaser and other listing views. */
export type GuestStoryCard = Pick<
    GuestStory,
    | "slug"
    | "guestName"
    | "homeTown"
    | "journeySlug"
    | "journeyTitle"
    | "travelled"
    | "quote"
    | "excerpt"
    | "poster"
    | "portrait"
    | "featured"
    | "video"
>;

/** Same idea as ItineraryCard, for DestinationCard on the destinations index. */
export type DestinationCard = Pick<Destination, "slug" | "name" | "country" | "region" | "shortDescription" | "heroImage" | "featured">;

export interface Highlight {
    icon: "compass" | "users" | "leaf" | "phone";
    title: string;
    text: string;
}

export interface NavItem {
    label: string;
    href: string;
}
