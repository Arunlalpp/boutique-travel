"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GuestStoryCard } from "@/lib/types";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon, PlayIcon, QuoteIcon } from "@/components/ui/Icons";
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

    return (
        <div
            className="quotes"
            aria-roledescription="carousel"
            aria-label="Traveller stories"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
        >
            <div className="q-photo shadow-deep">
                <div className={cn("media-fill swap", out && "out")}>
                    <SmartImage image={s.poster} sizes="(min-width: 860px) 420px, 100vw" />
                </div>
                <Link href={`/stories/${s.slug}`} className="play glass-strong">
                    <i>
                        <PlayIcon />
                    </i>
                    <span>{s.video ? "Watch story" : "Read story"}</span>
                </Link>
            </div>
            <div className="q-card glass-strong shadow-deep">
                <QuoteIcon width={40} height={40} className="text-ember" />
                <div className={cn("swap", out && "out")} aria-live="polite">
                    <blockquote>“{s.quote}”</blockquote>
                </div>
                <div className="q-foot">
                    <div className={cn("q-who swap", out && "out")}>
                        <div className="avatar">
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
                            <div className="qdots">
                                {stories.map((story, k) => (
                                    <button
                                        key={story.slug}
                                        type="button"
                                        aria-label={`Story ${k + 1}`}
                                        aria-current={k === index}
                                        onClick={() => show(k)}
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                className="icon-btn border border-line-2"
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
