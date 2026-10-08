"use client";

import { useState } from "react";
import { useToast } from "@/components/providers/SiteProviders";
import { fieldLabel } from "@/lib/ui";

interface Card {
    label: string;
    value: string;
    href?: string;
    copy?: boolean;
}

export function ContactCards({ phone, email, studio, hours }: { phone: string; email: string; studio: string; hours: string }) {
    const cards: Card[] = [
        { label: "Call or WhatsApp", value: phone, href: `tel:${phone.replace(/[^+\d]/g, "")}`, copy: true },
        { label: "Email", value: email, href: `mailto:${email}`, copy: true },
        { label: "Studio", value: studio },
        { label: "Hours", value: hours },
    ].filter((c) => c.value);

    return (
        <div className="grid border-t border-line">
            {cards.map((c) => (
                <div key={c.label} className="flex items-end gap-4 border-b border-line py-4">
                    <div className="grid min-w-0 flex-1 gap-1">
                        <small className={fieldLabel}>{c.label}</small>
                        <span className="text-sm font-medium break-words">
                            {c.href ? (
                                <a href={c.href} className="underline-offset-4 hover:underline">
                                    {c.value}
                                </a>
                            ) : (
                                c.value
                            )}
                        </span>
                    </div>
                    {c.copy && <CopyButton value={c.value} />}
                </div>
            ))}
        </div>
    );
}

function CopyButton({ value }: { value: string }) {
    const toast = useToast();
    const [copied, setCopied] = useState(false);

    return (
        <button
            type="button"
            className="shrink-0 text-xs font-medium text-dim transition-colors hover:text-ink"
            aria-label={`Copy ${value}`}
            onClick={async () => {
                try {
                    await navigator.clipboard.writeText(value);
                    setCopied(true);
                    toast(`Copied ${value}`);
                    setTimeout(() => setCopied(false), 1800);
                } catch {
                    toast("Couldn’t copy. Select the text and press Ctrl+C");
                }
            }}
        >
            {copied ? "Copied" : "Copy"}
        </button>
    );
}
