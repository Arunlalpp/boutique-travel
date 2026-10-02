"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { ArrowIcon, ArrowLeftIcon } from "./Icons";
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
}

/**
 * Horizontal card carousel from the prototype: native scroll-snap with
 * arrow buttons, a progress bar, mouse drag-to-scroll (touch scrolls
 * natively) and arrow-key support once the track has focus.
 */
export function Rail({ head, toolbar, label, children, className, resetKey }: RailProps) {
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
                t.classList.add("drag");
            }
            if (moved) t.scrollLeft = startLeft - dx;
        };
        const onUp = () => {
            if (!down) return;
            down = false;
            setTimeout(() => t.classList.remove("drag"), 0);
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

    return (
        <div className={cn("relative", className)}>
            <div className="wrap sec-head">
                {head}
                <div className="rail-ctrl">
                    <div className="progress" aria-hidden>
                        <i ref={bar} />
                    </div>
                    <button ref={prev} type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Scroll left">
                        <ArrowLeftIcon />
                    </button>
                    <button ref={next} type="button" className="icon-btn" onClick={() => step(1)} aria-label="Scroll right">
                        <ArrowIcon />
                    </button>
                </div>
            </div>
            {toolbar}
            <div className="rail">
                <div
                    ref={track}
                    className="track"
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
