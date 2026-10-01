"use client";

import { useMemo, useState } from "react";
import type { Itinerary, Region, TravelStyle } from "@/lib/types";
import { JourneyCard } from "./JourneyCard";
import { Reveal } from "@/components/motion/Reveal";
import { cn, pad } from "@/lib/utils";

type RegionFilter = Region | "All";
type StyleFilter = TravelStyle | "Any";

export function JourneyIndex({ journeys }: { journeys: Itinerary[] }) {
    const [region, setRegion] = useState<RegionFilter>("All");
    const [style, setStyle] = useState<StyleFilter>("Any");

    const regions = useMemo<RegionFilter[]>(
        () => ["All", ...Array.from(new Set(journeys.map((j) => j.region)))],
        [journeys],
    );
    const styles: StyleFilter[] = ["Any", "Private journey", "Small group"];

    const visible = journeys.filter(
        (j) => (region === "All" || j.region === region) && (style === "Any" || j.style === style),
    );

    return (
        <section aria-label="Journeys" className="container-x pb-24 md:pb-40">
            <div className="flex flex-col gap-6 border-y border-ink/15 py-6 lg:flex-row lg:items-center lg:justify-between">
                <FilterGroup label="Region" options={regions} value={region} onChange={setRegion} />
                <FilterGroup label="Style" options={styles} value={style} onChange={setStyle} />
            </div>

            <p className="mt-6 text-sm text-stone" aria-live="polite">
                Showing {visible.length} of {journeys.length} journeys
            </p>

            <div className="mt-12 grid gap-x-10 gap-y-20 md:grid-cols-2 md:gap-y-28">
                {visible.map((journey, i) => (
                    <Reveal key={`${journey.slug}-${region}-${style}`} className={cn(i % 2 === 1 && "md:mt-32")}>
                        <JourneyCard
                            journey={journey}
                            shape={i % 4 === 0 || i % 4 === 3 ? "landscape" : "portrait"}
                            sizes="(min-width: 768px) 50vw, 100vw"
                            index={pad(journeys.indexOf(journey) + 1)}
                        />
                    </Reveal>
                ))}
            </div>

            {visible.length === 0 && (
                <div className="mt-12 border border-ink/15 px-8 py-16 text-center">
                    <p className="font-serif text-3xl font-light">Nothing here — yet.</p>
                    <p className="mx-auto mt-4 max-w-md text-stone">
                        Every journey we plan is designed from scratch, so this is only a starting point. Tell us what
                        you have in mind.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            setRegion("All");
                            setStyle("Any");
                        }}
                        className="eyebrow mt-8 border-b border-ink/40 pb-1"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </section>
    );
}

function FilterGroup<T extends string>({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: T[];
    value: T;
    onChange: (v: T) => void;
}) {
    return (
        <div
            role="group"
            aria-label={`Filter by ${label.toLowerCase()}`}
            className="flex flex-wrap items-center gap-x-2 gap-y-3"
        >
            <span className="eyebrow mr-4 text-stone">{label}</span>
            {options.map((opt) => {
                const selected = opt === value;
                return (
                    <button
                        key={opt}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => onChange(opt)}
                        className={cn(
                            "border px-4 py-2 text-sm transition-colors duration-300",
                            selected
                                ? "border-ink bg-ink text-paper"
                                : "border-ink/15 text-ink-soft hover:border-ink/50",
                        )}
                    >
                        {opt}
                    </button>
                );
            })}
        </div>
    );
}
