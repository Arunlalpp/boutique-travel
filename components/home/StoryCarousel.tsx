"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GuestStoryCard } from "@/lib/types";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon, PlayIcon, QuoteIcon } from "@/components/ui/Icons";
import { iconBtn, mediaFill } from "@/lib/ui";
import { cn } from "@/lib/utils";

const AUTOPLAY = 8000;

export function StoryCarousel({ stories }: { stories: GuestStoryCard[] }) {
    const [index, setIndex] = useState(0);
    const [shown, setShown] = useState(0);
    const [out, setOut] = useState(false);
    const [hovered, setHovered] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
    const count = stories.length;

    const show = useCallback(
        (k: number) => {
            const next = (k + count) % count;
            if (next === index) return;
            setIndex(next);
            setOut(true);
            clearTimeout(timer.current);
            timer.current = setTimeout(() => {
                setShown(next);
                setOut(false);
            }, 280);
        },
        [count, index],
    );

    useEffect(() => () => clearTimeout(timer.current), []);

    useEffect(() => {
        if (hovered || count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const t = setTimeout(() => show(index + 1), AUTOPLAY);
        return () => clearTimeout(t);
    }, [index, hovered, show, count]);

    if (!count) return null;
    const s = stories[shown];
    const swap = cn("transition-[opacity,translate] duration-350 ease-soft", out && "translate-y-2 opacity-0");

    return (
        <div
            className="mt-[clamp(56px,7vw,100px)] grid grid-cols-[minmax(0,420px)_minmax(0,1fr)] items-center max-tab:grid-cols-1"
            aria-roledescription="carousel"
            aria-label="Traveller stories"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
        >
            <div className="relative aspect-9/10 max-w-full overflow-hidden rounded-[32px] bg-night-3 shadow-deep">
                <div className={cn(mediaFill, swap)}>
                    <SmartImage image={s.poster} sizes="(min-width: 860px) 420px, 100vw" />
                </div>
                <Link
                    href={`/stories/${s.slug}`}
                    className="glass-strong absolute top-[18px] left-[18px] z-2 flex h-11 items-center gap-2.5 rounded-full pr-4 pl-1.5 text-[13px] font-semibold"
                >
                    <i className="grid size-8 place-items-center rounded-full bg-fg text-night [&_svg]:size-[13px]">
                        <PlayIcon />
                    </i>
                    <span>{s.video ? "Watch story" : "Read story"}</span>
                </Link>
            </div>
            <div className="glass-strong relative z-2 -ml-20 grid gap-[22px] rounded-[32px] p-[clamp(28px,4vw,48px)] shadow-deep max-tab:mx-3 max-tab:-mt-[60px]">
                <QuoteIcon width={40} height={40} className="text-ember" />
                <div className={swap} aria-live="polite">
                    <blockquote className="font-display text-[clamp(20px,2.2vw,27px)] leading-[1.35] italic">“{s.quote}”</blockquote>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className={cn("flex items-center gap-3.5", swap)}>
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-night-3">
                            <SmartImage image={s.portrait} sizes="48px" quality={65} />
                        </div>
                        <span>
                            <b>{s.guestName}</b>
                            <br />
                            <small className="text-dim">
                                {s.journeyTitle ?? s.homeTown} · {s.travelled}
                            </small>
                        </span>
                    </div>
                    {count > 1 && (
                        <div className="flex items-center gap-3.5">
                            <div className="flex gap-2">
                                {stories.map((story, k) => (
                                    <button
                                        key={story.slug}
                                        type="button"
                                        aria-label={`Story ${k + 1}`}
                                        aria-current={k === index}
                                        onClick={() => show(k)}
                                        className="relative h-2 w-2 rounded-full bg-white/30 transition-all duration-350 ease-soft before:absolute before:-inset-x-1 before:-inset-y-2.5 aria-[current=true]:w-7 aria-[current=true]:bg-ember"
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                className={cn(iconBtn, "border border-line-2")}
                                onClick={() => show(index + 1)}
                                aria-label="Next story"
                            >
                                <ArrowIcon />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
