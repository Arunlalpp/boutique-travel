import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/lib/types";
import { SmartImage } from "./SmartImage";
import { ArrowIcon, PinIcon } from "./Icons";
import { mediaFill, pill } from "@/lib/ui";
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
    tagline: string;
    meta: ReactNode;
    className?: string;
}

/** The prototype's "spot" card: tall photo, glass badge, and a glass info panel. The whole card is the link. */
export function SpotCard({ href, title, image, sizes, priority, badge, action, location, tagline, meta, className }: SpotCardProps) {
    return (
        <article
            className={cn(
                "group relative isolate aspect-3/4 w-[clamp(260px,28vw,340px)] max-w-full overflow-hidden rounded-[28px] bg-night-3 shadow-deep transition-transform duration-500 ease-soft hover:-translate-y-1.5",
                className,
            )}
        >
            <Link href={href} aria-label={title} className="absolute inset-0 z-1 rounded-[inherit]" />
            <div className={cn(mediaFill, "transition-transform duration-[900ms] ease-soft group-hover:scale-[1.06]")}>
                <SmartImage image={image} sizes={sizes} priority={priority} />
                <div className="absolute inset-0 bg-linear-to-b from-black/25 via-transparent via-30% to-black/45" />
            </div>
            <div className="absolute inset-x-3.5 top-3.5 z-3 flex justify-between">
                <span className={cn(pill, "glass-strong bg-night/45!")}>{badge}</span>
                {action}
            </div>
            <div className="glass-strong pointer-events-none absolute inset-x-3 bottom-3 z-2 grid gap-1.5 rounded-[22px] px-[18px] py-4">
                <span className="flex items-center gap-1.5 text-xs text-mist [&_svg]:size-[13px] [&_svg]:text-ember">
                    <PinIcon />
                    {location}
                </span>
                <h3 className="text-2xl">{title}</h3>
                <span className="line-clamp-2 text-[13px] text-mist">{tagline}</span>
                <div className="mt-1 flex items-center justify-between gap-2.5">
                    {meta}
                    <span
                        aria-hidden
                        className="grid size-10 shrink-0 place-items-center rounded-full bg-ember text-ember-ink transition-transform duration-300 ease-soft group-hover:-rotate-45 [&_svg]:size-4"
                    >
                        <ArrowIcon />
                    </span>
                </div>
            </div>
        </article>
    );
}
