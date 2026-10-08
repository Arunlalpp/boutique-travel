import { media } from "./media";

/** About-page copy from the approved design. Sanity doesn't manage these sections. */

export const story = {
    eyebrow: "Who we are",
    statement:
        "A small team with a very big backyard. Forty guides, naturalists and hosts, still obsessed with helping you feel at home in the wild.",
    paragraphs: [
        "Boutique Travel began as weekend camps for friends in the Western Ghats. Every itinerary is still scouted on foot, every campsite is run with local communities, and part of every booking funds forest restoration.",
    ],
    founders: { names: "Anjali & Arjun Nair", role: "Co-founders" },
};

export const timeline = [
    { year: "2014", title: "Weekend camps", text: "Six friends, two tents and a borrowed jeep in the Western Ghats." },
    { year: "2016", title: "First guides hired", text: "Local trekkers from Munnar join as our first full-time guides." },
    { year: "2018", title: "Eco certification", text: "Zero single-use plastic across every camp we run." },
    { year: "2020", title: "Restoration fund", text: "5% of revenue goes to native forest replanting." },
    { year: "2023", title: "Himalayan circuits", text: "Spiti and Kedarkantha join with certified high-altitude leaders." },
    { year: "2026", title: "12,000 campers", text: "32 destinations and still never more than eight per group." },
];

export const values = [
    { icon: "leaf", title: "Leave no trace", text: "Zero single-use plastic at every camp, and 5% of revenue to reforestation." },
    { icon: "shield", title: "Safety first", text: "Wilderness first-aid certified guides and satellite comms on every trek." },
    { icon: "heart", title: "Local at heart", text: "We hire, cook and stay local. 80% of trip spend stays in host villages." },
    { icon: "compass", title: "Slow travel", text: "Fewer places, deeper stays. Groups are never larger than eight." },
] as const;

export const guides = [
    {
        name: "Kiran Das",
        role: "Lead trek guide",
        bio: "14 years on Western Ghats trails. Knows every waterfall by its sound.",
        image: media.walkers,
    },
    {
        name: "Meera Pillai",
        role: "Wildlife naturalist",
        bio: "Former forest department researcher. 300+ bird calls memorised.",
        image: media.safariPlains,
    },
    {
        name: "Tenzin Norbu",
        role: "Himalaya expeditions",
        bio: "Born in Kaza. Has led 120 high-altitude crossings without a single evacuation.",
        image: media.summit,
    },
    {
        name: "Farah Khan",
        role: "Camp host & chef",
        bio: "Turns a campfire into a kitchen. Famous for her Rajasthani laal maas.",
        image: media.jaipur,
    },
    {
        name: "Joseph Mathew",
        role: "Kayak instructor",
        bio: "Certified paddler who grew up on the Alleppey backwaters.",
        image: media.dolomiteLake,
    },
];
