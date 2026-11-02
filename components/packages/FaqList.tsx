"use client";

import { useState } from "react";
import { PlusIcon } from "@/components/ui/Icons";

/** Accordion that keeps one answer open at a time. Built on <details>, so it works without JavaScript too. */
export function FaqList({ items }: { items: [string, string][] }) {
    const [open, setOpen] = useState(0);

    return (
        <div className="grid content-start gap-3">
            {items.map(([q, a], k) => (
                <details
                    key={q}
                    className="group glass rounded-[22px] transition-colors duration-300 open:bg-white/10!"
                    open={open === k}
                    onToggle={(e) => {
                        const isOpen = (e.currentTarget as HTMLDetailsElement).open;
                        if (isOpen) setOpen(k);
                        else if (open === k) setOpen(-1);
                    }}
                >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-[26px] py-[22px] text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                        {q}
                        <i
                            aria-hidden
                            className="grid size-8 shrink-0 place-items-center rounded-full border border-line-2 transition-[rotate,background-color] duration-350 ease-soft group-open:rotate-45 group-open:border-ember group-open:bg-ember group-open:text-ember-ink [&_svg]:size-3.5"
                        >
                            <PlusIcon />
                        </i>
                    </summary>
                    <p className="max-w-[62ch] px-[26px] pb-[22px] text-mist">{a}</p>
                </details>
            ))}
        </div>
    );
}
