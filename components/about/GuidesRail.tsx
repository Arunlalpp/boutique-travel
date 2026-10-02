"use client";

import { useState } from "react";
import type { ImageAsset } from "@/lib/types";
import { Rail } from "@/components/ui/Rail";
import { SmartImage } from "@/components/ui/SmartImage";
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
                <div className="t">
                    <span className="eyebrow">Meet the guides</span>
                    <h2 id="guides-title" className="h-lg">
                        The people behind the campfire
                    </h2>
                </div>
            }
        >
            {guides.map((g) => (
                <button
                    key={g.name}
                    type="button"
                    className={cn("guide shadow-deep", open === g.name && "open")}
                    aria-expanded={open === g.name}
                    onClick={() => setOpen(open === g.name ? null : g.name)}
                >
                    <span className="media-fill">
                        <SmartImage image={g.image} sizes="(min-width: 1024px) 300px, 70vw" />
                    </span>
                    <span className="pill glass-strong tag">{g.role}</span>
                    <span className="info glass-strong block">
                        <b>{g.name}</b>
                        <span className="role">{g.role}</span>
                        <span className="bio">{g.bio}</span>
                    </span>
                </button>
            ))}
        </Rail>
    );
}
