import type { Metadata } from "next";
import { Faq } from "@/components/ledger/Faq";
import { Footprints } from "@/components/ledger/Footprints";
import { LedgerEnquiryForm } from "@/components/ledger/LedgerEnquiryForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { enquiry, entries } from "@/lib/data/ledger";
import { enquirePage } from "@/lib/data/ledger-pages";
import { display, h2, label, lsec, lwrap, typedItalic } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    return pageMetadata({
        title: "Begin Your Entry",
        description: enquiry.lede,
        path: "/enquire",
        siteName: settings.name,
    });
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function EnquirePage({ searchParams }: { searchParams: SearchParams }) {
    const [params, settings] = await Promise.all([searchParams, getSiteSettings()]);

    // /enquire?entry=05 (or entry=05&entry=09) arrives from an Entry or guest page.
    const asked = [params.entry].flat().filter(Boolean) as string[];
    const initialEntries = asked.filter((no) => entries.some((e) => e.no === no));

    const whatsapp = settings.whatsapp || settings.phone;
    const wa = whatsapp?.replace(/[^\d]/g, "");

    return (
        <>
            <JsonLd
                data={[
                    breadcrumbs(settings, [
                        ["Home", "/"],
                        ["Begin Your Entry", "/enquire"],
                    ]),
                    {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: enquirePage.faq.map((f) => ({
                            "@type": "Question",
                            name: f.q,
                            acceptedAnswer: { "@type": "Answer", text: f.a },
                        })),
                    },
                ]}
            />

            <section
                className={cn(lsec, "bg-ledger-forest pt-[clamp(120px,17vh,170px)] text-ledger-paper")}
                aria-labelledby="enquire-title"
            >
                <div
                    className={cn(
                        lwrap,
                        "grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start gap-[clamp(40px,6vw,80px)] max-lg:grid-cols-1",
                    )}
                >
                    <div className="grid gap-7 lg:sticky lg:top-28">
                        <h1 id="enquire-title" className={cn(display, "text-[clamp(52px,6.8vw,88px)] leading-[0.92]")}>
                            {enquiry.title.map((line) => (
                                <span key={line} className="block">
                                    {line}
                                </span>
                            ))}
                        </h1>
                        <p
                            className={cn(
                                typedItalic,
                                "max-w-[34ch] text-[clamp(16px,1.6vw,19px)] text-ledger-paper/90",
                            )}
                        >
                            {enquiry.lede}
                        </p>
                        {(wa || settings.email) && (
                            <div className="grid max-w-[400px] gap-2.5 border-t border-white/15 pt-6">
                                <p className={cn(label, "text-ochre")}>Prefer to talk first?</p>
                                {wa && (
                                    <a
                                        href={`https://wa.me/${wa}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-max font-type text-[15px] hover:underline"
                                    >
                                        WhatsApp · {whatsapp}
                                    </a>
                                )}
                                {settings.email && (
                                    <a
                                        href={`mailto:${settings.email}`}
                                        className="w-max font-type text-[15px] break-all hover:underline"
                                    >
                                        Email · {settings.email}
                                    </a>
                                )}
                                <p className="font-type text-[13px] text-ledger-paper/65 italic">{enquiry.replyNote}</p>
                            </div>
                        )}
                    </div>
                    <LedgerEnquiryForm initialEntries={initialEntries} />
                </div>
            </section>

            <section className={cn(lsec, "bg-ledger-stone text-ledger-ink")} aria-labelledby="next-title">
                <div className={lwrap}>
                    <Footprints step={2} className="mb-6 text-ledger-grey" />
                    <h2 id="next-title" className={h2}>
                        What happens next
                    </h2>
                    <ol className="mt-12 grid grid-cols-3 gap-x-6 gap-y-10 max-md:grid-cols-1">
                        {enquirePage.nextSteps.map((s, i) => (
                            <li key={s.title} className="grid content-start gap-3 border-t-2 border-ledger-ink pt-4">
                                <span className="font-jost text-[clamp(56px,5.6vw,76px)] leading-none font-semibold text-ledger-grey/60 tabular-nums">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className={cn(display, "text-[17px] leading-tight")}>{s.title}</h3>
                                <p className={cn(typedItalic, "text-[14px] text-ledger-ink/80")}>{s.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section className={cn(lsec, "bg-ledger-paper text-ledger-ink")} aria-labelledby="faq-title">
                <div
                    className={cn(
                        lwrap,
                        "grid grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] items-start gap-[clamp(32px,5vw,72px)] max-lg:grid-cols-1",
                    )}
                >
                    <h2 id="faq-title" className={h2}>
                        Before you write
                    </h2>
                    <Faq items={enquirePage.faq} />
                </div>
            </section>
        </>
    );
}
