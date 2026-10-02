import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PinIcon } from "@/components/ui/Icons";
import { ContactCards } from "@/components/enquire/ContactCards";
import { EnquiryForm, type EnquiryPrefill } from "@/components/enquire/EnquiryForm";
import { getAllDestinations, getAllItineraries, getSiteSettings } from "@/sanity/lib/queries";
import { lede, sec, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Plan a Trip",
    description: "Tell us about your dream trip in three quick steps. A trip designer replies personally.",
    alternates: { canonical: "/enquire" },
};

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
                className="pb-15!"
                crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
                eyebrow="Say hello"
                title="Let’s plan your next escape."
            />

            <section className={cn(sec, "pt-5!")} aria-label="Enquiry">
                <div className={cn(wrap, "grid grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] items-start gap-[clamp(28px,5vw,64px)] max-desk:grid-cols-1")}>
                    <div className="grid gap-5.5">
                        <p className={lede}>
                            Tell us a little about your dream trip in three quick steps. A trip designer replies
                            personally, usually within the hour during studio hours.
                        </p>
                        <ContactCards
                            phone={settings.phone}
                            email={settings.email}
                            studio={settings.studio}
                            hours={settings.hours}
                        />
                    </div>
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
                        <div className="relative h-[440px] overflow-hidden rounded-[36px] shadow-deep">
                            <svg
                                viewBox="0 0 1200 440"
                                preserveAspectRatio="xMidYMid slice"
                                className="absolute inset-0 size-full"
                                aria-hidden
                            >
                                <rect width="1200" height="440" fill="#1A2330" />
                                <path d="M0 330 C200 300 300 380 520 350 S900 300 1200 360 V440 H0Z" fill="#244A66" opacity=".55" />
                                <g stroke="rgba(255,255,255,.07)" strokeWidth="12" fill="none">
                                    <path d="M-20 260 C200 220 400 300 640 240 C880 180 1040 260 1220 200" />
                                    <path d="M300 -20 C340 140 280 260 360 460" />
                                    <path d="M880 -20 C840 180 940 300 880 460" />
                                </g>
                                <g stroke="rgba(255,255,255,.04)" strokeWidth="3">
                                    <path d="M0 110H1200M0 380H1200M160 0V440M560 0V440M1060 0V440" />
                                </g>
                                <g fill="rgba(255,255,255,.05)">
                                    <rect x="420" y="120" width="70" height="50" rx="6" />
                                    <rect x="700" y="140" width="90" height="60" rx="6" />
                                    <rect x="200" y="160" width="60" height="70" rx="6" />
                                    <rect x="960" y="90" width="80" height="50" rx="6" />
                                </g>
                            </svg>
                            <div className="glass-strong absolute top-[44%] left-1/2 grid max-w-[calc(100%-32px)] -translate-x-1/2 -translate-y-full gap-1 rounded-[22px] px-5 py-4 shadow-deep">
                                <b className="flex items-center gap-2">
                                    <PinIcon width={16} height={16} className="text-ember" />
                                    {settings.name} Studio
                                </b>
                                <span className="text-[13px] text-mist">
                                    {settings.studio}
                                    {settings.hours && ` · ${settings.hours}`}
                                </span>
                            </div>
                            <span aria-hidden className="absolute top-[calc(44%+18px)] left-1/2 size-5 -translate-x-1/2 animate-beacon rounded-full border-4 border-fg bg-ember" />
                            {mapsHref && (
                                <ButtonLink href={mapsHref} external variant="glass" arrow={false} className="absolute! top-5 right-5">
                                    Get directions
                                </ButtonLink>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
