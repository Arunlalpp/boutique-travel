import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/sanity/lib/queries";

export default async function robots(): Promise<MetadataRoute.Robots> {
    const settings = await getSiteSettings();
    return {
        rules: settings.allowIndexing ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
        sitemap: `${settings.siteUrl}/sitemap.xml`,
    };
}
