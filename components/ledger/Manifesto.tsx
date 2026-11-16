"use client";

import { useEffect, useRef } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { manifesto } from "@/lib/data/ledger";
import { display } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";

/** One sentence on a pale card over a misty photo that drifts slower than the page. */
export function Manifesto() {
    const section = useRef<HTMLElement>(null);
    const layer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let frame = 0;
        const update = () => {
            frame = 0;
            const el = section.current;
            if (!el || !layer.current) return;
            const r = el.getBoundingClientRect();
            // -1 when the band enters from below, +1 when it leaves at the top.
            const progress = ((window.innerHeight - r.top) / (window.innerHeight + r.height)) * 2 - 1;
            layer.current.style.transform = `translate3d(0, ${(progress * 12).toFixed(2)}%, 0)`;
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <section
            id="manifesto"
            ref={section}
            className="relative isolate grid min-h-[min(78svh,640px)] scroll-mt-16 place-items-center overflow-hidden bg-ledger-mist px-[clamp(20px,5vw,48px)] py-24"
        >
            <div ref={layer} className="absolute inset-x-0 -inset-y-[16%] -z-10 will-change-transform">
                <SmartImage image={manifesto.image} sizes="100vw" quality={75} />
                <div className="absolute inset-0 bg-ledger-mist/35" />
            </div>
            <blockquote className="w-full max-w-[720px] bg-ledger-paper/90 px-[clamp(24px,5vw,56px)] py-[clamp(36px,5vw,56px)] text-center backdrop-blur-sm">
                <p className={cn(display, "text-[clamp(28px,4.1vw,48px)] leading-[1.06] text-ledger-ink")}>
                    “{manifesto.quote}”
                </p>
            </blockquote>
        </section>
    );
}
