"use client";

import { useMemo, useState } from "react";
import type { DestinationCard as DestinationCardType } from "@/lib/types";
import { DestinationCard } from "./DestinationCard";
import { SearchIcon } from "@/components/ui/Icons";

type Sort = "az" | "journeys" | "featured";

export function DestinationIndex({ destinations }: { destinations: DestinationCardType[] }) {
    const [query, setQuery] = useState("");
    const [region, setRegion] = useState("All");
    const [sort, setSort] = useState<Sort>("featured");

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
    };

    return (
        <div className="wrap">
            <div className="toolbar glass-strong shadow-deep" role="search">
                <label className="search">
                    <SearchIcon />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search places, countries or regions"
                        aria-label="Search destinations"
                    />
                </label>
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort by">
                    <option value="featured">Most loved</option>
                    <option value="az">Name: A to Z</option>
                    <option value="journeys">Most journeys</option>
                </select>
            </div>

            <div className="cats" role="group" aria-label="Region">
                {regions.map((r) => (
                    <button key={r} type="button" className="chip" aria-pressed={r === region} onClick={() => setRegion(r)}>
                        {r}
                    </button>
                ))}
            </div>

            <div className="result-line">
                <span aria-live="polite">
                    {visible.length} destination{visible.length === 1 ? "" : "s"}
                    {region !== "All" && ` · ${region}`}
                </span>
                {filtered && (
                    <button type="button" className="mono text-ember" onClick={reset}>
                        Clear all filters
                    </button>
                )}
            </div>

            {visible.length > 0 ? (
                <div className="card-grid">
                    {visible.map((d) => (
                        <DestinationCard key={d.slug} destination={d} />
                    ))}
                </div>
            ) : (
                <div className="empty glass">
                    <h3 className="h-md">No places match yet</h3>
                    <p className="lede text-center">
                        Try a different region or search term. We also build custom routes from scratch.
                    </p>
                    <button type="button" className="btn btn-glass" onClick={reset}>
                        Reset filters
                    </button>
                </div>
            )}
        </div>
    );
}
