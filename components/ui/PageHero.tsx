import type { ReactNode } from "react";
import type { ImageAsset } from "@/lib/types";
import { SmartImage } from "./SmartImage";
import { eyebrow as eyebrowClass, frame, hXl, lede as ledeClass, photoTag, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

interface PageHeroProps {
    /** Breadcrumb trail; the last item is the current page. Used as the label when there's no eyebrow. */
    crumbs: { label: string; href?: string }[];
    eyebrow?: ReactNode;
    title: ReactNode;
    lede?: ReactNode;
    /** Wide photo under the heading. */
    image?: ImageAsset;
    /** Small caption printed in the photo's top-left corner. Defaults to the image's alt text. */
    caption?: ReactNode;
    /** Taller photo, for destination and journey pages. */
    tall?: boolean;
    /** Kept for older callers; the minimal layout is always left-aligned. */
    center?: boolean;
    className?: string;
    /** Actions under the lede (buttons, links). */
    children?: ReactNode;
    /** Content laid over the bottom edge of the photo (e.g. the home booking strip). */
    overlay?: ReactNode;
}

/**
 * The minimal redesign's page opener: small label, a large light headline on
 * the left, a short lede and actions on the right, then a wide photo.
 */
export function PageHero({ crumbs, eyebrow, title, lede, image, caption, tall, className, children, overlay }: PageHeroProps) {
    const label = eyebrow ?? crumbs[crumbs.length - 1]?.label;
    return (
        <section className={cn("pt-[clamp(36px,5vw,64px)]", className)}>
            <div className={wrap}>
                {label && <span className={cn(eyebrowClass, "mb-5 flex")}>{label}</span>}
                <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-end gap-x-[clamp(24px,5vw,80px)] gap-y-6 max-desk:grid-cols-1">
                    <h1 className={cn(hXl, "max-w-[13ch]")}>{title}</h1>
                    {(lede || children) && (
                        <div className="grid max-w-90 gap-5 pb-2 desk:justify-self-end">
                            {lede && <p className={cn(ledeClass, "text-sm")}>{lede}</p>}
                            {children}
                        </div>
                    )}
                </div>
                {image && (
                    <div className="relative mt-[clamp(32px,4vw,48px)]">
                        <div className={cn(frame, tall ? "aspect-16/8 max-tab:aspect-4/3" : "aspect-16/7 max-tab:aspect-4/3")}>
                            <SmartImage image={image} sizes="(min-width: 1280px) 1220px, 100vw" priority quality={80} />
                            <span className={photoTag}>{caption ?? image.alt}</span>
                        </div>
                        {overlay}
                    </div>
                )}
            </div>
        </section>
    );
}
