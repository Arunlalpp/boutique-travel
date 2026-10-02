"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HeroSlide } from "@/lib/data/home";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon, ArrowLeftIcon } from "@/components/ui/Icons";
import { cn, pad } from "@/lib/utils";

const DURATION = 6500;

export function HeroCarousel({ slides, eyebrow }: { slides: HeroSlide[]; eyebrow: string }) {
    const root = useRef<HTMLElement>(null);
    const [index, setIndex] = useState(0);
    const [shown, setShown] = useState(0);
    const [changing, setChanging] = useState(false);
    const [paused, setPaused] = useState(false);
    const [cycle, setCycle] = useState(0);
    const reduced = useRef(false);
    const swipeX = useRef<number | null>(null);
    const count = slides.length;

    useEffect(() => {
        reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }, []);

    const go = useCallback(
        (n: number) => {
            const next = (n + count) % count;
            if (next === index) return;
            setIndex(next);
            setCycle((c) => c + 1);
            setChanging(true);
            window.setTimeout(() => {
                setShown(next);
                setChanging(false);
            }, 380);
        },
        [count, index],
    );

    // Autoplay: restarts whenever the slide changes or hover-pause ends.
    useEffect(() => {
        if (paused || reduced.current || count < 2) return;
        const t = window.setTimeout(() => go(index + 1), DURATION);
        return () => window.clearTimeout(t);
    }, [index, paused, go, count, cycle]);

    const slide = slides[shown];

    return (
        <section
            ref={root}
            className={cn("hero", changing && "changing", paused && "paused")}
            aria-roledescription="carousel"
            aria-label="Featured adventures"
            style={{ ["--dur" as string]: `${DURATION}ms` }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => {
                setPaused(false);
                setCycle((c) => c + 1);
            }}
            onPointerDown={(e) => {
                if ((e.target as HTMLElement).closest("button,a")) return;
                swipeX.current = e.clientX;
            }}
            onPointerUp={(e) => {
                if (swipeX.current === null) return;
                const dx = e.clientX - swipeX.current;
                if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
                swipeX.current = null;
            }}
            onKeyDown={(e) => {
                if (e.key === "ArrowRight") go(index + 1);
                if (e.key === "ArrowLeft") go(index - 1);
            }}
        >
            <div aria-hidden>
                {slides.map((s, k) => (
                    <div key={s.title} className={cn("slide", k === index && "on")}>
                        <div className="media-fill">
                            <SmartImage image={s.image} sizes="100vw" priority={k === 0} quality={80} />
                        </div>
                    </div>
                ))}
            </div>
            <StarField root={root} />

            <div className="wrap hero-copy">
                <span className="eyebrow">{eyebrow}</span>
                <div className="slide-text" aria-live="polite">
                    <h1 className="h-xl">{slide.title}</h1>
                    <p className="sub">{slide.sub}</p>
                    <p className="lede">{slide.lede}</p>
                    {slide.href && (
                        <Link href={slide.href} className="btn btn-glass btn-sm">
                            See the journey <ArrowIcon />
                        </Link>
                    )}
                </div>
            </div>

            {count > 1 && (
                <div className="wrap hero-ctrl">
                    <div className="slide-label">
                        <b>
                            {pad(shown + 1)} / {pad(count)}
                        </b>
                        <span>{slide.place}</span>
                    </div>
                    <div className="dots" role="group" aria-label="Choose slide">
                        {slides.map((s, k) => (
                            <button
                                key={`${s.title}-${k === index ? cycle : 0}`}
                                type="button"
                                className={cn("dot", k === index && "on", k < index && "done")}
                                aria-label={`Slide ${k + 1}: ${s.sub}`}
                                aria-current={k === index}
                                onClick={() => go(k)}
                            >
                                <i />
                            </button>
                        ))}
                    </div>
                    <div className="arrows">
                        <button type="button" className="icon-btn" onClick={() => go(index - 1)} aria-label="Previous slide">
                            <ArrowLeftIcon />
                        </button>
                        <button type="button" className="icon-btn" onClick={() => go(index + 1)} aria-label="Next slide">
                            <ArrowIcon />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

/** Twinkling star canvas with a gentle mouse parallax, as in the prototype. */
function StarField({ root }: { root: React.RefObject<HTMLElement | null> }) {
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const c = canvas.current;
        const host = root.current;
        const ctx = c?.getContext("2d");
        if (!c || !host || !ctx) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let w = 0;
        let h = 0;
        let raf = 0;
        let stars: { x: number; y: number; r: number; p: number; s: number }[] = [];

        const size = () => {
            const r = c.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            w = c.width = r.width * dpr;
            h = c.height = r.height * dpr;
            stars = Array.from({ length: 110 }, () => ({
                x: Math.random() * w,
                y: Math.random() * h * 0.6,
                r: (Math.random() * 1.2 + 0.3) * dpr,
                p: Math.random() * 6.28,
                s: Math.random() * 0.02 + 0.005,
            }));
        };
        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = "#fff";
            for (const s of stars) {
                s.p += s.s;
                ctx.globalAlpha = 0.35 + Math.sin(s.p) * 0.3;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, 6.28);
                ctx.fill();
            }
            if (!reduce) raf = requestAnimationFrame(draw);
        };
        const onMove = (e: PointerEvent) => {
            if (reduce) return;
            const r = host.getBoundingClientRect();
            const dx = (e.clientX - r.left) / r.width - 0.5;
            const dy = (e.clientY - r.top) / r.height - 0.5;
            c.style.transform = `translate(${dx * -18}px,${dy * -12}px)`;
        };
        // Only animate while the hero is on screen.
        const io = new IntersectionObserver(([entry]) => {
            cancelAnimationFrame(raf);
            if (entry.isIntersecting) draw();
        });

        size();
        draw();
        io.observe(host);
        window.addEventListener("resize", size);
        host.addEventListener("pointermove", onMove);
        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            window.removeEventListener("resize", size);
            host.removeEventListener("pointermove", onMove);
        };
    }, [root]);

    return <canvas ref={canvas} className="stars" aria-hidden />;
}
