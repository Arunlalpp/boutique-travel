import type { MetadataRoute } from "next";
import { entries, entryHref, guestHref } from "@/lib/data/ledger";
import { entryDetail, guestStories } from "@/lib/data/ledger-pages";
import { site } from "@/lib/site";

/** Content is in code, so "last modified" is the build that published it. */
const built = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
    const url = (path: string) => `${site.siteUrl}${path === "/" ? "" : path}`;
    const page = (
        path: string,
        priority: number,
        changeFrequency: "weekly" | "monthly",
        images: string[] = [],
    ): MetadataRoute.Sitemap[number] => ({
        url: url(path),
        lastModified: built,
        changeFrequency,
        priority,
        ...(images.length ? { images } : {}),
    });

    return [
        page("/", 1, "weekly"),
        page(
            "/entries",
            0.9,
            "weekly",
            entries.map((e) => e.image.src),
        ),
        page("/story", 0.7, "monthly"),
        page("/guest-ledger", 0.7, "weekly"),
        page("/enquire", 0.8, "monthly"),
        ...entries.map((e) =>
            page(entryHref(e), 0.8, "monthly", [e.image.src, ...entryDetail(e).gallery.map((g) => g.src)]),
        ),
        ...guestStories.map((g) => page(guestHref(g), 0.5, "monthly", [g.poster.src])),
    ];
}
