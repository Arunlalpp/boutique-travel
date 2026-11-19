"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { beginHref, hero } from "@/lib/data/ledger";
import { h1, kicker, lbtn, lwrap, typedItalic } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { ArrowRight, Pause, Play } from "./icons";

/** How long each clip holds before the next one fades in. */
const CLIP_MS = 9000;

/**
 * Full-bleed hero reel: three clips (muted MP4 loops, or stills with a slow
 * drift until footage arrives), a field note that changes with each clip,
 * progress bars and a pause control. Starts paused for reduced motion.
 */
export function HeroReel() {
    const { clips } = hero;
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setReduced(true);
            setPaused(true);
        }
    }, []);

    // Reduced motion shortens every animation to ~0ms (globals.css), so the
    // progress bar's end can't drive the reel there; guests switch clips by hand.
    const next = () => {
        if (!reduced) setActive((a) => (a + 1) % clips.length);
    };

    // Tap-to-pause on touch screens; desktop guests use the button.
    const onMediaTap = () => {
        if (window.matchMedia("(pointer: coarse)").matches) setPaused((p) => !p);
    };

    return (
        <section
            id="top"
            className="relative isolate flex min-h-[max(640px,100svh)] flex-col overflow-hidden bg-ledger-navy text-white"
        >
            <div className="absolute inset-0 -z-10" onClick={onMediaTap} aria-hidden>
                {clips.map((clip, i) => (
                    <div
                        key={clip.image.src}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-[1400ms] ease-out",
                            i === active ? "opacity-100" : "opacity-0",
                        )}
                    >
                        <div
                            // Restart the drift each time this clip comes round.
                            key={i === active ? `on-${active}` : "off"}
                            className={cn(
                                "absolute inset-0",
                                i === active && "motion-safe:animate-kenburns",
                                paused && "[animation-play-state:paused]",
                            )}
                        >
                            {clip.video ? (
                                <video
                                    src={clip.video}
                                    poster={clip.image.src}
                                    className="size-full object-cover"
                                    muted
                                    playsInline
                                    loop
                                    autoPlay={!paused}
                                />
                            ) : (
                                <SmartImage image={clip.image} sizes="100vw" priority={i === 0} quality={80} />
                            )}
                        </div>
                    </div>
                ))}
                <div className="absolute inset-0 bg-linear-to-b from-ledger-navy/80 via-ledger-navy/40 to-ledger-navy/85" />
                <div className="absolute inset-0 bg-linear-to-r from-ledger-navy/70 via-ledger-navy/20 to-transparent" />
            </div>

            <div className={cn(lwrap, "flex flex-1 flex-col justify-center pt-[clamp(110px,16vh,170px)] pb-10")}>
                <p className={kicker}>{hero.eyebrow}</p>
                <h1 className={cn(h1, "mt-6 max-w-[11ch]")}>
                    {hero.title[0]}
                    <br />
                    {hero.title[1]}
                </h1>
                <p className={cn(typedItalic, "mt-7 max-w-[38ch] text-[clamp(15px,1.4vw,18px)] text-white/90")}>
                    {hero.lede}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                    <a href="#entries" className={lbtn("ochre")}>
                        Read the ledger <ArrowRight />
                    </a>
                    <Link href={beginHref} className={lbtn("outline-light")}>
                        Begin your entry
                    </Link>
                </div>
            </div>

            <div
                className={cn(
                    lwrap,
                    "grid grid-cols-[1fr_auto_1fr] items-end gap-6 pb-[clamp(24px,4vh,40px)] max-md:grid-cols-1 max-md:gap-4",
                )}
            >
                <p
                    key={active}
                    aria-live="polite"
                    className={cn(typedItalic, "max-w-[44ch] animate-pagein text-[13px] text-white/85")}
                >
                    {clips[active].note}
                </p>

                <a
                    href="#manifesto"
                    className="grid justify-items-center gap-2 max-md:hidden"
                    aria-label="Scroll to the next section"
                >
                    <span className="font-jost text-[10px] font-semibold tracking-[0.3em] uppercase">Scroll</span>
                    <span className="relative h-10 w-px overflow-hidden bg-white/25">
                        <span className="absolute inset-0 bg-white motion-safe:animate-scroll-cue" />
                    </span>
                </a>

                <div className="flex items-center justify-end gap-4 max-md:justify-between">
                    <div className="flex gap-2" role="group" aria-label="Clips">
                        {clips.map((clip, i) => (
                            <button
                                key={clip.image.src}
                                type="button"
                                aria-label={`Show clip ${i + 1}`}
                                aria-current={i === active}
                                onClick={() => setActive(i)}
                                className="group py-3"
                            >
                                <span className="block h-0.5 w-9 overflow-hidden bg-white/30">
                                    {i === active && (
                                        <span
                                            key={`bar-${active}`}
                                            className={cn(
                                                "block h-full origin-left animate-clip bg-ochre",
                                                paused && "[animation-play-state:paused]",
                                            )}
                                            style={{ ["--clip-ms" as string]: `${CLIP_MS}ms` }}
                                            onAnimationEnd={next}
                                        />
                                    )}
                                    {i < active && <span className="block h-full bg-white/70" />}
                                </span>
                            </button>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => setPaused(!paused)}
                        aria-label={paused ? "Play the reel" : "Pause the reel"}
                        aria-pressed={paused}
                        className="grid size-10 place-items-center border border-white/80 transition-colors hover:bg-white hover:text-ledger-ink [&_svg]:size-4"
                    >
                        {paused ? <Play /> : <Pause />}
                    </button>
                </div>
            </div>
        </section>
    );
}
