import type { NextConfig } from "next";

/**
 * Images are served through a custom loader (lib/image-loader.ts).
 * Placeholder photography comes from the Unsplash CDN, which resizes on the
 * fly, so the browser requests the right width directly. Local files in
 * /public (the client's own photography, once supplied) pass straight through.
 */
const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
};

export default nextConfig;
