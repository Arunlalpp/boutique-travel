import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/data/site";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export async function generateOgImage() {
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
                backgroundColor: "#0d1a17",
                backgroundImage: "linear-gradient(135deg, #0d1a17 0%, #16241f 55%, #12191a 100%)",
                color: "#eef1ec",
                fontFamily: "Playfair Display",
            }}
        >
            <div
                style={{
                    fontSize: 26,
                    letterSpacing: 8,
                    textTransform: "uppercase",
                    color: "#c99169",
                    fontFamily: "sans-serif",
                }}
            >
                {site.descriptor}
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", marginTop: 32 }}>
                <span style={{ fontSize: 112 }}>{site.name}</span>
                <div
                    style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        backgroundColor: "#a05f38",
                        marginLeft: 16,
                        marginBottom: 20,
                    }}
                />
            </div>
            <div style={{ fontSize: 32, marginTop: 28, color: "#c9d0c5", maxWidth: 860, textAlign: "center" }}>
                {site.tagline}
            </div>
        </div>,
        {
            ...ogImageSize,
            fonts: [{ name: "Playfair Display", data: fontData, weight: 700, style: "normal" }],
        },
    );
}
