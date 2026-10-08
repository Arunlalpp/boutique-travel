"use client";

import Link from "next/link";
import { useState } from "react";
import { experiences } from "@/lib/data/home";
import { money } from "@/lib/format";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon, PlusIcon } from "@/components/ui/Icons";
import { eyebrow, frame, hLg, sec, secHead, secHeadTitle, textLink, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** Numbered experience list; one row opens at a time to show its photo and description. */
export function ThingsToDo() {
    const [open, setOpen] = useState(1);

    return (
        <section className={sec} aria-labelledby="todo-title">
            <div className={wrap}>
                <div className={secHead}>
                    <div className={secHeadTitle}>
                        <span className={eyebrow}>Experiences</span>
                        <h2 id="todo-title" className={hLg}>
                            Things to do
                        </h2>
                    </div>
                    <Link href="/packages" className={cn(textLink, "text-[13px]")}>
                        See packages <ArrowIcon />
                    </Link>
                </div>

                <ol className="border-t border-line">
                    {experiences.slice(0, 4).map((e, k) => {
                        const on = open === k;
                        return (
                            <li key={e.name} className="border-b border-line">
                                <button
                                    type="button"
                                    aria-expanded={on}
                                    aria-controls={`todo-${k}`}
                                    onClick={() => setOpen(on ? -1 : k)}
                                    className="group grid w-full grid-cols-[48px_minmax(0,1fr)_140px_140px_40px] items-center gap-4 py-5 text-left max-tab:grid-cols-[32px_minmax(0,1fr)_40px]"
                                >
                                    <span className="self-start pt-2 font-mono text-[11px] text-dim">{String(k + 1).padStart(2, "0")}</span>
                                    <span
                                        className={cn(
                                            "font-display text-[clamp(20px,2.2vw,28px)] font-light tracking-[-0.02em] transition-colors",
                                            on ? "text-accent" : "group-hover:text-accent",
                                        )}
                                    >
                                        {e.name}
                                    </span>
                                    <span className="text-xs text-dim max-tab:hidden">{e.meta}</span>
                                    <span className="text-[13px] font-medium tabular-nums max-tab:hidden">
                                        {money(e.price)} <small className="font-normal text-dim">{e.unit}</small>
                                    </span>
                                    <span
                                        aria-hidden
                                        className={cn(
                                            "grid size-8 place-items-center justify-self-end rounded-full border transition-[rotate,background-color,color,border-color] duration-300 ease-soft [&_svg]:size-3.5",
                                            on ? "rotate-45 border-ink bg-ink text-paper" : "border-line-2",
                                        )}
                                    >
                                        <PlusIcon />
                                    </span>
                                </button>
                                <div
                                    id={`todo-${k}`}
                                    hidden={!on}
                                    className="grid grid-cols-[48px_minmax(0,1fr)_320px_40px] gap-4 pb-6 max-tab:grid-cols-[32px_minmax(0,1fr)]"
                                >
                                    <span />
                                    <div className="grid content-start gap-3">
                                        <p className="max-w-[46ch] text-sm text-mist">{e.description}</p>
                                        <p className="text-[13px] text-dim tab:hidden">
                                            {e.meta} · {money(e.price)} {e.unit}
                                        </p>
                                        <Link
                                            href={`/enquire?experience=${encodeURIComponent(e.name)}`}
                                            className={cn(textLink, "text-[13px]")}
                                            aria-label={`Ask about ${e.name}`}
                                        >
                                            Enquire <ArrowIcon />
                                        </Link>
                                    </div>
                                    <div className={cn(frame, "aspect-16/10 max-tab:col-start-2")}>
                                        <SmartImage image={e.image} sizes="(min-width: 860px) 320px, 80vw" />
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
