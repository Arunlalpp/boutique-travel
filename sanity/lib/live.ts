import { defineLive } from "next-sanity/live";
import { client } from "./client";

// Draft-mode preview (serverToken/browserToken) isn't wired up in this pass —
// see README "Caching & live updates". Published-content live updates still work.
export const { sanityFetch, SanityLive } = defineLive({ client, serverToken: false, browserToken: false });
