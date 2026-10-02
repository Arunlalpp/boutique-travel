import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

interface OgImageProps {
    name: string;
    descriptor: string;
    tagline: string;
}

export async function generateOgImage({ name, descriptor, tagline }: OgImageProps) {
    const fontData = await readFile(
        join(process.cwd(), "node_modules/@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff"),
    );

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0e1117",
                backgroundImage: "radial-gradient(circle at 30% 20%, #2a3550 0%, #151922 55%, #0e1117 100%)",
                color: "#f4efe8",
                fontFamily: "Playfair Display",
            }}
        >
            <div
                style={{
                    fontSize: 26,
                    letterSpacing: 8,
                    textTransform: "uppercase",
                    color: "#f59e3d",
                    fontFamily: "sans-serif",
                }}
            >
                {descriptor}
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", marginTop: 32 }}>
                <span style={{ fontSize: 112 }}>{name}</span>
                <div
                    style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        backgroundColor: "#f59e3d",
                        marginLeft: 16,
                        marginBottom: 20,
                    }}
                />
            </div>
            <div style={{ fontSize: 32, marginTop: 28, color: "rgba(244,239,232,0.72)", maxWidth: 860, textAlign: "center" }}>
                {tagline}
            </div>
        </div>,
        {
            ...ogImageSize,
            fonts: [{ name: "Playfair Display", data: fontData, weight: 700, style: "normal" }],
        },
    );
}
