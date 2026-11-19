import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/ledger/CtaBand";
import { Footprints } from "@/components/ledger/Footprints";
import { PageHead } from "@/components/ledger/PageHead";
import { ArrowRight } from "@/components/ledger/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { beginEntryHref, entries, entryHref, guestHref } from "@/lib/data/ledger";
import { entryBySlug, entryDetail, guestsFor, hostsFor, neighbours } from "@/lib/data/ledger-pages";
import { display, h2, kicker, label, lbtn, lsec, lwrap, photo, typedItalic, underlineLink } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { absolute, breadcrumbs, pageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/queries";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
    return entries.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const entry = entryBySlug((await params).slug);
    if (!entry) return {};
    const settings = await getSiteSettings();
    return pageMetadata({
        title: `Entry ${entry.no} · ${entry.name}`,
        description: `${entry.line} ${entry.route}, ${entry.nights}.`,
        path: entryHref(entry),
        siteName: settings.name,
    });
}

const tagPill =
    "rounded-full border border-current px-3 py-1 font-jost text-[10.5px] font-semibold tracking-[0.12em] uppercase";

export default async function EntryPage({ params }: { params: Params }) {
    const entry = entryBySlug((await params).slug);
    if (!entry) notFound();

    const settings = await getSiteSettings();
    const detail = entryDetail(entry);
    const hosts = hostsFor(entry);
    const guests = guestsFor(entry);
    const [prev, next] = neighbours(entry);
    const begin = beginEntryHref(entry);

    const facts: [string, string][] = [
        ["Route", entry.route],
        ["Length", entry.nights],
        ["Season", detail.season],
        ["Pace", detail.pace],
    ];

    return (
        <>
            <JsonLd
                data={[
                    breadcrumbs(settings, [
                        ["Home", "/"],
                        ["Entries", "/entries"],
                        [entry.name, entryHref(entry)],
                    ]),
                    {
                        "@context": "https://schema.org",
                        "@type": "TouristTrip",
                        name: entry.name,
                        description: entry.line,
                        url: absolute(settings, entryHref(entry)),
                        image: entry.image.src,
                        provider: { "@id": absolute(settings, "/#organization") },
                        itinerary: {
                            "@type": "ItemList",
                            itemListElement: detail.stages.map((s, i) => ({
                                "@type": "ListItem",
                                position: i + 1,
                                name: `${s.days}: ${s.place}`,
                                description: s.text,
                            })),
                        },
                    },
                ]}
            />

            <PageHead
                kicker={`Entry no. ${entry.no}`}
                title={entry.name}
                lede={entry.line}
                image={entry.image}
                crumbs={[["Home", "/"], ["Entries", "/entries"], [entry.name]]}
            >
                <div className="flex flex-wrap items-center gap-2">
                    {entry.tags.map((t) => (
                        <span key={t} className={tagPill}>
                            {t}
                        </span>
                    ))}
                    <span className="ml-2 font-type text-[13px] text-white/80">
                        {entry.route} · {entry.nights}
                    </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-3">
                    <Link href={begin} className={lbtn("ochre")}>
                        Begin this entry <ArrowRight />
                    </Link>
                    <a href="#route" className={lbtn("outline-light")}>
                        See the route
                    </a>
                </div>
            </PageHead>

            {/* Narrative + facts */}
            <section className={cn(lsec, "bg-ledger-paper text-ledger-ink")} aria-labelledby="about-title">
                <div
                    className={cn(
                        lwrap,
                        "grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-start gap-[clamp(40px,6vw,88px)] max-lg:grid-cols-1",
                    )}
                >
                    <div className="grid gap-6">
                        <Footprints className="text-ledger-grey" />
                        <h2 id="about-title" className={h2}>
                            Who this entry is for
                        </h2>
                        {detail.intro.map((p, i) => (
                            <p key={p} className={cn(typedItalic, i === 0 ? "text-[17px]" : "text-ledger-ink/85")}>
                                {p}
                            </p>
                        ))}
                        <h3 className={cn(label, "mt-6 text-ledger-ink/70")}>What stays with you</h3>
                        <ul className="grid gap-3 border-t-2 border-ledger-ink pt-5">
                            {detail.highlights.map((h) => (
                                <li key={h} className="flex gap-4 font-type text-[15px]/[1.6]">
                                    <span aria-hidden className="mt-2.5 h-px w-6 shrink-0 bg-ochre-deep" />
                                    {h}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <aside
                        className="grid gap-5 bg-ledger-card p-[clamp(22px,3vw,32px)] lg:sticky lg:top-28"
                        aria-label="Entry at a glance"
                    >
                        <p className="flex items-baseline gap-3">
                            <span className={cn(label, "text-ledger-ink/70")}>Entry no.</span>
                            <span className="font-jost text-[52px] leading-none font-semibold text-ochre-deep tabular-nums">
                                {entry.no}
                            </span>
                        </p>
                        <dl className="grid gap-4">
                            {facts.map(([k, v]) => (
                                <div key={k} className="grid gap-1 border-t border-ledger-line pt-3">
                                    <dt className={cn(label, "text-[10.5px] text-ledger-ink/65")}>{k}</dt>
                                    <dd className="font-type text-[15px]">{v}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className={cn(typedItalic, "text-[13px] text-ledger-ink/70")}>
                            Every Entry is a starting point. We reshape the route around your dates and pace.
                        </p>
                        <Link href={begin} className={cn(lbtn("ink"), "w-full")}>
                            Begin entry {entry.no} <ArrowRight />
                        </Link>
                    </aside>
                </div>
            </section>

            {/* The route */}
            <section id="route" className={cn(lsec, "bg-ledger-deep text-ledger-paper")} aria-labelledby="route-title">
                <div className={lwrap}>
                    <Footprints step={1} className="mb-6 text-ochre" />
                    <p className={kicker}>The route, as we walked it</p>
                    <h2 id="route-title" className={cn(h2, "mt-4")}>
                        {entry.route}
                    </h2>
                    <Reveal
                        as="ol"
                        className="mt-12 grid gap-0 border-l border-dashed border-ochre/50 pl-[clamp(20px,3vw,36px)]"
                    >
                        {detail.stages.map((s, i) => (
                            <li
                                key={s.days}
                                data-reveal
                                style={{ transitionDelay: `${i * 120}ms` }}
                                className="relative grid grid-cols-[minmax(120px,0.3fr)_minmax(0,1fr)] gap-x-8 gap-y-2 border-b border-white/10 py-7 max-md:grid-cols-1"
                            >
                                <span
                                    aria-hidden
                                    className="absolute top-9 -left-[calc(clamp(20px,3vw,36px)+5px)] size-2.5 rounded-full bg-ochre"
                                />
                                <span className={cn(label, "pt-1 text-ochre")}>{s.days}</span>
                                <div className="grid gap-2">
                                    <h3 className={cn(display, "text-[clamp(20px,2.2vw,26px)] leading-tight")}>
                                        {s.place}
                                    </h3>
                                    <p className={cn(typedItalic, "max-w-[56ch] text-ledger-paper/80")}>{s.text}</p>
                                </div>
                            </li>
                        ))}
                    </Reveal>
                    <p className={cn(typedItalic, "mt-8 text-[13px] text-ledger-paper/60")}>
                        Nights and stops are a guide; the final route is drawn with you.
                    </p>
                </div>
            </section>

            {/* Frames */}
            <section className={cn(lsec, "bg-ledger-paper text-ledger-ink")} aria-labelledby="frames-title">
                <div className={lwrap}>
                    <h2 id="frames-title" className={cn(label, "text-ledger-ink/70")}>
                        Frames from the route
                    </h2>
                    <Reveal className="mt-6 grid grid-cols-[1.3fr_1fr] grid-rows-2 gap-[clamp(12px,1.6vw,20px)] max-md:grid-cols-1 max-md:grid-rows-none">
                        {detail.gallery.map((g, i) => (
                            <figure
                                key={g.src}
                                data-reveal
                                className={cn(
                                    photo,
                                    i === 0
                                        ? "row-span-2 aspect-[4/5] max-md:row-span-1"
                                        : "aspect-[16/10] md:aspect-auto",
                                )}
                            >
                                <SmartImage
                                    image={g}
                                    sizes={
                                        i === 0 ? "(min-width: 768px) 56vw, 100vw" : "(min-width: 768px) 42vw, 100vw"
                                    }
                                />
                            </figure>
                        ))}
                    </Reveal>
                </div>
            </section>

            {(hosts.length > 0 || guests.length > 0) && (
                <section className={cn(lsec, "bg-ledger-stone pt-0 text-ledger-ink")} aria-label="People on this Entry">
                    <div
                        className={cn(
                            lwrap,
                            "grid grid-cols-2 gap-[clamp(32px,5vw,72px)] pt-[clamp(56px,7vw,88px)] max-md:grid-cols-1",
                        )}
                    >
                        {hosts.length > 0 && (
                            <div className="grid content-start gap-6">
                                <h2 className={cn(label, "text-ledger-ink/70")}>Your hosts on this entry</h2>
                                <ul className="grid gap-5">
                                    {hosts.map((h) => (
                                        <li key={h.role} className="flex items-center gap-5">
                                            <span className={cn(photo, "size-20 shrink-0 rounded-full")}>
                                                <SmartImage image={h.image} sizes="80px" quality={70} />
                                            </span>
                                            <span className="grid gap-1">
                                                <b className={cn(display, "text-[16px] tracking-[0.04em] normal-case")}>
                                                    {h.name}
                                                </b>
                                                <span className="font-type text-[13px] text-ledger-ink/70">
                                                    {h.role}
                                                </span>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/story#hosts" className={cn(underlineLink, "w-max")}>
                                    Meet all our hosts <ArrowRight />
                                </Link>
                            </div>
                        )}
                        {guests.length > 0 && (
                            <div className="grid content-start gap-6">
                                <h2 className={cn(label, "text-ledger-ink/70")}>From guests who walked it</h2>
                                {guests.map((g) => (
                                    <Link
                                        key={g.slug}
                                        href={guestHref(g)}
                                        className="group grid grid-cols-[120px_minmax(0,1fr)] gap-5"
                                    >
                                        <span className={cn(photo, "aspect-[4/5]")}>
                                            <SmartImage image={g.poster} sizes="120px" quality={70} />
                                        </span>
                                        <span className="grid content-start gap-2">
                                            <q className="font-type text-[16px]/[1.55] italic">{g.quote}</q>
                                            <span className={cn(label, "text-[10.5px] text-ledger-ink/70")}>
                                                {g.guest} · {g.country}
                                            </span>
                                            <span className={cn(underlineLink, "mt-1 w-max text-[12px]")}>
                                                {g.duration ? "Watch and read" : "Read their entry"} <ArrowRight />
                                            </span>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            <CtaBand
                title={`Begin entry no. ${entry.no}`}
                text="Tell us your dates and who is travelling. We will reply personally with a first draft of your route."
                href={begin}
                action="Begin this entry"
            >
                <Link href="/entries" className={lbtn("outline-light")}>
                    All entries
                </Link>
            </CtaBand>

            <nav aria-label="More entries" className="border-b border-white/10 bg-ledger-night text-white">
                <div className={cn(lwrap, "grid grid-cols-2 divide-x divide-white/10")}>
                    {[["Previous entry", prev] as const, ["Next entry", next] as const].map(([dir, e], i) => (
                        <Link
                            key={dir}
                            href={entryHref(e)}
                            className={cn("group grid gap-2 py-10", i === 0 ? "pr-6" : "pl-6 text-right")}
                        >
                            <span className={cn(label, "text-[10.5px] text-ochre")}>
                                {dir} · No. {e.no}
                            </span>
                            <span
                                className={cn(
                                    display,
                                    "text-[clamp(16px,2vw,22px)] leading-tight transition-colors group-hover:text-ochre",
                                )}
                            >
                                {e.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    );
}
