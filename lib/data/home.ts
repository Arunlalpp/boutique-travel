import type { ImageAsset } from "@/lib/types";
import { media } from "./media";

/**
 * Home-page copy for the sections that aren't managed in Sanity. Taken from
 * the approved Figma prototype. Figures marked PLACEHOLDER are design copy
 * and must be replaced with the client's real numbers before launch.
 */

/** Home hero copy (minimal redesign). */
export const hero = {
    title: "Your adventure begins here.",
    lede: "Curated camps, small-group treks and wildlife trails, each one hand-built by local experts.",
    image: media.heroMountains,
};

/** The statement under the hero. */
export const intro = {
    eyebrow: "Who we are",
    text: "We plan small-group journeys into India’s quiet places. Lakeside camps, ridge treks and dawn safaris, never more than eight people at a time.",
};

/** PLACEHOLDER figures from the design. */
export const impact = {
    eyebrow: "Our impact",
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
    title: "Your exploration starts here.",
    lede: "Tell us where you want to wake up. We’ll handle the permits, gear, guides and the campfire stories.",
    image: media.valleyLight,
};
