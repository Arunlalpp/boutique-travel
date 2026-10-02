import type { ImageAsset } from "@/lib/types";
import { media } from "./media";

/**
 * Home-page copy for the sections that aren't managed in Sanity. Taken from
 * the approved Figma prototype. Figures marked PLACEHOLDER are design copy
 * and must be replaced with the client's real numbers before launch.
 */

export interface HeroSlide {
    image: ImageAsset;
    title: string;
    sub: string;
    lede: string;
    place: string;
    href?: string;
}

/** The brand slide always leads; featured journeys from Sanity follow it. */
export const brandSlide: HeroSlide = {
    image: media.nightSky,
    title: "Your Adventure Begins Here!",
    sub: "Explore the Great Outdoors",
    lede: "Discover untouched landscapes with curated camps, small-group treks and wildlife trails, each one hand-built by local experts.",
    place: "Under the stars",
};

/** PLACEHOLDER figures from the design. */
export const trustChips = ["★ 4.9 on Google · 2,140 reviews", "12,000+ campers hosted", "Eco-certified camps"];

export const wildlife = {
    eyebrow: "Wildlife trails",
    title: "Discover captivating wildlife",
    lede: "Join naturalist-led safaris at dawn and dusk. Track elephants, spot rare mountain goats on misty slopes, and listen to the forest come alive after dark.",
    chips: ["Naturalist guides", "Night safaris", "Max 8 per group"],
    ring: "PERIYAR · KABINI · NAGARHOLE · BANDIPUR · SILENT VALLEY · ",
    image: media.safariWildlife,
    /** PLACEHOLDER */
    badge: { value: "120+", label: "species spotted" },
};

/** PLACEHOLDER figures from the design. */
export const impact = {
    eyebrow: "Our impact",
    title: "Nights well spent, stories well told.",
    image: media.valleyLight,
    place: "Gandikota Canyon · 14.81° N",
    stats: [
        { value: "836", label: "Daily guided visits" },
        { value: "98%", label: "Visitor satisfaction" },
        { value: "70+", label: "Species protected" },
        { value: "158", label: "Community programs" },
    ],
};

export interface Experience {
    category: "Private" | "Hiking" | "Water" | "Wildlife";
    name: string;
    description: string;
    meta: string;
    price: number;
    unit: string;
    image: ImageAsset;
}

export const experiences: Experience[] = [
    {
        category: "Private",
        name: "Special Private Tour",
        description: "Wander hidden valleys with your own guide and a chef-cooked dinner by the lake.",
        meta: "3 days · 18 km",
        price: 12999,
        unit: "/ day",
        image: media.alpineLake,
    },
    {
        category: "Hiking",
        name: "Customised Group Hiking",
        description: "Ridge walks, waterfalls and summit sunrises at your crew’s pace with a certified trek leader.",
        meta: "5 hrs · 12 km",
        price: 2499,
        unit: "/ person",
        image: media.walkers,
    },
    {
        category: "Water",
        name: "Kayak & Drifting Journey",
        description: "Paddle calm backwaters at golden hour past fishing villages, mangroves and kingfishers.",
        meta: "4 hrs · 8 km",
        price: 3199,
        unit: "/ person",
        image: media.dolomiteLake,
    },
    {
        category: "Wildlife",
        name: "Dawn Safari Walk",
        description: "Walk the buffer zone with a naturalist, reading tracks and calls before the park wakes.",
        meta: "3 hrs · 5 km",
        price: 1899,
        unit: "/ person",
        image: media.savannah,
    },
    {
        category: "Hiking",
        name: "Night Sky Trek",
        description: "A short night hike to a dark-sky ridge with telescopes, hot cocoa and constellation stories.",
        meta: "4 hrs · 6 km",
        price: 2299,
        unit: "/ person",
        image: media.aurora,
    },
    {
        category: "Water",
        name: "Coastal Cliff Trail",
        description: "Five beaches, one cliff path and a sunset swim. Ends with a seafood thali.",
        meta: "6 hrs · 14 km",
        price: 2799,
        unit: "/ person",
        image: media.cinqueTerre,
    },
];

export const cta = {
    eyebrow: "Start planning",
    title: "Your exploration starts here",
    lede: "Tell us where you want to wake up. We’ll handle the permits, gear, guides and the campfire stories.",
    image: media.heroMountains,
};
