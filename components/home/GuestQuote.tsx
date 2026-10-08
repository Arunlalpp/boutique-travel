"use client";

import { useState } from "react";
import type { GuestStoryCard } from "@/lib/types";
import { ArrowIcon, ArrowLeftIcon } from "@/components/ui/Icons";
import { eyebrow, iconBtn, sec, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** One guest quote at a time, centred, in the serif italic. */
export function GuestQuote({ stories }: { stories: GuestStoryCard[] }) {
    const [k, setK] = useState(0);
    if (!stories.length) return null;
    const s = stories[k];
    const go = (d: number) => setK((k + d + stories.length) % stories.length);

    return (
        <section className={sec} aria-labelledby="quote-title">
            <div className={cn(wrap, "grid justify-items-center gap-6 text-center")}>
                <h2 id="quote-title" className={cn(eyebrow, "font-sans tracking-[0.16em]")}>
                    Guest stories
                </h2>
                <figure className="grid max-w-[34ch] gap-5" aria-live="polite">
                    <blockquote className="font-serif text-[clamp(22px,2.6vw,32px)] leading-[1.3] italic text-balance">
                        “{s.quote}”
                    </blockquote>
                    <figcaption className="text-xs text-dim">
                        {s.guestName}, {s.homeTown}
                        {s.journeyTitle && ` · ${s.journeyTitle}`}
                    </figcaption>
                </figure>
                {stories.length > 1 && (
                    <div className="flex items-center gap-2 text-xs text-dim tabular-nums">
                        <button type="button" className={cn(iconBtn, "size-8")} onClick={() => go(-1)} aria-label="Previous quote">
                            <ArrowLeftIcon />
                        </button>
                        {k + 1} / {stories.length}
                        <button type="button" className={cn(iconBtn, "size-8")} onClick={() => go(1)} aria-label="Next quote">
                            <ArrowIcon />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
