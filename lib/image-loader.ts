interface LoaderProps {
    src: string;
    width: number;
    quality?: number;
}

export default function imageLoader({ src, width, quality }: LoaderProps): string {
    if (src.startsWith("https://images.unsplash.com/")) {
        const url = new URL(src);
        url.searchParams.set("w", String(width));
        url.searchParams.set("q", String(quality ?? 75));
        url.searchParams.set("auto", "format");
        url.searchParams.set("fit", "crop");
        return url.toString();
    }
    if (src.includes("cdn.sanity.io")) {
        const url = new URL(src);
        url.searchParams.set("w", String(width));
        url.searchParams.set("q", String(quality ?? 75));
        url.searchParams.set("auto", "format");
        url.searchParams.set("fit", "max");
        return url.toString();
    }
    return src;
}
