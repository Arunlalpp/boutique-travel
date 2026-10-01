import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/motion/Preloader";
import { Analytics } from "@/components/analytics/Analytics";
import { SanityLive } from "@/sanity/lib/live";
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
    themeColor: "#eef1ec",
};

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
    const settings = await getSiteSettings();

    return (
        <>
            <Preloader siteName={settings.name} />
            <a
                href="#main"
                className="sr-only z-[60] bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
            >
                Skip to content
            </a>
            <Header siteName={settings.name} email={settings.email} phone={settings.phone} />
            <main id="main">{children}</main>
            <Footer settings={settings} />
            <Analytics />
            <SanityLive />
        </>
    );
}
