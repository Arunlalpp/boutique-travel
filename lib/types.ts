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
    stay?: string;
}

export interface Itinerary {
    slug: string;
    title: string;
    hook: string;
    region: Region;
    country: string;
    durationDays: number;
    style: TravelStyle;
    groupSize?: string;
    bestTime: string;
    pace: string;
    heroImage: ImageAsset;
    cardImage: ImageAsset;
    gallery: ImageAsset[];
    narrative: string[];
    highlights: string[];
    days: ItineraryDay[];
    route: RoutePoint[];
    included: string[];
    featured: boolean;
}

export interface VideoEmbed {
    provider: "youtube" | "vimeo";
    id: string;
}

export interface GuestStory {
    slug: string;
    guestName: string;
    homeTown: string;
    journeySlug: string;
    travelled: string;
    quote: string;
    excerpt: string;
    body: string[];
    video?: VideoEmbed;
    poster: ImageAsset;
    portrait: ImageAsset;
    featured: boolean;
}

export interface Highlight {
    icon: "compass" | "users" | "leaf" | "phone";
    title: string;
    text: string;
}

export interface NavItem {
    label: string;
    href: string;
}
