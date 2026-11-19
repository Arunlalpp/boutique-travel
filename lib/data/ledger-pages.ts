import type { ImageAsset } from "@/lib/types";
import { entries, frames, guestLedger, type Entry } from "./ledger";

/**
 * Content for the Backroad Ledger inner pages (Entries, Entry pages, Our
 * Story, Guest Ledger, Enquire), following the wireframe's site structure.
 *
 * DRAFT: the route outlines, seasons and highlights below are written from
 * each Entry's route so the pages read as they will at launch. The client
 * replaces them with their own field notes. [Square brackets] mark copy only
 * the client can supply. Photos are dummy Unsplash frames.
 */

const u = (id: string, alt: string, focal?: string): ImageAsset => ({
    src: `https://images.unsplash.com/photo-${id}`,
    alt,
    focal,
});

/* Dummy photos reused across galleries. */
const img = {
    snowTrek: u("1626621341517-bbf3d9990a23", "Trekkers crossing a snowfield below Himalayan peaks", "50% 55%"),
    peaks: u("1585409677983-0f6c41ca9c3b", "Snow peaks catching the last pink light", "50% 50%"),
    meadow: u("1598091383021-15ddea10925d", "A horse grazing in a high meadow below snow peaks", "50% 60%"),
    pines: u("1418065460487-3e41a6c84dc5", "Mist rising off a pine forest", "50% 45%"),
    canoe: u("1590050752117-238cb0fb12b1", "A wooden canoe on a palm-lined backwater at first light", "50% 70%"),
    houseboat: u("1602216056096-3b40cc0c9944", "A houseboat moored under palms on a green backwater", "50% 55%"),
    boatman: u("1506461883276-594a12b11cf3", "A boatman poling a canoe past a houseboat", "50% 55%"),
    tent: u("1504280390367-361c6d9f38f4", "The view from inside a tent onto a forest camp at dawn", "50% 60%"),
    chai: u("1571934811356-5cc061b6821f", "Chai and whole spices laid out on a kitchen table", "50% 50%"),
    curry: u("1585937421612-70a008356fbe", "Bowls of home-cooked curry", "50% 50%"),
    street: u("1527631746610-bca00a040d60", "A backpacker walking down a narrow old street", "50% 40%"),
    valley: u("1501555088652-021faa106b9b", "A traveller walking into a green mountain valley", "50% 35%"),
    desertRoad: u(
        "1581793745862-99fde7fa73d2",
        "A lone rider on an empty road through a high mountain desert",
        "50% 55%",
    ),
    elephant: u("1549366021-9f761d450615", "An elephant walking out of a dark forest", "50% 45%"),
    grassElephant: u("1581852017103-68ac65514cf7", "An elephant walking through tall golden grass", "50% 50%"),
    ghats: u("1571536802807-30451e3955d8", "Wooden boats on the Ganges below the ghats at dusk", "50% 55%"),
    palaces: u("1561361058-c24cecae35ca", "Old palaces and temples along the ghats of Varanasi", "50% 45%"),
    riverDusk: u("1571679654681-ba01b9e1e117", "A river boat at dusk below a lit bridge", "50% 55%"),
    lake: u("1595815771614-ade9d652a65d", "Wooden houseboats moored on a still lake below mountains", "50% 55%"),
};

/* ---------- Entry pages ---------- */

export interface Stage {
    days: string;
    place: string;
    text: string;
}

export interface EntryDetail {
    season: string;
    pace: string;
    intro: string[];
    highlights: string[];
    stages: Stage[];
    gallery: [ImageAsset, ImageAsset, ImageAsset];
}

