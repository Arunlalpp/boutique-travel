"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowIcon } from "@/components/ui/Icons";
import { stepper, stepperBtn, stepperValue } from "@/lib/ui";
import { cn } from "@/lib/utils";

interface DestinationOption {
    slug: string;
    name: string;
    country: string;
}

type PopId = "where" | "when" | "who";

/** The next twelve Saturdays, starting at least a week out. Computed on the client so it never goes stale. */
function upcomingDepartures(): Date[] {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 7);
    d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7));
    return Array.from({ length: 12 }, (_, k) => {
        const x = new Date(d);
        x.setDate(d.getDate() + k * 7);
        return x;
    });
}

const isoDate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** The search strip that sits on the bottom edge of the home hero photo. */
export function BookingBar({ destinations, className }: { destinations: DestinationOption[]; className?: string }) {
    const router = useRouter();
    const form = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState<PopId | null>(null);
    const [where, setWhere] = useState<string>("");
    const [dates, setDates] = useState<Date[]>([]);
    const [date, setDate] = useState<Date | null>(null);
    const [adults, setAdults] = useState(2);
    const [kids, setKids] = useState(0);

    useEffect(() => setDates(upcomingDepartures()), []);

    useEffect(() => {
        if (!open) return;
        const onDown = (e: PointerEvent) => {
            if (!form.current?.contains(e.target as Node)) setOpen(null);
        };
        const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && setOpen(null);
        document.addEventListener("pointerdown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const chosen = destinations.find((d) => d.slug === where);
    const who = `${adults} adult${adults > 1 ? "s" : ""}${kids ? `, ${kids} child${kids > 1 ? "ren" : ""}` : ""}`;

    const submit = () => {
        const q = new URLSearchParams();
        if (where) q.set("destination", where);
        if (date) q.set("date", isoDate(date));
        q.set("adults", String(adults));
        if (kids) q.set("children", String(kids));
        router.push(`/enquire?${q.toString()}`);
    };

    return (
        <div
            ref={form}
            role="search"
            aria-label="Find a trip"
            className={cn(
                "relative z-5 grid grid-cols-[1.2fr_1fr_1fr_auto] items-stretch bg-paper max-tab:grid-cols-2 max-tab:border max-tab:border-line",
                className,
            )}
        >
            <Field
                id="where"
                open={open}
                setOpen={setOpen}
                wide
                label="Destination"
                value={chosen ? `${chosen.name}, ${chosen.country}` : "Anywhere wild"}
            >
                <div role="listbox" aria-label="Destination" className="grid max-h-[340px] gap-0.5 overflow-y-auto">
                    {[{ slug: "", name: "Not sure yet", country: "We’ll suggest" }, ...destinations].map((d) => (
                        <button
                            key={d.slug || "any"}
                            type="button"
                            role="option"
                            aria-selected={where === d.slug}
                            className="flex items-center justify-between gap-4 px-3.5 py-2.5 text-left text-sm hover:bg-ink/5 aria-selected:bg-ink/5"
                            onClick={() => {
                                setWhere(d.slug);
                                setOpen(null);
                            }}
                        >
                            <span>
                                <span className="font-medium">{d.name}</span>
                            </span>
                            <small className="font-mono text-[11px] text-dim">{d.country}</small>
                        </button>
                    ))}
                </div>
            </Field>

            <Field
                id="when"
                open={open}
                setOpen={setOpen}
                divider
                label="Departure"
                value={
                    date
                        ? date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                        : "Flexible dates"
                }
            >
                <div className="flex max-w-[300px] flex-wrap gap-2">
                    {dates.map((d) => (
                        <button
                            key={d.toISOString()}
                            type="button"
                            aria-pressed={date?.getTime() === d.getTime()}
                            className="grid w-16 justify-items-center gap-0.5 border border-line py-2 text-[11px] text-mist transition-all hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper [&_b]:text-sm [&_b]:font-medium [&_b]:tabular-nums"
                            aria-label={d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
                            onClick={() => {
                                setDate(d);
                                setOpen(null);
                            }}
                        >
                            <span>{d.toLocaleDateString("en-IN", { weekday: "short" })}</span>
                            <b>{d.getDate()}</b>
                            <span>{d.toLocaleDateString("en-IN", { month: "short" })}</span>
                        </button>
                    ))}
                </div>
            </Field>

            <Field
                id="who"
                open={open}
                setOpen={setOpen}
                divider
                label="Travellers"
                value={who}
            >
                <Counter label="Adults" hint="13+ years" value={adults} min={1} max={8} onChange={setAdults} />
                <Counter label="Children" hint="4–12 years" value={kids} min={0} max={8} onChange={setKids} />
            </Field>

            <button
                type="button"
                className="flex min-h-16 items-center justify-center gap-2 bg-ink px-8 text-sm font-medium text-paper transition-colors hover:bg-ink/85 max-tab:col-span-full max-tab:min-h-13 [&_svg]:size-3.5"
                onClick={submit}
            >
                Find my trip <ArrowIcon />
            </button>
        </div>
    );
}

function Field({
    id,
    open,
    setOpen,
    label,
    value,
    children,
    wide,
    divider,
}: {
    wide?: boolean;
    divider?: boolean;
    id: PopId;
    open: PopId | null;
    setOpen: (v: PopId | null) => void;
    label: string;
    value: string;
    children: ReactNode;
}) {
    const isOpen = open === id;
    const toggle = () => setOpen(isOpen ? null : id);
    const onKey = (e: KeyboardEvent) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
        }
    };
    return (
        <div
            className={cn(
                "relative flex min-w-0 cursor-pointer items-center px-5 py-3 text-left transition-colors hover:bg-ink/4",
                isOpen && "bg-ink/4",
                wide && "max-tab:col-span-full max-tab:border-b max-tab:border-line",
                divider && "border-l border-line",
            )}
            role="button"
            tabIndex={0}
            aria-expanded={isOpen}
            aria-haspopup="dialog"
            aria-controls={`pop-${id}`}
            onClick={(e) => {
                if ((e.target as HTMLElement).closest(".pop")) return;
                toggle();
            }}
            onKeyDown={onKey}
        >
            <span className="min-w-0">
                <span className="block text-[10.5px] font-medium tracking-[0.14em] text-dim uppercase">{label}</span>
                <span className="mt-0.5 block truncate text-[13px] font-medium">{value}</span>
            </span>
            <div
                id={`pop-${id}`}
                hidden={!isOpen}
                role="dialog"
                aria-label={label}
                className="absolute top-[calc(100%+8px)] left-0 z-20 grid min-w-[280px] cursor-default gap-0.5 border border-line bg-paper p-2 shadow-deep max-tab:w-[min(320px,calc(100vw-48px))] max-tab:min-w-0"
            >
                {children}
            </div>
        </div>
    );
}

function Counter({
    label,
    hint,
    value,
    min,
    max,
    onChange,
}: {
    label: string;
    hint: string;
    value: number;
    min: number;
    max: number;
    onChange: (v: number) => void;
}) {
    return (
        <div className="flex items-center justify-between gap-6 px-3.5 py-3">
            <span>
                <span className="text-sm font-medium">{label}</span>
                <br />
                <small className="text-xs text-dim">{hint}</small>
            </span>
            <div className={stepper}>
                <button
                    type="button"
                    className={stepperBtn}
                    aria-label={`Fewer ${label.toLowerCase()}`}
                    disabled={value <= min}
                    onClick={() => onChange(value - 1)}
                >
                    −
                </button>
                <output aria-live="polite" className={stepperValue}>
                    {value}
                </output>
                <button
                    type="button"
                    className={stepperBtn}
                    aria-label={`More ${label.toLowerCase()}`}
                    disabled={value >= max}
                    onClick={() => onChange(value + 1)}
                >
                    +
                </button>
            </div>
        </div>
    );
}
