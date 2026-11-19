import { domainOf, generateOgImage, ogImageContentType, ogImageSize } from "@/lib/og-image";
import { entries } from "@/lib/data/ledger";
import { entryBySlug } from "@/lib/data/ledger-pages";
import { getSiteSettings } from "@/sanity/lib/queries";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "A Backroad Ledger Entry";

export function generateStaticParams() {
    return entries.map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const settings = await getSiteSettings();
    const entry = entryBySlug((await params).slug) ?? entries[0];
    return generateOgImage({
        siteName: settings.name,
        eyebrow: `Entry no. ${entry.no}`,
        title: entry.name,
        subtitle: entry.line,
        chips: [entry.route, entry.nights],
        image: entry.image.src,
        domain: domainOf(settings.siteUrl),
    });
}