const details: Record<string, EntryDetail> = {
    "01": {
        season: "June to September",
        pace: "Steady, with high-altitude rest days",
        intro: [
            "The road climbs out of the apple orchards of Kinnaur and keeps going until the trees give up. Above them is Spiti: a cold desert of monasteries, fossil beds and villages that see more snow leopards than visitors.",
            "We take it slowly, so the altitude never takes the day from you, and we stay in family homes rather than camps wherever the road allows.",
        ],
        highlights: [
            "Breakfast facing the Kinnaur Kailash range",
            "Thousand-year-old murals at Tabo, by lamplight",
            "A night with a family in one of the highest villages in Spiti",
        ],
        stages: [
            {
                days: "Days 1–2",
                place: "Shimla to Sarahan",
                text: "Up from the hill station into apple country, and a first night below the Bhimakali temple.",
            },
            {
                days: "Days 3–4",
                place: "Kalpa & Nako",
                text: "Snow peaks at breakfast, then a lake village on the edge of Spiti.",
            },
            {
                days: "Days 5–6",
                place: "Tabo & Dhankar",
                text: "Monastery murals older than most cathedrals, and a walk up to a high lake above the confluence.",
            },
            {
                days: "Days 7–8",
                place: "Kaza & Langza",
                text: "Fossil fields, a homestay among the highest villages, and a slow road out.",
            },
        ],
        gallery: [img.snowTrek, img.meadow, img.pines],
    },
    "02": {
        season: "October to March",
        pace: "Unhurried, mostly on the water",
        intro: [
            "Kerala is best read from a boat. We trade the crowded houseboat lanes for canoe channels too narrow for anything with an engine, where the village washes, fishes and argues along the bank.",
            "The journey ends on a quiet stretch of coast, with a fishing village for company and a tide that sets the time of day.",
        ],
        highlights: [
            "A private boat on the Kumarakom backwaters",
            "A canoe that leaves before the village is awake",
            "Dinner in a Syrian Christian family home in Fort Kochi",
        ],
        stages: [
            {
                days: "Days 1–2",
                place: "Fort Kochi",
                text: "Chinese fishing nets at dawn, spice-warehouse lanes, and dinner in a family home.",
            },
            {
                days: "Days 3–4",
                place: "Kumarakom",
                text: "Your own boat on the backwaters, and the canoe channels the houseboats never reach.",
            },
            {
                days: "Day 5",
                place: "Alleppey villages",
                text: "Coir makers, a toddy shop lunch, and a dawn canoe through the paddy fields.",
            },
            { days: "Days 6–7", place: "Marari coast", text: "A fishing village beach, a hammock, and nowhere to be." },
        ],
        gallery: [img.canoe, img.houseboat, img.boatman],
    },
    "03": {
        season: "October to May",
        pace: "Very slow: long breakfasts, no early starts",
        intro: [
            "Some journeys are about seeing. This one is about stopping. Two coffee estates in the hills of Karnataka, chosen for their rooms, their kitchens and the families who still run them.",
            "There is a waterfall walk if you want one, and a planter's lunch if you would rather talk. Neither is compulsory.",
        ],
        highlights: [
            "A planter's bungalow with the estate to yourself at dusk",
            "A Kodava lunch cooked with the family",
            "A pool terrace above the morning cloud in Chikmagalur",
        ],
        stages: [
            {
                days: "Day 1",
                place: "Mysore to Coorg",
                text: "A gentle drive into the hills, timed so you arrive for tea.",
            },
            {
                days: "Days 2–3",
                place: "Coorg estate",
                text: "Coffee walks at your own pace, spa afternoons, and dinner with the planter's family.",
            },
            {
                days: "Days 4–6",
                place: "Chikmagalur",
                text: "A hill estate above the clouds, a waterfall walk if you want one, and long evenings on the verandah.",
            },
        ],
        gallery: [img.tent, img.chai, img.pines],
    },
    "04": {
        season: "November to February",
        pace: "Independent, with local trains and buses",
        intro: [
            "For the traveller who would rather work out the bus than be driven. We plan the bones of the route, book the beds worth booking, and leave the rest to you.",
            "You carry a printed ledger of tips, a number to call at any hour, and the names of people along the way who will look out for you.",
        ],
        highlights: [
            "Sunrise over the Hampi boulders from Matanga Hill",
            "A coracle across the Tungabhadra",
            "Cliff paths between Gokarna's beaches",
        ],
        stages: [
            {
                days: "Days 1–4",
                place: "Hampi",
                text: "Boulders, ruined bazaars, a coracle crossing, and sunrise from the hill.",
            },
            {
                days: "Days 5–6",
                place: "Badami & Pattadakal",
                text: "Cave temples cut into red sandstone, reached by local bus.",
            },
            {
                days: "Days 7–8",
                place: "Into the Western Ghats",
                text: "The slow descent towards the coast by train and bus.",
            },
            {
                days: "Days 9–12",
                place: "Gokarna",
                text: "A temple town that wakes early, and beaches joined by cliff paths.",
            },
        ],
        gallery: [img.valley, img.desertRoad, img.street],
    },
    "05": {
        season: "October to June",
        pace: "Early mornings, quiet afternoons",
        intro: [
            "Two forests, two ways of watching. In Kabini the animals come down to the water at dusk; in Bandhavgarh you go looking for them in the sal forest at first light.",
            "In both, you travel with naturalists who have tracked here for years and know the difference between a sighting and a disturbance.",
        ],
        highlights: [
            "Elephant herds on the Kabini shore at dusk",
            "Morning drives through Bandhavgarh's sal forest",
            "An evening by the fire with the camp naturalist",
        ],
        stages: [
            {
                days: "Days 1–3",
                place: "Kabini",
                text: "Boat safaris on the backwaters and forest drives with a naturalist who knows the herds.",
            },
            { days: "Day 4", place: "Bengaluru to Jabalpur", text: "A travel day, broken up with a long lunch." },
            {
                days: "Days 5–7",
                place: "Bandhavgarh",
                text: "Dawn drives in the sal forest, the old fort on the hill, and evenings at camp.",
            },
        ],
        gallery: [img.elephant, img.grassElephant, img.tent],
    },
    "06": {
        season: "October to March",
        pace: "Moderate, with long lunches",
        intro: [
            "Varanasi is India at its most intense; Chettinad is India at its most private. Together they show how a culture is held: on the river in public, and behind merchant doors in the south.",
            "You meet the people who keep both alive: weavers, priests, tile makers and the families who restored their grandparents' mansions.",
        ],
        highlights: [
            "The ghats before sunrise, from a rowing boat",
            "A Banarasi weaver's loom in a back lane",
            "A night in a restored Chettiar mansion",
        ],
        stages: [
            {
                days: "Days 1–3",
                place: "Varanasi",
                text: "The ghats at dawn, a weaver's workshop, and the evening aarti from the water.",
            },
            {
                days: "Day 4",
                place: "Sarnath",
                text: "Where the Buddha first taught, and a quiet afternoon away from the river.",
            },
            {
                days: "Days 5–8",
                place: "Chettinad",
                text: "Merchant mansions, tile workshops, and a Chettiar kitchen at its own pace.",
            },
        ],
        gallery: [img.ghats, img.riverDusk, img.curry],
    },
    "07": {
        season: "October to March",
        pace: "Lively, with plenty of walking between meals",
        intro: [
            "Three cities, three kitchens. Old Delhi for the lanes, Lucknow for the courts of the nawabs, Amritsar for the langar that feeds everyone who walks in.",
            "Most of the best food here is cooked at home, so that is where we take you.",
        ],
        highlights: [
            "Breakfast in the lanes behind Jama Masjid",
            "A home cook's dum biryani in Lucknow",
            "Serving at the Golden Temple's langar",
        ],
        stages: [
            {
                days: "Days 1–2",
                place: "Old Delhi",
                text: "Breakfast in the lanes, and the spice market seen from the rooftops.",
            },
            {
                days: "Days 3–4",
                place: "Lucknow",
                text: "Awadhi kitchens, kebabs that melt, and dinner in a family home.",
            },
            {
                days: "Days 5–6",
                place: "Amritsar",
                text: "The langar at the Golden Temple, kulcha at dawn, and lunch on a Punjabi farm.",
            },
        ],
        gallery: [img.chai, img.curry, img.street],
    },
    "08": {
        season: "October to April",
        pace: "Very slow, with village days and no driving",
        intro: [
            "In the Khasi hills the bridges are grown, not built: the roots of rubber trees trained across a river over a generation. The villages around them move at the same patient pace.",
            "You stay where there is no road, eat what the family eats, and let the days be shaped by the weather.",
        ],
        highlights: [
            "The walk down to the living root bridges",
            "Nights in a village homestay with no road in",
            "A clear river on the Bangladesh border at Dawki",
        ],
        stages: [
            {
                days: "Days 1–2",
                place: "Shillong",
                text: "A gentle start in the pine hills, and a morning in the market.",
            },
            {
                days: "Days 3–5",
                place: "Nongriat & the root bridges",
                text: "Down to the living bridges, and nights with a family in the valley.",
            },
            {
                days: "Days 6–7",
                place: "Mawlynnong & Dawki",
                text: "A village known for its gardens, and a river so clear the boats seem to float on air.",
            },
        ],
        gallery: [img.pines, img.meadow, img.chai],
    },
    "09": {
        season: "Kutch: November to February · Ladakh: June to September",
        pace: "Built around the light, not the clock",
        intro: [
            "Two deserts, one salt and one stone, chosen because their light does things nowhere else does. Every day is planned backwards from the hour before sunset.",
            "The two halves sit in different seasons, so most guests walk this Entry in two trips. We plan both together.",
        ],
        highlights: [
            "The white salt flat of the Rann under a full moon",
            "Embroidery villages of Banni at blue hour",
            "Pangong at first light",
        ],
        stages: [
            {
                days: "Days 1–3",
                place: "Great Rann of Kutch",
                text: "The salt flat at dusk and by moonlight, and the craft villages of Banni.",
            },
            {
                days: "Days 4–5",
                place: "Bhuj",
                text: "Workshops, blue-hour streets, and a printing workshop that still works by hand.",
            },
            {
                days: "Days 6–9",
                place: "Ladakh",
                text: "Monasteries above the Indus and Pangong at first light, in the summer season.",
            },
        ],
        gallery: [img.peaks, img.snowTrek, img.meadow],
    },
    "10": {
        season: "October to April",
        pace: "Quiet, with time set aside for practice",
        intro: [
            "India has been asking the oldest questions for a very long time. This Entry follows the Ganga from the foothills, where it runs fast and cold, to Varanasi, where it slows down for the dead.",
            "There are teachers along the way if you want one, and silence if you do not.",
        ],
        highlights: [
            "Morning practice with a teacher we trust in Rishikesh",
            "The river at its most devoted in Haridwar",
            "Dawn on the Ganga in Varanasi",
        ],
        stages: [
            {
                days: "Days 1–3",
                place: "Rishikesh",
                text: "Morning practice, the evening aarti, and a walk to a forest ashram.",
            },
            { days: "Day 4", place: "Haridwar", text: "The river at its busiest and most devoted." },
            {
                days: "Days 5–8",
                place: "Varanasi & Sarnath",
                text: "Dawn on the river, a conversation with a priest, and silence at Sarnath.",
            },
        ],
        gallery: [img.ghats, img.palaces, img.pines],
    },
};

