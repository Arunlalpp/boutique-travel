"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { ArrowIcon, ArrowLeftIcon } from "./Icons";
import { iconBtn, secHead, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

interface RailProps {
    /** Section heading area, rendered left of the controls. */
    head: ReactNode;
    /** Optional row between the heading and the cards (filters). */
    toolbar?: ReactNode;
    label: string;
    children: ReactNode;
    className?: string;
    /** Changes whenever the visible cards change, so the progress bar resets. */
    resetKey?: string;
    /** Controls drawn for the cream "light" section. */
    tone?: "dark" | "light";
}

/**
 * Horizontal card carousel from the prototype: native scroll-snap with
 * arrow buttons, a progress bar, mouse drag-to-scroll (touch scrolls
 * natively) and arrow-key support once the track has focus.
 */
export function Rail({ head, toolbar, label, children, className, resetKey, tone = "dark" }: RailProps) {
    const track = useRef<HTMLDivElement>(null);
    const prev = useRef<HTMLButtonElement>(null);
    const next = useRef<HTMLButtonElement>(null);
    const bar = useRef<HTMLElement>(null);

    const update = useCallback(() => {
        const t = track.current;
        if (!t || !prev.current || !next.current || !bar.current) return;
        const max = t.scrollWidth - t.clientWidth;
        prev.current.disabled = t.scrollLeft < 4;
        next.current.disabled = t.scrollLeft > max - 4;
        const vis = t.clientWidth / Math.max(t.scrollWidth, 1);
        const w = Math.max(vis * 100, 12);
        bar.current.style.width = `${w}%`;
        const travel = 100 / (w / 100) - 100;
        bar.current.style.transform = `translateX(${max > 0 ? (t.scrollLeft / max) * travel : 0}%)`;
    }, []);

    const step = useCallback((dir: 1 | -1) => {
        const t = track.current;
        if (!t) return;
        const card = t.firstElementChild as HTMLElement | null;
        const w = card ? card.getBoundingClientRect().width + 20 : 300;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        t.scrollBy({ left: dir * w * Math.max(1, Math.floor(t.clientWidth / w)), behavior: reduce ? "auto" : "smooth" });
    }, []);

    useEffect(() => {
        const t = track.current;
        if (!t) return;
        t.scrollLeft = 0;
        update();
        t.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);

        let down = false;
        let moved = false;
        let startX = 0;
        let startLeft = 0;
        const onDown = (e: PointerEvent) => {
            if (e.pointerType !== "mouse" || e.button !== 0) return;
            down = true;
            moved = false;
            startX = e.clientX;
            startLeft = t.scrollLeft;
        };
        const onMove = (e: PointerEvent) => {
            if (!down) return;
            const dx = e.clientX - startX;
            if (Math.abs(dx) > 6) {
                moved = true;
                t.dataset.drag = "";
            }
            if (moved) t.scrollLeft = startLeft - dx;
        };
        const onUp = () => {
            if (!down) return;
            down = false;
            setTimeout(() => delete t.dataset.drag, 0);
        };
        const onClick = (e: MouseEvent) => {
            if (moved) {
                e.preventDefault();
                e.stopPropagation();
                moved = false;
            }
        };
        t.addEventListener("pointerdown", onDown);
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        t.addEventListener("click", onClick, true);

        return () => {
            t.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
            t.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
            t.removeEventListener("click", onClick, true);
        };
    }, [update, resetKey]);

    const ctrlBtn = cn(
        iconBtn,
        "border",
        tone === "dark" ? "border-line-2" : "border-cream-ink/20 text-cream-ink hover:bg-cream-ink/6",
    );

    return (
        <div className={cn("relative", className)}>
            <div className={cn(wrap, secHead)}>
                {head}
                <div className="flex items-center gap-3.5">
                    <div
                        aria-hidden
                        className={cn("h-[3px] w-[120px] overflow-hidden rounded-full", tone === "dark" ? "bg-white/14" : "bg-cream-ink/12")}
                    >
                        <i ref={bar} className="block h-full w-[30%] rounded-full bg-ember transition-[transform,width] duration-200" />
                    </div>
                    <button ref={prev} type="button" className={ctrlBtn} onClick={() => step(-1)} aria-label="Scroll left">
                        <ArrowLeftIcon />
                    </button>
                    <button ref={next} type="button" className={ctrlBtn} onClick={() => step(1)} aria-label="Scroll right">
                        <ArrowIcon />
                    </button>
                </div>
            </div>
            {toolbar}
            <div className="relative">
                <div
                    ref={track}
                    className={cn(
                        "flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pt-2 pb-7 scrollbar-none",
                        "scroll-px-(--gutter) px-[max(var(--gutter),calc((100%-1240px)/2+var(--gutter)))]",
                        "*:shrink-0 *:snap-start data-drag:cursor-grabbing data-drag:snap-none data-drag:**:pointer-events-none",
                    )}
                    role="region"
                    aria-label={label}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.target !== e.currentTarget) return;
                        if (e.key === "ArrowRight") {
                            e.preventDefault();
                            step(1);
                        }
                        if (e.key === "ArrowLeft") {
                            e.preventDefault();
                            step(-1);
                        }
                    }}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
