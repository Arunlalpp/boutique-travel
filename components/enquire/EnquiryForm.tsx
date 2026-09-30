"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface JourneyOption {
  slug: string;
  title: string;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nationality: string;
  journey: string;
  style: string;
  dates: string;
  travellers: number;
  budget: string;
  interests: string[];
  message: string;
  contactBy: string;
  consent: boolean;
}

type Errors = Partial<Record<keyof FormState, string>>;

const STYLES = ["Private journey", "Small group", "Not sure yet"];
const BUDGETS = [
  "Prefer to discuss",
  "Under £5,000 per person",
  "£5,000 – £10,000 per person",
  "£10,000 – £20,000 per person",
  "£20,000+ per person",
];
const INTERESTS = [
  "Food & wine",
  "Culture & history",
  "Wildlife & nature",
  "Slow travel & wellness",
  "Adventure & activity",
  "Family",
];

function validate(v: FormState): Errors {
  const e: Errors = {};
  if (!v.firstName.trim()) e.firstName = "Please tell us your first name.";
  if (!v.lastName.trim()) e.lastName = "Please tell us your last name.";
  if (!v.email.trim()) e.email = "We'll need an email address to reply.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "That email address doesn't look quite right.";
  if (v.phone && !/^[+\d\s()-]{6,}$/.test(v.phone)) e.phone = "Please check the phone number.";
  if (!v.consent) e.consent = "Please confirm we may contact you about your enquiry.";
  return e;
}

/**
 * Enquiry form — front-end only for the MVP.
 * Validates in the browser and shows a confirmation; nothing is sent.
 * In production, replace `submit()` with a server action or API route
 * (e.g. email via Resend, or a CRM webhook).
 */
export function EnquiryForm({ journeys, initialJourney }: { journeys: JourneyOption[]; initialJourney?: string }) {
  const router = useRouter();
  const [values, setValues] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    journey: journeys.some((j) => j.slug === initialJourney) ? initialJourney! : "bespoke",
    style: "Private journey",
    dates: "",
    travellers: 2,
    budget: BUDGETS[0],
    interests: [],
    message: "",
    contactBy: "Email",
    consent: false,
  });
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  // Honeypot: real visitors never see or fill this field. Kept outside FormState
  // so it never enters validation/touched bookkeeping.
  // TODO: production — verify server-side (reCAPTCHA/Turnstile) before accepting.
  const [honeypot, setHoneypot] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const errors = validate(values);
  const showError = (k: keyof FormState) => (touched[k] ? errors[k] : undefined);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setValues((v) => ({ ...v, [key]: value }));
  const touch = (key: keyof FormState) => setTouched((t) => ({ ...t, [key]: true }));
  const toggleInterest = (interest: string) =>
    setValues((v) => ({
      ...v,
      interests: v.interests.includes(interest) ? v.interests.filter((i) => i !== interest) : [...v.interests, interest],
    }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (honeypot.trim()) return; // silently drop suspected bot submissions
    const all = Object.keys(values).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(all);
    if (Object.keys(errors).length) {
      // Move focus to the first invalid field
      const first = Object.keys(errors)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900)); // simulated request
    setStatus("sent");
    router.push(`/enquire/thank-you?name=${encodeURIComponent(values.firstName)}&contact=${encodeURIComponent(values.contactBy)}`);
  }

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-12">
      {/* Honeypot — hidden from real visitors and assistive tech; bots that fill every field trip this. */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <Fieldset legend="About you">
        <div className="grid gap-8 sm:grid-cols-2">
          <TextField
            label="First name"
            name="firstName"
            required
            autoComplete="given-name"
            value={values.firstName}
            onChange={(v) => set("firstName", v)}
            onBlur={() => touch("firstName")}
            error={showError("firstName")}
          />
          <TextField
            label="Last name"
            name="lastName"
            required
            autoComplete="family-name"
            value={values.lastName}
            onChange={(v) => set("lastName", v)}
            onBlur={() => touch("lastName")}
            error={showError("lastName")}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(v) => set("email", v)}
            onBlur={() => touch("email")}
            error={showError("email")}
          />
          <TextField
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            hint="Optional"
            value={values.phone}
            onChange={(v) => set("phone", v)}
            onBlur={() => touch("phone")}
            error={showError("phone")}
          />
          <TextField
            label="Nationality"
            name="nationality"
            autoComplete="country-name"
            hint="Optional"
            value={values.nationality}
            onChange={(v) => set("nationality", v)}
          />
        </div>
      </Fieldset>

      <Fieldset legend="Your journey">
        <div className="grid gap-8">
          <SelectField
            label="Journey of interest"
            name="journey"
            value={values.journey}
            onChange={(v) => set("journey", v)}
            options={[
              { value: "bespoke", label: "Something entirely bespoke" },
              ...journeys.map((j) => ({ value: j.slug, label: j.title })),
            ]}
          />

          <ChoiceGroup
            label="How would you like to travel?"
            name="style"
            options={STYLES}
            value={values.style}
            onChange={(v) => set("style", v)}
          />

          <div className="grid gap-8 sm:grid-cols-2">
            <TextField
              label="When are you thinking of travelling?"
              name="dates"
              hint="e.g. late October, for about two weeks"
              value={values.dates}
              onChange={(v) => set("dates", v)}
            />
            <Stepper
              label="Number of travellers"
              value={values.travellers}
              min={1}
              max={12}
              onChange={(v) => set("travellers", v)}
            />
          </div>

          <SelectField
            label="Approximate budget"
            name="budget"
            hint="Optional — it helps us suggest the right places to stay"
            value={values.budget}
            onChange={(v) => set("budget", v)}
            options={BUDGETS.map((b) => ({ value: b, label: b }))}
          />

          <MultiChoiceGroup
            label="What draws you to travel?"
            hint="Optional — choose as many as apply"
            options={INTERESTS}
            value={values.interests}
            onChange={toggleInterest}
          />

          <TextArea
            label="Tell us about the journey you imagine"
            name="message"
            hint="Places, interests, celebrations, the pace you enjoy — anything at all."
            value={values.message}
            onChange={(v) => set("message", v)}
          />
        </div>
      </Fieldset>

      <Fieldset legend="Staying in touch">
        <ChoiceGroup
          label="How should we reply?"
          name="contactBy"
          options={["Email", "Phone"]}
          value={values.contactBy}
          onChange={(v) => set("contactBy", v)}
        />

        <label className="mt-8 flex cursor-pointer items-start gap-4 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => {
              set("consent", e.target.checked);
              touch("consent");
            }}
            aria-invalid={!!showError("consent")}
            aria-describedby={showError("consent") ? "consent-error" : undefined}
            className="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none border border-ink/40 bg-transparent bg-center bg-no-repeat checked:border-ink checked:bg-ink checked:bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%23eef1ec%22%20stroke-width=%222%22><path%20d=%22M5%2012l5%205L20%207%22/></svg>')]"
          />
          <span>
            I&apos;m happy to be contacted about this enquiry. We never share your details, and won&apos;t add you to a
            mailing list without asking.
          </span>
        </label>
        {showError("consent") && <FieldError id="consent-error">{showError("consent")}</FieldError>}
      </Fieldset>

      <div className="flex flex-col gap-6 border-t border-ink/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone">We reply to every enquiry personally, within two working days.</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center justify-center gap-3 bg-ink px-8 py-4 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-paper transition-colors duration-500 hover:bg-clay disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
          <ArrowUpRight
            aria-hidden
            strokeWidth={1.25}
            className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </form>
  );
}