export const entryBySlug = (slug: string) => entries.find((e) => e.slug === slug);
export const entryByNo = (no: string) => entries.find((e) => e.no === no);
export const entryDetail = (e: Entry) => details[e.no];

/** Previous and next Entry, wrapping around the ten. */
export function neighbours(e: Entry): [Entry, Entry] {
    const i = entries.findIndex((x) => x.no === e.no);
    return [entries[(i - 1 + entries.length) % entries.length], entries[(i + 1) % entries.length]];
}

export const hostsFor = (e: Entry) => frames.hosts.filter((h) => h.entries.includes(e.no));

/* ---------- Guest Ledger ---------- */

export interface GuestStory {
    slug: string;
    guest: string;
    country: string;
    entry: string;
    date: string;
    quote: string;
    poster: ImageAsset;
    /** Films have a running time; written pages do not. */
    duration?: string;
    embed?: string;
    stamps: number;
    story: string[];
}

const storyPlaceholder = [
    "[The guest's story in their own words: where they started, and what they expected before they came.]",
    "[The moment on the route they still think about, and the host or place it belongs to.]",
    "[What they would tell a friend who is thinking about the same Entry.]",
];

/** Every guest entry, films first, as one list for the Guest Ledger pages. */
export const guestStories: GuestStory[] = [
    ...[guestLedger.featured, ...guestLedger.films].map((f) => ({
        ...f,
        date: "[Month Year]",
        stamps: 3,
        story: storyPlaceholder,
    })),
    ...guestLedger.pages.map((p) => ({
        slug: p.slug,
        guest: p.guest,
        country: "[Country]",
        entry: p.entry,
        date: p.date,
        quote: p.text,
        poster: details[p.entry].gallery[0],
        stamps: p.stamps,
        story: storyPlaceholder,
    })),
];

