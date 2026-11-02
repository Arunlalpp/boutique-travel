import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/analytics/Analytics";
import { SiteProviders } from "@/components/providers/SiteProviders";
import { Cursor } from "@/components/ui/Cursor";
import { SanityLive } from "@/sanity/lib/live";
import { JsonLd } from "@/components/seo/JsonLd";
import { organization, website } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    return {
        metadataBase: new URL(settings.siteUrl),
        title: {
            default: settings.defaultSeoTitle || `${settings.name} — ${settings.descriptor}`,
            template: `%s — ${settings.name}`,
        },
        description: settings.defaultSeoDescription,
        alternates: { canonical: "/" },
        openGraph: {
            title: settings.name,
            description: settings.defaultSeoDescription,
            type: "website",
            url: "/",
            siteName: settings.name,
            locale: "en_IN",
        },
        twitter: {
            card: "summary_large_image",
            title: settings.name,
            description: settings.defaultSeoDescription,
        },
        robots: settings.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
    };
}

export const viewport: Viewport = {
    themeColor: "#0e1117",
    viewportFit: "cover",
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
    const settings = await getSiteSettings();

    return (
        <SiteProviders>
            <a
                href="#main"
                className="sr-only z-70 rounded-full bg-fg px-4 py-3 text-night focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
            >
                Skip to content
            </a>
            <JsonLd data={[organization(settings), website(settings)]} />
            <Header siteName={settings.name} />
            <main id="main">{children}</main>
            <Footer settings={settings} />
            <Cursor />
            <Analytics />
            <SanityLive />
        </SiteProviders>
    );
}
