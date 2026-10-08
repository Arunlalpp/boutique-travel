"use client";

import { useMemo, useState } from "react";
import type { DestinationCard as DestinationCardType } from "@/lib/types";
import { DestinationCard } from "./DestinationCard";
import { SearchIcon } from "@/components/ui/Icons";
import { btn, emptyState, hMd, lede, searchBox, searchInput, textTab, toolbar, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

type Sort = "az" | "journeys" | "featured";

/** Cards shown before "Load more", and how many each click adds. */
const PAGE = 6;

export function DestinationIndex({ destinations }: { destinations: DestinationCardType[] }) {
    const [query, setQuery] = useState("");
    const [region, setRegion] = useState("All");
    const [sort, setSort] = useState<Sort>("featured");
    const [limit, setLimit] = useState(PAGE);

    const regions = useMemo(() => ["All", ...Array.from(new Set(destinations.map((d) => d.region)))], [destinations]);

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        const list = destinations.filter(
            (d) =>
                (region === "All" || d.region === region) &&
                (!q || `${d.name} ${d.country} ${d.region} ${d.shortDescription}`.toLowerCase().includes(q)),
        );
        const order: Record<Sort, (a: DestinationCardType, b: DestinationCardType) => number> = {
            az: (a, b) => a.name.localeCompare(b.name),
            journeys: (a, b) => b.journeyCount - a.journeyCount || a.name.localeCompare(b.name),
            featured: (a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name),
        };
        return [...list].sort(order[sort]);
    }, [destinations, query, region, sort]);

    const filtered = query.trim() !== "" || region !== "All";
    const reset = () => {
        setQuery("");
        setRegion("All");
        setLimit(PAGE);
    };

    return (
        <div className={cn(wrap, "mt-[clamp(32px,4vw,48px)]")}>
            <div className={toolbar} role="search">
                <label className={searchBox}>
                    <SearchIcon />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setLimit(PAGE);
                        }}
                        placeholder="Search places, countries or regions"
                        aria-label="Search destinations"
                        className={searchInput}
                    />
                </label>
                {filtered && (
                    <button type="button" className="text-[13px] font-medium text-dim hover:text-ink" onClick={reset}>
                        Clear
                    </button>
                )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-5 pb-7">
                <div className="flex gap-5 overflow-x-auto scrollbar-none" role="group" aria-label="Region">
                    {regions.map((r) => (
                        <button
                            key={r}
                            type="button"
                            className={textTab}
                            aria-pressed={r === region}
                            onClick={() => {
                                setRegion(r);
                                setLimit(PAGE);
                            }}
                        >
                            {r}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-1.5 text-[13px] text-dim">
                    <span aria-live="polite">
                        {visible.length} place{visible.length === 1 ? "" : "s"} ·
                    </span>
                    <label className="flex items-center gap-1.5">
                        Sort
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value as Sort)}
                            className="cursor-pointer bg-transparent font-medium text-ink outline-0 [&>option]:bg-paper"
                        >
                            <option value="featured">Most loved</option>
                            <option value="az">Name: A to Z</option>
                            <option value="journeys">Most journeys</option>
                        </select>
                    </label>
                </div>
            </div>

            {visible.length > 0 ? (
                <>
                    <div className="grid grid-cols-3 gap-x-5 gap-y-10 max-desk:grid-cols-2 max-xs:grid-cols-1">
                        {visible.slice(0, limit).map((d) => (
                            <DestinationCard
                                key={d.slug}
                                destination={d}
                                className="w-full!"
                                sizes="(min-width: 960px) 400px, (min-width: 560px) 50vw, 100vw"
                            />
                        ))}
                    </div>
                    {visible.length > limit && (
                        <div className="mt-12 flex justify-center">
                            <button type="button" className={btn("glass", "sm")} onClick={() => setLimit(limit + PAGE)}>
                                Load more
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className={emptyState}>
                    <h3 className={hMd}>No places match yet</h3>
                    <p className={cn(lede, "text-center")}>
                        Try a different region or search term. We also build custom routes from scratch.
                    </p>
                    <button type="button" className={btn("glass")} onClick={reset}>
                        Reset filters
                    </button>
                </div>
            )}
        </div>
    );
}
