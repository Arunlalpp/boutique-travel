"use client";

import { useState, type FormEvent } from "react";
import { ArrowIcon } from "@/components/ui/Icons";
import { useToast } from "@/components/providers/SiteProviders";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm() {
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);

    async function submit(e: FormEvent) {
        e.preventDefault();
        if (!EMAIL.test(email.trim())) {
            toast("Enter an email like name@example.com");
            return;
        }
        setSending(true);
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email.trim() }),
            });
            if (!res.ok) throw new Error("Request failed");
            setEmail("");
            toast("Subscribed. See you by the campfire");
        } catch {
            toast("That didn't go through. Please try again");
        } finally {
            setSending(false);
        }
    }

    return (
        <form className="glass mt-3 flex h-[54px] items-center gap-1.5 rounded-full py-1.5 pr-1.5 pl-[18px]" onSubmit={submit} noValidate>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="min-w-0 flex-1 border-0 bg-transparent text-sm outline-0 placeholder:text-dim"
                aria-label="Email for newsletter"
                autoComplete="email"
            />
            <button
                type="submit"
                aria-label="Subscribe"
                disabled={sending}
                className="grid size-[42px] shrink-0 place-items-center rounded-full bg-ember text-ember-ink disabled:opacity-60 [&_svg]:size-4"
            >
                <ArrowIcon />
            </button>
        </form>
    );
}
