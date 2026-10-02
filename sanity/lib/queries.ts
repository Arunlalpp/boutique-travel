import { defineQuery } from "next-sanity";
import type { Destination, DestinationCard, GuestStory, GuestStoryCard, Itinerary, ItineraryCard, SiteSettings } from "@/lib/types";
import { client } from "./client";
import { sanityFetch } from "./live";
import {
    mapDestination,
    mapDestinationCard,
    mapGuestStory,
    mapGuestStoryCard,
    mapItinerary,
    mapItineraryCard,
    mapSiteSettings,
} from "./mappers";
import type {
    RawDestination,
    RawDestinationCard,
    RawGuestStory,
    RawGuestStoryCard,
    RawItinerary,
    RawItineraryCard,
    RawSiteSettings,
} from "./mappers";

const seoProjection = /* groq */ `seo{metaTitle, metaDescription, ogImage}`;

/**
 * Full projections: every field the detail page for that document type
 * renders. Used only for single-document fetches (getItinerary, getStory,
 * getDestination) — never for listings, so a page with many cards never
 * pulls every document's overview/days/gallery/route/body over the wire.
 */
const itineraryProjection = /* groq */ `{
  "slug": slug.current,
  title,
  shortDescription,
  heroImage,
  "cardImage": coalesce(cardImage, heroImage),
  gallery,
  "destination": destination->{"slug": slug.current, name, country, region},
  style,
  groupSize,
  pace,
  duration,
  bestTime,
  startingPrice,
  overview,
  highlights,
  included,
  "days": itineraryDays[] | order(dayNumber asc) {dayNumber, dayLabel, title, location, description, accommodation, meals, image},
  route,
  mapImage,
  videoUrl,
  featured,
  ${seoProjection}
}`;

const guestStoryProjection = /* groq */ `{
  "slug": slug.current,
  guestName,
  guestLocation,
  quote,
  excerpt,
  story,
  travelled,
  profileImage,
  posterImage,
  gallery,
  "journey": journey->{"slug": slug.current, title},
  videoUrl,
  featured,
  ${seoProjection}
}`;

const destinationProjection = /* groq */ `{
  "slug": slug.current,
  name,
  country,
  region,
  shortDescription,
  description,
  heroImage,
  gallery,
  featured,
  ${seoProjection}
}`;

/**
 * Card projections: only the fields JourneyCard/StoryEntry/DestinationCard
 * (and the other listing components) actually read. These power every
 * listing page, the homepage teasers, the "next journey" link and the
 * destination/itinerary cross-links — see lib/types.ts's ItineraryCard /
 * GuestStoryCard / DestinationCard for exactly which fields that is.
 */
const itineraryCardProjection = /* groq */ `{
  "slug": slug.current,
  title,
  shortDescription,
  "cardImage": coalesce(cardImage, heroImage),
  "destination": destination->{"slug": slug.current, name, country, region},
  style,
  duration,
  startingPrice,
  featured
}`;

const guestStoryCardProjection = /* groq */ `{
  "slug": slug.current,
  guestName,
  guestLocation,
  quote,
  excerpt,
  travelled,
  "posterSource": coalesce(posterImage, gallery[0], profileImage),
  profileImage,
  "journey": journey->{"slug": slug.current, title},
  videoUrl,
  featured
}`;

const destinationCardProjection = /* groq */ `{
  "slug": slug.current,
  name,
  country,
  region,
  shortDescription,
  heroImage,
  "thumbs": gallery[0...2],
  "journeyCount": count(*[_type == "itinerary" && references(^._id)]),
  featured
}`;

export const ALL_ITINERARIES_QUERY = defineQuery(
    `*[_type == "itinerary"] | order(publishedAt desc) ${itineraryCardProjection}`,
);

export const FEATURED_ITINERARIES_QUERY = defineQuery(
    `*[_type == "itinerary" && featured == true] | order(publishedAt desc) ${itineraryCardProjection}`,
);

export const ITINERARY_BY_SLUG_QUERY = defineQuery(
    `*[_type == "itinerary" && slug.current == $slug][0] ${itineraryProjection}`,
);

export const ITINERARY_CARD_BY_SLUG_QUERY = defineQuery(
    `*[_type == "itinerary" && slug.current == $slug][0] ${itineraryCardProjection}`,
);

export const ITINERARY_SLUGS_QUERY = defineQuery(`*[_type == "itinerary"].slug.current`);

export const ALL_STORIES_QUERY = defineQuery(
    `*[_type == "guestStory"] | order(publishedAt desc) ${guestStoryCardProjection}`,
);

export const STORY_BY_SLUG_QUERY = defineQuery(
    `*[_type == "guestStory" && slug.current == $slug][0] ${guestStoryProjection}`,
);

export const STORY_SLUGS_QUERY = defineQuery(`*[_type == "guestStory"].slug.current`);

export const STORIES_FOR_JOURNEY_QUERY = defineQuery(
    `*[_type == "guestStory" && journey->slug.current == $journeySlug] | order(publishedAt desc) ${guestStoryCardProjection}`,
);

