/**
 * Content model for the MVP.
 * These interfaces are written to map 1:1 onto CMS document types later
 * (e.g. `itinerary`, `guestStory`), so the page components won't change
 * when mock data is replaced by real queries.
 */

export interface ImageAsset {
  src: string;
  alt: string;
  /** CSS object-position, e.g. "50% 30%" */
  focal?: string;
}

export type Region = "Asia" | "Europe" | "Africa" | "The North";

export type TravelStyle = "Private journey" | "Small group";

export interface RoutePoint {
  name: string;
  /** Position on the stylised route graphic, 0–100 on each axis */
  x: number;
  y: number;
}

export interface ItineraryDay {
  /** e.g. "Day 1" or "Days 2–3" */
  label: string;
  title: string;
  location: string;
  description: string;
  stay?: string;
}

export interface Itinerary {
  slug: string;
  title: string;
  /** One-line hook used on cards */
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
  /** Short narrative paragraphs */
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
  /** Where the guest is from */
  homeTown: string;
  journeySlug: string;
  travelled: string;
  quote: string;
  excerpt: string;
  body: string[];
  /** Externally hosted film. Omitted until the client supplies it. */
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
