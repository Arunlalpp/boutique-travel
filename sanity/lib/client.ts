import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    // The Live Content API (see lib/live.ts) keeps results fresh without the
    // CDN's caching delay, so every page fetch goes through useCdn: false.
    useCdn: false,
});
