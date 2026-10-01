import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/motion/Preloader";
import { Analytics } from "@/components/analytics/Analytics";
import { site, ALLOW_INDEXING } from "@/lib/data/site";

export const metadata: Metadata = {
    metadataBase: new URL(site.siteUrl),
    title: {
        default: `${site.name} — ${site.descriptor}`,
        template: `%s — ${site.name}`,
    },
    description: site.description,
    alternates: { canonical: "/" },
    openGraph: {
        title: site.name,
        description: site.description,
        type: "website",
        url: "/",
        siteName: site.name,
    },
    twitter: {
        card: "summary_large_image",
        title: site.name,
        description: site.description,
    },
    robots: ALLOW_INDEXING ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
    themeColor: "#eef1ec",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
            </head>
            <body>
                <Preloader />
                <a
                    href="#main"
                    className="sr-only z-[60] bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
                >
                    Skip to content
                </a>
                <Header />
                <main id="main">{children}</main>
                <Footer />
                <Analytics />
            </body>
        </html>
    );
}
