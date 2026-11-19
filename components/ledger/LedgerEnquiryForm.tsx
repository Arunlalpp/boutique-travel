"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { entries } from "@/lib/data/ledger";
import { control, display, fieldLabel, lbtn, typedItalic } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { Chevron } from "./icons";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ENTRIES = 2;

type Field = "name" | "email" | "consent";

/**
 * The Begin Your Entry form, on the home page and on /enquire. Saves to
 * Sanity through /api/enquiry. `initialEntries` pre-selects Entries, e.g.
 * from an Entry page's /enquire?entry=05 link.
 */
export function LedgerEnquiryForm({ initialEntries = [] }: { initialEntries?: string[] }) {
    const ids = useId();
    const form = useRef<HTMLFormElement>(null);
    const [v, setV] = useState({ name: "", email: "", from: "", travellers: "1", window: "", message: "" });
    const [chosen, setChosen] = useState<string[]>(initialEntries.slice(0, MAX_ENTRIES));
    const [pickerOpen, setPickerOpen] = useState(false);
    const [consent, setConsent] = useState(false);
    const [honeypot, setHoneypot] = useState("");
    const [showErrors, setShowErrors] = useState(false);
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const picker = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!pickerOpen) return;
        const onDown = (e: PointerEvent) => !picker.current?.contains(e.target as Node) && setPickerOpen(false);
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPickerOpen(false);
        document.addEventListener("pointerdown", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("pointerdown", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [pickerOpen]);

    const errors: Partial<Record<Field, string>> = {};
    if (!v.name.trim()) errors.name = "Tell us what to call you.";
    if (!EMAIL.test(v.email.trim())) errors.email = "Enter an email like you@email.com.";
    if (!consent) errors.consent = "Please confirm we may reply to you.";
    const err = (k: Field) => (showErrors ? errors[k] : undefined);

    const set = (k: keyof typeof v) => (e: { target: { value: string } }) =>
        setV((s) => ({ ...s, [k]: e.target.value }));

    const toggleEntry = (no: string) =>
        setChosen((c) => (c.includes(no) ? c.filter((x) => x !== no) : c.length < MAX_ENTRIES ? [...c, no] : c));

    const chosenNames = chosen.map((no) => entries.find((e) => e.no === no)?.name).filter(Boolean) as string[];

    async function submit(e: FormEvent) {
        e.preventDefault();
        if (honeypot) return;
        setShowErrors(true);
        const first = (Object.keys(errors) as Field[])[0];
        if (first) {
            form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
            return;
        }
        setStatus("sending");
        try {
            const res = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: v.name.trim(),
                    email: v.email.trim(),
                    nationality: v.from.trim() || undefined,
                    travellers: Number(v.travellers.replace("+", "")) || 1,
                    dates: v.window.trim() || undefined,
                    interests: chosen.map((no) => `Entry ${no} · ${entries.find((x) => x.no === no)?.name}`),
                    style: chosen.length ? `Entry ${chosen.join(" + ")}` : undefined,
                    message: v.message.trim() || undefined,
                    contactBy: "Email",
                    consent,
                    companyWebsite: honeypot,
                }),
            });
            if (!res.ok) throw new Error("Request failed");
            setStatus("sent");
        } catch {
            setStatus("error");
        }
    }

    if (status === "sent") {
        return (
            <div
                className="grid content-start gap-5 bg-ledger-card p-[clamp(24px,3vw,36px)] text-ledger-ink"
                role="status"
            >
                <p className={cn(display, "text-[clamp(26px,3vw,34px)]")}>Your entry has begun.</p>
                <p className={typedItalic}>
                    Thank you, {v.name.trim().split(/\s+/)[0]}. One of us will read your note and reply personally to{" "}
                    {v.email.trim()}.
                </p>
            </div>
        );
    }

    const input = (k: "name" | "email" | "from" | "window", labelText: string, props: Record<string, string> = {}) => (
        <div>
            <label htmlFor={`${ids}-${k}`} className={fieldLabel}>
                {labelText}
            </label>
            <input
                id={`${ids}-${k}`}
                name={k}
                value={v[k]}
                onChange={set(k)}
                aria-invalid={k === "name" || k === "email" ? !!err(k) : undefined}
                aria-describedby={(k === "name" || k === "email") && err(k) ? `${ids}-${k}-err` : undefined}
                className={control}
                {...props}
            />
            {(k === "name" || k === "email") && err(k) && (
                <p id={`${ids}-${k}-err`} className="mt-1.5 font-type text-xs text-[#b4402f]">
                    {err(k)}
                </p>
            )}
        </div>
    );

    return (
        <form
            ref={form}
            onSubmit={submit}
            noValidate
            className="grid gap-5 bg-ledger-card p-[clamp(20px,3vw,28px)] text-ledger-ink scheme-light"
        >
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor={`${ids}-website`}>Company website</label>
                <input
                    id={`${ids}-website`}
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                {input("name", "Your name", { autoComplete: "name", placeholder: "Full name" })}
                {input("email", "Email", { type: "email", autoComplete: "email", placeholder: "you@email.com" })}
            </div>
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                {input("from", "Travelling from", { autoComplete: "country-name", placeholder: "Country" })}
                <div>
                    <label htmlFor={`${ids}-travellers`} className={fieldLabel}>
                        Travellers
                    </label>
                    <div className="relative">
                        <select
                            id={`${ids}-travellers`}
                            value={v.travellers}
                            onChange={set("travellers")}
                            className={cn(control, "appearance-none pr-9")}
                        >
                            {["1", "2", "3", "4", "5", "6", "7", "8+"].map((n) => (
                                <option key={n}>{n}</option>
                            ))}
                        </select>
                        <Chevron className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
                    </div>
                </div>
            </div>

            <div ref={picker} className="relative">
                <span id={`${ids}-entries-label`} className={fieldLabel}>
                    Which kind of traveller are you?
                </span>
                <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={pickerOpen}
                    aria-controls={`${ids}-entries`}
                    aria-labelledby={`${ids}-entries-label ${ids}-entries-value`}
                    onClick={() => setPickerOpen(!pickerOpen)}
                    className={cn(control, "flex items-center justify-between gap-3 text-left")}
                >
                    <span id={`${ids}-entries-value`} className={cn("truncate", !chosen.length && "text-ledger-grey")}>
                        {chosenNames.length ? chosenNames.join(" + ") : "Choose up to two Entries"}
                    </span>
                    <Chevron className={cn("size-4 shrink-0 transition-transform", pickerOpen && "rotate-180")} />
                </button>
                <fieldset
                    id={`${ids}-entries`}
                    hidden={!pickerOpen}
                    className="absolute inset-x-0 top-full z-20 mt-1 max-h-[300px] overflow-y-auto border border-ledger-ink/25 bg-white py-1 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.4)]"
                >
                    <legend className="sr-only">Choose up to two Entries</legend>
                    {entries.map((e) => {
                        const on = chosen.includes(e.no);
                        const full = !on && chosen.length >= MAX_ENTRIES;
                        return (
                            <label
                                key={e.no}
                                className={cn(
                                    "flex cursor-pointer items-center gap-3 px-3 py-2.5 font-type text-[13.5px] hover:bg-ledger-paper",
                                    full && "cursor-not-allowed opacity-45",
                                )}
                            >
                                <input
                                    type="checkbox"
                                    checked={on}
                                    disabled={full}
                                    onChange={() => toggleEntry(e.no)}
                                    className="size-4 accent-ledger-ink"
                                />
                                <span className="w-6 font-jost font-semibold text-ledger-grey">{e.no}</span>
                                {e.name}
                            </label>
                        );
                    })}
                </fieldset>
            </div>

            {input("window", "Travel window", { placeholder: "Month or season" })}

            <div>
                <label htmlFor={`${ids}-message`} className={fieldLabel}>
                    What have you always wanted to see?
                </label>
                <textarea
                    id={`${ids}-message`}
                    value={v.message}
                    onChange={set("message")}
                    rows={4}
                    placeholder="A few lines is plenty"
                    className={cn(control, "h-auto resize-y py-2.5")}
                />
            </div>

            <label className="flex cursor-pointer items-start gap-3 font-type text-[12.5px] text-ledger-ink/80">
                <input
                    type="checkbox"
                    name="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    aria-invalid={!!err("consent")}
                    className="mt-0.5 size-4 shrink-0 accent-ledger-ink"
                />
                <span>
                    Yes, you may reply to me about this enquiry. We never share your details or add you to a mailing
                    list.
                </span>
            </label>
            {err("consent") && <p className="-mt-3 font-type text-xs text-[#b4402f]">{err("consent")}</p>}

            <button type="submit" className={cn(lbtn("ochre"), "h-13 w-full")} disabled={status === "sending"}>
                {status === "sending" ? "Sending…" : "Start my entry"}
            </button>
            {status === "error" && (
                <p role="alert" className="font-type text-[13px] text-[#b4402f]">
                    That didn’t go through. Please try again, or message us on WhatsApp.
                </p>
            )}
        </form>
    );
}
