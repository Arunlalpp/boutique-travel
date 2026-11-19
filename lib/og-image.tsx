import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Social sharing cards (Open Graph / X / WhatsApp / LinkedIn previews) in the
 * Backroad Ledger style: the page's own photo under a navy fade, the
 * wordmark, a typewriter eyebrow in ochre, a Jost uppercase title and up to
 * three fact chips.
 */

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

const colors = {
    night: "#1c2f3d",
    fg: "#ffffff",
    mist: "rgba(255,255,255,0.82)",
    ember: "#d9a55b",
    line: "rgba(255,255,255,0.4)",
};

interface OgImageProps {
    siteName: string;
    eyebrow: string;
    title: string;
    subtitle?: string;
    /** Up to three short facts shown as chips, e.g. "9 days", "Small group". */
    chips?: string[];
    /** An Unsplash (or other JPEG/PNG) URL. Missing or unreachable images fall back to a navy gradient. */
    image?: string;
    /** Shown bottom-right, e.g. "boutique-travel.vercel.app". */
    domain?: string;
}

const font = (pkg: string, file: string) =>
    readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

/** Requests a 1200×630 JPEG crop: the card renderer can't decode WebP or AVIF. */
function ogPhotoUrl(src?: string): string | undefined {
    if (!src || src.startsWith("data:")) return undefined;
    try {
        const url = new URL(src);
        if (url.hostname === "images.unsplash.com") {
            url.searchParams.set("w", "1200");
            url.searchParams.set("h", "630");
            url.searchParams.set("fit", "crop");
            url.searchParams.set("fm", "jpg");
            url.searchParams.set("q", "80");
            url.searchParams.delete("auto");
        }
        return url.toString();
    } catch {
        return undefined;
    }
}

/** Downloads the photo up front so a slow or broken image degrades to the gradient instead of failing the build. */
async function loadPhoto(src?: string): Promise<string | undefined> {
    const url = ogPhotoUrl(src);
    if (!url) return undefined;
    try {
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) return undefined;
        const type = res.headers.get("content-type") ?? "image/jpeg";
        if (!/jpe?g|png/.test(type)) return undefined;
        return `data:${type};base64,${Buffer.from(await res.arrayBuffer()).toString("base64")}`;
    } catch {
        return undefined;
    }
}

function titleSize(title: string): number {
    if (title.length > 48) return 54;
    if (title.length > 30) return 64;
    return 78;
}

export async function generateOgImage({ siteName, eyebrow, title, subtitle, chips = [], image, domain }: OgImageProps) {
    // The latin-ext files carry the rupee sign (₹) and accented place names.
    const [jost600, jost600Ext, jost500, typeItalic, typeItalicExt, type400, photo] = await Promise.all([
        font("jost", "jost-latin-600-normal.woff"),
        font("jost", "jost-latin-ext-600-normal.woff"),
        font("jost", "jost-latin-500-normal.woff"),
        font("courier-prime", "courier-prime-latin-400-italic.woff"),
        font("courier-prime", "courier-prime-latin-ext-400-italic.woff"),
        font("courier-prime", "courier-prime-latin-400-normal.woff"),
        loadPhoto(image),
    ]);

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                position: "relative",
                backgroundColor: colors.night,
                backgroundImage: "radial-gradient(circle at 75% 15%, #2b465a 0%, #1c2f3d 50%, #0b1114 100%)",
                color: colors.fg,
                fontFamily: "Jost, Jost Ext",
            }}
        >
            {photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={photo}
                    alt=""
                    width={1200}
                    height={630}
                    style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }}
                />
            )}
            {/* The card renderer ignores the `inset` shorthand, so every layer spells out its box. */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 1200,
                    height: 630,
                    display: "flex",
                    backgroundImage: photo
                        ? "linear-gradient(90deg, rgba(28,47,61,0.96) 0%, rgba(28,47,61,0.88) 42%, rgba(28,47,61,0.35) 75%, rgba(28,47,61,0.1) 100%)"
                        : "radial-gradient(circle at 15% 110%, rgba(217,165,91,0.22), transparent 55%)",
                }}
            />
            {photo && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 1200,
                        height: 630,
                        display: "flex",
                        backgroundImage: "linear-gradient(180deg, rgba(28,47,61,0) 55%, rgba(28,47,61,0.75) 100%)",
                    }}
                />
            )}

            <div
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "56px 64px",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 34, height: 2, backgroundColor: colors.ember }} />
                    <span style={{ fontSize: 26, fontWeight: 600, letterSpacing: 6, textTransform: "uppercase" }}>
                        {siteName}
                    </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", maxWidth: 780 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            color: colors.ember,
                            fontFamily: "Courier Prime",
                            fontSize: 20,
                            letterSpacing: 6,
                            textTransform: "uppercase",
                        }}
                    >
                        {eyebrow}
                    </div>
                    <div
                        style={{
                            marginTop: 22,
                            fontSize: titleSize(title),
                            fontWeight: 600,
                            lineHeight: 0.98,
                            textTransform: "uppercase",
                        }}
                    >
                        {title}
                    </div>
                    {subtitle && (
                        <div
                            style={{
                                marginTop: 22,
                                fontFamily: "Courier Prime Italic, Courier Prime Italic Ext",
                                fontStyle: "italic",
                                fontSize: 25,
                                lineHeight: 1.45,
                                color: colors.mist,
                                maxWidth: 720,
                            }}
                        >
                            {subtitle.length > 120 ? `${subtitle.slice(0, 117).trimEnd()}…` : subtitle}
                        </div>
                    )}
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", gap: 12 }}>
                        {chips.slice(0, 3).map((c) => (
                            <div
                                key={c}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: 44,
                                    padding: "0 20px",
                                    borderRadius: 999,
                                    border: `1px solid ${colors.line}`,
                                    fontSize: 17,
                                    fontWeight: 500,
                                    letterSpacing: 2,
                                    textTransform: "uppercase",
                                }}
                            >
                                {c}
                            </div>
                        ))}
                    </div>
                    {domain && (
                        <div style={{ display: "flex", fontFamily: "Courier Prime", fontSize: 20, color: colors.mist }}>
                            {domain}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        {
            ...ogImageSize,
            fonts: [
                { name: "Jost", data: jost600, weight: 600, style: "normal" },
                { name: "Jost Ext", data: jost600Ext, weight: 600, style: "normal" },
                { name: "Jost", data: jost500, weight: 500, style: "normal" },
                { name: "Courier Prime Italic", data: typeItalic, weight: 400, style: "italic" },
                { name: "Courier Prime Italic Ext", data: typeItalicExt, weight: 400, style: "italic" },
                { name: "Courier Prime", data: type400, weight: 400, style: "normal" },
            ],
        },
    );
}

/** The bare host of the site, for the bottom-right of each card. */
export function domainOf(siteUrl: string): string {
    try {
        return new URL(siteUrl).host;
    } catch {
        return "";
    }
}
