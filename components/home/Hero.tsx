"use client";

import { useRef } from "react";
import { gsap, useGSAP, motion } from "@/lib/gsap";
import type { ImageAsset } from "@/lib/types";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/ButtonLink";

interface HeroProps {
    image: ImageAsset;
    videoSrc?: string;
    eyebrow: string;
    lines: React.ReactNode[];
    tagline: string;
}

export function Hero({ image, videoSrc, eyebrow, lines, tagline }: HeroProps) {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(motion.full, () => {
                const tl = gsap.timeline({ defaults: { ease: motion.ease } });
                tl.fromTo("[data-hero-media]", { scale: 1.12 }, { scale: 1, duration: 2.8, ease: "power2.out" }, 0)
                    .fromTo(
                        "[data-hero-line]",
                        { yPercent: 110, y: 0 },
                        { yPercent: 0, y: 0, duration: 1.6, stagger: 0.12 },
                        0.3,
                    )
                    .fromTo(
                        "[data-hero-fade]",
                        { opacity: 0, y: 16 },
                        { opacity: 1, y: 0, duration: 1.4, stagger: 0.1 },
                        0.9,
                    );

                gsap.to("[data-hero-media]", {
                    yPercent: 12,
                    ease: "none",
                    scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
                });
            });
        },
        { scope: root },
    );

    return (
        <section
            ref={root}
            aria-label="Introduction"
            className="relative flex min-h-[640px] h-[100svh] items-end overflow-hidden bg-night text-paper"
        >
            <div data-hero-media className="absolute inset-0 origin-center will-change-transform">
                {videoSrc ? (
                    <video
                        className="absolute inset-0 size-full object-cover"
                        src={videoSrc}
                        poster={image.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-hidden
                    />
                ) : (
                    <SmartImage image={image} sizes="100vw" priority />
                )}
            </div>

            <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night/50 to-transparent" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-transparent" />

            <div className="container-x relative pb-14 md:pb-20">
                <p data-hero-fade className="eyebrow mb-8 text-paper/75">
                    {eyebrow}
                </p>
                <h1 className="max-w-5xl text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.98]">
                    {lines.map((line, i) => (
                        <span key={i} className="block overflow-hidden pb-[0.08em]">
                            <span data-hero-line className="block">
                                {line}
                            </span>
                        </span>
                    ))}
                </h1>

                <div className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
                    <p data-hero-fade className="max-w-md text-base text-paper/80 md:text-lg">
                        {tagline}
                    </p>
                    <div data-hero-fade className="flex flex-wrap gap-4">
                        <ButtonLink href="/enquire" inverse>
                            Plan a journey
                        </ButtonLink>
                        <ButtonLink href="/itineraries" variant="outline" inverse>
                            Explore journeys
                        </ButtonLink>
                    </div>
                </div>

                <div data-hero-fade className="mt-14 hidden items-center gap-4 text-paper/50 md:flex" aria-hidden>
                    <span className="eyebrow">Scroll</span>
                    <span className="relative h-px w-16 overflow-hidden bg-paper/20">
                        <span className="absolute inset-y-0 left-0 w-1/2 animate-[scrollcue_2.4s_ease-in-out_infinite] bg-paper/80" />
                    </span>
                </div>
            </div>
        </section>
    );
}
