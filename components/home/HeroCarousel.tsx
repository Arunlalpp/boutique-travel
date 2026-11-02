"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { HeroSlide } from "@/lib/data/home";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon, ArrowLeftIcon } from "@/components/ui/Icons";
import { btn, eyebrow as eyebrowClass, hXl, iconBtn, lede, mediaFill, wrap } from "@/lib/ui";
import { cn, pad } from "@/lib/utils";

/** Must match --animate-dot-fill in app/globals.css. */
const DURATION = 6500;

export function HeroCarousel({ slides, eyebrow }: { slides: HeroSlide[]; eyebrow: string }) {
    const root = useRef<HTMLElement>(null);
    const [index, setIndex] = useState(0);
    const [shown, setShown] = useState(0);
    const [changing, setChanging] = useState(false);
    const [paused, setPaused] = useState(false);
    const [cycle, setCycle] = useState(0);
    // Only fetch a slide's photo once it is current or next up.
    const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0, 1]));
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
            setLoaded((prev) => (prev.has(next) && prev.has((next + 1) % count) ? prev : new Set([...prev, next, (next + 1) % count])));
            setCycle((c) => c + 1);
            setChanging(true);
            window.setTimeout(() => {
                setShown(next);
                setChanging(false);
            }, 380);
        },
        [count, index],
    );

    useEffect(() => {
        if (paused || reduced.current || count < 2) return;
        const t = window.setTimeout(() => go(index + 1), DURATION);
        return () => window.clearTimeout(t);
    }, [index, paused, go, count, cycle]);

    const slide = slides[shown];
    const textAnim = cn(
        "transition-[opacity,translate] duration-700 ease-soft",
        changing ? "translate-y-3.5 opacity-0" : "translate-y-0 opacity-100",
    );

    return (
        <section
            ref={root}
            className="group/hero relative isolate min-h-[760px] overflow-hidden pb-[104px] max-tab:min-h-[640px]"
            data-paused={paused || undefined}
            aria-roledescription="carousel"
            aria-label="Featured adventures"
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
                    <div
                        key={s.title}
                        className={cn(
                            "absolute inset-0 transition-[opacity,visibility] duration-1000 ease-soft",
                            k === index ? "visible opacity-100" : "invisible opacity-0",
                        )}
                    >
                        <div
                            className={cn(
                                mediaFill,
                                "transition-transform ease-linear",
                                k === index ? "scale-100 duration-[7000ms]" : "scale-[1.08] duration-0",
                            )}
                        >
                            {loaded.has(k) && <SmartImage image={s.image} sizes="100vw" priority={k === 0} quality={80} />}
                        </div>
                        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_30%,rgb(8_12_22/0.35),rgb(8_12_22/0.75))]" />
                    </div>
                ))}
            </div>
            <StarField root={root} />
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-[260px] bg-linear-to-b from-transparent to-night" />

            <div className={cn(wrap, "relative z-2 grid justify-items-center gap-5 pt-[170px] text-center max-tab:pt-[120px]")}>
                <span className={eyebrowClass}>{eyebrow}</span>
                <div className="grid justify-items-center gap-[18px]" aria-live="polite">
                    <h1 className={cn(hXl, "max-w-[14ch]", textAnim)}>{slide.title}</h1>
                    <p className={cn("font-display text-[clamp(20px,2.4vw,28px)] text-ember-soft italic", textAnim)}>{slide.sub}</p>
                    <p className={cn(lede, "text-center", textAnim)}>{slide.lede}</p>
                    {slide.href && (
                        <Link href={slide.href} className={cn(btn("glass", "sm"), textAnim)}>
                            See the journey <ArrowIcon />
                        </Link>
                    )}
                </div>
            </div>

            {count > 1 && (
                <div className={cn(wrap, "relative z-3 mt-[150px] flex items-center justify-between gap-5 max-tab:mt-[70px]")}>
                    <div className="flex items-center gap-3.5 text-[13px] text-mist max-tab:hidden">
                        <b className="font-mono font-medium text-fg">
                            {pad(shown + 1)} / {pad(count)}
                        </b>
                        <span>{slide.place}</span>
                    </div>
                    <div className="flex items-center gap-2.5" role="group" aria-label="Choose slide">
                        {slides.map((s, k) => (
                            <button
                                key={`${s.title}-${k === index ? cycle : 0}`}
                                type="button"
                                className="relative h-1 w-[46px] overflow-hidden rounded-full bg-white/22 after:absolute after:-inset-y-3 after:inset-x-0"
                                aria-label={`Slide ${k + 1}: ${s.sub}`}
                                aria-current={k === index}
                                onClick={() => go(k)}
                            >
                                <i
                                    className={cn(
                                        "absolute inset-0 origin-left bg-ember",
                                        k < index ? "scale-x-100" : "scale-x-0",
                                        k === index && "animate-dot-fill group-data-paused/hero:[animation-play-state:paused]",
                                    )}
                                />
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button type="button" className={cn(iconBtn, "glass")} onClick={() => go(index - 1)} aria-label="Previous slide">
                            <ArrowLeftIcon />
                        </button>
                        <button type="button" className={cn(iconBtn, "glass")} onClick={() => go(index + 1)} aria-label="Next slide">
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
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
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
            if (reduce || e.pointerType !== "mouse") return;
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

    return (
        <canvas
            ref={canvas}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 size-full transition-transform duration-[600ms] ease-soft"
        />
    );
}