export const ALL_DESTINATIONS_QUERY = defineQuery(
    `*[_type == "destination"] | order(name asc) ${destinationCardProjection}`,
);

export const DESTINATION_BY_SLUG_QUERY = defineQuery(
    `*[_type == "destination" && slug.current == $slug][0] ${destinationProjection}`,
);

export const DESTINATION_SLUGS_QUERY = defineQuery(`*[_type == "destination"].slug.current`);

export const ITINERARIES_FOR_DESTINATION_QUERY = defineQuery(
    `*[_type == "itinerary" && destination->slug.current == $destinationSlug] | order(publishedAt desc) ${itineraryCardProjection}`,
);

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  companyName,
  descriptor,
  tagline,
  logo,
  favicon,
  email,
  phone,
  whatsapp,
  address,
  hours,
  socials,
  siteUrl,
  allowIndexing,
  defaultSeoTitle,
  defaultSeoDescription,
  defaultOgImage,
  footerText,
  copyrightText
}`);

export async function getAllItineraries(): Promise<ItineraryCard[]> {
    const { data } = await sanityFetch({ query: ALL_ITINERARIES_QUERY });
    return (data as RawItineraryCard[]).map(mapItineraryCard);
}

export async function getFeaturedItineraries(limit = 4): Promise<ItineraryCard[]> {
    const { data } = await sanityFetch({ query: FEATURED_ITINERARIES_QUERY });
    return (data as RawItineraryCard[]).slice(0, limit).map(mapItineraryCard);
}

export async function getItinerary(slug: string): Promise<Itinerary | undefined> {
    const { data } = await sanityFetch({ query: ITINERARY_BY_SLUG_QUERY, params: { slug } });
    return data ? mapItinerary(data as RawItinerary) : undefined;
}

/** Lightweight single-itinerary fetch for contexts that only render a JourneyCard (e.g. a guest story's linked journey). */
export async function getItineraryCard(slug: string): Promise<ItineraryCard | undefined> {
    const { data } = await sanityFetch({ query: ITINERARY_CARD_BY_SLUG_QUERY, params: { slug } });
    return data ? mapItineraryCard(data as RawItineraryCard) : undefined;
}

/** Uses the plain client, not sanityFetch: generateStaticParams runs outside a request scope, where draftMode() (which sanityFetch checks internally) is unavailable. */
export async function getItinerarySlugs(): Promise<string[]> {
    return client.fetch(ITINERARY_SLUGS_QUERY);
}

/** Wraps around to the first itinerary after the last — same behaviour as the old hardcoded-array version. */
export async function getNextItinerary(currentSlug: string): Promise<ItineraryCard | undefined> {
    const all = await getAllItineraries();
    if (!all.length) return undefined;
    const index = all.findIndex((i) => i.slug === currentSlug);
    return all[(index + 1) % all.length];
}

export async function getAllStories(): Promise<GuestStoryCard[]> {
    const { data } = await sanityFetch({ query: ALL_STORIES_QUERY });
    return (data as RawGuestStoryCard[]).map(mapGuestStoryCard);
}

export async function getStory(slug: string): Promise<GuestStory | undefined> {
    const { data } = await sanityFetch({ query: STORY_BY_SLUG_QUERY, params: { slug } });
    return data ? mapGuestStory(data as RawGuestStory) : undefined;
}

/** Plain client, not sanityFetch — see getItinerarySlugs. */
export async function getStorySlugs(): Promise<string[]> {
    return client.fetch(STORY_SLUGS_QUERY);
}

export async function getStoriesForJourney(journeySlug: string): Promise<GuestStoryCard[]> {
    const { data } = await sanityFetch({ query: STORIES_FOR_JOURNEY_QUERY, params: { journeySlug } });
    return (data as RawGuestStoryCard[]).map(mapGuestStoryCard);
}

/** Picks the featured story (or the first one) from an already-fetched list — never issues a second query. */
export function pickFeaturedStory(stories: GuestStoryCard[]): GuestStoryCard | undefined {
    return stories.find((s) => s.featured) ?? stories[0];
}

export async function getAllDestinations(): Promise<DestinationCard[]> {
    const { data } = await sanityFetch({ query: ALL_DESTINATIONS_QUERY });
    return (data as RawDestinationCard[]).map(mapDestinationCard);
}

export async function getDestination(slug: string): Promise<Destination | undefined> {
    const { data } = await sanityFetch({ query: DESTINATION_BY_SLUG_QUERY, params: { slug } });
    return data ? mapDestination(data as RawDestination) : undefined;
}

/** Plain client, not sanityFetch — see getItinerarySlugs. */
export async function getDestinationSlugs(): Promise<string[]> {
    return client.fetch(DESTINATION_SLUGS_QUERY);
}

export async function getItinerariesForDestination(destinationSlug: string): Promise<ItineraryCard[]> {
    const { data } = await sanityFetch({ query: ITINERARIES_FOR_DESTINATION_QUERY, params: { destinationSlug } });
    return (data as RawItineraryCard[]).map(mapItineraryCard);
}

export async function getSiteSettings(): Promise<SiteSettings> {
    const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
    return mapSiteSettings(data as RawSiteSettings | null);
}
