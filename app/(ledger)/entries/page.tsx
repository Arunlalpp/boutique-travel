import type { Metadata } from "next";
import Link from "next/link";
import { EntriesGrid } from "@/components/ledger/EntriesGrid";
import { HowItWorks } from "@/components/ledger/HowItWorks";
import { PageHead } from "@/components/ledger/PageHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { entries, entryHref } from "@/lib/data/ledger";
import { entriesPage } from "@/lib/data/ledger-pages";
import { display, lbtn, lsec, lwrap, typedItalic } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { absolute, breadcrumbs, pageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    return pageMetadata({
        title: "Entries",
        description: entriesPage.lede,
        path: "/entries",
        siteName: settings.name,
    });
}

export default async function EntriesPage() {
    const settings = await getSiteSettings();

    return (
        <>
            <JsonLd
                data={[
                    breadcrumbs(settings, [
                        ["Home", "/"],
                        ["Entries", "/entries"],
                    ]),
                    {
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        itemListElement: entries.map((e, i) => ({
                            "@type": "ListItem",
                            position: i + 1,
                            name: e.name,
                            url: absolute(settings, entryHref(e)),
                        })),
                    },
                ]}
            />
            <PageHead
                kicker={entriesPage.kicker}
                title={entriesPage.title}
                lede={entriesPage.lede}
                image={entriesPage.image}
                crumbs={[["Home", "/"], ["Entries"]]}
            />

            <section className={cn(lsec, "bg-ledger-paper text-ledger-ink")} aria-label="All Entries">
                <div className={lwrap}>
                    <EntriesGrid />

                    <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border border-dashed border-ledger-ink/40 px-[clamp(20px,3vw,32px)] py-6">
                        <div className="grid gap-1.5">
                            <p className={cn(display, "text-[clamp(17px,1.8vw,20px)]")}>
                                Not sure which Entry is yours?
                            </p>
                            <p className={cn(typedItalic, "text-[13.5px] text-ledger-ink/75")}>
                                Tell us a little about how you like to travel, and we will point you to your two closest
                                Entries.
                            </p>
                        </div>
                        <Link href="/enquire" className={lbtn("outline-ink")}>
                            Find my entry
                        </Link>
                    </div>
                </div>
            </section>

            <HowItWorks />
        </>
    );
}
