"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { DestinationCard } from "@/lib/types";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { btn, eyebrow, factLabel, factValue, hLg, hMd, lede, sec, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** Illustrative pin positions on the stylised trail map. Literal classes so Tailwind can see them. */
const PIN_POSITIONS = [
    "left-[42%] top-[58%]",
    "left-[14%] top-[84%]",
    "left-[64%] top-[32%]",
    "left-[76%] top-[14%]",
    "left-[24%] top-[30%]",
    "left-[82%] top-[66%]",
];

export function ExploreMap({ destinations }: { destinations: DestinationCard[] }) {
    const spots = destinations.slice(0, PIN_POSITIONS.length);
    const [active, setActive] = useState(0);
    const [shown, setShown] = useState(0);
    const [out, setOut] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    useEffect(() => () => clearTimeout(timer.current), []);

    if (!spots.length) return null;

    const show = (k: number) => {
        if (k === active) return;
        setActive(k);
        setOut(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            setShown(k);
            setOut(false);
        }, 250);
    };

    const d = spots[shown];
    const thumbs = d.thumbs.length ? d.thumbs : [d.heroImage];
    const swap = cn("transition-[opacity,translate] duration-350 ease-soft", out && "translate-y-2 opacity-0");

    return (
        <section className={sec} aria-labelledby="explore-title">
            <div className={cn(wrap, "grid grid-cols-[1.1fr_1fr] items-center gap-[clamp(28px,5vw,72px)] max-[900px]:grid-cols-1")}>
                <Reveal>
                    <div data-reveal className="glass relative aspect-6/5 max-w-full overflow-hidden rounded-[32px] shadow-deep">
                        <svg className="absolute inset-0 size-full" viewBox="0 0 600 500" preserveAspectRatio="none" aria-hidden>
                            <g stroke="rgb(255 255 255 / .06)">
                                <path d="M0 100H600M0 200H600M0 300H600M0 400H600M100 0V500M200 0V500M300 0V500M400 0V500M500 0V500" />
                            </g>
                            <path
                                d="M70 430 C150 380 120 300 220 290 C320 280 300 170 400 160 C480 150 500 100 545 70"
                                stroke="var(--color-ember)"
                                strokeWidth="2"
                                strokeDasharray="6 8"
                                fill="none"
                                className="motion-safe:animate-dash"
                            />
                            <g fill="none" stroke="rgb(255 255 255 / .08)">
                                <path d="M340 380c40-30 120-20 150 20s-20 80-80 70-110-60-70-90z" />
                                <path d="M80 120c30-40 110-40 130 0s-40 70-90 60-60-30-40-60z" />
                            </g>
                        </svg>
                        <div className="absolute top-6 left-7 grid gap-0.5">
                            <h3 className="text-2xl">{spots[active].name}</h3>
                            <span className="font-mono text-xs text-dim">
                                {spots[active].region} · {spots[active].country}
                            </span>
                        </div>
                        {spots.map((s, k) => (
                            <button
                                key={s.slug}
                                type="button"
                                className={cn(
                                    "group/pin glass-strong absolute flex h-10 -translate-x-3.5 -translate-y-1/2 items-center gap-2.5 rounded-full py-0 pr-3.5 pl-1.5 text-[13px] font-semibold transition-all duration-300 ease-soft hover:scale-105 aria-pressed:bg-white/20! max-[900px]:w-10 max-[900px]:justify-center max-[900px]:p-0",
                                    PIN_POSITIONS[k],
                                )}
                                aria-pressed={k === active}
                                aria-label={`Show ${s.name}`}
                                onClick={() => show(k)}
                            >
                                <span className="size-[26px] shrink-0 rounded-full border-[5px] border-white/35 bg-fg transition-all duration-300 group-aria-pressed/pin:border-ember/35 group-aria-pressed/pin:bg-ember group-aria-pressed/pin:shadow-[0_0_0_8px_rgb(245_158_61/0.15)]" />
                                <span className="max-[900px]:hidden">{s.name}</span>
                            </button>
                        ))}
                    </div>
                </Reveal>

                <Reveal className="grid gap-[22px]">
                    <span className={eyebrow} data-reveal>
                        Destinations
                    </span>
                    <h2 id="explore-title" className={hLg} data-reveal>
                        Explore special places to wake up
                    </h2>
                    <div className={swap} aria-live="polite">
                        <h3 className={cn(hMd, "mb-2.5")}>{d.name}</h3>
                        <p className={lede}>{d.shortDescription}</p>
                    </div>
                    <dl className={cn("flex flex-wrap gap-7", swap)}>
                        {[
                            ["Region", d.region],
                            ["Country", d.country],
                            ["Journeys", d.journeyCount || "Bespoke"],
                        ].map(([k, v]) => (
                            <div key={k}>
                                <dt className={factLabel}>{k}</dt>
                                <dd className={factValue}>{v}</dd>
                            </div>
                        ))}
                    </dl>
                    <div className={cn("grid grid-cols-2 gap-3.5", swap)}>
                        {thumbs.slice(0, 2).map((img, i) => (
                            <div key={img.src + i} className="relative aspect-3/2 overflow-hidden rounded-[20px] bg-night-3">
                                <SmartImage image={img} sizes="(min-width: 900px) 260px, 45vw" quality={70} />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        <Link className={btn("ember")} href={`/enquire?destination=${d.slug}`}>
                            Plan this trip <ArrowIcon />
                        </Link>
                        <Link className={btn("glass")} href={`/destinations/${d.slug}`}>
                            Discover {d.name}
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
