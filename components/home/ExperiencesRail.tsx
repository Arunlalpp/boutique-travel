"use client";

import Link from "next/link";
import { useState } from "react";
import { experiences } from "@/lib/data/home";
import { money } from "@/lib/format";
import { Rail } from "@/components/ui/Rail";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon, ClockIcon, StarIcon } from "@/components/ui/Icons";

const categories = ["All", ...Array.from(new Set(experiences.map((e) => e.category)))];

export function ExperiencesRail() {
    const [category, setCategory] = useState("All");
    const list = experiences.filter((e) => category === "All" || e.category === category);

    return (
        <section className="sec light" aria-labelledby="exp-title">
            <div aria-hidden className="blob" style={{ width: 520, height: 520, background: "#F2B46A", left: -160, top: 120 }} />
            <div aria-hidden className="blob" style={{ width: 520, height: 520, background: "#9CC3D9", right: -160, bottom: 0 }} />
            <Rail
                label="Experiences"
                resetKey={category}
                head={
                    <div className="t">
                        <span className="eyebrow">Experiences</span>
                        <h2 id="exp-title" className="h-lg">
                            Top things to do
                        </h2>
                        <p className="lede">
                            Hand-crafted experiences for every kind of explorer. Filter by what you’re in the mood for.
                        </p>
                    </div>
                }
                toolbar={
                    <div className="wrap exp-filters relative mb-[26px]" role="group" aria-label="Filter experiences">
                        {categories.map((c) => (
                            <button
                                key={c}
                                type="button"
                                className="chip"
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
                    <article key={e.name} className="exp">
                        <div className="ph">
                            <div className="media-fill">
                                <SmartImage image={e.image} sizes="(min-width: 860px) 400px, 85vw" tone="light" />
                            </div>
                            <span className="pill">{e.category}</span>
                        </div>
                        <div className="bd">
                            <h3>{e.name}</h3>
                            <div className="stars-row" role="img" aria-label="Rated 5 out of 5">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <StarIcon key={i} />
                                ))}
                            </div>
                            <p>{e.description}</p>
                            <div className="meta">
                                <span>
                                    <ClockIcon />
                                    {e.meta}
                                </span>
                            </div>
                            <div className="ft">
                                <span className="price">
                                    {money(e.price)} <small>{e.unit}</small>
                                </span>
                                <Link
                                    className="btn btn-dark btn-sm"
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
