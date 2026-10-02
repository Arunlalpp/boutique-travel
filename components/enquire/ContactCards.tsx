"use client";

import { useState, type ComponentType, type SVGProps } from "react";
import { useToast } from "@/components/providers/SiteProviders";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";

interface Card {
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    label: string;
    value: string;
    href?: string;
    copy?: boolean;
}

export function ContactCards({ phone, email, studio, hours }: { phone: string; email: string; studio: string; hours: string }) {
    const cards: Card[] = [
        { icon: PhoneIcon, label: "Call or WhatsApp", value: phone, href: `tel:${phone.replace(/[^+\d]/g, "")}`, copy: true },
        { icon: MailIcon, label: "Email", value: email, href: `mailto:${email}`, copy: true },
        { icon: PinIcon, label: "Studio", value: studio },
        { icon: ClockIcon, label: "Hours", value: hours },
    ].filter((c) => c.value);

    return (
        <div className="cards">
            {cards.map((c) => (
                <div key={c.label} className="ccard glass">
                    <div className="ib">
                        <c.icon />
                    </div>
                    <div className="t">
                        <small>{c.label}</small>
                        <b>{c.href ? <a href={c.href}>{c.value}</a> : c.value}</b>
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
            className="copy-btn"
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
