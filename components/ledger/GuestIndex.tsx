"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { entries, guestHref } from "@/lib/data/ledger";
import type { GuestStory } from "@/lib/data/ledger-pages";
import { control, display, fieldLabel, label, photo } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { Stamps } from "./Stamps";
import { ArrowRight, Chevron, Play } from "./icons";

function Select({
    id,
    text,
    value,
    onChange,
    options,
}: {
    id: string;
    text: string;
    value: string;
    onChange: (v: string) => void;
    options: [string, string][];
}) {
    return (
        <div className="w-full sm:w-[260px]">
            <label htmlFor={id} className={cn(fieldLabel, "text-ledger-paper/75")}>
                {text}
            </label>
            <div className="relative">
                <select
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={cn(control, "appearance-none pr-9 scheme-light")}
                >
                    {options.map(([v, l]) => (
                        <option key={v} value={v}>
                            {l}
                        </option>
                    ))}
                </select>
                <Chevron className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ledger-ink" />
            </div>
        </div>
    );
}

/** Film index and written pages, filtered by Entry or by the country a guest travelled from. */
export function GuestIndex({ stories }: { stories: GuestStory[] }) {
    const ids = useId();
    const [entry, setEntry] = useState("");
    const [country, setCountry] = useState("");

    const countries = [...new Set(stories.map((s) => s.country))].sort();
    const usedEntries = entries.filter((e) => stories.some((s) => s.entry === e.no));
    const visible = stories.filter((s) => (!entry || s.entry === entry) && (!country || s.country === country));
    const films = visible.filter((s) => s.duration);
    const pages = visible.filter((s) => !s.duration);

    return (
        <>
            <div className="flex flex-wrap items-end gap-4" role="group" aria-label="Filter guest entries">
                <Select
                    id={`${ids}-entry`}
                    text="Entry"
                    value={entry}
                    onChange={setEntry}
                    options={[
                        ["", "All Entries"],
                        ...usedEntries.map((e): [string, string] => [e.no, `${e.no} · ${e.name}`]),
                    ]}
                />
                <Select
                    id={`${ids}-country`}
                    text="Travelled from"
                    value={country}
                    onChange={setCountry}
                    options={[["", "All countries"], ...countries.map((c): [string, string] => [c, c])]}
                />
                {(entry || country) && (
                    <button
                        type="button"
                        onClick={() => {
                            setEntry("");
                            setCountry("");
                        }}
                        className="h-11 font-type text-[13px] text-ochre underline underline-offset-4"
                    >
                        Clear filters
                    </button>
                )}
            </div>
            <p className="mt-5 font-type text-[13px] text-ledger-paper/65" aria-live="polite">
                {visible.length} guest {visible.length === 1 ? "entry" : "entries"}
            </p>

            {films.length > 0 && (
                <>
                    <h2 className={cn(label, "mt-12 text-ledger-paper/70")}>Films</h2>
                    <ul className="mt-5 grid grid-cols-2 gap-x-[clamp(20px,2.5vw,32px)] gap-y-10 max-md:grid-cols-1">
                        {films.map((f) => (
                            <li key={f.slug}>
                                <Link href={guestHref(f)} className="group grid gap-4">
                                    <span className={cn(photo, "aspect-video bg-ledger-navy")}>
                                        <SmartImage image={f.poster} sizes="(min-width: 768px) 50vw, 100vw" />
                                        <span className="absolute inset-0 bg-ledger-deep/30 transition-colors group-hover:bg-ledger-deep/10" />
                                        <span className="absolute top-1/2 left-1/2 grid size-14 -translate-1/2 place-items-center rounded-full border border-white/90 bg-ledger-deep/60 text-white transition-transform group-hover:scale-105 [&_svg]:size-5">
                                            <Play className="ml-0.5" />
                                        </span>
                                        <span className="absolute right-3 bottom-3 border border-white/30 bg-ledger-deep/80 px-2 py-1 font-type text-[11px] text-white">
                                            {f.duration}
                                        </span>
                                    </span>
                                    <span className="grid gap-2">
                                        <span className={cn(label, "text-[10.5px] text-ochre")}>
                                            Entry no. {f.entry} · {f.guest} · {f.country}
                                        </span>
                                        <q className="font-type text-[16px]/[1.5] italic">{f.quote}</q>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {pages.length > 0 && (
                <>
                    <h2 className={cn(label, "mt-16 text-ledger-paper/70")}>Pages from the ledger</h2>
                    <ul className="mt-5 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
                        {pages.map((p) => (
                            <li key={p.slug}>
                                <Link
                                    href={guestHref(p)}
                                    className="group grid h-full content-start gap-4 bg-ledger-card p-[clamp(20px,2.4vw,26px)] text-ledger-ink"
                                >
                                    <span className="flex justify-between gap-3">
                                        <span className={cn(label, "text-[10.5px] text-ledger-ink/70")}>
                                            Entry no. {p.entry}
                                        </span>
                                        <span className={cn(label, "text-[10.5px] text-ledger-ink/70")}>{p.date}</span>
                                    </span>
                                    <q className="font-type text-[17px]/[1.55] italic">{p.quote}</q>
                                    <span className="grid gap-1">
                                        <b className="font-jost text-[14px] font-semibold">{p.guest}</b>
                                        <span className="font-type text-xs text-ledger-grey">{p.country}</span>
                                    </span>
                                    <Stamps entry={p.entry} count={p.stamps} />
                                    <span
                                        className={cn(
                                            display,
                                            "inline-flex items-center gap-2 text-[12px] tracking-[0.14em]",
                                        )}
                                    >
                                        Read this entry{" "}
                                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {visible.length === 0 && (
                <p className="mt-12 font-type text-[15px] text-ledger-paper/80 italic">
                    No guest entries match yet. Try another Entry or country.
                </p>
            )}
        </>
    );
}
