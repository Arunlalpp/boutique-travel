import type { ImageAsset } from "@/lib/types";

/**
 * Backroad Ledger home page content, from the client's wireframe.
 *
 * Copy in [square brackets] and every photo here are PLACEHOLDERS: the
 * client supplies the real field notes, guest quotes, host names and
 * photography before launch. Entries and guest films are planned as Sanity
 * collections (phase 2); until then they live here so the page is complete.
 */

const u = (id: string, alt: string, focal?: string): ImageAsset => ({
    src: `https://images.unsplash.com/photo-${id}`,
    alt,
    focal,
});

/* ---------- 01 · Hero ---------- */

export interface HeroClip {
    /** Poster frame, and the clip itself until real footage is supplied. */
    image: ImageAsset;
    /** Optional muted MP4 loop (8–10 s). When set it plays instead of the still. */
    video?: string;
    /** Field note shown bottom-left while this clip plays. */
    note: string;
}

export const hero = {
    eyebrow: "A travel ledger of India",
    title: ["Paths first", "walked by us."],
    lede: "India as you were never shown. Journeys designed for one guest at a time.",
    clips: [
        {
            image: u(
                "1590050752117-238cb0fb12b1",
                "A wooden canoe on a palm-lined backwater at first light",
                "50% 70%",
            ),
            note: "Field note · Alleppey, day 3 — the canoe leaves before the village is awake.",
        },
        {
            image: u("1626621341517-bbf3d9990a23", "Trekkers crossing a snowfield below Himalayan peaks", "50% 55%"),
            note: "Field note · Kedarkantha, day 2 — fresh snow, and not another set of footprints.",
        },
        {
            image: u(
                "1571536802807-30451e3955d8",
                "Wooden boats on the Ganges below the ghats of Varanasi at dusk",
                "50% 55%",
            ),
            note: "Field note · Varanasi, day 1 — the river at the hour the lamps are lit.",
        },
    ] as HeroClip[],
};

/* ---------- 02 · Manifesto ---------- */

export const manifesto = {
    quote: "No buses. No flags. No checklists. Just a route that was made for you.",
    image: u("1418065460487-3e41a6c84dc5", "Mist rising off a pine forest", "50% 40%"),
};

/* ---------- 03 · The story ---------- */

export const story = {
    title: "The Story",
    intro: "In the forest, elephants make the first path. Every other creature follows the road they leave behind.",
    body: [
        "That is how we travel. Before any journey goes into our ledger, we have walked it ourselves. We have taken the roads that stop being roads, sat in kitchens where the food is cooked over wood, and watched mist lift off valleys that most maps ignore.",
        "Backroad Ledger was born from those journeys. We are not a tour operator. We are a small collection of hand-built experiences, each one a place we know and people we trust.",
    ],
    /** Shown when the guest opens "Read the full story". PLACEHOLDER copy. */
    more: [
        "[Placeholder] Every route is scouted by one of the two of us, on foot where the road gives out, over several seasons. We stay with the hosts, eat what they cook and only write a route into the ledger once we would send our own families on it.",
        "[Placeholder] We take a handful of Entries each year, so every journey stays personal and every place stays the way we found it.",
    ],
    images: {
        main: u("1549366021-9f761d450615", "An elephant walking out of a dark forest", "50% 45%"),
        inset: u("1504280390367-361c6d9f38f4", "The view from inside a tent onto a forest camp at dawn", "50% 60%"),
    },
    partners: [
        {
            name: "[Partner A]",
            role: "[Role · routes scouted]",
            image: u("1557862921-37829c790f19", "Portrait of a founding partner", "50% 25%"),
        },
        {
            name: "[Partner B]",
            role: "[Role · routes scouted]",
            image: u("1573496359142-b8d87734a5a2", "Portrait of a founding partner", "50% 22%"),
        },
    ],
};

/* ---------- 04 · The ledger index ---------- */

export const tags = [
    "Mountains",
    "Water",
    "Wildlife",
    "Culture",
    "Food",
    "Rest",
    "Slow",
    "Light",
    "Spirit",
    "Backpack",
] as const;
export type Tag = (typeof tags)[number];

export interface Entry {
    no: string;
    name: string;
    line: string;
    route: string;
    nights: string;
    tags: [Tag, Tag];
    image: ImageAsset;
}

