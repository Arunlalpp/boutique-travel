import type { GuestStory } from "@/lib/types";
import { media } from "./media";

/**
 * GUEST STORIES (mock content)
 * Guest names and quotes are illustrative placeholders only — they must be
 * replaced with real, consented guest testimonials before launch.
 *
 * `video` is intentionally omitted: films will be hosted on YouTube or Vimeo
 * by the client. Add `video: { provider: "vimeo", id: "123456789" }` to any
 * story and the player will embed it automatically.
 */
export const stories: GuestStory[] = [
  {
    slug: "a-morning-in-the-garden",
    guestName: "Placeholder Guest A",
    homeTown: "Edinburgh",
    journeySlug: "the-quiet-season-in-kyoto",
    travelled: "November 2025",
    quote: "We had the garden entirely to ourselves. I still think about the sound of that rake on the gravel.",
    excerpt: "A retired architect on seeing Kyoto the way it was designed to be seen — quietly.",
    body: [
      "Placeholder story copy. This is where the guest's own account will sit — in their words, lightly edited, with the details that made the journey theirs.",
      "The final text will be supplied by the client alongside the film. The layout allows for three to five short paragraphs, with an optional pull-quote and a pair of photographs.",
    ],
    poster: media.kyotoStreet,
    portrait: media.portraitA,
    featured: true,
  },
  {
    slug: "eight-of-us-and-the-mara",
    guestName: "Placeholder Guest B",
    homeTown: "Toronto",
    journeySlug: "where-the-plains-breathe",
    travelled: "August 2025",
    quote: "I came as a stranger to the other seven. I left with friends I've since travelled with twice.",
    excerpt: "On why a small group changed everything about a first safari.",
    body: [
      "Placeholder story copy. This is where the guest's own account will sit — in their words, lightly edited, with the details that made the journey theirs.",
      "The final text will be supplied by the client alongside the film.",
    ],
    poster: media.savannah,
    portrait: media.portraitB,
    featured: false,
  },
  {
    slug: "a-family-at-the-lake",
    guestName: "Placeholder Guest C",
    homeTown: "Melbourne",
    journeySlug: "lakes-lagoons-and-ligurian-light",
    travelled: "June 2025",
    quote: "Three generations, ten days, and not one moment where anyone felt hurried.",
    excerpt: "A multi-generational family trip that made room for everyone's pace.",
    body: [
      "Placeholder story copy. This is where the guest's own account will sit — in their words, lightly edited, with the details that made the journey theirs.",
      "The final text will be supplied by the client alongside the film.",
    ],
    poster: media.dolomiteLake,
    portrait: media.portraitC,
    featured: false,
  },
  {
    slug: "dinner-in-jodhpur",
    guestName: "Placeholder Guest D",
    homeTown: "New York",
    journeySlug: "palaces-of-the-desert-kings",
    travelled: "February 2025",
    quote: "Our host showed us the room his great-grandfather was born in. You cannot book that.",
    excerpt: "On the difference between visiting a palace and being welcomed into one.",
    body: [
      "Placeholder story copy. This is where the guest's own account will sit — in their words, lightly edited, with the details that made the journey theirs.",
      "The final text will be supplied by the client alongside the film.",
    ],
    poster: media.jaipur,
    portrait: media.portraitD,
    featured: false,
  },
  {
    slug: "the-night-the-sky-opened",
    guestName: "Placeholder Guest E",
    homeTown: "Singapore",
    journeySlug: "fire-ice-and-northern-light",
    travelled: "January 2025",
    quote: "Our guide knocked on the door at 1am. Ten minutes later we were standing under the aurora in silence.",
    excerpt: "Chasing clear skies along Iceland's south coast.",
    body: [
      "Placeholder story copy. This is where the guest's own account will sit — in their words, lightly edited, with the details that made the journey theirs.",
      "The final text will be supplied by the client alongside the film.",
    ],
    poster: media.aurora,
    portrait: media.portraitE,
    featured: false,
  },
];

export function getStory(slug: string): GuestStory | undefined {
  return stories.find((s) => s.slug === slug);
}

export function getStoriesForJourney(journeySlug: string): GuestStory[] {
  return stories.filter((s) => s.journeySlug === journeySlug);
}

export function getFeaturedStory(): GuestStory {
  return stories.find((s) => s.featured) ?? stories[0];
}
