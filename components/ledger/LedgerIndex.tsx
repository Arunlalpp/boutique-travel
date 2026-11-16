"use client";

import { useMemo, useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { entries, tags, type Entry, type Tag } from "@/lib/data/ledger";
import { chooseEntry } from "@/lib/ledger-events";
import { display, h2, label, lbtn, lsec, lwrap, photo, typedItalic, underlineLink } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { Footprints } from "./Footprints";
import { ArrowRight } from "./icons";

type Filter = "All" | Tag;

const chip =
    "h-9 shrink-0 rounded-full border border-ledger-ink/70 px-4 font-jost text-[11.5px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-ledger-ink/8 aria-pressed:border-ledger-ink aria-pressed:bg-ledger-ink aria-pressed:text-ledger-paper";

const tagPill =
    "rounded-full border border-current px-2.5 py-1 font-jost text-[10px] font-semibold tracking-[0.12em] uppercase";

const isDesktop = () => window.matchMedia("(min-width: 1024px)").matches;

/**
 * The ten Entries. Desktop: a table whose hovered row swaps the preview on
 * the right, and a click opens the Entry. Phones: an accordion, one row open
 * at a time, with the photo and tags inside it.
 */
export function LedgerIndex() {
    const [filter, setFilter] = useState<Filter>("All");
    const [active, setActive] = useState(entries[0].no);
    const [openNo, setOpenNo] = useState<string | null>(entries[0].no);

    const visible = useMemo(() => entries.filter((e) => filter === "All" || e.tags.includes(filter)), [filter]);
    const current = visible.find((e) => e.no === active) ?? visible[0] ?? entries[0];

    const applyFilter = (f: Filter) => {
        setFilter(f);
        const first = entries.find((e) => f === "All" || e.tags.includes(f));
        if (first) {
            setActive(first.no);
            setOpenNo(first.no);
        }
    };

    const onRowClick = (e: Entry) => {
        if (isDesktop()) chooseEntry(e.no);
        else setOpenNo(openNo === e.no ? null : e.no);
    };

    return (
        <section
            id="entries"
            className={cn(lsec, "bg-ledger-paper pt-0 text-ledger-ink")}
            aria-labelledby="entries-title"
        >
            <div className={lwrap}>
                <Footprints step={1} className="mb-6 text-ledger-grey" />
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <div className="grid max-w-[560px] gap-4">
                        <h2 id="entries-title" className={h2}>
                            Find your kind of journey
                        </h2>
                        <p className={cn(typedItalic, "text-ledger-ink/80")}>
                            Ten Entries, one for every kind of traveller. Most guests are two types at once, so each
                            Entry carries two tags.
                        </p>
                    </div>
                    <button type="button" className={underlineLink} onClick={() => applyFilter("All")}>
                        View all entries
                    </button>
                </div>

                <div
                    className="-mx-[clamp(20px,5vw,48px)] mt-10 flex gap-2 overflow-x-auto px-[clamp(20px,5vw,48px)] pb-2 scrollbar-none"
                    role="group"
                    aria-label="Filter entries"
                >
                    {(["All", ...tags] as Filter[]).map((t) => (
                        <button
                            key={t}
                            type="button"
                            className={chip}
                            aria-pressed={filter === t}
                            onClick={() => applyFilter(t)}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div className="mt-8 grid grid-cols-[minmax(0,1fr)_minmax(260px,320px)] items-start gap-[clamp(24px,3.5vw,40px)] max-lg:grid-cols-1">
                    <div>
                        <div
                            className="grid grid-cols-[64px_minmax(0,1.5fr)_minmax(0,1fr)_96px_24px] gap-4 border-b-2 border-ledger-ink px-3 pb-3 font-type text-[10.5px] tracking-[0.18em] text-ledger-ink/70 uppercase max-lg:hidden"
                            aria-hidden
                        >
                            <span>Entry</span>
                            <span>Traveller</span>
                            <span>Route</span>
                            <span>Nights</span>
                        </div>

                        <ul aria-live="polite" className="max-lg:border-t-2 max-lg:border-ledger-ink">
                            {visible.map((e) => {
                                const on = e.no === current.no;
                                const open = openNo === e.no;
                                return (
                                    <li key={e.no} className="border-b border-ledger-line">
                                        <button
                                            type="button"
                                            onMouseEnter={() => setActive(e.no)}
                                            onFocus={() => setActive(e.no)}
                                            onClick={() => onRowClick(e)}
                                            aria-expanded={open}
                                            aria-controls={`entry-${e.no}`}
                                            className={cn(
                                                "grid w-full grid-cols-[64px_minmax(0,1.5fr)_minmax(0,1fr)_96px_24px] items-center gap-4 px-3 py-5 text-left transition-colors duration-200 max-lg:grid-cols-[48px_minmax(0,1fr)_20px] max-lg:px-0",
                                                on && "lg:bg-ledger-ink lg:text-ledger-paper",
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    "font-jost text-[clamp(28px,2.8vw,34px)] leading-none font-semibold tabular-nums transition-colors",
                                                    on ? "lg:text-ochre" : "text-ledger-grey",
                                                    open && "max-lg:text-ochre-deep",
                                                )}
                                            >
                                                {e.no}
                                            </span>
                                            <span className="grid gap-1.5">
                                                <span className={cn(display, "text-[17px] leading-tight")}>
                                                    {e.name}
                                                </span>
                                                <span
                                                    className={cn(
                                                        "font-type text-[12.5px]/[1.55] italic max-lg:hidden",
                                                        on ? "lg:text-ledger-paper/75" : "text-ledger-ink/70",
                                                    )}
                                                >
                                                    {e.line}
                                                </span>
                                                <span className="font-type text-xs text-ledger-ink/70 lg:hidden">
                                                    {e.route} · {e.nights}
                                                </span>
                                            </span>
                                            <span className="font-type text-[13px] max-lg:hidden">{e.route}</span>
                                            <span className="font-type text-[13px] max-lg:hidden">{e.nights}</span>
                                            <ArrowRight
                                                className={cn(
                                                    "size-5 transition-transform",
                                                    open ? "max-lg:rotate-90" : "",
                                                    on && "lg:translate-x-1",
                                                )}
                                            />
                                        </button>

                                        {/* Phone accordion body */}
                                        <div id={`entry-${e.no}`} hidden={!open} className="grid gap-4 pb-6 lg:hidden">
                                            <div className={cn(photo, "aspect-[16/10]")}>
                                                <SmartImage image={e.image} sizes="calc(100vw - 40px)" />
                                            </div>
                                            <p className={cn(typedItalic, "text-[14px] text-ledger-ink/80")}>
                                                {e.line}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-2">
                                                {e.tags.map((t) => (
                                                    <span key={t} className={tagPill}>
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            <button
                                                type="button"
                                                className={cn(lbtn("ink"), "w-max")}
                                                onClick={() => chooseEntry(e.no)}
                                            >
                                                Open entry {e.no} <ArrowRight />
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Desktop preview of the hovered Entry */}
                    <aside className="sticky top-24 grid gap-5 max-lg:hidden" aria-label="Entry preview">
                        <div className={cn(photo, "aspect-[3/4]")}>
                            {entries.map((e) => (
                                <div
                                    key={e.no}
                                    className={cn(
                                        "absolute inset-0 transition-opacity duration-500",
                                        e.no === current.no ? "opacity-100" : "opacity-0",
                                    )}
                                    aria-hidden={e.no !== current.no}
                                >
                                    <SmartImage image={e.image} sizes="320px" />
                                </div>
                            ))}
                        </div>
                        <div className="grid gap-3">
                            <p className="flex items-baseline gap-3">
                                <span className={cn(label, "text-ledger-ink/70")}>Entry no.</span>
                                <span className="font-jost text-[44px] leading-none font-semibold tabular-nums">
                                    {current.no}
                                </span>
                            </p>
                            <p className={cn(display, "text-[22px] leading-tight")}>{current.name}</p>
                            <div className="flex flex-wrap gap-2">
                                {current.tags.map((t) => (
                                    <span key={t} className={tagPill}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <button
                                type="button"
                                className={cn(lbtn("ink"), "mt-2 w-max")}
                                onClick={() => chooseEntry(current.no)}
                            >
                                Open entry {current.no} <ArrowRight />
                            </button>
                        </div>
                    </aside>
                </div>

                <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border border-dashed border-ledger-ink/40 px-[clamp(20px,3vw,32px)] py-6">
                    <div className="grid gap-1.5">
                        <p className={cn(display, "text-[clamp(17px,1.8vw,20px)]")}>Not sure which Entry is yours?</p>
                        <p className={cn(typedItalic, "text-[13.5px] text-ledger-ink/75")}>
                            Tell us a little about how you like to travel, and we will point you to your two closest
                            Entries.
                        </p>
                    </div>
                    <a href="#enquire" className={lbtn("outline-ink")}>
                        Find my entry
                    </a>
                </div>
            </div>
        </section>
    );
}
