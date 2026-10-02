"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowIcon, CalendarIcon, PinIcon, UserIcon } from "@/components/ui/Icons";
import { btn, stepper, stepperBtn, stepperValue } from "@/lib/ui";
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

export function BookingBar({ destinations }: { destinations: DestinationOption[] }) {
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
            className="glass-strong relative z-5 mx-auto -mt-[70px] grid max-w-[980px] grid-cols-[1.25fr_1fr_1fr_auto] items-stretch gap-1.5 rounded-[32px] p-2.5 shadow-deep max-tab:-mt-10 max-tab:grid-cols-2 max-tab:rounded-[28px]"
        >
            <Field
                id="where"
                open={open}
                setOpen={setOpen}
                icon={<PinIcon />}
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
                            className="flex items-center justify-between gap-4 rounded-[14px] px-3.5 py-3 text-left hover:bg-white/8 aria-selected:bg-white/8"
                            onClick={() => {
                                setWhere(d.slug);
                                setOpen(null);
                            }}
                        >
                            <span>
                                <b>{d.name}</b>
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
                icon={<CalendarIcon />}
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
                            className="grid w-16 justify-items-center gap-0.5 rounded-2xl border border-line py-2.5 text-xs text-mist transition-all aria-pressed:border-ember aria-pressed:bg-ember aria-pressed:text-ember-ink [&_b]:text-[15px] [&_b]:tabular-nums aria-pressed:[&_b]:text-ember-ink"
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
                icon={<UserIcon />}
                divider
                label="Travellers"
                value={who}
            >
                <Counter label="Adults" hint="13+ years" value={adults} min={1} max={8} onChange={setAdults} />
                <Counter label="Children" hint="4–12 years" value={kids} min={0} max={8} onChange={setKids} />
            </Field>

            <button
                type="button"
                className={cn(btn("ember"), "h-auto min-h-14 rounded-3xl px-7 max-tab:col-span-full max-tab:min-h-[52px]")}
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
    icon,
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
    icon: ReactNode;
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
                "relative flex min-w-0 cursor-pointer items-center gap-3.5 rounded-3xl px-[18px] py-3 text-left transition-colors hover:bg-white/8 max-tab:bg-white/5 [&>svg]:size-[22px] [&>svg]:shrink-0 [&>svg]:text-ember",
                isOpen && "bg-white/8",
                wide && "max-tab:col-span-full",
                divider &&
                    "before:absolute before:inset-y-[22%] before:-left-[3px] before:w-px before:bg-line before:content-[''] max-tab:before:hidden",
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
            {icon}
            <span className="min-w-0">
                <span className="block text-xs text-dim">{label}</span>
                <span className="block truncate text-[15px] font-semibold">{value}</span>
            </span>
            <div
                id={`pop-${id}`}
                hidden={!isOpen}
                role="dialog"
                aria-label={label}
                className="glass-strong absolute top-[calc(100%+12px)] left-0 z-20 grid min-w-[280px] cursor-default gap-0.5 rounded-[22px] bg-[#181c25]/92! p-2.5 shadow-deep max-tab:w-[min(320px,calc(100vw-48px))] max-tab:min-w-0"
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
                <b>{label}</b>
                <br />
                <small className="font-mono text-xs text-dim">{hint}</small>
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
