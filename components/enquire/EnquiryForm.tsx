"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowIcon, CompassIcon, GuideIcon, UserIcon } from "@/components/ui/Icons";
import { money } from "@/lib/format";
import { cn } from "@/lib/utils";
import { btn, chip, field, fieldLabel, hMd, input, mono, stepper, stepperBtn, stepperValue } from "@/lib/ui";

interface Option {
    slug: string;
    title: string;
}

export interface EnquiryPrefill {
    journey?: string;
    destination?: string;
    /** ISO date (YYYY-MM-DD) chosen in the home page booking bar. */
    date?: string;
    travellers?: number;
    packageName?: string;
    experience?: string;
}

const STYLES = [
    { value: "Private journey", Icon: UserIcon, text: "Just you and yours, your own guide" },
    { value: "Small group", Icon: GuideIcon, text: "Join up to eight like-minded explorers" },
    { value: "Not sure yet", Icon: CompassIcon, text: "We’ll help you decide" },
];

const CONTACT = ["Email", "Phone", "WhatsApp"];
const BUDGET = { min: 5000, max: 40000, step: 1000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormState {
    style: string;
    destination: string;
    journey: string;
    month: string;
    travellers: number;
    budget: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    contactBy: string;
    consent: boolean;
}

type Field = "firstName" | "lastName" | "email" | "phone" | "consent";

function validate(v: FormState): Partial<Record<Field, string>> {
    const e: Partial<Record<Field, string>> = {};
    if (!v.firstName.trim()) e.firstName = "Add your first name so we know who to ask for.";
    if (!v.lastName.trim()) e.lastName = "Add your last name too.";
    if (!EMAIL.test(v.email.trim())) e.email = "Enter an email like name@example.com.";
    if (v.phone.trim() && v.phone.replace(/\D/g, "").length < 7) e.phone = "Check the phone number.";
    if ((v.contactBy === "Phone" || v.contactBy === "WhatsApp") && !v.phone.trim())
        e.phone = `Add a number so we can reach you by ${v.contactBy}.`;
    if (!v.consent) e.consent = "Please confirm we may contact you about this enquiry.";
    return e;
}

/** "2026-11-14" → a local date (not UTC midnight, which can land on the previous day). */
function parseLocalDate(value?: string): Date | null {
    const m = value?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return null;
    const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return Number.isNaN(d.getTime()) ? null : d;
}

/** The next six months as chips, computed on the client so they never go stale. */
function upcomingMonths(): string[] {
    const now = new Date();
    return Array.from({ length: 6 }, (_, k) => {
        const d = new Date(now.getFullYear(), now.getMonth() + k + 1, 1);
        return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
    });
}

export function EnquiryForm({
    journeys,
    destinations,
    prefill,
}: {
    journeys: Option[];
    destinations: Option[];
    prefill: EnquiryPrefill;
}) {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [step, setStep] = useState(0);
    const [months, setMonths] = useState<string[]>([]);
    const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
    const [showErrors, setShowErrors] = useState(false);
    const [honeypot, setHoneypot] = useState("");

    const exactDate = parseLocalDate(prefill.date);
    const dateLabel = exactDate
        ? `Departing ${exactDate.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`
        : null;

    const [v, setV] = useState<FormState>(() => ({
        style: "Small group",
        destination: destinations.some((d) => d.slug === prefill.destination) ? prefill.destination! : "",
        journey: journeys.some((j) => j.slug === prefill.journey) ? prefill.journey! : "bespoke",
        month: dateLabel ?? "Flexible",
        travellers: Math.min(Math.max(prefill.travellers ?? 2, 1), 20),
        budget: 15000,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        contactBy: "Email",
        consent: false,
    }));

    useEffect(() => setMonths(upcomingMonths()), []);

    const set = <K extends keyof FormState>(k: K, value: FormState[K]) => setV((s) => ({ ...s, [k]: value }));
    const errors = validate(v);
    const err = (k: Field) => (showErrors ? errors[k] : undefined);

    const go = (n: number) => {
        setStep(n);
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    async function submit() {
        if (honeypot.trim()) return;
        setShowErrors(true);
        const first = (Object.keys(errors) as Field[])[0];
        if (first) {
            formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
            return;
        }
        setStatus("sending");
        const destination = destinations.find((d) => d.slug === v.destination);
        const interests = prefill.experience ? [prefill.experience] : [];
        try {
            const res = await fetch("/api/enquiry", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: v.firstName.trim(),
                    lastName: v.lastName.trim(),
                    email: v.email.trim(),
                    phone: v.phone.trim(),
                    journey: v.journey,
                    destination: destination?.slug,
                    packageName: prefill.packageName,
                    style: v.style,
                    dates: v.month,
                    travellers: v.travellers,
                    budget: `Up to ${money(v.budget)} per person`,
                    interests,
                    message: v.message.trim(),
                    contactBy: v.contactBy,
                    consent: v.consent,
                    companyWebsite: honeypot,
                }),
            });
            if (!res.ok) throw new Error("Request failed");
            router.push(
                `/enquire/thank-you?name=${encodeURIComponent(v.firstName.trim())}&contact=${encodeURIComponent(v.contactBy)}`,
            );
        } catch {
            setStatus("error");
        }
    }

    const steps = ["Your trip", "When & who", "Your details"];
    const summary = [
        v.style,
        destinations.find((d) => d.slug === v.destination)?.title ?? "Destination open",
        v.month,
        `${v.travellers} ${v.travellers === 1 ? "person" : "people"}`,
        `up to ${money(v.budget)} each`,
    ].join(" · ");

    return (
        <form
            ref={formRef}
            className="glass-strong relative grid scroll-mt-28 gap-6 rounded-[36px] p-[clamp(24px,3.6vw,44px)] shadow-deep"
            noValidate
            onSubmit={(e) => {
                e.preventDefault();
                if (step < 2) go(step + 1);
                else submit();
            }}
        >
            <div aria-hidden className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="companyWebsite">Company website</label>
                <input
                    id="companyWebsite"
                    name="companyWebsite"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                />
            </div>

            <ol className="flex items-center gap-2" aria-label="Progress">
                {steps.map((label, k) => (
                    <li key={label} className="grid flex-1 gap-2" aria-current={k === step ? "step" : undefined}>
                        <div className="h-1 overflow-hidden rounded-full bg-white/14">
                            <i className={cn("block h-full bg-ember transition-[width] duration-500 ease-soft", k <= step ? "w-full" : "w-0")} />
                        </div>
                        <small className={cn("text-xs font-semibold", k === step ? "text-fg" : "text-dim")}>
                            {k + 1} · {label}
                        </small>
                    </li>
                ))}
            </ol>

            {(prefill.packageName || prefill.experience) && (
                <p className={cn(mono, "-mb-2 text-ember")}>
                    Enquiring about: {[prefill.packageName, prefill.experience].filter(Boolean).join(" · ")}
                </p>
            )}

            {step === 0 && (
                <div className="grid animate-pagein gap-[18px]" key="s0">
                    <h3 className={hMd}>What kind of trip?</h3>
                    <div className="grid grid-cols-3 gap-2.5 max-xs:grid-cols-1" role="group" aria-label="Travel style">
                        {STYLES.map(({ value, Icon, text }) => (
                            <button
                                key={value}
                                type="button"
                                aria-pressed={v.style === value}
                                onClick={() => set("style", value)}
                                className="grid gap-2 rounded-[20px] border border-line bg-white/4 p-4 text-left transition-all duration-250 hover:border-line-2 aria-pressed:border-ember aria-pressed:bg-ember/10 [&_svg]:size-6 [&_svg]:text-ember"
                            >
                                <Icon />
                                <b className="text-sm">{value}</b>
                                <small className="text-xs leading-[1.4] text-dim">{text}</small>
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-3.5 max-xs:grid-cols-1">
                        <SelectField
                            label="Destination"
                            value={v.destination}
                            onChange={(x) => set("destination", x)}
                            options={[{ value: "", label: "Not sure yet" }, ...destinations.map((d) => ({ value: d.slug, label: d.title }))]}
                        />
                        <SelectField
                            label="Journey"
                            value={v.journey}
                            onChange={(x) => set("journey", x)}
                            options={[
                                { value: "bespoke", label: "Something bespoke" },
                                ...journeys.map((j) => ({ value: j.slug, label: j.title })),
                            ]}
                        />
                    </div>
                </div>
            )}

            {step === 1 && (
                <div className="grid animate-pagein gap-[18px]" key="s1">
                    <h3 className={hMd}>When and who?</h3>
                    <div className={field}>
                        <span className={fieldLabel} id="month-label">
                            Travel month
                        </span>
                        <div className="flex flex-wrap gap-2.5" role="group" aria-labelledby="month-label">
                            {[...(dateLabel ? [dateLabel] : []), "Flexible", ...months].map((m) => (
                                <button
                                    key={m}
                                    type="button"
                                    className={chip()}
                                    aria-pressed={v.month === m}
                                    onClick={() => set("month", m)}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={field}>
                        <span className={fieldLabel} id="group-label">
                            Group size
                        </span>
                        <div className={stepper} role="group" aria-labelledby="group-label">
                            <button
                                type="button"
                                className={stepperBtn}
                                aria-label="Fewer travellers"
                                disabled={v.travellers <= 1}
                                onClick={() => set("travellers", v.travellers - 1)}
                            >
                                −
                            </button>
                            <output aria-live="polite" className={stepperValue}>{v.travellers}</output>
                            <button
                                type="button"
                                className={stepperBtn}
                                aria-label="More travellers"
                                disabled={v.travellers >= 20}
                                onClick={() => set("travellers", v.travellers + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className={field}>
                        <label htmlFor="budget" className={fieldLabel}>
                            Budget per person
                        </label>
                        <input
                            id="budget"
                            type="range"
                            className="h-1.5 w-full cursor-pointer accent-ember"
                            min={BUDGET.min}
                            max={BUDGET.max}
                            step={BUDGET.step}
                            value={v.budget}
                            onChange={(e) => set("budget", Number(e.target.value))}
                            aria-valuetext={`Up to ${money(v.budget)}`}
                        />
                        <div className="flex justify-between font-mono text-xs text-dim">
                            <span>{money(BUDGET.min)}</span>
                            <b className="font-medium text-fg">Up to {money(v.budget)}</b>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="grid animate-pagein gap-[18px]" key="s2">
                    <h3 className={hMd}>Where can we reach you?</h3>
                    <div className="grid grid-cols-2 gap-3.5 max-xs:grid-cols-1">
                        <TextField
                            label="First name"
                            name="firstName"
                            required
                            autoComplete="given-name"
                            value={v.firstName}
                            onChange={(x) => set("firstName", x)}
                            error={err("firstName")}
                        />
                        <TextField
                            label="Last name"
                            name="lastName"
                            required
                            autoComplete="family-name"
                            value={v.lastName}
                            onChange={(x) => set("lastName", x)}
                            error={err("lastName")}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3.5 max-xs:grid-cols-1">
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="you@example.com"
                            value={v.email}
                            onChange={(x) => set("email", x)}
                            error={err("email")}
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="Optional"
                            value={v.phone}
                            onChange={(x) => set("phone", x)}
                            error={err("phone")}
                        />
                    </div>
                    <div className={field}>
                        <span className={fieldLabel} id="reply-label">
                            How should we reply?
                        </span>
                        <div className="flex flex-wrap gap-2.5" role="group" aria-labelledby="reply-label">
                            {CONTACT.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    className={chip()}
                                    aria-pressed={v.contactBy === c}
                                    onClick={() => set("contactBy", c)}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={field}>
                        <label htmlFor="notes" className={fieldLabel}>
                            Anything else?
                        </label>
                        <textarea
                            id="notes"
                            name="message"
                            placeholder="Dates, interests, celebrations, dietary needs…"
                            value={v.message}
                            onChange={(e) => set("message", e.target.value)}
                            className={cn(input, "h-[120px] resize-y py-3.5")}
                        />
                    </div>
                    <label className="flex cursor-pointer items-start gap-3 text-[13.5px] text-mist">
                        <input
                            type="checkbox"
                            name="consent"
                            checked={v.consent}
                            onChange={(e) => set("consent", e.target.checked)}
                            aria-invalid={!!err("consent")}
                            aria-describedby={err("consent") ? "consent-error" : undefined}
                            className="mt-px size-[22px] shrink-0 cursor-pointer appearance-none rounded-[7px] border border-line-2 bg-white/6 bg-center bg-no-repeat bg-size-[14px] checked:border-ember checked:bg-ember checked:bg-[url('data:image/svg+xml;utf8,<svg_xmlns=%22http://www.w3.org/2000/svg%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%231A1208%22_stroke-width=%223%22_stroke-linecap=%22round%22_stroke-linejoin=%22round%22><path_d=%22M5_12.5l4.5_4.5L19_7.5%22/></svg>')] aria-invalid:border-danger"
                        />
                        <span>
                            I’m happy to be contacted about this enquiry. We never share your details or add you to a
                            mailing list without asking.
                        </span>
                    </label>
                    {err("consent") && (
                        <p id="consent-error" className="-mt-2 text-[12.5px] text-danger">
                            {err("consent")}
                        </p>
                    )}
                    <p className="text-[12.5px] text-dim">{summary}</p>
                </div>
            )}

            <div className="flex justify-between gap-2.5">
                {step > 0 ? (
                    <button type="button" className={btn("glass")} onClick={() => go(step - 1)}>
                        Back
                    </button>
                ) : (
                    <span />
                )}
                <button type="submit" className={btn("ember")} disabled={status === "sending"}>
                    {step < 2 ? "Continue" : status === "sending" ? "Sending…" : "Send enquiry"}
                    <ArrowIcon />
                </button>
            </div>
            {status === "error" && (
                <p role="alert" className="text-sm text-danger">
                    Something went wrong sending that. Please try again, or call us instead.
                </p>
            )}
        </form>
    );
}

function TextField({
    label,
    name,
    value,
    onChange,
    type = "text",
    required,
    autoComplete,
    placeholder,
    error,
}: {
    label: string;
    name: Field;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    required?: boolean;
    autoComplete?: string;
    placeholder?: string;
    error?: string;
}) {
    const id = useId();
    return (
        <div className={field}>
            <label htmlFor={id} className={fieldLabel}>
                {label}
                {required && <span aria-hidden> *</span>}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                required={required}
                autoComplete={autoComplete}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                className={input}
            />
            {error && (
                <span id={`${id}-error`} className="text-[12.5px] text-danger">
                    {error}
                </span>
            )}
        </div>
    );
}

function SelectField({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
}): ReactNode {
    const id = useId();
    return (
        <div className={field}>
            <label htmlFor={id} className={fieldLabel}>
                {label}
            </label>
            <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={input}>
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
