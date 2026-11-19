import type { Metadata } from "next";
import { CtaBand } from "@/components/ledger/CtaBand";
import { Footprints } from "@/components/ledger/Footprints";
import { GuestIndex } from "@/components/ledger/GuestIndex";
import { PageHead } from "@/components/ledger/PageHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { guestPage, guestStories } from "@/lib/data/ledger-pages";
import { lsec, lwrap } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
    const settings = site;
    return pageMetadata({
        title: "Guest Ledger",
        description: guestPage.lede,
        path: "/guest-ledger",
        siteName: settings.name,
    });
}

export default async function GuestLedgerPage() {
    const settings = site;

    return (
        <>
            <JsonLd
                data={breadcrumbs(settings, [
                    ["Home", "/"],
                    ["Guest Ledger", "/guest-ledger"],
                ])}
            />
            <PageHead
                kicker={guestPage.kicker}
                title={guestPage.title}
                lede={guestPage.lede}
                image={guestStories[0].poster}
                crumbs={[["Home", "/"], ["Guest Ledger"]]}
            />
            <section className={cn(lsec, "bg-ledger-deep text-ledger-paper")} aria-label="Guest entries">
                <div className={lwrap}>
                    <Footprints step={3} className="mb-8 text-ochre" />
                    <GuestIndex stories={guestStories} />
                </div>
            </section>
            <CtaBand
                title="Your page is still blank"
                text="Every guest entry here started with a short note. Yours can start the same way."
                href="/enquire"
                action="Begin your entry"
            />
        </>
    );
}
