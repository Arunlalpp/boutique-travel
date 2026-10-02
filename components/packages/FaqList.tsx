"use client";

import { useState } from "react";
import { PlusIcon } from "@/components/ui/Icons";

/** Accordion that keeps one answer open at a time. Built on <details>, so it works without JavaScript too. */
export function FaqList({ items }: { items: [string, string][] }) {
    const [open, setOpen] = useState(0);

    return (
        <div className="acc">
            {items.map(([q, a], k) => (
                <details
                    key={q}
                    className="glass"
                    open={open === k}
                    onToggle={(e) => {
                        const isOpen = (e.currentTarget as HTMLDetailsElement).open;
                        if (isOpen) setOpen(k);
                        else if (open === k) setOpen(-1);
                    }}
                >
                    <summary>
                        {q}
                        <i aria-hidden>
                            <PlusIcon />
                        </i>
                    </summary>
                    <p className="a">{a}</p>
                </details>
            ))}
        </div>
    );
}
