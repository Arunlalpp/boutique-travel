import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: site.allowIndexing
            ? { userAgent: "*", allow: "/", disallow: ["/api/"] }
            : { userAgent: "*", disallow: "/" },
        sitemap: `${site.siteUrl}/sitemap.xml`,
    };
}