export const guestBySlug = (slug: string) => guestStories.find((g) => g.slug === slug);
export const guestsFor = (e: Entry) => guestStories.filter((g) => g.entry === e.no);

/* ---------- Our Story ---------- */

export const storyPage = {
    kicker: "Our story",
    title: "The elephant makes the first path",
    lede: "Why every Entry in the ledger is a road we have already walked.",
    partnerBio:
        "[Two lines about this partner: where they grew up, the first route they walked, and what they still look for in a place.]",
    scouting: [
        {
            title: "We walk it first",
            text: "One of us travels the route ourselves, on foot where the road gives out, usually across more than one season.",
        },
        {
            title: "We stay with the hosts",
            text: "We sleep in their rooms, eat what they cook, and agree fair terms face to face.",
        },
        {
            title: "We walk it again",
            text: "[Placeholder] A second visit, with a friend or a trusted guest, before anything is promised to anyone.",
        },
        {
            title: "We write the Entry",
            text: "Only then does a route go into the ledger, with a limited number of guests each year.",
        },
    ],
    hostsLede:
        "The weavers, cooks, naturalists and families who welcome you at their own tables. Each one belongs to an Entry.",
};

/* ---------- Guest Ledger page ---------- */

export const guestPage = {
    kicker: "The guest ledger",
    title: "Entries written by guests",
    lede: "Short films and handwritten pages from people who have already walked the routes. Filter by Entry or by where they travelled from.",
};

