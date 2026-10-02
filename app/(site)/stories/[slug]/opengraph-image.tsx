import { domainOf, generateOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";
import { getSiteSettings, getStory, getStorySlugs } from "@/sanity/lib/queries";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Guest story";

export async function generateStaticParams() {
    return (await getStorySlugs()).map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [story, settings] = await Promise.all([getStory(slug), getSiteSettings()]);
    const quote = story ? `“${story.quote}”` : settings.name;
    return generateOgImage({
        siteName: settings.name,
        eyebrow: "Guest story",
        title: quote.length > 90 ? `${quote.slice(0, 86).trimEnd()}…”` : quote,
        subtitle: story ? `${story.guestName}${story.journeyTitle ? ` · ${story.journeyTitle}` : ""}` : undefined,
        chips: story ? [story.travelled].filter(Boolean) : [],
        image: story?.seo?.ogImage?.src ?? story?.poster.src,
        domain: domainOf(settings.siteUrl),
    });
}
