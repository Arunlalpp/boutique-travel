import { domainOf, generateOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";
import { getDestination, getDestinationSlugs, getItinerariesForDestination, getSiteSettings } from "@/sanity/lib/queries";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Destination overview";

export async function generateStaticParams() {
    return (await getDestinationSlugs()).map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [destination, journeys, settings] = await Promise.all([
        getDestination(slug),
        getItinerariesForDestination(slug),
        getSiteSettings(),
    ]);
    const count = journeys.length;
    return generateOgImage({
        siteName: settings.name,
        eyebrow: destination ? `Destination · ${destination.region}` : "Destination",
        title: destination?.name ?? settings.name,
        subtitle: destination?.shortDescription,
        chips: destination ? [destination.country, count ? `${count} journey${count === 1 ? "" : "s"}` : "Designed to order"] : [],
        image: destination?.seo?.ogImage?.src ?? destination?.heroImage.src,
        domain: domainOf(settings.siteUrl),
    });
}
