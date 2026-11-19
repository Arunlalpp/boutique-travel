"use client";

import Link from "next/link";
import { useState } from "react";
import { guestHref, guestLedger } from "@/lib/data/ledger";
import { h2, kicker, label, lsec, lwrap, typedItalic, underlineLink } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { Footprints } from "./Footprints";
import { Film, meta } from "./GuestFilm";
import { Stamps } from "./Stamps";
import { ArrowRight } from "./icons";

export function GuestLedger() {
    const [playing, setPlaying] = useState<string | null>(null);
    const { featured, films, pages } = guestLedger;

    return (
        <section
            id="guest-ledger"
            className={cn(lsec, "bg-ledger-deep text-ledger-paper")}
            aria-labelledby="guest-title"
        >
            <div className={lwrap}>
                <Footprints step={3} className="mb-6 text-ochre" />
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div className="grid max-w-[600px] gap-4">
                        <p className={kicker}>{guestLedger.eyebrow}</p>
                        <h2 id="guest-title" className={h2}>
                            {guestLedger.title}
                        </h2>
                        <p className={cn(typedItalic, "text-ledger-paper/80")}>{guestLedger.lede}</p>
                    </div>
                    <Link href="/guest-ledger" className={cn(underlineLink, "text-ochre")}>
                        View all guest entries
                    </Link>
                </div>

                <div className="mt-12 grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-[clamp(24px,3vw,40px)] max-lg:grid-cols-1">
                    <figure className="grid content-start gap-4">
                        <Film
                            film={featured}
                            large
                            playing={playing === "featured"}
                            onPlay={() => setPlaying("featured")}
                        />
                        <figcaption className="grid gap-3">
                            <span className={cn(label, "text-ochre")}>{meta(featured)}</span>
                            <q className="font-type text-[clamp(17px,1.8vw,21px)]/[1.5] italic">{featured.quote}</q>
                            <Link
                                href={guestHref(featured)}
                                className={cn(underlineLink, "mt-1 w-max text-[12px] text-ochre")}
                            >
                                Read their entry <ArrowRight />
                            </Link>
                        </figcaption>
                    </figure>

                    <ul className="grid content-start">
                        {films.map((f, i) => (
                            <li
                                key={f.entry}
                                className={cn(
                                    "grid grid-cols-[150px_minmax(0,1fr)] gap-4 py-4",
                                    i < films.length - 1 && "border-b border-white/10",
                                    i === 0 && "pt-0",
                                )}
                            >
                                <Film film={f} playing={playing === f.entry} onPlay={() => setPlaying(f.entry)} />
                                <div className="grid content-start gap-1.5">
                                    <span className={cn(label, "text-[10.5px] text-ochre")}>
                                        Entry no. {f.entry} · {f.country}
                                    </span>
                                    <q className="font-type text-[14px] italic">{f.quote}</q>
                                    <span className="font-type text-[11px] text-ledger-paper/55">{f.duration}</span>
                                    <Link
                                        href={guestHref(f)}
                                        className="w-max font-type text-[12px] text-ochre underline-offset-4 hover:underline"
                                    >
                                        Read their entry<span className="sr-only">: {meta(f)}</span>
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <h3 className={cn(label, "mt-16 text-ledger-paper/70")}>Pages from the ledger</h3>
                <ul className="-mx-[clamp(20px,5vw,48px)] mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(20px,5vw,48px)] pb-2 scrollbar-none md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
                    {pages.map((p) => (
                        <li
                            key={p.entry}
                            className="grid w-[min(300px,82vw)] shrink-0 snap-start content-start gap-4 bg-ledger-card p-[clamp(20px,2.4vw,26px)] text-ledger-ink md:w-auto"
                        >
                            <div className="flex justify-between gap-3">
                                <span className={cn(label, "text-[10.5px] text-ledger-ink/70")}>
                                    Entry no. {p.entry}
                                </span>
                                <span className={cn(label, "text-[10.5px] text-ledger-ink/70")}>{p.date}</span>
                            </div>
                            <q className="font-type text-[17px]/[1.55] italic">{p.text}</q>
                            <div className="grid gap-1">
                                <b className="font-jost text-[14px] font-semibold">{p.guest}</b>
                                <span className="font-type text-xs text-ledger-grey">{p.place}</span>
                            </div>
                            <Stamps entry={p.entry} count={p.stamps} />
                            <Link href={guestHref(p)} className={cn(underlineLink, "mt-1 w-max text-[12px]")}>
                                Read this entry <ArrowRight />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
