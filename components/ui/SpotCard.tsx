import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/lib/types";
import { SmartImage } from "./SmartImage";
import { frame, mediaFill, photoTag } from "@/lib/ui";
import { cn } from "@/lib/utils";

interface SpotCardProps {
    href: string;
    title: string;
    image: ImageAsset;
    sizes: string;
    priority?: boolean;
    badge: ReactNode;
    /** Optional control in the top-right corner (e.g. the save heart). */
    action?: ReactNode;
    location: ReactNode;
    /** Kept for callers; the minimal card shows only the location line. */
    tagline?: string;
    meta: ReactNode;
    className?: string;
}

/** Minimal card: photo with a corner caption, then name and meta on one line and the location under it. The whole card is the link. */
export function SpotCard({ href, title, image, sizes, priority, badge, action, location, meta, className }: SpotCardProps) {
    return (
        <article className={cn("group relative grid w-[clamp(240px,24vw,300px)] max-w-full content-start gap-3.5", className)}>
            <Link href={href} aria-label={title} data-cursor="view" className="absolute inset-0 z-1" />
            <div className={cn(frame, "aspect-4/5")}>
                <div className={cn(mediaFill, "transition-transform duration-900 ease-soft group-hover:scale-[1.04]")}>
                    <SmartImage image={image} sizes={sizes} priority={priority} />
                </div>
                <span className={photoTag}>{badge}</span>
                {action && <div className="absolute top-2.5 right-2.5 z-3">{action}</div>}
            </div>
            <div className="grid gap-1">
                <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-sans text-[15px] font-semibold tracking-normal">{title}</h3>
                    <span className="shrink-0 text-xs text-dim">{meta}</span>
                </div>
                <span className="line-clamp-1 text-xs text-dim">{location}</span>
            </div>
        </article>
    );
}
