import type { NextConfig } from "next";

/** Old URLs from the first version of the site, sent to their Backroad Ledger equivalents. */
const moved: [string, string][] = [
    ["/itineraries", "/entries"],
    ["/itineraries/:slug*", "/entries"],
    ["/destinations", "/entries"],
    ["/destinations/:slug*", "/entries"],
    ["/packages", "/entries"],
    ["/map", "/entries"],
    ["/stories", "/guest-ledger"],
    ["/stories/:slug*", "/guest-ledger"],
    ["/about", "/story"],
    ["/contact", "/enquire"],
    ["/enquire/thank-you", "/enquire"],
    ["/studio", "/"],
    ["/studio/:path*", "/"],
];

const securityHeaders = [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
];

const nextConfig: NextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    images: {
        loader: "custom",
        loaderFile: "./lib/image-loader.ts",
        qualities: [65, 70, 75, 80, 85],
    },
    async redirects() {
        return moved.map(([source, destination]) => ({ source, destination, permanent: true }));
    },
    async headers() {
        return [
            { source: "/:path*", headers: securityHeaders },
            {
                // Fonts bundled by Next are content-hashed, so they can be cached for a year.
                source: "/_next/static/media/:file*",
                headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
            },
        ];
    },
};

export default nextConfig;
