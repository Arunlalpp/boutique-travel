import type { VideoEmbed } from "@/lib/types";

/** Converts a pasted YouTube/Vimeo URL into the `{provider, id}` shape `VideoPlayer` expects. */
export function parseVideoUrl(url: string | null | undefined): VideoEmbed | undefined {
    if (!url) return undefined;

    try {
        const parsed = new URL(url);
        const host = parsed.hostname.replace(/^www\./, "");

        if (host === "youtu.be") {
            const id = parsed.pathname.slice(1);
            return id ? { provider: "youtube", id } : undefined;
        }
        if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
            const id = parsed.searchParams.get("v") ?? parsed.pathname.split("/").pop();
            return id ? { provider: "youtube", id } : undefined;
        }
        if (host === "vimeo.com" || host === "player.vimeo.com") {
            const id = parsed.pathname.split("/").filter(Boolean).pop();
            return id ? { provider: "vimeo", id } : undefined;
        }
    } catch {
        return undefined;
    }

    return undefined;
}
