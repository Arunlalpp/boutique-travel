import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Social sharing cards (Open Graph / X / WhatsApp / LinkedIn previews) in the
 * site's "night camp" style: the page's own photo, a dark fade for legibility,
 * the logo, an ember eyebrow, the title and up to three fact chips.
 */

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

const colors = {
    night: "#0e1117",
    fg: "#f4efe8",
    mist: "rgba(244,239,232,0.78)",
    ember: "#f59e3d",
    line: "rgba(255,255,255,0.28)",
};

interface OgImageProps {
    siteName: string;
    eyebrow: string;
    title: string;
    subtitle?: string;
    /** Up to three short facts shown as chips, e.g. "9 days", "Small group". */
    chips?: string[];
    /** A Sanity or Unsplash image URL. Missing or unreachable images fall back to a night gradient. */
    image?: string;
    /** Shown bottom-right, e.g. "boutique-travel.vercel.app". */
    domain?: string;
}

const font = (pkg: string, file: string) => readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

/** Requests a 1200×630 JPEG crop: the card renderer can't decode WebP or AVIF. */
function ogPhotoUrl(src?: string): string | undefined {
    if (!src || src.startsWith("data:")) return undefined;
    try {
        const url = new URL(src);
        if (url.hostname === "images.unsplash.com" || url.hostname === "cdn.sanity.io") {
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
    if (title.length > 48) return 58;
    if (title.length > 32) return 68;
    return 80;
}

export async function generateOgImage({ siteName, eyebrow, title, subtitle, chips = [], image, domain }: OgImageProps) {
    // The latin-ext files carry the rupee sign (₹) and other currency symbols.
    const [display, displayExt, displayItalic, sans600, sans600Ext, sans700, sans700Ext, photo] = await Promise.all([
        font("fraunces", "fraunces-latin-400-normal.woff"),
        font("fraunces", "fraunces-latin-ext-400-normal.woff"),
        font("fraunces", "fraunces-latin-400-italic.woff"),
        font("plus-jakarta-sans", "plus-jakarta-sans-latin-600-normal.woff"),
        font("plus-jakarta-sans", "plus-jakarta-sans-latin-ext-600-normal.woff"),
        font("plus-jakarta-sans", "plus-jakarta-sans-latin-700-normal.woff"),
        font("plus-jakarta-sans", "plus-jakarta-sans-latin-ext-700-normal.woff"),
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
                backgroundImage: "radial-gradient(circle at 75% 15%, #2a3550 0%, #151922 45%, #0e1117 100%)",
                color: colors.fg,
                fontFamily: "Jakarta, Jakarta Ext",
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
                        ? "linear-gradient(90deg, rgba(14,17,23,0.96) 0%, rgba(14,17,23,0.88) 42%, rgba(14,17,23,0.35) 75%, rgba(14,17,23,0.1) 100%)"
                        : "radial-gradient(circle at 15% 110%, rgba(245,158,61,0.22), transparent 55%)",
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
                        backgroundImage: "linear-gradient(180deg, rgba(14,17,23,0) 55%, rgba(14,17,23,0.75) 100%)",
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
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <svg width="44" height="44" viewBox="0 0 28 28" fill="none">
                        <circle cx="14" cy="14" r="13" stroke={colors.ember} strokeWidth="1.5" />
                        <path d="M6 19l5-7 3 4 2-3 6 6H6z" fill={colors.ember} />
                        <circle cx="19" cy="8.5" r="1.6" fill={colors.fg} />
                    </svg>
                    <span style={{ fontFamily: "Fraunces, Fraunces Ext", fontSize: 30 }}>{siteName}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", maxWidth: 780 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            color: colors.ember,
                            fontSize: 20,
                            fontWeight: 700,
                            letterSpacing: 4,
                            textTransform: "uppercase",
                        }}
                    >
                        <div style={{ width: 36, height: 2, backgroundColor: colors.ember }} />
                        {eyebrow}
                    </div>
                    <div
                        style={{
                            marginTop: 22,
                            fontFamily: "Fraunces, Fraunces Ext",
                            fontSize: titleSize(title),
                            lineHeight: 1.05,
                            letterSpacing: -1,
                        }}
                    >
                        {title}
                    </div>
                    {subtitle && (
                        <div
                            style={{
                                marginTop: 22,
                                fontSize: 26,
                                lineHeight: 1.4,
                                color: colors.mist,
                                fontWeight: 600,
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
                                    backgroundColor: "rgba(255,255,255,0.1)",
                                    fontSize: 20,
                                    fontWeight: 600,
                                }}
                            >
                                {c}
                            </div>
                        ))}
                    </div>
                    {domain && (
                        <div style={{ display: "flex", fontFamily: "Fraunces, Fraunces Ext", fontStyle: "italic", fontSize: 24, color: colors.mist }}>
                            {domain}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        {
            ...ogImageSize,
            fonts: [
                { name: "Fraunces", data: display, weight: 400, style: "normal" },
                { name: "Fraunces Ext", data: displayExt, weight: 400, style: "normal" },
                { name: "Fraunces", data: displayItalic, weight: 400, style: "italic" },
                { name: "Jakarta", data: sans600, weight: 600, style: "normal" },
                { name: "Jakarta Ext", data: sans600Ext, weight: 600, style: "normal" },
                { name: "Jakarta", data: sans700, weight: 700, style: "normal" },
                { name: "Jakarta Ext", data: sans700Ext, weight: 700, style: "normal" },
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