export const entries: Entry[] = [
    {
        no: "01",
        name: "The Mountain Seeker",
        line: "For those who feel most themselves above the tree line, where the air thins and the view goes quiet.",
        route: "Spiti & Kinnaur",
        nights: "7–8 nights",
        tags: ["Mountains", "Light"],
        image: u("1585409677983-0f6c41ca9c3b", "Snow peaks catching the last pink light", "50% 50%"),
    },
    {
        no: "02",
        name: "The Ocean & Backwater Traveller",
        line: "For guests drawn to water, slow boats, and coastlines where the day moves at the tide's pace.",
        route: "Kerala backwaters & coast",
        nights: "6–7 nights",
        tags: ["Water", "Slow"],
        image: u("1593693397690-362cb9666fc2", "A houseboat drifting down a palm-lined backwater", "50% 60%"),
    },
    {
        no: "03",
        name: "The Rest Luxury Traveller",
        line: "For those who've earned stillness, and want it delivered in grand rooms with nowhere to be.",
        route: "Coorg & Chikmagalur estates",
        nights: "5–6 nights",
        tags: ["Rest", "Food"],
        image: u("1566073771259-6a8506099945", "A quiet pool terrace at a small estate hotel", "50% 55%"),
    },
    {
        no: "04",
        name: "The Backpacker",
        line: "For the traveller who trusts a train timetable over an itinerary, and wants India on their own terms.",
        route: "Hampi to Gokarna",
        nights: "10–12 nights",
        tags: ["Backpack", "Culture"],
        image: u("1527631746610-bca00a040d60", "A backpacker walking down a narrow old street", "50% 40%"),
    },
    {
        no: "05",
        name: "The Nature & Wildlife Seeker",
        line: "For guests who'd rather track a pugmark than a checklist, deep inside forests that still belong to the animals.",
        route: "Kabini & Bandhavgarh",
        nights: "6–7 nights",
        tags: ["Wildlife", "Slow"],
        image: u("1561731216-c3a4d99437d5", "A tiger stepping out of the forest edge", "50% 35%"),
    },
    {
        no: "06",
        name: "The Culture Seeker",
        line: "For those who want the India held in temples, courtyards, and centuries-old craft, not a guidebook paragraph.",
        route: "Varanasi & Chettinad",
        nights: "7–8 nights",
        tags: ["Culture", "Spirit"],
        image: u("1561361058-c24cecae35ca", "Old palaces and temples along the ghats of Varanasi", "50% 45%"),
    },
    {
        no: "07",
        name: "The Food Traveller",
        line: "For guests who read a place through its kitchens, markets, and the family recipes passed down without a written word.",
        route: "Old Delhi, Lucknow, Amritsar",
        nights: "5–6 nights",
        tags: ["Food", "Culture"],
        image: u("1514222134-b57cbb8ce073", "The Golden Temple in Amritsar reflected in its pool at dusk", "50% 45%"),
    },
    {
        no: "08",
        name: "The Slow / Village Traveller",
        line: "For those who want mornings with no agenda, spent in homes where the rhythm hasn't changed in generations.",
        route: "Meghalaya root-bridge villages",
        nights: "6–7 nights",
        tags: ["Slow", "Water"],
        image: u("1595815771614-ade9d652a65d", "Wooden houseboats moored on a still lake below mountains", "50% 55%"),
    },
    {
        no: "09",
        name: "The Photographer",
        line: "For travellers chasing light first and destinations second, where every stop is really about the hour before sunset.",
        route: "Rann of Kutch & Ladakh",
        nights: "7–9 nights",
        tags: ["Light", "Mountains"],
        image: u(
            "1581793745862-99fde7fa73d2",
            "A lone rider on an empty road through a high mountain desert",
            "50% 55%",
        ),
    },
    {
        no: "10",
        name: "The Spiritual Seeker",
        line: "For guests looking for India's older questions, found in ashrams, rivers, and the quiet of first light.",
        route: "Rishikesh & Varanasi",
        nights: "6–8 nights",
        tags: ["Spirit", "Water"],
        image: u("1571679654681-ba01b9e1e117", "A river boat at dusk below a lit bridge", "50% 55%"),
    },
];

/* ---------- 05 · How an entry is written ---------- */

export const steps = [
    { title: "Tell us who you are", text: "Your pace, your curiosity, your dates. A short note is enough to begin." },
    { title: "We draw the route", text: "Built only from places we have walked, then shaped around you." },
    { title: "You walk it", text: "One guest or one small party. Local hosts, no buses, no flags." },
    {
        title: "You receive your ledger",
        text: "A printed journal of your route, your stamps, your photographs, your story.",
    },
];

/* ---------- 06 · Guest ledger ---------- */

export interface GuestFilm {
    guest: string;
    country: string;
    entry: string;
    duration: string;
    quote: string;
    poster: ImageAsset;
    /** Vimeo or YouTube embed URL. PLACEHOLDER: empty until the client supplies films. */
    embed?: string;
}

