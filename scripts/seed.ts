/**
 * One-off demo-data seed. Pushes the site's original hardcoded itineraries
 * and guest stories into Sanity as real documents (including uploading
 * their Unsplash placeholder photos into Sanity's asset store), plus a
 * starter Site Settings document.
 *
 * Usage: npm run seed
 * Safe to re-run — every document uses a deterministic `_id`, so re-running
 * updates the same documents instead of duplicating them.
 */
import { createClient, type SanityClient } from "next-sanity";
import { itineraries } from "../lib/data/itineraries";
import { stories } from "../lib/data/stories";
import type { ImageAsset } from "../lib/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
    console.error(
        "Missing env vars. Make sure NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN are set in .env.local.",
    );
    process.exit(1);
}

const client: SanityClient = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const slugify = (value: string) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

const imageAssetCache = new Map<string, { _type: "image"; asset: { _type: "reference"; _ref: string } }>();

async function uploadImage(image: ImageAsset) {
    const cached = imageAssetCache.get(image.src);
    if (cached) return { ...cached, alt: image.alt };

    const res = await fetch(image.src);
    if (!res.ok) throw new Error(`Failed to fetch ${image.src}: ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const filename = `${slugify(image.alt).slice(0, 60) || "image"}.jpg`;

    const asset = await client.assets.upload("image", buffer, { filename });
    const value = { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
    imageAssetCache.set(image.src, value);
    console.log(`  uploaded ${filename}`);
    return { ...value, alt: image.alt };
}

function portableText(paragraphs: string[]) {
    return paragraphs.map((text) => ({
        _type: "block",
        _key: crypto.randomUUID(),
        style: "normal",
        markDefs: [],
        children: [{ _type: "span", _key: crypto.randomUUID(), text, marks: [] }],
    }));
}

const DESTINATIONS: Record<
    string,
    { region: string; shortDescription: string; description: string; image: ImageAsset }
> = {
    Japan: {
        region: "Asia",
        shortDescription: "Temple gardens before the gates open, and a tea ceremony that still matters.",
        description:
            "From Tokyo's precision to the slower rhythms of Kyoto and the cedar forests of Mount Kōya, Japan rewards a quiet pace and an early start. We work with artisans, innkeepers and monasteries we've known for years.",
        image: itineraries.find((i) => i.country === "Japan")!.heroImage,
    },
    Italy: {
        region: "Europe",
        shortDescription: "A mountain lake, a lagoon city, and a coastline shaped by the sea.",
        description:
            "Northern Italy is best understood by water — an alpine lake at dawn, the lagoon that made Venice, the Ligurian coast's cliffside villages. We stay in small, owner-run hotels throughout.",
        image: itineraries.find((i) => i.country === "Italy")!.heroImage,
    },
    India: {
        region: "Asia",
        shortDescription: "Forts and lake palaces, reached by quiet back roads.",
        description:
            "Rajasthan rewards those who take their time. Between the famous cities lie villages, stepwells and heritage homes where the history is still lived in — and where your hosts' stories become part of the trip.",
        image: itineraries.find((i) => i.country === "India")!.heroImage,
    },
    Kenya: {
        region: "Africa",
        shortDescription: "Plains, wildlife and guides who grew up on this land.",
        description:
            "Across Laikipia and the Masai Mara, we travel in small groups and stay in community-owned camps where conservation and hospitality go hand in hand.",
        image: itineraries.find((i) => i.country === "Kenya")!.heroImage,
    },
    Iceland: {
        region: "The North",
        shortDescription: "Glacier lagoons, black-sand shores and the aurora overhead.",
        description:
            "In Iceland's darker months the light is rationed, and all the more beautiful for it. We follow the south coast at your own pace, staying in small lodges chosen for their dark skies.",
        image: itineraries.find((i) => i.country === "Iceland")!.heroImage,
    },
};

async function seedDestinations() {
    console.log("Seeding destinations...");
    const ids: Record<string, string> = {};

    for (const [country, d] of Object.entries(DESTINATIONS)) {
        const slug = slugify(country);
        const id = `destination-${slug}`;
        ids[country] = id;
        const heroImage = await uploadImage(d.image);

        await client.createOrReplace({
            _id: id,
            _type: "destination",
            name: country,
            slug: { _type: "slug", current: slug },
            country,
            region: d.region,
            shortDescription: d.shortDescription,
            description: d.description,
            heroImage,
            gallery: [],
            featured: true,
        });
        console.log(`  ${country}`);
    }

    return ids;
}

async function seedItineraries(destinationIds: Record<string, string>) {
    console.log("Seeding itineraries...");
    const ids: Record<string, string> = {};

    for (const itinerary of itineraries) {
        const id = `itinerary-${itinerary.slug}`;
        ids[itinerary.slug] = id;

        const [heroImage, cardImage, gallery] = await Promise.all([
            uploadImage(itinerary.heroImage),
            uploadImage(itinerary.cardImage),
            Promise.all(itinerary.gallery.map(uploadImage)),
        ]);

        const itineraryDays = await Promise.all(
            itinerary.days.map(async (day, index) => ({
                _key: crypto.randomUUID(),
                dayNumber: Number(day.label.match(/\d+/)?.[0] ?? index + 1),
                dayLabel: day.label,
                title: day.title,
                location: day.location,
                description: day.description,
                accommodation: day.stay,
            })),
        );

        await client.createOrReplace({
            _id: id,
            _type: "itinerary",
            title: itinerary.title,
            slug: { _type: "slug", current: itinerary.slug },
            shortDescription: itinerary.hook,
            destination: { _type: "reference", _ref: destinationIds[itinerary.country] },
            style: itinerary.style,
            groupSize: itinerary.groupSize,
            pace: itinerary.pace,
            duration: `${itinerary.durationDays} days`,
            bestTime: itinerary.bestTime,
            heroImage,
            cardImage: itinerary.cardImage.src === itinerary.heroImage.src ? undefined : cardImage,
            gallery,
            overview: portableText(itinerary.narrative),
            highlights: itinerary.highlights,
            included: itinerary.included,
            itineraryDays,
            route: itinerary.route.map((p) => ({ _key: crypto.randomUUID(), name: p.name, x: p.x, y: p.y })),
            featured: itinerary.featured,
            publishedAt: new Date().toISOString(),
        });
        console.log(`  ${itinerary.title}`);
    }

    return ids;
}

async function seedStories(itineraryIds: Record<string, string>) {
    console.log("Seeding guest stories...");

    for (const story of stories) {
        const id = `guestStory-${story.slug}`;
        const [profileImage, posterImage] = await Promise.all([
            uploadImage(story.portrait),
            uploadImage(story.poster),
        ]);

        await client.createOrReplace({
            _id: id,
            _type: "guestStory",
            guestName: story.guestName,
            guestLocation: story.homeTown,
            title: `${story.guestName} — ${story.excerpt}`,
            slug: { _type: "slug", current: story.slug },
            quote: story.quote,
            excerpt: story.excerpt,
            story: story.body.join("\n\n"),
            travelled: story.travelled,
            journey: itineraryIds[story.journeySlug]
                ? { _type: "reference", _ref: itineraryIds[story.journeySlug] }
                : undefined,
            profileImage,
            posterImage,
            gallery: [],
            featured: story.featured,
            publishedAt: new Date().toISOString(),
        });
        console.log(`  ${story.guestName}`);
    }
}

async function seedSiteSettings() {
    console.log("Seeding site settings...");
    await client.createOrReplace({
        _id: "siteSettings",
        _type: "siteSettings",
        companyName: "Boutique Travel",
        descriptor: "Private & small-group journeys",
        tagline: "Journeys composed slowly, for the few.",
        email: "journeys@example.com",
        phone: "+44 (0)20 0000 0000",
        address: "London · by appointment",
        hours: "Mon–Fri, 9am–6pm",
        socials: [
            { _key: crypto.randomUUID(), label: "Instagram", url: "https://instagram.com" },
            { _key: crypto.randomUUID(), label: "Vimeo", url: "https://vimeo.com" },
            { _key: crypto.randomUUID(), label: "LinkedIn", url: "https://linkedin.com" },
        ],
        siteUrl: "https://boutique-travel.vercel.app",
        allowIndexing: false,
        defaultSeoTitle: "Boutique Travel — Private & small-group journeys",
        defaultSeoDescription:
            "Curated, personal travel — private and small-group journeys shaped around the way you like to see the world.",
        footerText:
            "Curated, personal travel — private and small-group journeys shaped around the way you like to see the world.",
        copyrightText: "Design preview — placeholder brand, copy and photography.",
    });
}

async function main() {
    const destinationIds = await seedDestinations();
    const itineraryIds = await seedItineraries(destinationIds);
    await seedStories(itineraryIds);
    await seedSiteSettings();
    console.log("\nDone. Open /studio to see the seeded content.");
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
