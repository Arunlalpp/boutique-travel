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
        <form className="news glass" onSubmit={submit} noValidate>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email for newsletter"
                autoComplete="email"
            />
            <button type="submit" aria-label="Subscribe" disabled={sending}>
                <ArrowIcon />
            </button>
        </form>
    );
}