export const guestLedger = {
    eyebrow: "From the guest ledger",
    title: "Entries written by guests",
    lede: "Short films and handwritten pages from people who have already walked the routes.",
    featured: {
        guest: "[Guest name]",
        country: "[Country]",
        entry: "07",
        duration: "3:40",
        quote: "[Pull quote: one honest sentence about the moment they still think about.]",
        poster: u("1602216056096-3b40cc0c9944", "A houseboat moored under palms on a green backwater", "50% 55%"),
    } satisfies GuestFilm,
    films: [
        {
            guest: "[Guest name]",
            country: "[Country]",
            entry: "02",
            duration: "1:55",
            quote: "[Short quote]",
            poster: u("1506461883276-594a12b11cf3", "A boatman poling a canoe past a houseboat", "50% 55%"),
        },
        {
            guest: "[Guest name]",
            country: "[Country]",
            entry: "05",
            duration: "2:30",
            quote: "[Short quote]",
            poster: u("1581852017103-68ac65514cf7", "An elephant walking through tall golden grass", "50% 50%"),
        },
        {
            guest: "[Guest name]",
            country: "[Country]",
            entry: "09",
            duration: "3:05",
            quote: "[Short quote]",
            poster: u("1598091383021-15ddea10925d", "A horse grazing in a high meadow below snow peaks", "50% 55%"),
        },
    ] satisfies GuestFilm[],
    pages: [
        {
            entry: "03",
            date: "[Month Year]",
            text: "[Two or three lines in the guest's own words, set like a handwritten note.]",
            guest: "[Guest name]",
            place: "[Country] · [Route]",
            stamps: 3,
        },
        {
            entry: "06",
            date: "[Month Year]",
            text: "[Two or three lines in the guest's own words, set like a handwritten note.]",
            guest: "[Guest name]",
            place: "[Country] · [Route]",
            stamps: 2,
        },
        {
            entry: "08",
            date: "[Month Year]",
            text: "[Two or three lines in the guest's own words, set like a handwritten note.]",
            guest: "[Guest name]",
            place: "[Country] · [Route]",
            stamps: 3,
        },
    ],
};

/* ---------- 07 · Frames from the road + hosts ---------- */

export const frames = {
    title: "The India you were never shown",
    lede: "Cloud forests, salt deserts, backwater villages at first light. And the weavers, cooks, naturalists and families who host you at their own tables.",
    photos: [
        {
            image: u("1418065460487-3e41a6c84dc5", "Mist in a pine forest above a root-bridge village", "50% 50%"),
            note: "Field note · Mawlynnong, day 2",
            shape: "portrait",
        },
        {
            image: u("1598091383021-15ddea10925d", "A high meadow below snow peaks", "50% 60%"),
            note: "Field note · Sonamarg, day 4",
            shape: "wide",
        },
        {
            image: u("1571934811356-5cc061b6821f", "Chai and whole spices laid out on a kitchen table", "50% 50%"),
            note: "Field note · Lucknow kitchen, day 1",
            shape: "square",
        },
        {
            image: u("1506461883276-594a12b11cf3", "A canoe on the backwater at first light", "50% 55%"),
            note: "Field note · Kumarakom, day 3",
            shape: "portrait",
        },
        {
            image: u("1585937421612-70a008356fbe", "Bowls of home-cooked curry", "50% 50%"),
            note: "Field note · Old Delhi, day 2",
            shape: "wide",
        },
        {
            image: u("1571536802807-30451e3955d8", "Boats at the ghats in the blue hour", "50% 55%"),
            note: "Field note · Varanasi, day 1",
            shape: "square",
        },
    ] as { image: ImageAsset; note: string; shape: "portrait" | "wide" | "square" }[],
    hosts: [
        {
            name: "[Host name]",
            role: "[Weaver · Kutch]",
            image: u("1564564321837-a57b7070ac4f", "Portrait of a host", "50% 30%"),
        },
        {
            name: "[Host name]",
            role: "[Home cook · Lucknow]",
            image: u("1580489944761-15a19d654956", "Portrait of a host", "50% 25%"),
        },
        {
            name: "[Host name]",
            role: "[Naturalist · Kabini]",
            image: u("1522529599102-193c0d76b5b6", "Portrait of a host", "50% 30%"),
        },
        {
            name: "[Host name]",
            role: "[Homestay family · Meghalaya]",
            image: u("1531123897727-8f129e1688ce", "Portrait of a host", "50% 25%"),
        },
    ],
};

/* ---------- 08 · Why travel with us ---------- */

export const promises = {
    title: "Why travel with us",
    image: u(
        "1501555088652-021faa106b9b",
        "A traveller with a backpack walking into a green mountain valley, seen from behind",
        "50% 35%",
    ),
    items: [
        { lead: "Walked first.", text: "We have personally experienced every route we offer." },
        { lead: "Made for you.", text: "Each journey is designed around one guest or one small party." },
        {
            lead: "Small on purpose.",
            text: "Limited Entries each year, so every journey stays personal and every place stays special.",
        },
        {
            lead: "Rooted in respect.",
            text: "Fair pay for local hosts, small groups, and communities who welcome you on their own terms.",
        },
    ],
};

/* ---------- 09 · Enquiry ---------- */

export const enquiry = {
    title: ["Your entry", "is still", "blank."],
    lede: "Tell us what kind of traveller you are, and we will begin writing.",
    /** PLACEHOLDER until the client confirms their reply time. */
    replyNote: "We reply personally within 24 hours.",
};

/* ---------- Navigation ---------- */

export const ledgerNav = [
    { label: "Entries", href: "#entries" },
    { label: "Our Story", href: "#story" },
    { label: "Guest Ledger", href: "#guest-ledger" },
    { label: "Hosts", href: "#hosts" },
];

export const beginHref = "#enquire";
