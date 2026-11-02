"use client";

import Link from "next/link";
import { useState } from "react";
import { experiences } from "@/lib/data/home";
import { money } from "@/lib/format";
import { Rail } from "@/components/ui/Rail";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon, ClockIcon, StarIcon } from "@/components/ui/Icons";
import { btn, chip, eyebrow, hLg, lede, mediaFill, pill, price, sec, secHeadTitle, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

const categories = ["All", ...Array.from(new Set(experiences.map((e) => e.category)))];

export function ExperiencesRail() {
    const [category, setCategory] = useState("All");
    const list = experiences.filter((e) => category === "All" || e.category === category);

    return (
        <section className={cn(sec, "overflow-hidden bg-cream text-cream-ink")} aria-labelledby="exp-title">
            <div aria-hidden className="pointer-events-none absolute top-[120px] -left-40 size-[520px] rounded-full bg-[#F2B46A] opacity-50 blur-[60px]" />
            <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 size-[520px] rounded-full bg-[#9CC3D9] opacity-50 blur-[60px]" />
            <Rail
                label="Experiences"
                resetKey={category}
                tone="light"
                head={
                    <div className={secHeadTitle}>
                        <span className={cn(eyebrow, "text-ember-deep!")}>Experiences</span>
                        <h2 id="exp-title" className={hLg}>
                            Top things to do
                        </h2>
                        <p className={cn(lede, "text-cream-mist!")}>
                            Hand-crafted experiences for every kind of explorer. Filter by what you’re in the mood for.
                        </p>
                    </div>
                }
                toolbar={
                    <div className={cn(wrap, "relative mb-[26px] flex flex-wrap gap-2.5")} role="group" aria-label="Filter experiences">
                        {categories.map((c) => (
                            <button
                                key={c}
                                type="button"
                                className={chip("light")}
                                aria-pressed={c === category}
                                onClick={() => setCategory(c)}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                }
            >
                {list.map((e) => (
                    <article
                        key={e.name}
                        className="group flex w-[clamp(280px,32vw,400px)] flex-col overflow-hidden rounded-[28px] border border-white/90 bg-white/62 shadow-[0_30px_60px_-30px_rgb(80_50_20/0.35)] backdrop-blur-2xl transition-[translate,box-shadow] duration-500 hover:-translate-y-2 hover:shadow-[0_40px_70px_-30px_rgb(80_50_20/0.45)]"
                    >
                        <div className="relative aspect-16/10 overflow-hidden bg-[#e8dccb]">
                            <div className={cn(mediaFill, "transition-transform duration-[900ms] ease-soft group-hover:scale-[1.06]")}>
                                <SmartImage image={e.image} sizes="(min-width: 860px) 400px, 85vw" tone="light" />
                            </div>
                            <span className={cn(pill, "absolute top-3.5 left-3.5 z-2 bg-white/75 text-cream-ink backdrop-blur-md")}>
                                {e.category}
                            </span>
                        </div>
                        <div className="grid flex-1 gap-3 px-6 pt-[22px] pb-6">
                            <h3 className="text-[26px]">{e.name}</h3>
                            <div className="flex gap-[3px] text-[#e08a2a] [&_svg]:size-3.5" role="img" aria-label="Rated 5 out of 5">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <StarIcon key={i} />
                                ))}
                            </div>
                            <p className="text-sm text-cream-mist">{e.description}</p>
                            <span className="flex items-center gap-1.5 text-[13px] text-cream-mist [&_svg]:size-3.5">
                                <ClockIcon />
                                {e.meta}
                            </span>
                            <div className="mt-auto flex items-center justify-between gap-3 pt-1.5">
                                <span className={price}>
                                    {money(e.price)} <small className="text-xs font-normal text-cream-mist">{e.unit}</small>
                                </span>
                                <Link
                                    className={btn("dark", "sm")}
                                    href={`/enquire?experience=${encodeURIComponent(e.name)}`}
                                    aria-label={`Ask about ${e.name}`}
                                >
                                    Enquire <ArrowIcon />
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </Rail>
        </section>
    );
}
