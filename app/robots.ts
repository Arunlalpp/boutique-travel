import type { MetadataRoute } from "next";
import { site, ALLOW_INDEXING } from "@/lib/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ALLOW_INDEXING ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${site.siteUrl}/sitemap.xml`,
  };
}
