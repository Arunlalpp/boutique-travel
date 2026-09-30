import type { Highlight, NavItem } from "@/lib/types";

/**
 * PLACEHOLDER BRAND
 * "Boutique Travel" is a stand-in name. Swap name, contact details and socials
 * here once the client's identity is supplied.
 */
export const site = {
  name: "Boutique Travel",
  descriptor: "Private & small-group journeys",
  tagline: "Journeys composed slowly, for the few.",
  description:
    "Curated, personal travel — private and small-group journeys shaped around the way you like to see the world.",
  email: "journeys@example.com",
  phone: "+44 (0)20 0000 0000",
  studio: "London · by appointment",
  hours: "Mon–Fri, 9am–6pm",
  /** Placeholder — replace with the client's production domain before launch. */
  siteUrl: "https://www.boutique-travel.example",
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Vimeo", href: "https://vimeo.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
} as const;

/**
 * Single go-live switch for search-engine indexing. Both `app/layout.tsx`
 * (page-level robots meta) and `app/robots.ts` (robots.txt) read this, so
 * flipping it to `true` once the site is ready for launch is the entire
 * SEO go-live step.
 */
export const ALLOW_INDEXING = false;

export const mainNav: NavItem[] = [
  { label: "Journeys", href: "/itineraries" },
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
