"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowIcon, CalendarIcon, PinIcon, UserIcon } from "@/components/ui/Icons";
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
        <div ref={form} className="booking glass-strong shadow-deep" role="search" aria-label="Find a trip">
            <Field
                id="where"
                open={open}
                setOpen={setOpen}
                icon={<PinIcon className="ic" />}
                label="Destination"
                value={chosen ? `${chosen.name}, ${chosen.country}` : "Anywhere wild"}
            >
                <div role="listbox" aria-label="Destination" className="grid gap-0.5">
                    {[{ slug: "", name: "Not sure yet", country: "We’ll suggest" }, ...destinations].map((d) => (
                        <button
                            key={d.slug || "any"}
                            type="button"
                            role="option"
                            aria-selected={where === d.slug}
                            className="opt"
                            onClick={() => {
                                setWhere(d.slug);
                                setOpen(null);
                            }}
                        >
                            <span>
                                <b>{d.name}</b>
                            </span>
                            <small>{d.country}</small>
                        </button>
                    ))}
                </div>
            </Field>

            <Field
                id="when"
                open={open}
                setOpen={setOpen}
                icon={<CalendarIcon className="ic" />}
                label="Departure"
                value={
                    date
                        ? date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                        : "Flexible dates"
                }
            >
                <div className="datechips max-w-[300px] flex-wrap">
                    {dates.map((d) => (
                        <button
                            key={d.toISOString()}
                            type="button"
                            aria-pressed={date?.getTime() === d.getTime()}
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
                icon={<UserIcon className="ic" />}
                label="Travellers"
                value={who}
            >
                <Counter label="Adults" hint="13+ years" value={adults} min={1} max={8} onChange={setAdults} />
                <Counter label="Children" hint="4–12 years" value={kids} min={0} max={8} onChange={setKids} />
            </Field>

            <button type="button" className="btn btn-ember" onClick={submit}>
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
}: {
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
            className={cn("bfield", isOpen && "open")}
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
                <span className="lbl">{label}</span>
                <span className="val">{value}</span>
            </span>
            <div id={`pop-${id}`} className="pop glass-strong shadow-deep" hidden={!isOpen} role="dialog" aria-label={label}>
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
        <div className="row">
            <span>
                <b>{label}</b>
                <br />
                <small className="mono text-dim">{hint}</small>
            </span>
            <div className="stepper">
                <button
                    type="button"
                    aria-label={`Fewer ${label.toLowerCase()}`}
                    disabled={value <= min}
                    onClick={() => onChange(value - 1)}
                >
                    −
                </button>
                <output aria-live="polite">{value}</output>
                <button
                    type="button"
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
