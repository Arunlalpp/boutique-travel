"use client";

import { useId, useState, type FormEvent } from "react";
import { label } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** "Receive field notes" newsletter sign-up, posting to /api/newsletter. */
export function FieldNotesForm() {
    const id = useId();
    const [email, setEmail] = useState("");
    const [state, setState] = useState<"idle" | "sending" | "done" | "invalid" | "error">("idle");

    async function submit(e: FormEvent) {
        e.preventDefault();
        if (!EMAIL.test(email.trim())) return setState("invalid");
        setState("sending");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim() }),
            });
            if (!res.ok) throw new Error();
            setEmail("");
            setState("done");
        } catch {
            setState("error");
        }
    }

    const message = {
        done: "You’re on the list. The first field note arrives next month.",
        invalid: "Enter an email like you@email.com.",
        error: "That didn’t go through. Please try again.",
    }[state as "done" | "invalid" | "error"];

    return (
        <form onSubmit={submit} noValidate className="grid gap-3">
            <label htmlFor={id} className={cn(label, "text-ochre")}>
                Receive field notes
            </label>
            <div className="flex">
                <input
                    id={id}
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    aria-invalid={state === "invalid"}
                    aria-describedby={message ? `${id}-msg` : undefined}
                    className="h-12 min-w-0 flex-1 border border-r-0 border-white/20 bg-transparent px-4 font-type text-[14px] text-white outline-0 placeholder:text-white/40 focus:border-ochre"
                />
                <button
                    type="submit"
                    disabled={state === "sending"}
                    className="h-12 shrink-0 bg-ochre px-6 font-jost text-[13px] font-semibold tracking-[0.14em] text-ledger-ink uppercase transition-colors hover:bg-ochre-soft disabled:opacity-60"
                >
                    Join
                </button>
            </div>
            {message && (
                <p id={`${id}-msg`} role="status" className="font-type text-[13px] text-white/70 italic">
                    {message}
                </p>
            )}
        </form>
    );
}
