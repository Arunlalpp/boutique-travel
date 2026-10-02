import type { PortableTextBlock } from "@portabletext/types";
import type {
    Destination,
    DestinationCard,
    GuestStory,
    GuestStoryCard,
    Itinerary,
    ItineraryCard,
    ItineraryDay,
    Region,
    Seo,
    SiteSettings,
    TravelStyle,
} from "@/lib/types";
import { toImageAsset, toImageAssetList, toImageAssetOrFallback, type RawImage } from "./image";
import { parseVideoUrl } from "./video";

interface RawSeo {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: RawImage;
}

interface RawDestinationRef {
    slug: string;
    name: string;
    country: string;
    region: string;
}

interface RawItineraryDay {
    dayNumber: number;
    dayLabel?: string;
    title: string;
    location?: string;
    description: string;
    accommodation?: string;
    meals?: string;
    image?: RawImage;
}

export interface RawItinerary {
    slug: string;
    title: string;
    shortDescription: string;
    heroImage: RawImage;
    cardImage: RawImage;
    gallery?: RawImage[];
    destination: RawDestinationRef | null;
    style: string;
    groupSize?: string;
    pace?: string;
    duration: string;
    bestTime?: string;
    startingPrice?: string;
    overview: PortableTextBlock[];
    highlights?: string[];
    included?: string[];
    days?: RawItineraryDay[];
    route?: { name: string; x: number; y: number }[];
    mapImage?: RawImage;
    videoUrl?: string;
    featured: boolean;
    seo?: RawSeo;
}

export function mapItinerary(raw: RawItinerary): Itinerary {
    return {
        slug: raw.slug,
        title: raw.title,
        hook: raw.shortDescription,
        region: (raw.destination?.region as Region) ?? "Asia",
        country: raw.destination?.country ?? "",
        destinationSlug: raw.destination?.slug,
        duration: raw.duration,
        style: raw.style as TravelStyle,
        groupSize: raw.groupSize,
        bestTime: raw.bestTime ?? "",
        pace: raw.pace ?? "",
        startingPrice: raw.startingPrice,
        heroImage: toImageAssetOrFallback(raw.heroImage, raw.title),
        cardImage: toImageAssetOrFallback(raw.cardImage ?? raw.heroImage, raw.title),
        gallery: toImageAssetList(raw.gallery, raw.title),
        overview: raw.overview ?? [],
        highlights: raw.highlights ?? [],
        included: raw.included ?? [],
        days: (raw.days ?? []).map(mapItineraryDay),
        route: raw.route ?? [],
        mapImage: toImageAsset(raw.mapImage, raw.title),
        video: parseVideoUrl(raw.videoUrl),
        featured: raw.featured ?? false,
        seo: mapSeo(raw.seo, raw.title),
    };
}

export interface RawItineraryCard {
    slug: string;
    title: string;
    shortDescription: string;
    cardImage: RawImage;
    destination: RawDestinationRef | null;
    style: string;
    duration: string;
    startingPrice?: string | null;
    featured: boolean;
}

/** Lightweight counterpart to mapItinerary, for listing/card views — see ItineraryCard. */
export function mapItineraryCard(raw: RawItineraryCard): ItineraryCard {
    return {
        slug: raw.slug,
        title: raw.title,
        hook: raw.shortDescription,
        region: (raw.destination?.region as Region) ?? "Asia",
        country: raw.destination?.country ?? "",
        destinationSlug: raw.destination?.slug,
        duration: raw.duration,
        style: raw.style as TravelStyle,
        startingPrice: raw.startingPrice ?? undefined,
        cardImage: toImageAssetOrFallback(raw.cardImage, raw.title),
        featured: raw.featured ?? false,
    };
}

function mapItineraryDay(day: RawItineraryDay): ItineraryDay {
    return {
        label: day.dayLabel || `Day ${day.dayNumber}`,
        title: day.title,
        location: day.location ?? "",
        description: day.description,
        image: toImageAsset(day.image, day.title),
        stay: day.accommodation,
        meals: day.meals,
    };
}

export interface RawGuestStory {
    slug: string;
    guestName: string;
    guestLocation?: string;
    quote: string;
    excerpt: string;
    story: string;
    travelled?: string;
    profileImage: RawImage;
    posterImage?: RawImage;
    gallery?: RawImage[];
    journey?: { slug: string; title: string } | null;
    videoUrl?: string;
    featured: boolean;
    seo?: RawSeo;
}

export function mapGuestStory(raw: RawGuestStory): GuestStory {
    const posterSource = raw.posterImage ?? raw.gallery?.[0] ?? raw.profileImage;
    return {
        slug: raw.slug,
        guestName: raw.guestName,
        homeTown: raw.guestLocation ?? "",
        journeySlug: raw.journey?.slug,
        journeyTitle: raw.journey?.title,
        travelled: raw.travelled ?? "",
        quote: raw.quote,
        excerpt: raw.excerpt,
        body: splitParagraphs(raw.story),
        video: parseVideoUrl(raw.videoUrl),
        poster: toImageAssetOrFallback(posterSource, raw.guestName),
        portrait: toImageAssetOrFallback(raw.profileImage, raw.guestName),
        featured: raw.featured ?? false,
        seo: mapSeo(raw.seo, raw.guestName),
    };
}

