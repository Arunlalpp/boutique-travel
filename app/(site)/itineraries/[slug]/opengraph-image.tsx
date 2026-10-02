import { domainOf, generateOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";
import { getItinerary, getItinerarySlugs, getSiteSettings } from "@/sanity/lib/queries";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Journey overview";

export async function generateStaticParams() {
    return (await getItinerarySlugs()).map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [journey, settings] = await Promise.all([getItinerary(slug), getSiteSettings()]);
    return generateOgImage({
        siteName: settings.name,
        eyebrow: journey ? `Journey · ${journey.country}` : "Journey",
        title: journey?.title ?? settings.name,
        subtitle: journey?.hook,
        chips: journey ? [journey.duration, journey.style, journey.startingPrice && `From ${journey.startingPrice}`].filter((c): c is string => !!c) : [],
        image: journey?.seo?.ogImage?.src ?? journey?.heroImage.src,
        domain: domainOf(settings.siteUrl),
    });
}
