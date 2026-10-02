import type { MetadataRoute } from "next";
import { getSiteSettings, getAllItineraries, getAllStories, getAllDestinations } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [settings, itineraries, stories, destinations] = await Promise.all([
        getSiteSettings(),
        getAllItineraries(),
        getAllStories(),
        getAllDestinations(),
    ]);
    const base = settings.siteUrl;

    const staticRoutes = ["/", "/about", "/itineraries", "/stories", "/destinations", "/packages", "/enquire"].map((path) => ({
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

    return [...staticRoutes, ...itineraryRoutes, ...storyRoutes, ...destinationRoutes];
}
