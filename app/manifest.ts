import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/sanity/lib/queries";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
    const settings = await getSiteSettings();
    return {
        name: settings.name,
        short_name: settings.name,
        description: settings.defaultSeoDescription || settings.tagline,
        start_url: "/",
        display: "standalone",
        background_color: "#0e1117",
        theme_color: "#0e1117",
        icons: [
            { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
            { src: "/apple-icon", sizes: "180x180", type: "image/png" },
        ],
    };
}
