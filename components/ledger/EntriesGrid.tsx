"use client";

import Link from "next/link";
import { useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { entries, entryHref, tags, type Tag } from "@/lib/data/ledger";
import { display, label, photo, typedItalic } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { ArrowRight } from "./icons";

type Filter = "All" | Tag;

const chip =
    "h-9 shrink-0 rounded-full border border-ledger-ink/70 px-4 font-jost text-[11.5px] font-semibold tracking-[0.12em] uppercase transition-colors hover:bg-ledger-ink/8 aria-pressed:border-ledger-ink aria-pressed:bg-ledger-ink aria-pressed:text-ledger-paper";

const tagPill =
    "rounded-full border border-current px-2.5 py-1 font-jost text-[10px] font-semibold tracking-[0.12em] uppercase";

/** The ten Entries as cards, with the eleven filter chips from the wireframe (All + ten tags). */
export function EntriesGrid() {
    const [filter, setFilter] = useState<Filter>("All");
    const visible = entries.filter((e) => filter === "All" || e.tags.includes(filter));

    return (
        <>
            <div
                className="-mx-[clamp(20px,5vw,48px)] flex gap-2 overflow-x-auto px-[clamp(20px,5vw,48px)] pb-2 scrollbar-none lg:flex-wrap"
                role="group"
                aria-label="Filter entries"
            >
                {(["All", ...tags] as Filter[]).map((t) => (
                    <button
                        key={t}
                        type="button"
                        className={chip}
                        aria-pressed={filter === t}
                        onClick={() => setFilter(t)}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <p className="mt-6 font-type text-[13px] text-ledger-ink/70" aria-live="polite">
                {filter === "All"
                    ? `All ${entries.length} Entries`
                    : `${visible.length} ${visible.length === 1 ? "Entry" : "Entries"} tagged ${filter}`}
            </p>

            <ul className="mt-6 grid grid-cols-3 gap-x-[clamp(20px,2.5vw,32px)] gap-y-14 max-lg:grid-cols-2 max-sm:grid-cols-1">
                {visible.map((e) => (
                    <li key={e.no}>
                        <Link href={entryHref(e)} className="group grid gap-4">
                            <div className={cn(photo, "aspect-[4/5]")}>
                                <SmartImage
                                    image={e.image}
                                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, calc(100vw - 40px)"
                                    className="transition-transform duration-700 group-hover:scale-[1.03]"
                                />
                                <span className="absolute top-3 left-3 bg-ledger-ink px-2.5 py-1.5 font-jost text-[20px] leading-none font-semibold text-ochre tabular-nums">
                                    {e.no}
                                </span>
                            </div>
                            <div className="grid gap-2.5">
                                <h2 className={cn(display, "text-[clamp(19px,1.8vw,22px)] leading-tight")}>{e.name}</h2>
                                <p className={cn(typedItalic, "text-[14px] text-ledger-ink/80")}>{e.line}</p>
                                <p className={cn(label, "text-[10.5px] text-ledger-ink/70")}>
                                    {e.route} · {e.nights}
                                </p>
                                <div className="flex flex-wrap items-center gap-2">
                                    {e.tags.map((t) => (
                                        <span key={t} className={tagPill}>
                                            {t}
                                        </span>
                                    ))}
                                    <ArrowRight className="ml-auto size-5 transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
