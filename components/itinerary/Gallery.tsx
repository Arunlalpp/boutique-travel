"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon, ArrowLeftIcon, ExpandIcon, XIcon } from "@/components/ui/Icons";
import type { ImageAsset } from "@/lib/types";
import { SmartImage } from "@/components/ui/SmartImage";
import { iconBtn, mono, wrap } from "@/lib/ui";
import { cn, pad } from "@/lib/utils";

const spans = [
    "md:col-span-8 aspect-[16/10]",
    "md:col-span-4 aspect-[4/5] md:aspect-auto",
    "md:col-span-5 aspect-[4/5]",
    "md:col-span-7 aspect-[4/3] md:aspect-auto",
];

export function Gallery({ images, title }: { images: ImageAsset[]; title: string }) {
    const [active, setActive] = useState<number | null>(null);
    const closeBtn = useRef<HTMLButtonElement>(null);
    const lastTrigger = useRef<HTMLButtonElement | null>(null);

    const close = useCallback(() => {
        setActive(null);
        lastTrigger.current?.focus();
    }, []);
    const step = useCallback(
        (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + images.length) % images.length)),
        [images.length],
    );

    useEffect(() => {
        if (active === null) return;
        closeBtn.current?.focus();
        document.documentElement.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.documentElement.style.overflow = "";
        };
    }, [active, close, step]);

    return (
        <>
            <ul className="grid gap-4 md:grid-cols-12 md:gap-6">
                {images.map((image, i) => (
                    <li
                        key={image.src + i}
                        data-reveal="mask"
                        className={cn("relative overflow-hidden rounded-[24px] bg-paper-3 md:min-h-80", spans[i % spans.length])}
                    >
                        <button
                            type="button"
                            onClick={(e) => {
                                lastTrigger.current = e.currentTarget;
                                setActive(i);
                            }}
                            data-cursor="view"
                            className="group absolute inset-0 overflow-hidden"
                            aria-label={`Open image ${i + 1} of ${images.length}: ${image.alt}`}
                        >
                            <SmartImage
                                image={image}
                                sizes="(min-width: 768px) 60vw, 100vw"
                                className="transition-transform duration-[1600ms] ease-soft group-hover:scale-[1.03]"
                            />
                            <span className="glass-strong absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                                <ExpandIcon className="size-4" />
                            </span>
                        </button>
                    </li>
                ))}
            </ul>

            {active !== null && (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${title} — gallery`}
                    className="fixed inset-0 z-130 flex flex-col bg-paper/95 text-ink backdrop-blur-xl"
                    onClick={(e) => e.target === e.currentTarget && close()}
                >
                    <div className={cn(wrap, "flex h-20 items-center justify-between")}>
                        <p className={cn(mono, "text-dim")}>
                            {pad(active + 1)} / {pad(images.length)}
                        </p>
                        <button
                            ref={closeBtn}
                            type="button"
                            onClick={close}
                            aria-label="Close gallery"
                            className={cn(iconBtn, "glass")}
                        >
                            <XIcon />
                        </button>
                    </div>

                    <div className="relative mx-4 mb-4 flex-1 md:mx-24">
                        <SmartImage key={active} image={images[active]} sizes="100vw" className="!object-contain" />
                    </div>

                    <div className={cn(wrap, "flex items-center justify-between gap-6 pb-8")}>
                        <p className="max-w-xl text-sm text-mist">{images[active].alt}</p>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => step(-1)}
                                aria-label="Previous image"
                                className={cn(iconBtn, "glass")}
                            >
                                <ArrowLeftIcon />
                            </button>
                            <button
                                type="button"
                                onClick={() => step(1)}
                                aria-label="Next image"
                                className={cn(iconBtn, "glass")}
                            >
                                <ArrowIcon />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