/* ---------- Entries page ---------- */

export const entriesPage = {
    kicker: "The ledger index",
    title: "Ten Entries, one for every kind of traveller",
    lede: "Most guests are two types at once, so each Entry carries two tags. Choose the ones that sound like you.",
    image: img.desertRoad,
};

/* ---------- Enquire page ---------- */

export const enquirePage = {
    nextSteps: [
        {
            title: "We read your note",
            text: "One of us replies personally, never with a template. [Reply time to be confirmed by the client.]",
        },
        {
            title: "A short call, if you like",
            text: "Twenty minutes on WhatsApp or video, to understand your pace and what you hope to feel.",
        },
        {
            title: "Your first draft route",
            text: "A written route with places, hosts and an honest price, reshaped with you until it is yours.",
        },
    ],
    faq: [
        {
            q: "When is the best season to travel?",
            a: "It depends on the Entry. Most of India is at its best from October to March, while the high Himalaya opens from June to September. Every Entry page lists its season, and we will tell you honestly if your dates suit a different route.",
        },
        {
            q: "Do I need a visa?",
            a: "Most visitors need an Indian e-Visa, applied for online before travel. Once your dates are set we send the current guidance for your passport. [Client to confirm wording.]",
        },
        {
            q: "Is it safe to travel this way?",
            a: "Every route, host and driver is one we know personally, and you have a direct line to one of us throughout the journey. [Client to confirm support details.]",
        },
        {
            q: "How does payment work?",
            a: "[Placeholder: deposit to confirm, when the balance is due, accepted payment methods and cancellation terms.]",
        },
    ],
};
