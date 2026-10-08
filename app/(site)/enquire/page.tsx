import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ArrowIcon, PinIcon } from "@/components/ui/Icons";
import { ContactCards } from "@/components/enquire/ContactCards";
import { EnquiryForm, type EnquiryPrefill } from "@/components/enquire/EnquiryForm";
import { getAllDestinations, getAllItineraries, getSiteSettings } from "@/sanity/lib/queries";
import { sec, textLink, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    return pageMetadata({
        title: "Plan a Trip",
        description: "Tell us about your dream trip in three quick steps. A trip designer replies personally.",
        path: "/enquire",
        siteName: settings.name,
    });
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const int = (v: string | undefined) => {
    const n = v ? parseInt(v, 10) : NaN;
    return Number.isFinite(n) && n > 0 ? n : undefined;
};

export default async function EnquirePage({ searchParams }: { searchParams: SearchParams }) {
    const params = await searchParams;
    const [itineraries, destinations, settings] = await Promise.all([
        getAllItineraries(),
        getAllDestinations(),
        getSiteSettings(),
    ]);

    const adults = int(first(params.adults));
    const children = int(first(params.children)) ?? 0;
    const pkg = first(params.package)?.slice(0, 80);
    const pricing = { group: "Group of 4+", private: "Private" }[first(params.pricing) ?? ""] as string | undefined;

    const prefill: EnquiryPrefill = {
        journey: first(params.journey),
        destination: first(params.destination),
        date: first(params.date),
        travellers: int(first(params.travellers)) ?? (adults ? adults + children : undefined),
        packageName: pkg ? [pkg, pricing].filter(Boolean).join(" · ") : undefined,
        experience: first(params.experience)?.slice(0, 80),
    };

    const mapsHref = settings.studio
        ? `https://www.google.com/maps/search/${encodeURIComponent(settings.studio)}`
        : undefined;

    return (
        <>
            <PageHero
                crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
                eyebrow="Contact"
                title="Let’s plan your next escape."
                lede="Tell us about your dream trip in three quick steps. A trip designer replies personally, usually within the hour during studio hours."
            />

            <section className={cn(sec, "pt-[clamp(40px,5vw,64px)]!")} aria-label="Enquiry">
                <div className={cn(wrap, "grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] items-start gap-[clamp(28px,6vw,90px)] max-desk:grid-cols-1")}>
                    <ContactCards phone={settings.phone} email={settings.email} studio={settings.studio} hours={settings.hours} />
                    <EnquiryForm
                        journeys={itineraries.map((j) => ({ slug: j.slug, title: j.title }))}
                        destinations={destinations.map((d) => ({ slug: d.slug, title: d.name }))}
                        prefill={prefill}
                    />
                </div>
            </section>

            {settings.studio && (
                <section className={cn(sec, "pt-0!")} aria-label="Find the studio">
                    <div className={wrap}>
                        <div className="relative aspect-16/6 overflow-hidden bg-paper-2 max-tab:aspect-4/3">
                            <svg
                                viewBox="0 0 1200 440"
                                preserveAspectRatio="xMidYMid slice"
                                className="absolute inset-0 size-full"
                                aria-hidden
                            >
                                <rect width="1200" height="440" fill="#dddbd2" />
                                <path d="M0 330 C200 300 300 380 520 350 S900 300 1200 360 V440 H0Z" fill="#cfd3cb" />
                                <g stroke="rgba(255,255,255,.55)" strokeWidth="10" fill="none">
                                    <path d="M-20 260 C200 220 400 300 640 240 C880 180 1040 260 1220 200" />
                                    <path d="M300 -20 C340 140 280 260 360 460" />
                                    <path d="M880 -20 C840 180 940 300 880 460" />
                                </g>
                                <g stroke="rgba(23,23,21,.05)" strokeWidth="2">
                                    <path d="M0 110H1200M0 380H1200M160 0V440M560 0V440M1060 0V440" />
                                </g>
                            </svg>
                            <div className="absolute top-1/2 left-1/2 grid max-w-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 gap-0.5 bg-paper px-4 py-3 shadow-deep">
                                <b className="flex items-center gap-2 text-[13px] font-semibold">
                                    <PinIcon width={14} height={14} />
                                    {settings.name} Studio
                                </b>
                                <span className="text-xs text-dim">{settings.studio}</span>
                            </div>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-dim">
                            <span>{settings.hours}</span>
                            {mapsHref && (
                                <a href={mapsHref} target="_blank" rel="noreferrer" className={cn(textLink, "text-[13px]")}>
                                    Get directions <ArrowIcon />
                                </a>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