/* ---------- Field primitives ---------- */

const inputBase =
  "mt-3 block w-full border-0 border-b bg-transparent px-0 py-3 text-lg text-ink placeholder:text-stone/60 transition-colors duration-300 focus:outline-none focus:ring-0";

function Fieldset({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset>
      <legend className="eyebrow mb-8 text-clay">{legend}</legend>
      {children}
    </fieldset>
  );
}

function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 text-sm text-clay">
      {children}
    </p>
  );
}

function Label({ htmlFor, children, required, hint }: { htmlFor: string; children: ReactNode; required?: boolean; hint?: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm text-ink-soft">
      {children}
      {required && (
        <span aria-hidden className="text-clay">
          {" "}
          *
        </span>
      )}
      {hint && <span className="mt-1 block text-xs text-stone">{hint}</span>}
    </label>
  );
}

interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  hint?: string;
  error?: string;
}

function TextField({ label, name, value, onChange, onBlur, type = "text", required, autoComplete, hint, error }: TextFieldProps) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} required={required} hint={hint}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputBase, error ? "border-clay" : "border-ink/25 focus:border-ink")}
      />
      {error && <FieldError id={`${id}-error`}>{error}</FieldError>}
    </div>
  );
}

function TextArea({ label, name, value, onChange, hint }: { label: string; name: string; value: string; onChange: (v: string) => void; hint?: string }) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(inputBase, "resize-y border-ink/25 focus:border-ink")}
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  hint,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  hint?: string;
}) {
  const id = useId();
  return (
    <div>
      <Label htmlFor={id} hint={hint}>
        {label}
      </Label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          inputBase,
          "cursor-pointer appearance-none border-ink/25 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%2312191a%22%20stroke-width=%221.25%22><path%20d=%22M6%209l6%206%206-6%22/></svg>')] bg-[length:1.1rem] bg-[right_0.25rem_center] bg-no-repeat pr-8 focus:border-ink",
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ChoiceGroup({
  label,
  name,
  options,
  value,
  onChange,
}: {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label}>
      <p className="text-sm text-ink-soft">{label}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {options.map((opt) => {
          const checked = opt === value;
          return (
            <label
              key={opt}
              className={cn(
                "cursor-pointer border px-5 py-3 text-sm transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-4",
                checked ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink/60",
              )}
            >
              <input
                type="radio"
                name={name}
                value={opt}
                checked={checked}
                onChange={() => onChange(opt)}
                className="sr-only"
              />
              {opt}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function MultiChoiceGroup({
  label,
  hint,
  options,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  options: string[];
  value: string[];
  onChange: (option: string) => void;
}) {
  const id = useId();
  return (
    <div role="group" aria-labelledby={id}>
      <p id={id} className="text-sm text-ink-soft">
        {label}
        {hint && <span className="mt-1 block text-xs text-stone">{hint}</span>}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        {options.map((opt) => {
          const checked = value.includes(opt);
          return (
            <label
              key={opt}
              className={cn(
                "cursor-pointer border px-5 py-3 text-sm transition-colors duration-300 has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-4",
                checked ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink/60",
              )}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onChange(opt)}
                className="sr-only"
              />
              {opt}
            </label>
          );
        })}
      </div>
    </div>
  );
}

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <p id={id} className="text-sm text-ink-soft">
        {label}
      </p>
      <div className="mt-3 flex items-center border-b border-ink/25 py-1.5" role="group" aria-labelledby={id}>
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label="Fewer travellers"
          className="flex size-10 items-center justify-center transition-opacity disabled:opacity-30"
        >
          <Minus strokeWidth={1.25} className="size-4" />
        </button>
        <output aria-live="polite" className="flex-1 text-center text-lg">
          {value} {value === 1 ? "traveller" : "travellers"}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label="More travellers"
          className="flex size-10 items-center justify-center transition-opacity disabled:opacity-30"
        >
          <Plus strokeWidth={1.25} className="size-4" />
        </button>
      </div>
    </div>
  );
}
