"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Mode = "default" | "link" | "view" | "drag" | "text";

/** Elements that make the ring grow. `data-cursor="view|drag"` adds a label. */
const INTERACTIVE = "a, button, summary, label, select, [role='button'], [data-cursor]";
const TEXT = "input:not([type='checkbox']):not([type='radio']):not([type='range']), textarea, [contenteditable='true']";

/**
 * Campfire cursor: an ember dot that follows the pointer exactly, and a ring
 * that trails behind it. Only for a real mouse (fine pointer with hover) and
 * when the visitor hasn't asked for reduced motion; everyone else keeps the
 * system cursor. Text fields always show the normal I-beam.
 */
export function Cursor() {
    const dot = useRef<HTMLDivElement>(null);
    const ring = useRef<HTMLDivElement>(null);
    const [enabled, setEnabled] = useState(false);
    const [mode, setMode] = useState<Mode>("default");
    const [visible, setVisible] = useState(false);
    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
        const update = () => setEnabled(query.matches);
        update();
        query.addEventListener("change", update);
        return () => query.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (!enabled) return;
        const root = document.documentElement;
        root.dataset.cursor = "";

        let x = -100;
        let y = -100;
        let rx = x;
        let ry = y;
        let raf = 0;

        const tick = () => {
            // The ring eases towards the pointer; the dot is placed exactly.
            rx += (x - rx) * 0.18;
            ry += (y - ry) * 0.18;
            if (ring.current) ring.current.style.translate = `${rx}px ${ry}px`;
            raf = requestAnimationFrame(tick);
        };

        const onMove = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            x = e.clientX;
            y = e.clientY;
            if (dot.current) dot.current.style.translate = `${x}px ${y}px`;
            setVisible(true);

            const target = e.target as Element | null;
            if (target?.closest(TEXT)) return setMode("text");
            const hit = target?.closest<HTMLElement>(INTERACTIVE);
            const label = hit?.dataset.cursor;
            setMode(label === "view" || label === "drag" ? label : hit ? "link" : "default");
        };
        const onDown = () => setPressed(true);
        const onUp = () => setPressed(false);
        const onLeave = () => setVisible(false);

        raf = requestAnimationFrame(tick);
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerdown", onDown);
        window.addEventListener("pointerup", onUp);
        document.addEventListener("mouseleave", onLeave);
        return () => {
            cancelAnimationFrame(raf);
            delete root.dataset.cursor;
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointerup", onUp);
            document.removeEventListener("mouseleave", onLeave);
        };
    }, [enabled]);

    if (!enabled) return null;

    const labelled = mode === "view" || mode === "drag";
    const hidden = !visible || mode === "text";

    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-200">
            <div
                ref={ring}
                className="absolute top-0 left-0 will-change-[translate]"
            >
                <div
                    className={cn(
                        "grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-[width,height,background-color,border-color,opacity,scale] duration-300 ease-soft",
                        mode === "default" && "size-9 border-fg/45",
                        mode === "link" && "size-14 border-ember/70 bg-ember/10",
                        labelled && "size-[72px] border-transparent bg-ember text-ember-ink",
                        pressed && "scale-85",
                        hidden ? "opacity-0" : "opacity-100",
                    )}
                >
                    <span
                        className={cn(
                            "text-[11px] font-bold tracking-[0.14em] uppercase transition-opacity duration-200",
                            labelled ? "opacity-100" : "opacity-0",
                        )}
                    >
                        {mode === "drag" ? "Drag" : "View"}
                    </span>
                </div>
            </div>
            <div ref={dot} className="absolute top-0 left-0 will-change-[translate]">
                <div
                    className={cn(
                        "size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember shadow-[0_0_12px_2px_rgb(245_158_61/0.6)] transition-[opacity,scale] duration-200",
                        (hidden || labelled) && "opacity-0",
                        mode === "link" && "scale-150",
                    )}
                />
            </div>
        </div>
    );
}
