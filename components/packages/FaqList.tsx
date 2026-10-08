"use client";

import { useState } from "react";
import { PlusIcon } from "@/components/ui/Icons";

/** Accordion that keeps one answer open at a time. Built on <details>, so it works without JavaScript too. */
export function FaqList({ items }: { items: [string, string][] }) {
    const [open, setOpen] = useState(0);

    return (
        <div className="grid content-start border-t border-line">
            {items.map(([q, a], k) => (
                <details
                    key={q}
                    className="group border-b border-line"
                    open={open === k}
                    onToggle={(e) => {
                        const isOpen = (e.currentTarget as HTMLDetailsElement).open;
                        if (isOpen) setOpen(k);
                        else if (open === k) setOpen(-1);
                    }}
                >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-sm font-medium [&::-webkit-details-marker]:hidden">
                        {q}
                        <i
                            aria-hidden
                            className="grid size-7 shrink-0 place-items-center text-dim transition-[rotate,color] duration-350 ease-soft group-open:rotate-45 group-open:text-ink [&_svg]:size-3.5"
                        >
                            <PlusIcon />
                        </i>
                    </summary>
                    <p className="max-w-[62ch] pb-5 text-[13px] text-mist">{a}</p>
                </details>
            ))}
        </div>
    );
}
