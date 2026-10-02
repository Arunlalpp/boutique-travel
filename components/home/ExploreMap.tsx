"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { DestinationCard } from "@/lib/types";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/** Illustrative pin positions on the stylised trail map (percent of width/height). */
const PIN_POSITIONS = [
    { x: 42, y: 58 },
    { x: 14, y: 84 },
    { x: 64, y: 32 },
    { x: 76, y: 14 },
    { x: 24, y: 30 },
    { x: 82, y: 66 },
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

    return (
        <section className="sec" aria-labelledby="explore-title">
            <div className="wrap explore-grid">
                <Reveal>
                    <div className="map glass shadow-deep" data-reveal>
                        <svg className="trail" viewBox="0 0 600 500" preserveAspectRatio="none" aria-hidden>
                            <g stroke="rgba(255,255,255,.06)">
                                <path d="M0 100H600M0 200H600M0 300H600M0 400H600M100 0V500M200 0V500M300 0V500M400 0V500M500 0V500" />
                            </g>
                            <path
                                d="M70 430 C150 380 120 300 220 290 C320 280 300 170 400 160 C480 150 500 100 545 70"
                                stroke="var(--color-ember)"
                                strokeWidth="2"
                                strokeDasharray="6 8"
                                fill="none"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="0"
                                    to="-56"
                                    dur="3s"
                                    repeatCount="indefinite"
                                />
                            </path>
                            <g fill="none" stroke="rgba(255,255,255,.08)">
                                <path d="M340 380c40-30 120-20 150 20s-20 80-80 70-110-60-70-90z" />
                                <path d="M80 120c30-40 110-40 130 0s-40 70-90 60-60-30-40-60z" />
                            </g>
                        </svg>
                        <div className="coord">
                            <h3>{spots[active].name}</h3>
                            <span className="mono text-dim">
                                {spots[active].region} · {spots[active].country}
                            </span>
                        </div>
                        {spots.map((s, k) => (
                            <button
                                key={s.slug}
                                type="button"
                                className="pin glass-strong"
                                style={{ left: `${PIN_POSITIONS[k].x}%`, top: `${PIN_POSITIONS[k].y}%` }}
                                aria-pressed={k === active}
                                aria-label={`Show ${s.name}`}
                                onClick={() => show(k)}
                            >
                                <span className="d" />
                                <span>{s.name}</span>
                            </button>
                        ))}
                    </div>
                </Reveal>

                <Reveal className="spot-detail">
                    <span className="eyebrow" data-reveal>
                        Destinations
                    </span>
                    <h2 id="explore-title" className="h-lg" data-reveal>
                        Explore special places to wake up
                    </h2>
                    <div className={cn("swap", out && "out")} aria-live="polite">
                        <h3 className="h-md mb-2.5">{d.name}</h3>
                        <p className="lede">{d.shortDescription}</p>
                    </div>
                    <div className={cn("facts swap", out && "out")}>
                        <div className="fact">
                            <div className="k">Region</div>
                            <div className="v">{d.region}</div>
                        </div>
                        <div className="fact">
                            <div className="k">Country</div>
                            <div className="v">{d.country}</div>
                        </div>
                        <div className="fact">
                            <div className="k">Journeys</div>
                            <div className="v">{d.journeyCount || "Bespoke"}</div>
                        </div>
                    </div>
                    <div className={cn("thumbs swap", out && "out")}>
                        {thumbs.slice(0, 2).map((img, i) => (
                            <div key={img.src + i} className="thumb">
                                <SmartImage image={img} sizes="(min-width: 900px) 260px, 45vw" quality={70} />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        <Link className="btn btn-ember" href={`/enquire?destination=${d.slug}`}>
                            Plan this trip <ArrowIcon />
                        </Link>
                        <Link className="btn btn-glass" href={`/destinations/${d.slug}`}>
                            Discover {d.name}
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
