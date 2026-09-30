interface LoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Custom next/image loader.
 * - Unsplash URLs: ask the Unsplash CDN for the exact width needed.
 * - Anything else (e.g. /images/... in /public): returned as-is.
 *
 * When the client's photography moves to a CMS/CDN (Sanity, Cloudinary,
 * Imgix…), add a branch here and nothing else in the app needs to change.
 */
export default function imageLoader({ src, width, quality }: LoaderProps): string {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  return src;
}
