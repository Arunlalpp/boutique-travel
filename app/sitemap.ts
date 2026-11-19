import type { MetadataRoute } from "next";
import { entries, entryHref, guestHref } from "@/lib/data/ledger";
import { guestStories } from "@/lib/data/ledger-pages";
import { getSiteSettings, getAllItineraries, getAllStories, getAllDestinations } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [settings, itineraries, stories, destinations] = await Promise.all([
        getSiteSettings(),
        getAllItineraries(),
        getAllStories(),
        getAllDestinations(),
    ]);
    const base = settings.siteUrl;

    const staticRoutes = [
        "/",
        "/entries",
        "/story",
        "/guest-ledger",
        "/enquire",
        "/about",
        "/itineraries",
        "/stories",
        "/destinations",
        "/packages",
    ].map((path) => ({
        url: `${base}${path}`,
        lastModified: new Date(),
    }));

    const itineraryRoutes = itineraries.map((i) => ({
        url: `${base}/itineraries/${i.slug}`,
        lastModified: new Date(),
    }));

    const storyRoutes = stories.map((s) => ({
        url: `${base}/stories/${s.slug}`,
        lastModified: new Date(),
    }));

    const destinationRoutes = destinations.map((d) => ({
        url: `${base}/destinations/${d.slug}`,
        lastModified: new Date(),
    }));

    const ledgerRoutes = [...entries.map(entryHref), ...guestStories.map(guestHref)].map((path) => ({
        url: `${base}${path}`,
        lastModified: new Date(),
    }));

    return [...staticRoutes, ...ledgerRoutes, ...itineraryRoutes, ...storyRoutes, ...destinationRoutes];
}
