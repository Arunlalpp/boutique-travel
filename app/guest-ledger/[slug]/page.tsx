import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SmartImage } from "@/components/ui/SmartImage";
import { CtaBand } from "@/components/ledger/CtaBand";
import { Footprints } from "@/components/ledger/Footprints";
import { FilmPlayer } from "@/components/ledger/GuestFilm";
import { Stamps } from "@/components/ledger/Stamps";
import { ArrowRight } from "@/components/ledger/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { beginEntryHref, entryHref, guestHref } from "@/lib/data/ledger";
import { entryByNo, entryDetail, guestBySlug, guestStories } from "@/lib/data/ledger-pages";
import { display, h1, kicker, label, lbtn, lsec, lwrap, photo, typedItalic, underlineLink } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
    return guestStories.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const guest = guestBySlug((await params).slug);
    const entry = guest && entryByNo(guest.entry);
    if (!guest || !entry) return {};
    const settings = site;
    return pageMetadata({
        title: `${guest.guest} · Entry ${entry.no}, ${entry.name}`,
        description: `A guest entry from ${entry.route}: ${guest.quote}`,
        path: guestHref(guest),
        siteName: settings.name,
        type: "article",
    });
}

export default async function GuestEntryPage({ params }: { params: Params }) {
    const guest = guestBySlug((await params).slug);
    const entry = guest && entryByNo(guest.entry);
    if (!guest || !entry) notFound();

    const settings = site;
    const photos = entryDetail(entry).gallery;
    const more = guestStories.filter((g) => g.slug !== guest.slug).slice(0, 3);

    return (
        <>
            <JsonLd
                data={breadcrumbs(settings, [
                    ["Home", "/"],
                    ["Guest Ledger", "/guest-ledger"],
                    [guest.guest, guestHref(guest)],
                ])}
            />

            <header className="bg-ledger-deep text-ledger-paper">
                <div className={cn(lwrap, "grid gap-6 pt-[clamp(120px,16vh,160px)] pb-[clamp(40px,5vw,64px)]")}>
                    <nav aria-label="Breadcrumb">
                        <ol className={cn(label, "flex flex-wrap gap-2 text-[10.5px] text-white/65")}>
                            <li>
                                <Link href="/" className="hover:text-white">
                                    Home
                                </Link>
                            </li>
                            <li aria-hidden>/</li>
                            <li>
                                <Link href="/guest-ledger" className="hover:text-white">
                                    Guest Ledger
                                </Link>
                            </li>
                            <li aria-hidden>/</li>
                            <li aria-current="page" className="text-white/90">
                                {guest.guest}
                            </li>
                        </ol>
                    </nav>
                    <p className={kicker}>
                        Entry no. {entry.no} · {guest.date}
                    </p>
                    <h1 className={cn(h1, "max-w-[20ch] text-[clamp(32px,4.6vw,60px)] leading-[1.02] normal-case")}>
                        <q className="font-type font-bold italic">{guest.quote}</q>
                    </h1>
                    <p className={cn(label, "text-ochre")}>
                        {guest.guest} · {guest.country}
                    </p>
                </div>
                {guest.duration && (
                    <div className={cn(lwrap, "pb-[clamp(48px,6vw,80px)]")}>
                        <FilmPlayer film={guest} />
                    </div>
                )}
            </header>

            <section className={cn(lsec, "bg-ledger-paper text-ledger-ink")} aria-labelledby="story-title">
                <div
                    className={cn(
                        lwrap,
                        "grid grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-start gap-[clamp(40px,6vw,88px)] max-lg:grid-cols-1",
                    )}
                >
                    <article className="grid gap-6">
                        <Footprints className="text-ledger-grey" />
                        <h2 id="story-title" className={cn(display, "text-[clamp(26px,3vw,36px)]")}>
                            Their entry, in their words
                        </h2>
                        {guest.story.map((p) => (
                            <p key={p} className={cn(typedItalic, "text-[16px] text-ledger-ink/85")}>
                                {p}
                            </p>
                        ))}
                        <Stamps entry={entry.no} count={guest.stamps} className="mt-4" />
                    </article>

                    <aside
                        className="grid gap-5 bg-ledger-card p-[clamp(22px,3vw,32px)] lg:sticky lg:top-28"
                        aria-label="The route they walked"
                    >
                        <p className={cn(label, "text-ledger-ink/70")}>The route they walked</p>
                        <div className={cn(photo, "aspect-[16/10]")}>
                            <SmartImage image={entry.image} sizes="(min-width: 1024px) 400px, 100vw" />
                        </div>
                        <p className="flex items-baseline gap-3">
                            <span className="font-jost text-[40px] leading-none font-semibold text-ochre-deep tabular-nums">
                                {entry.no}
                            </span>
                            <span className={cn(display, "text-[19px] leading-tight")}>{entry.name}</span>
                        </p>
                        <p className="font-type text-[14px] text-ledger-ink/75">
                            {entry.route} · {entry.nights}
                        </p>
                        <Link href={entryHref(entry)} className={cn(underlineLink, "w-max")}>
                            Read entry {entry.no} <ArrowRight />
                        </Link>
                        <Link href={beginEntryHref(entry)} className={cn(lbtn("ink"), "w-full")}>
                            Begin this entry
                        </Link>
                    </aside>
                </div>
            </section>

            <section className={cn(lsec, "bg-ledger-paper pt-0 text-ledger-ink")} aria-labelledby="photos-title">
                <div className={lwrap}>
                    <h2 id="photos-title" className={cn(label, "text-ledger-ink/70")}>
                        Photographs from the route
                    </h2>
                    <ul className="mt-6 grid grid-cols-3 gap-[clamp(12px,1.6vw,20px)] max-sm:grid-cols-1">
                        {photos.map((p) => (
                            <li key={p.src} className={cn(photo, "aspect-[4/5]")}>
                                <SmartImage image={p} sizes="(min-width: 640px) 33vw, 100vw" />
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {more.length > 0 && (
                <section className={cn(lsec, "bg-ledger-stone text-ledger-ink")} aria-labelledby="more-title">
                    <div className={lwrap}>
                        <div className="flex flex-wrap items-end justify-between gap-6">
                            <h2 id="more-title" className={cn(display, "text-[clamp(26px,3vw,36px)]")}>
                                More from the guest ledger
                            </h2>
                            <Link href="/guest-ledger" className={underlineLink}>
                                All guest entries
                            </Link>
                        </div>
                        <ul className="mt-10 grid grid-cols-3 gap-6 max-md:grid-cols-1">
                            {more.map((g) => (
                                <li key={g.slug}>
                                    <Link href={guestHref(g)} className="group grid gap-3">
                                        <span className={cn(photo, "aspect-[16/10]")}>
                                            <SmartImage image={g.poster} sizes="(min-width: 768px) 33vw, 100vw" />
                                        </span>
                                        <span className={cn(label, "text-[10.5px] text-ledger-ink/70")}>
                                            Entry no. {g.entry} · {g.country}
                                        </span>
                                        <q className="font-type text-[15px]/[1.5] italic group-hover:underline">
                                            {g.quote}
                                        </q>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            <CtaBand
                title={`Walk entry no. ${entry.no} yourself`}
                text="Tell us your dates and who is travelling. We will reply personally with a first draft of your route."
                href={beginEntryHref(entry)}
                action="Begin this entry"
            />
        </>
    );
}