export interface RawGuestStoryCard {
    slug: string;
    guestName: string;
    guestLocation?: string;
    quote: string;
    excerpt: string;
    travelled?: string;
    posterSource?: RawImage;
    profileImage: RawImage;
    journey?: { slug: string; title: string } | null;
    videoUrl?: string;
    featured: boolean;
}

/** Lightweight counterpart to mapGuestStory, for listing/card views — see GuestStoryCard. */
export function mapGuestStoryCard(raw: RawGuestStoryCard): GuestStoryCard {
    return {
        slug: raw.slug,
        guestName: raw.guestName,
        homeTown: raw.guestLocation ?? "",
        journeySlug: raw.journey?.slug,
        journeyTitle: raw.journey?.title,
        travelled: raw.travelled ?? "",
        quote: raw.quote,
        excerpt: raw.excerpt,
        video: parseVideoUrl(raw.videoUrl),
        poster: toImageAssetOrFallback(raw.posterSource ?? raw.profileImage, raw.guestName),
        portrait: toImageAssetOrFallback(raw.profileImage, raw.guestName),
        featured: raw.featured ?? false,
    };
}

function splitParagraphs(text: string): string[] {
    return text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
}

export interface RawDestination {
    slug: string;
    name: string;
    country: string;
    region: string;
    shortDescription: string;
    description?: string;
    heroImage: RawImage;
    gallery?: RawImage[];
    featured: boolean;
    seo?: RawSeo;
}

export function mapDestination(raw: RawDestination): Destination {
    return {
        slug: raw.slug,
        name: raw.name,
        country: raw.country,
        region: raw.region as Region,
        shortDescription: raw.shortDescription,
        description: raw.description,
        heroImage: toImageAssetOrFallback(raw.heroImage, raw.name),
        gallery: toImageAssetList(raw.gallery, raw.name),
        featured: raw.featured ?? false,
        seo: mapSeo(raw.seo, raw.name),
    };
}

export interface RawDestinationCard {
    slug: string;
    name: string;
    country: string;
    region: string;
    shortDescription: string;
    heroImage: RawImage;
    thumbs?: RawImage[] | null;
    journeyCount?: number;
    featured: boolean;
}

/** Lightweight counterpart to mapDestination, for listing/card views — see DestinationCard. */
export function mapDestinationCard(raw: RawDestinationCard): DestinationCard {
    return {
        slug: raw.slug,
        name: raw.name,
        country: raw.country,
        region: raw.region as Region,
        shortDescription: raw.shortDescription,
        heroImage: toImageAssetOrFallback(raw.heroImage, raw.name),
        thumbs: toImageAssetList(raw.thumbs, raw.name),
        journeyCount: raw.journeyCount ?? 0,
        featured: raw.featured ?? false,
    };
}

function mapSeo(raw: RawSeo | undefined, fallbackAlt: string): Seo | undefined {
    if (!raw) return undefined;
    return {
        metaTitle: raw.metaTitle,
        metaDescription: raw.metaDescription,
        ogImage: toImageAsset(raw.ogImage, fallbackAlt),
    };
}

export interface RawSiteSettings {
    companyName: string;
    descriptor?: string;
    tagline?: string;
    email: string;
    phone?: string;
    whatsapp?: string;
    address?: string;
    hours?: string;
    socials?: { label: string; url: string }[];
    siteUrl?: string;
    allowIndexing?: boolean;
    defaultSeoTitle?: string;
    defaultSeoDescription?: string;
    defaultOgImage?: RawImage;
    footerText?: string;
    copyrightText?: string;
}

const FALLBACK_SITE_URL = "https://boutique-travel.vercel.app";

export function mapSiteSettings(raw: RawSiteSettings | null): SiteSettings {
    const name = raw?.companyName ?? "Boutique Travel";
    return {
        name,
        descriptor: raw?.descriptor ?? "",
        tagline: raw?.tagline ?? "",
        email: raw?.email ?? "",
        phone: raw?.phone ?? "",
        whatsapp: raw?.whatsapp,
        studio: raw?.address ?? "",
        hours: raw?.hours ?? "",
        siteUrl: raw?.siteUrl ?? FALLBACK_SITE_URL,
        socials: (raw?.socials ?? []).map((s) => ({ label: s.label, href: s.url })),
        allowIndexing: raw?.allowIndexing ?? false,
        defaultSeoTitle: raw?.defaultSeoTitle ?? name,
        defaultSeoDescription: raw?.defaultSeoDescription ?? "",
        defaultOgImage: toImageAsset(raw?.defaultOgImage, name),
        footerText: raw?.footerText ?? "",
        copyrightText: raw?.copyrightText ?? "",
    };
}
