"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@/components/analytics/Analytics";
import { label } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";

const KEY = "bl-cookie-choice";
const OPEN_EVENT = "ledger:cookies";
type Choice = "accepted" | "declined";

function read(): Choice | null {
    try {
        const v = localStorage.getItem(KEY);
        return v === "accepted" || v === "declined" ? v : null;
    } catch {
        return null;
    }
}

/** Bottom-left cookie notice. Analytics loads only once the guest accepts. */
export function CookieNotice() {
    const [choice, setChoice] = useState<Choice | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const saved = read();
        setChoice(saved);
        setOpen(saved === null);
        const reopen = () => setOpen(true);
        window.addEventListener(OPEN_EVENT, reopen);
        return () => window.removeEventListener(OPEN_EVENT, reopen);
    }, []);

    const decide = (c: Choice) => {
        try {
            localStorage.setItem(KEY, c);
        } catch {
            /* storage blocked: remember for this visit only */
        }
        setChoice(c);
        setOpen(false);
    };

    return (
        <>
            {choice === "accepted" && <Analytics />}
            {open && (
                <div
                    role="dialog"
                    aria-label="Cookie notice"
                    className="fixed bottom-[calc(16px+env(safe-area-inset-bottom,0px))] left-4 z-60 grid w-[min(380px,calc(100vw-104px))] gap-4 bg-ledger-card p-5 text-ledger-ink scheme-light shadow-[0_20px_50px_-20px_rgb(0_0_0/0.5)]"
                >
                    <p className="font-type text-[13px]/[1.55]">
                        We use a few cookies to understand which pages guests read. Nothing is shared or sold.
                    </p>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => decide("accepted")}
                            className={cn(label, "h-10 bg-ledger-ink px-4 text-ledger-paper")}
                        >
                            Accept
                        </button>
                        <button
                            type="button"
                            onClick={() => decide("declined")}
                            className={cn(label, "h-10 border border-ledger-ink/40 px-4")}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

/** Footer link that reopens the notice. */
export function CookieSettingsButton() {
    return (
        <button type="button" className="hover:text-white" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
            Cookie settings
        </button>
    );
}
