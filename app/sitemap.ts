import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { itineraries } from "@/lib/data/itineraries";
import { stories } from "@/lib/data/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.siteUrl;
  const staticRoutes = ["/", "/about", "/itineraries", "/stories", "/enquire"].map((path) => ({
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

  return [...staticRoutes, ...itineraryRoutes, ...storyRoutes];
}
