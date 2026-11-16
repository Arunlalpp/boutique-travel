"use client";

import { useEffect, useRef, useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import { frames } from "@/lib/data/ledger";
import { display, h2, label, lsec, lwrap, photo, typedItalic, underlineLink } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { Footprints } from "./Footprints";
import { Chevron } from "./icons";

const shapes = { portrait: "aspect-[7/10]", wide: "aspect-[21/20]", square: "aspect-[3/4]" };

/** Photo strip you can drag (mouse) or swipe (touch), with a progress line under it. */
function DragStrip() {
    const track = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState({ width: 40, left: 0 });

    useEffect(() => {
        const t = track.current;
        if (!t) return;
        const update = () => {
            const max = t.scrollWidth - t.clientWidth;
            const width = Math.max((t.clientWidth / Math.max(t.scrollWidth, 1)) * 100, 12);
            setProgress({ width, left: max > 0 ? (t.scrollLeft / max) * (100 - width) : 0 });
        };
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
            if (Math.abs(dx) > 5) {
                moved = true;
                t.dataset.drag = "";
            }
            if (moved) t.scrollLeft = startLeft - dx;
        };
        const onUp = () => {
            down = false;
            delete t.dataset.drag;
        };
        update();
        t.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        t.addEventListener("pointerdown", onDown);
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
        return () => {
            t.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
            t.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
        };
    }, []);

    const pad = "px-[max(clamp(20px,5vw,48px),calc((100%-1200px)/2+clamp(20px,5vw,48px)))]";

    return (
        <div className="mt-12">
            <div
                ref={track}
                tabIndex={0}
                role="region"
                aria-label="Frames from the road"
                className={cn(
                    "flex cursor-grab gap-4 overflow-x-auto pb-4 scrollbar-none select-none data-drag:cursor-grabbing [&_img]:pointer-events-none",
                    pad,
                )}
                onKeyDown={(e) => {
                    if (e.key === "ArrowRight") track.current?.scrollBy({ left: 320, behavior: "smooth" });
                    if (e.key === "ArrowLeft") track.current?.scrollBy({ left: -320, behavior: "smooth" });
                }}
            >
                {frames.photos.map((f) => (
                    <figure key={f.note} className="grid shrink-0 gap-2.5">
                        <div className={cn(photo, shapes[f.shape], "h-[clamp(260px,30vw,380px)]")}>
                            <SmartImage image={f.image} sizes="(min-width: 1024px) 420px, 70vw" />
                        </div>
                        <figcaption className="font-type text-[12px] text-ledger-ink/75 italic">{f.note}</figcaption>
                    </figure>
                ))}
            </div>
            <div className={lwrap} aria-hidden>
                <div className="relative h-0.5 bg-ledger-ink/12">
                    <span
                        className="absolute inset-y-0 bg-ledger-ink/70 transition-[left,width] duration-150"
                        style={{ width: `${progress.width}%`, left: `${progress.left}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

export function FramesAndHosts() {
    const [howOpen, setHowOpen] = useState(false);

    return (
        <section className={cn(lsec, "overflow-hidden bg-ledger-paper text-ledger-ink")} aria-labelledby="frames-title">
            <div className={lwrap}>
                <Footprints step={4} className="mb-6 text-ledger-grey" />
                <div className="grid max-w-[640px] gap-4">
                    <h2 id="frames-title" className={h2}>
                        {frames.title}
                    </h2>
                    <p className={cn(typedItalic, "text-ledger-ink/80")}>{frames.lede}</p>
                </div>
            </div>

            <DragStrip />

            <div id="hosts" className={cn(lwrap, "mt-20 scroll-mt-24")}>
                <h3 className={cn(label, "text-ledger-ink/70")}>Meet your hosts</h3>
                <ul className="mt-8 grid grid-cols-4 gap-x-6 gap-y-10 max-md:grid-cols-2">
                    {frames.hosts.map((h) => (
                        <li key={h.role} className="grid justify-items-center gap-3 text-center">
                            <span className={cn(photo, "size-[clamp(104px,11vw,132px)] rounded-full")}>
                                <SmartImage image={h.image} sizes="132px" quality={70} />
                            </span>
                            <b className={cn(display, "text-[14px] tracking-[0.04em] normal-case")}>{h.name}</b>
                            <span className="-mt-2 font-type text-[12px] text-ledger-grey">{h.role}</span>
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    className={cn(underlineLink, "mt-12")}
                    aria-expanded={howOpen}
                    aria-controls="hosts-how"
                    onClick={() => setHowOpen(!howOpen)}
                >
                    How we work with our hosts{" "}
                    <Chevron className={cn("transition-transform", howOpen && "rotate-180")} />
                </button>
                <div id="hosts-how" hidden={!howOpen} className="mt-6 grid max-w-[640px] gap-4">
                    <p className={cn(typedItalic, "text-ledger-ink/80")}>
                        [Placeholder] Every host is someone we have stayed with ourselves. We pay hosts directly and
                        fairly, agree group sizes with them in advance, and never bring more guests than a home or
                        village can welcome on its own terms.
                    </p>
                </div>
            </div>
        </section>
    );
}
