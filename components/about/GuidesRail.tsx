"use client";

import { useState } from "react";
import type { ImageAsset } from "@/lib/types";
import { Rail } from "@/components/ui/Rail";
import { SmartImage } from "@/components/ui/SmartImage";
import { eyebrow, hLg, mediaFill, pill, secHeadTitle } from "@/lib/ui";
import { cn } from "@/lib/utils";

interface Guide {
    name: string;
    role: string;
    bio: string;
    image: ImageAsset;
}

/** Guide cards reveal a short bio on hover, keyboard focus, or tap. */
export function GuidesRail({ guides }: { guides: Guide[] }) {
    const [open, setOpen] = useState<string | null>(null);

    return (
        <Rail
            label="Our guides"
            head={
                <div className={secHeadTitle}>
                    <span className={eyebrow}>Meet the guides</span>
                    <h2 id="guides-title" className={hLg}>
                        The people behind the campfire
                    </h2>
                </div>
            }
        >
            {guides.map((g) => (
                <button
                    key={g.name}
                    type="button"
                    className="group relative isolate aspect-[3/4.2] w-[clamp(240px,24vw,300px)] max-w-full overflow-hidden rounded-[28px] bg-night-3 text-left shadow-deep"
                    aria-expanded={open === g.name}
                    onClick={() => setOpen(open === g.name ? null : g.name)}
                >
                    <span className={mediaFill}>
                        <SmartImage image={g.image} sizes="(min-width: 1024px) 300px, 70vw" />
                    </span>
                    <span className={cn(pill, "glass-strong absolute top-3.5 left-3.5 z-2 bg-night/45!")}>{g.role}</span>
                    <span className="glass-strong absolute inset-x-3 bottom-3 z-2 block rounded-[20px] px-4.5 py-3.5">
                        <b className="block text-[17px]">{g.name}</b>
                        <span className="text-[13px] text-mist">{g.role}</span>
                        <span className="block max-h-0 overflow-hidden text-[13px] text-mist opacity-0 transition-all duration-450 ease-soft group-hover:mt-2 group-hover:max-h-30 group-hover:opacity-100 group-focus-visible:mt-2 group-focus-visible:max-h-30 group-focus-visible:opacity-100 group-aria-expanded:mt-2 group-aria-expanded:max-h-30 group-aria-expanded:opacity-100">
                            {g.bio}
                        </span>
                    </span>
                </button>
            ))}
        </Rail>
    );
}
