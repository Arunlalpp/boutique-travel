import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

/**
 * Server-only client for writes (the enquiry route handler, the seed
 * script). Never import this from a "use client" component — the
 * `server-only` import above makes that a build-time error.
 */
export const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
});
