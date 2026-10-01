import type { Itinerary } from "@/lib/types";
import { media } from "./media";

export const itineraries: Itinerary[] = [
    {
        slug: "the-quiet-season-in-kyoto",
        title: "The Quiet Season in Kyoto",
        hook: "Temple gardens before the gates open, a night in a mountain monastery, and tea with a tenth-generation potter.",
        region: "Asia",
        country: "Japan",
        durationDays: 11,
        style: "Private journey",
        bestTime: "November – early December",
        pace: "Unhurried",
        heroImage: media.kyotoPagoda,
        cardImage: media.kyotoPagoda,
        gallery: [media.kyotoPagoda, media.kyotoStreet, media.japanDetail, media.tokyo],
        narrative: [
            "Late autumn is when Kyoto exhales. The maples turn, the crowds thin, and the city's old rhythms become audible again — a broom on gravel, a temple bell at dusk.",
            "This journey moves between Tokyo's precision and the slower countryside beyond, ending among the cedar forests of Mount Kōya. We have kept the days deliberately light, with early starts traded for private access at the hours when places are at their most still.",
        ],
        highlights: [
            "Private early-morning access to a Zen temple garden",
            "A night in a working monastery on Mount Kōya",
            "Studio visit and tea with a Kiyomizu-ware potter",
            "A ryokan with its own hot-spring bath in Hakone",
        ],
        days: [
            {
                label: "Days 1–2",
                title: "Arrival in Tokyo",
                location: "Tokyo",
                description:
                    "Met on arrival and taken to a quiet hotel above the city. A gentle first day with a guide who knows Tokyo's old merchant quarters and its best counter-seat kitchens.",
                stay: "Boutique hotel, Marunouchi",
            },
            {
                label: "Days 3–4",
                title: "Into the mountains",
                location: "Hakone",
                description:
                    "By train to Hakone, where the pace drops immediately. Walk sections of the old Tōkaidō road, visit the open-air museum, and spend evenings at your ryokan's private bath.",
                stay: "Family-run ryokan",
            },
            {
                label: "Days 5–8",
                title: "Kyoto, slowly",
                location: "Kyoto",
                description:
                    "Four days in a restored machiya townhouse. Private garden access at dawn, a morning in a potter's studio, an evening in Gion with a guide who grew up there, and afternoons left entirely free.",
                stay: "Restored machiya townhouse",
            },
            {
                label: "Days 9–10",
                title: "Mount Kōya",
                location: "Kōyasan",
                description:
                    "Up through cedar forest to the monastery town of Kōyasan. Share vegetarian temple cuisine, join the morning prayers, and walk the lantern-lit cemetery of Okunoin after dark.",
                stay: "Temple lodging (shukubō)",
            },
            {
                label: "Day 11",
                title: "Departure",
                location: "Osaka",
                description: "A private transfer to Kansai International for your flight home.",
            },
        ],
        route: [
            { name: "Tokyo", x: 84, y: 34 },
            { name: "Hakone", x: 70, y: 46 },
            { name: "Kyoto", x: 44, y: 52 },
            { name: "Kōyasan", x: 36, y: 72 },
            { name: "Osaka", x: 22, y: 60 },
        ],
        included: [
            "All accommodation, handpicked",
            "Private guides and drivers throughout",
            "Rail passes and reserved seats",
            "Breakfast daily, selected dinners",
            "24-hour support from your designer",
        ],
        featured: true,
    },
    {
        slug: "lakes-lagoons-and-ligurian-light",
        title: "Lakes, Lagoons & Ligurian Light",
        hook: "From a mountain lake in the Dolomites to Venice by private boat, and on to the cliffside villages of the Ligurian coast.",
        region: "Europe",
        country: "Italy",
        durationDays: 10,
        style: "Small group",
        groupSize: "Up to 10 guests",
        bestTime: "May – June, September",
        pace: "Moderate",
        heroImage: media.dolomiteLake,
        cardImage: media.cinqueTerre,
        gallery: [media.dolomiteLake, media.venice, media.cinqueTerre, media.alpineLake],
        narrative: [
            "Northern Italy is best understood by water — a still alpine lake at dawn, the lagoon that made Venice, the sea that shaped the Ligurian coast.",
            "Travelling with no more than ten guests, we move between three very different landscapes, staying in small, owner-run hotels and eating wherever the locals would choose.",
        ],
        highlights: [
            "A private boat through Venice's quieter lagoon islands",
            "Walking the Dolomites with a mountain guide",
            "Lunch at a family vineyard above Lake Garda",
            "Coast path between villages, with the sea always beside you",
        ],
        days: [
            {
                label: "Days 1–3",
                title: "Venice and the lagoon",
                location: "Venice",
                description:
                    "Arrive into Venice and settle into a small palazzo hotel. A historian walks the group through the city beyond San Marco, and a private boat reaches the lagoon islands most visitors never see.",
                stay: "Palazzo hotel, Dorsoduro",
            },
            {
                label: "Days 4–6",
                title: "The Dolomites",
                location: "Alta Badia",
                description:
                    "North into the mountains. Guided walks sized to the group, long lunches in mountain huts, and a lake at sunrise before anyone else has arrived.",
                stay: "Alpine chalet hotel",
            },
            {
                label: "Day 7",
                title: "Lake Garda",
                location: "Lake Garda",
                description: "A slower day on the lake's western shore, with lunch among the vines at a family estate.",
                stay: "Lakeside villa",
            },
            {
                label: "Days 8–9",
                title: "The Ligurian coast",
                location: "Cinque Terre",
                description:
                    "Walk the coast path between villages, swim from the rocks, and eat the day's catch in a harbour trattoria.",
                stay: "Cliffside guesthouse",
            },
            {
                label: "Day 10",
                title: "Departure",
                location: "Genoa",
                description: "Transfers to Genoa or Milan for onward flights.",
            },
        ],
        route: [
            { name: "Venice", x: 78, y: 42 },
            { name: "Dolomites", x: 66, y: 16 },
            { name: "Lake Garda", x: 46, y: 36 },
            { name: "Cinque Terre", x: 26, y: 74 },
            { name: "Genoa", x: 14, y: 62 },
        ],
        included: [
            "Nine nights in small, owner-run hotels",
            "A dedicated tour leader throughout",
            "Specialist local guides",
            "Private boat day in the Venetian lagoon",
            "Breakfast daily and most dinners",
        ],
        featured: true,
    },
    {
        slug: "palaces-of-the-desert-kings",
        title: "Palaces of the Desert Kings",
        hook: "Rajasthan's forts and lake palaces, reached by quiet back roads — with nights spent in the homes of the families who built them.",
        region: "Asia",
        country: "India",
        durationDays: 13,
        style: "Private journey",
        bestTime: "October – March",
        pace: "Moderate",
        heroImage: media.jaipur,
        cardImage: media.jaipur,
        gallery: [media.jaipur, media.tajMahal, media.valleyLight, media.retreat],
        narrative: [
            "Rajasthan rewards those who take their time. Between the famous cities lie villages, stepwells and heritage homes where the history is still lived in.",
            "This private journey pairs the great sights — seen at their quietest hours — with stays in family-owned havelis and palaces, where your hosts' stories become part of the trip.",
        ],
        highlights: [
            "The Taj Mahal at sunrise with a private guide",
            "Dinner with a Rajput family in their ancestral home",
            "A block-printing workshop in a village near Jaipur",
            "A boat on Lake Pichola as Udaipur lights up",
        ],
        days: [
            {
                label: "Days 1–2",
                title: "Delhi",
                location: "Delhi",
                description: "Arrive into Delhi and explore both the old city and Lutyens' capital with a historian.",
                stay: "Heritage hotel",
            },
            {
                label: "Days 3–4",
                title: "Agra",
                location: "Agra",
                description:
                    "The Taj Mahal at first light, before the crowds, and an afternoon at the lesser-known 'Baby Taj' across the river.",
                stay: "Boutique hotel with Taj views",
            },
            {
                label: "Days 5–7",
                title: "Jaipur and the countryside",
                location: "Jaipur",
                description:
                    "The Pink City's palaces and bazaars, balanced with time in the villages beyond — including a morning with block-printing artisans.",
                stay: "Family-owned haveli",
            },
            {
                label: "Days 8–10",
                title: "Jodhpur",
                location: "Jodhpur",
                description:
                    "Walk the blue city beneath Mehrangarh Fort, and dine with a Rajput family in the house their ancestors built.",
                stay: "Palace hotel",
            },
            {
                label: "Days 11–13",
                title: "Udaipur and home",
                location: "Udaipur",
                description:
                    "The city of lakes, at a gentle pace. A boat at sunset, a final dinner on the water, then a private transfer for your flight.",
                stay: "Lakeside heritage hotel",
            },
        ],
        route: [
            { name: "Delhi", x: 82, y: 18 },
            { name: "Agra", x: 86, y: 44 },
            { name: "Jaipur", x: 62, y: 42 },
            { name: "Jodhpur", x: 30, y: 50 },
            { name: "Udaipur", x: 40, y: 80 },
        ],
        included: [
            "Heritage stays throughout",
            "Private car and driver",
            "Specialist guides in each city",
            "Breakfast daily, selected dinners with hosts",
            "24-hour support from your designer",
        ],
        featured: true,
    },
    {
        slug: "where-the-plains-breathe",
        title: "Where the Plains Breathe",
        hook: "A small-group safari across Laikipia and the Masai Mara, guided by people who grew up on this land.",
        region: "Africa",
        country: "Kenya",
        durationDays: 9,
        style: "Small group",
        groupSize: "Up to 8 guests",
        bestTime: "July – October, January – February",
        pace: "Early starts, long afternoons",
        heroImage: media.safariPlains,
        cardImage: media.savannah,
        gallery: [media.savannah, media.safariPlains, media.safariWildlife, media.nightSky],
        narrative: [
            "Some places ask you to be still. On the plains of East Africa, the best moments come to those who wait — and who have a guide who knows exactly where to wait.",
            "We travel in a group of no more than eight, staying in small, community-owned camps where conservation and hospitality go hand in hand.",
        ],
        highlights: [
            "Game drives with Maasai and Samburu guides",
            "A walking safari on a private conservancy",
            "Camps with no more than ten tents",
            "Supper beneath the stars on the Mara's edge",
        ],
        days: [
            {
                label: "Day 1",
                title: "Nairobi",
                location: "Nairobi",
                description: "Arrive into Nairobi and rest at a garden hotel on the edge of the city.",
                stay: "Garden hotel",
            },
            {
                label: "Days 2–4",
                title: "Laikipia",
                location: "Laikipia Plateau",
                description:
                    "A short flight north to a private conservancy. Walking safaris, game drives and evenings around the fire.",
                stay: "Community-owned camp",
            },
            {
                label: "Days 5–8",
                title: "The Masai Mara",
                location: "Masai Mara",
                description:
                    "South to the Mara conservancies, where vehicle numbers are limited and the wildlife is extraordinary.",
                stay: "Tented camp on the Mara",
            },
            {
                label: "Day 9",
                title: "Departure",
                location: "Nairobi",
                description: "Fly back to Nairobi to connect with your international flight.",
            },
        ],
        route: [
            { name: "Nairobi", x: 70, y: 70 },
            { name: "Laikipia", x: 64, y: 22 },
            { name: "Masai Mara", x: 22, y: 76 },
        ],
        included: [
            "All camps and lodges",
            "Light-aircraft flights within Kenya",
            "Expert guides and shared game drives",
            "All meals on safari",
            "Conservancy fees",
        ],
        featured: true,
    },
    {
        slug: "fire-ice-and-northern-light",
        title: "Fire, Ice & Northern Light",
        hook: "Glacier lagoons, black-sand shores and the aurora overhead — Iceland's south coast, with a private guide.",
        region: "The North",
        country: "Iceland",
        durationDays: 7,
        style: "Private journey",
        bestTime: "September – March",
        pace: "Unhurried",
        heroImage: media.aurora,
        cardImage: media.aurora,
        gallery: [media.aurora, media.icelandCoast, media.icelandLand, media.nightSky],
        narrative: [
            "In Iceland's darker months the light is rationed, and all the more beautiful for it — low sun on the glaciers by day, and the aurora whenever the sky clears.",
            "With a private guide and driver, you follow the south coast at your own pace, staying in small lodges chosen for their dark skies.",
        ],
        highlights: [
            "Aurora-watching from lodges far from any light",
            "Walking on a glacier with a mountain guide",
            "Jökulsárlón's icebergs at first light",
            "Geothermal bathing away from the tour buses",
        ],
        days: [
            {
                label: "Day 1",
                title: "Reykjavík",
                location: "Reykjavík",
                description: "Arrive and settle into a design hotel in the old harbour.",
                stay: "Design hotel",
            },
            {
                label: "Days 2–3",
                title: "Þingvellir and the south",
                location: "South Iceland",
                description:
                    "The rift valley at Þingvellir, geothermal fields and waterfalls, then on to a countryside lodge chosen for its dark skies.",
                stay: "Countryside lodge",
            },
            {
                label: "Days 4–5",
                title: "Glaciers and the lagoon",
                location: "Vatnajökull",
                description:
                    "A guided glacier walk, and the icebergs of Jökulsárlón in the stillness of early morning.",
                stay: "Glacier-view lodge",
            },
            {
                label: "Days 6–7",
                title: "Return to Reykjavík",
                location: "Reykjavík",
                description:
                    "Back along the coast via the black-sand beaches near Vík, with a final evening in the city.",
            },
        ],
        route: [
            { name: "Reykjavík", x: 14, y: 40 },
            { name: "Þingvellir", x: 30, y: 26 },
            { name: "Vík", x: 50, y: 78 },
            { name: "Jökulsárlón", x: 84, y: 56 },
        ],
        included: [
            "Six nights in small lodges",
            "Private guide and 4x4 throughout",
            "Guided glacier walk",
            "Breakfast daily",
            "24-hour support from your designer",
        ],
        featured: false,
    },
];

export function getItinerary(slug: string): Itinerary | undefined {
    return itineraries.find((i) => i.slug === slug);
}

export function getFeaturedItineraries(limit = 4): Itinerary[] {
    return itineraries.filter((i) => i.featured).slice(0, limit);
}

export function getNextItinerary(slug: string): Itinerary {
    const index = itineraries.findIndex((i) => i.slug === slug);
    return itineraries[(index + 1) % itineraries.length];
}
