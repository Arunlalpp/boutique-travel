import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        loader: "custom",
        loaderFile: "./lib/image-loader.ts",
        qualities: [65, 70, 75, 80, 85],
    },
};

export default nextConfig;
