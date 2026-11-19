import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { LedgerHeader } from "@/components/ledger/LedgerHeader";
import { LedgerFooter } from "@/components/ledger/LedgerFooter";
import { WhatsAppButton } from "@/components/ledger/WhatsAppButton";
import { CookieNotice } from "@/components/ledger/CookieNotice";
import { PageTransitions } from "@/components/ledger/PageTransitions";
import { JsonLd } from "@/components/seo/JsonLd";
import { organization, siteMetadata, website } from "@/lib/seo";
import { site, whatsappNumber } from "@/lib/site";

export const metadata: Metadata = siteMetadata(site);

export const viewport: Viewport = {
    themeColor: "#1c2f3d",
    viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en-IN" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
                <link rel="preconnect" href="https://images.unsplash.com" />
            </head>
            <body suppressHydrationWarning>
                <a
                    href="#main"
                    className="sr-only z-70 bg-ochre px-4 py-3 font-jost text-sm font-semibold text-ledger-ink uppercase focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
                >
                    Skip to content
                </a>
                <JsonLd data={[organization(site), website(site)]} />
                <LedgerHeader siteName={site.name} />
                <main id="main">{children}</main>
                <LedgerFooter settings={site} />
                <WhatsAppButton number={whatsappNumber} />
                <CookieNotice />
                {/* Suspense: it reads search params, which would otherwise opt every page out of static rendering. */}
                <Suspense fallback={null}>
                    <PageTransitions />
                </Suspense>
            </body>
        </html>
    );
}
