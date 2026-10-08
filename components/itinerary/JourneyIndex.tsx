"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ItineraryCard, TravelStyle } from "@/lib/types";
import { JourneyCard } from "./JourneyCard";
import { useSaved, useToast } from "@/components/providers/SiteProviders";
import { FilterIcon, SearchIcon, XIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { btn, cardGrid, chip, chipRow, emptyState, factLabel, hMd, iconBtn, lede, mono, resultLine, searchBox, searchInput, toolbar, toolbarSelect, wrap } from "@/lib/ui";

type Sort = "featured" | "short" | "long" | "az";
type Length = "short" | "mid" | "long";

const LENGTHS: { id: Length; label: string; test: (days: number) => boolean }[] = [
    { id: "short", label: "Up to 7 days", test: (d) => d <= 7 },
    { id: "mid", label: "8–10 days", test: (d) => d >= 8 && d <= 10 },
    { id: "long", label: "11+ days", test: (d) => d >= 11 },
];
const STYLES: TravelStyle[] = ["Private journey", "Small group"];

/** "7 days", "10–12 nights" → 7, 10. Unknown → 0 (only matches when no length filter is set). */
const days = (duration: string) => parseInt(duration, 10) || 0;

interface Filters {
    style: TravelStyle | null;
    length: Length | null;
}

export function JourneyIndex({ journeys }: { journeys: ItineraryCard[] }) {
    const params = useSearchParams();
    const router = useRouter();
    const toast = useToast();
    const { saved } = useSaved();

    const [query, setQuery] = useState("");
    const [region, setRegion] = useState(() => params.get("region") ?? "All");
    const [sort, setSort] = useState<Sort>("featured");
    const [savedOnly, setSavedOnly] = useState(() => params.get("saved") === "1");
    const [filters, setFilters] = useState<Filters>({ style: null, length: null });
    const [draft, setDraft] = useState<Filters>(filters);
    const [drawer, setDrawer] = useState(false);

    // The nav heart links here with ?saved=1; react when that changes on the same page.
    useEffect(() => {
        if (params.get("saved") === "1") setSavedOnly(true);
        const r = params.get("region");
        if (r) setRegion(r);
    }, [params]);

    const regions = useMemo(() => ["All", ...Array.from(new Set(journeys.map((j) => j.region)))], [journeys]);

    const match = (j: ItineraryCard, f: Filters) => {
        const q = query.trim().toLowerCase();
        return (
            (!q || `${j.title} ${j.country} ${j.region} ${j.hook} ${j.style}`.toLowerCase().includes(q)) &&
            (region === "All" || j.region === region) &&
            (!f.style || j.style === f.style) &&
            (!f.length || LENGTHS.find((l) => l.id === f.length)!.test(days(j.duration))) &&
            (!savedOnly || saved.includes(j.slug))
        );
    };

    const visible = journeys.filter((j) => match(j, filters));
    const order: Record<Sort, (a: ItineraryCard, b: ItineraryCard) => number> = {
        featured: (a, b) => Number(b.featured) - Number(a.featured),
        short: (a, b) => days(a.duration) - days(b.duration),
        long: (a, b) => days(b.duration) - days(a.duration),
        az: (a, b) => a.title.localeCompare(b.title),
    };
    const sorted = [...visible].sort(order[sort]);
    const previewCount = journeys.filter((j) => match(j, draft)).length;

    const activeFilters = Number(!!filters.style) + Number(!!filters.length);
    const anything = activeFilters > 0 || query.trim() !== "" || region !== "All" || savedOnly;

    const resetAll = () => {
        setQuery("");
        setRegion("All");
        setFilters({ style: null, length: null });
        setDraft({ style: null, length: null });
        if (savedOnly) {
            setSavedOnly(false);
            router.replace("/itineraries", { scroll: false });
        }
    };

    const openDrawer = () => {
        setDraft(filters);
        setDrawer(true);
    };
    const apply = () => {
        setFilters(draft);
        setDrawer(false);
        const n = journeys.filter((j) => match(j, draft)).length;
        toast(`${n} journey${n === 1 ? "" : "s"} found`);
    };

    return (
        <div className={wrap}>
            <div className={toolbar} role="search">
                <label className={searchBox}>
                    <SearchIcon />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search journeys, countries or styles"
                        className={searchInput}
                        aria-label="Search journeys"
                    />
                </label>
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort by" className={toolbarSelect}>
                    <option value="featured">Most loved</option>
                    <option value="short">Shortest first</option>
                    <option value="long">Longest first</option>
                    <option value="az">Name: A to Z</option>
                </select>
                <button type="button" className={cn(btn("glass"), "relative")} onClick={openDrawer} aria-haspopup="dialog">
                    <FilterIcon />
                    Filters
                    {activeFilters > 0 && <span className="absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent text-[11px] font-bold text-accent-ink">{activeFilters}</span>}
                </button>
            </div>

            <div className={chipRow} role="group" aria-label="Region">
                {regions.map((r) => (
                    <button key={r} type="button" className={chip()} aria-pressed={r === region} onClick={() => setRegion(r)}>
                        {r}
                    </button>
                ))}
            </div>

            <div className={resultLine}>
                <span aria-live="polite">
                    {sorted.length} journey{sorted.length === 1 ? "" : "s"}
                    {savedOnly && " saved"}
                    {region !== "All" && ` · ${region}`}
                </span>
                {anything && (
                    <button type="button" className={cn(mono, "text-accent")} onClick={resetAll}>
                        Clear all filters
                    </button>
                )}
            </div>

            {sorted.length > 0 ? (
                <div className={cardGrid}>
                    {sorted.map((j) => (
                        <JourneyCard
                            key={j.slug}
                            journey={j}
                            sizes="(min-width: 1240px) 400px, (min-width: 640px) 50vw, 100vw"
                        />
                    ))}
                </div>
            ) : (
                <div className={emptyState}>
                    <h3 className={hMd}>{savedOnly ? "Nothing saved yet" : "No journeys match yet"}</h3>
                    <p className={cn(lede, "text-center")}>
                        {savedOnly
                            ? "Tap ♥ on any journey to keep it here for later."
                            : "Try a different region or length. We also build custom routes from scratch."}
                    </p>
                    <button type="button" className={btn("glass")} onClick={resetAll}>
                        {savedOnly ? "Show all journeys" : "Reset filters"}
                    </button>
                </div>
            )}

            <FilterDrawer
                open={drawer}
                onClose={() => setDrawer(false)}
                draft={draft}
                setDraft={setDraft}
                count={previewCount}
                onApply={apply}
            />
        </div>
    );
}

function FilterDrawer({
    open,
    onClose,
    draft,
    setDraft,
    count,
    onApply,
}: {
    open: boolean;
    onClose: () => void;
    draft: Filters;
    setDraft: (f: Filters) => void;
    count: number;
    onApply: () => void;
}) {
    const panel = useRef<HTMLElement>(null);
    const lastFocus = useRef<HTMLElement | null>(null);
    const startY = useRef<number | null>(null);
    const [mounted, setMounted] = useState(false);
    const [shown, setShown] = useState(false);
    const close = useRef(onClose);
    close.current = onClose;
    const wasOpen = useRef(false);

    useEffect(() => {
        if (open) {
            wasOpen.current = true;
            lastFocus.current = document.activeElement as HTMLElement;
            setMounted(true);
            const raf = requestAnimationFrame(() => setShown(true));
            document.documentElement.style.overflow = "hidden";
            const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("button")?.focus(), 80);
            const onKey = (e: KeyboardEvent) => e.key === "Escape" && close.current();
            window.addEventListener("keydown", onKey);
            return () => {
                cancelAnimationFrame(raf);
                clearTimeout(t);
                window.removeEventListener("keydown", onKey);
                document.documentElement.style.overflow = "";
            };
        }
        if (!wasOpen.current) return;
        wasOpen.current = false;
        setShown(false);
        lastFocus.current?.focus?.();
        const t = setTimeout(() => setMounted(false), 350);
        return () => clearTimeout(t);
    }, [open]);

    return (
        <>
            {mounted && (
                <div
                    onClick={onClose}
                    aria-hidden
                    className={cn(
                        "fixed inset-0 z-80 bg-[#05070a]/55 backdrop-blur-xs transition-opacity duration-350",
                        shown ? "opacity-100" : "opacity-0",
                    )}
                />
            )}
            <aside
                ref={panel}
                className={cn(
                    "glass-strong fixed inset-y-3 right-3 z-90 flex w-[min(420px,calc(100vw-24px))] flex-col gap-6 overflow-auto rounded-[32px] bg-[#181c25]/92! p-7 shadow-deep transition-[translate,visibility] duration-450 ease-soft",
                    "max-tab:inset-x-0 max-tab:top-auto max-tab:bottom-0 max-tab:max-h-[86vh] max-tab:w-full max-tab:rounded-b-none max-tab:pb-[calc(28px+env(safe-area-inset-bottom,0px))]",
                    shown ? "visible translate-0" : "invisible translate-x-[110%] max-tab:translate-x-0 max-tab:translate-y-[105%]",
                )}
                role="dialog"
                aria-modal="true"
                aria-label="Filters"
                aria-hidden={!open}
                onTouchStart={(e) => {
                    if (panel.current && panel.current.scrollTop <= 0) startY.current = e.touches[0].clientY;
                }}
                onTouchMove={(e) => {
                    if (startY.current === null || !panel.current) return;
                    const dy = e.touches[0].clientY - startY.current;
                    if (dy > 0) panel.current.style.transform = `translateY(${dy}px)`;
                }}
                onTouchEnd={(e) => {
                    if (startY.current === null || !panel.current) return;
                    const dy = e.changedTouches[0].clientY - startY.current;
                    panel.current.style.transform = "";
                    startY.current = null;
                    if (dy > 110) onClose();
                }}
            >
                <div className="-mt-3 mx-auto hidden h-[5px] w-11 rounded-full bg-line-2 max-tab:block" />
                <header className="flex items-center justify-between">
                    <h3 className="text-[28px]">Filters</h3>
                    <button type="button" className={iconBtn} onClick={onClose} aria-label="Close filters">
                        <XIcon />
                    </button>
                </header>
                <div className="grid gap-3">
                    <div className={factLabel}>Travel style</div>
                    <div className="flex flex-wrap gap-2">
                        {STYLES.map((s) => (
                            <button
                                key={s}
                                type="button"
                                className={chip()}
                                aria-pressed={draft.style === s}
                                onClick={() => setDraft({ ...draft, style: draft.style === s ? null : s })}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grid gap-3">
                    <div className={factLabel}>Trip length</div>
                    <div className="flex flex-wrap gap-2">
                        {LENGTHS.map((l) => (
                            <button
                                key={l.id}
                                type="button"
                                className={chip()}
                                aria-pressed={draft.length === l.id}
                                onClick={() => setDraft({ ...draft, length: draft.length === l.id ? null : l.id })}
                            >
                                {l.label}
                            </button>
                        ))}
                    </div>
                </div>
                <footer className="mt-auto flex gap-2.5 *:flex-1">
                    <button type="button" className={btn("glass")} onClick={() => setDraft({ style: null, length: null })}>
                        Reset
                    </button>
                    <button type="button" className={btn("primary")} onClick={onApply}>
                        Show {count} journey{count === 1 ? "" : "s"}
                    </button>
                </footer>
            </aside>
        </>
    );
}
