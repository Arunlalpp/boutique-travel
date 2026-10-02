/**
 * Package pricing from the approved design. Prices are per person in Indian
 * rupees; change `currency` in lib/format.ts if the client prices in
 * another currency.
 */

export type PricingMode = "pp" | "group" | "private";

export const pricingModes: { id: PricingMode; label: string; note?: string; summary: string; multiplier: number }[] = [
    { id: "pp", label: "Per person", summary: "Per person pricing", multiplier: 1 },
    { id: "group", label: "Group of 4+", note: "−12%", summary: "Group of 4+ · 12% off", multiplier: 0.88 },
    { id: "private", label: "Private", summary: "Private departure", multiplier: 1.25 },
];

/** Group pricing only applies from this many travellers. */
export const GROUP_MIN = 4;

export interface Plan {
    id: string;
    name: string;
    duration: string;
    short: string;
    price: number;
    description: string;
    included: string[];
    excluded: string[];
    popular?: boolean;
}

export const plans: Plan[] = [
    {
        id: "weekend",
        name: "Weekend Escape",
        duration: "2 nights · 3 days",
        short: "2N/3D",
        price: 9999,
        description: "Easy pace, perfect first camp.",
        included: ["Lakeside tent stay", "All meals & bonfire", "Guided nature walk", "Local transfers"],
        excluded: ["Wildlife safari"],
    },
    {
        id: "explorer",
        name: "Explorer",
        duration: "4 nights · 5 days",
        short: "4N/5D",
        price: 18999,
        description: "Our most-loved trek and camp combo.",
        included: [
            "Glamping & homestays",
            "All meals, chef on site",
            "Two guided treks",
            "Wildlife safari",
            "Photography session",
        ],
        excluded: [],
        popular: true,
    },
    {
        id: "expedition",
        name: "Expedition",
        duration: "7 nights · 8 days",
        short: "7N/8D",
        price: 32499,
        description: "High altitude, fully supported.",
        included: [
            "Expedition gear provided",
            "Certified trek leader",
            "Oxygen & first aid",
            "Permits & insurance",
            "Private transfers",
        ],
        excluded: [],
    },
];

export const inclusions = [
    { icon: "tent", title: "Curated stays", text: "Tents, glamps & homestays" },
    { icon: "food", title: "Local meals", text: "Fresh regional menus" },
    { icon: "bus", title: "Transfers", text: "From nearest airport or rail" },
    { icon: "guide", title: "Expert guides", text: "Certified and local" },
] as const;

export const faq: [string, string][] = [
    [
        "Is it safe for first-time campers?",
        "Yes. The Weekend Escape is designed for beginners, with proper beds, clean washrooms and a guide on call around the clock. Every guide holds a wilderness first-aid certificate.",
    ],
    [
        "What is your cancellation policy?",
        "Cancel up to 15 days before departure for a full refund. Between 7 and 15 days we refund 50%, or move your booking to another date for free.",
    ],
    [
        "Can I customise a package?",
        "Every package can be extended, shortened or combined. Tell us your dates and pace on the Contact page and a trip designer will send a custom plan.",
    ],
    [
        "Do you cater to dietary needs?",
        "Our camp chefs cook vegetarian by default and handle vegan, Jain, gluten-free and nut-free meals. Mention it when you book.",
    ],
    [
        "What should I pack?",
        "We send a packing list after booking. Expedition guests get gear provided; for other trips, bring layers, a headlamp and comfortable shoes.",
    ],
];
