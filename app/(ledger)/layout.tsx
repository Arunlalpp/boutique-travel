import type { Metadata, Viewport } from "next";
import { LedgerHeader } from "@/components/ledger/LedgerHeader";
import { LedgerFooter } from "@/components/ledger/LedgerFooter";
import { WhatsAppButton } from "@/components/ledger/WhatsAppButton";
import { CookieNotice } from "@/components/ledger/CookieNotice";
import { JsonLd } from "@/components/seo/JsonLd";
import { SanityLive } from "@/sanity/lib/live";
import { organization, siteMetadata, website } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
    return siteMetadata(await getSiteSettings());
}

export const viewport: Viewport = {
    themeColor: "#1c2f3d",
    viewportFit: "cover",
};

/** Layout for the Backroad Ledger home page (the client's wireframe). Inner pages keep app/(site)/layout.tsx. */
export default async function LedgerLayout({ children }: { children: React.ReactNode }) {
    const settings = await getSiteSettings();

    return (
        <div className="bg-ledger-paper font-type text-ledger-ink">
            <a
                href="#main"
                className="sr-only z-70 bg-ochre px-4 py-3 font-jost text-sm font-semibold text-ledger-ink uppercase focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
            >
                Skip to content
            </a>
            <JsonLd data={[organization(settings), website(settings)]} />
            <LedgerHeader siteName={settings.name} />
            <main id="main">{children}</main>
            <LedgerFooter settings={settings} />
            <WhatsAppButton number={settings.whatsapp || settings.phone} />
            <CookieNotice />
            <SanityLive />
        </div>
    );
}
