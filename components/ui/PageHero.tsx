import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/lib/types";
import { SmartImage } from "./SmartImage";
import { eyebrow as eyebrowClass, hXl, lede as ledeClass, mediaFill, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

interface PageHeroProps {
    /** Breadcrumb trail; the last item is the current page. */
    crumbs: { label: string; href?: string }[];
    eyebrow?: ReactNode;
    title: ReactNode;
    lede?: ReactNode;
    image?: ImageAsset;
    center?: boolean;
    tall?: boolean;
    className?: string;
    children?: ReactNode;
}

export function PageHero({ crumbs, eyebrow, title, lede, image, center, tall, className, children }: PageHeroProps) {
    const current = crumbs[crumbs.length - 1];
    return (
        <section
            className={cn(
                "relative isolate overflow-hidden pt-[150px] pb-[90px]",
                tall && "flex min-h-[min(86svh,820px)] items-end",
                className,
            )}
        >
            {image ? (
                <div className={cn(mediaFill, "-z-20")}>
                    <SmartImage image={image} sizes="100vw" priority quality={80} />
                    <div className="absolute inset-0 bg-linear-to-b from-[#0a0e18]/70 via-[#0a0e18]/35 to-[#0a0e18]/60" />
                </div>
            ) : (
                <div
                    aria-hidden
                    className="pointer-events-none absolute -top-[260px] -left-[200px] size-[700px] rounded-full bg-[radial-gradient(circle,rgb(76_123_217/0.22),transparent_70%)] blur-[10px]"
                />
            )}
            <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[200px] bg-linear-to-b from-transparent to-night" />

            <div className={wrap}>
                <div className={cn("grid max-w-[760px] gap-5", center && "mx-auto justify-items-center text-center")}>
                    <nav
                        aria-label="Breadcrumb"
                        className="glass inline-flex h-[34px] w-max max-w-full items-center gap-2 rounded-full px-3.5 text-[13px] text-mist"
                    >
                        {crumbs.slice(0, -1).map((c) => (
                            <span key={c.label} className="flex items-center gap-2">
                                {c.href ? (
                                    <Link href={c.href} className="hover:text-fg">
                                        {c.label}
                                    </Link>
                                ) : (
                                    c.label
                                )}
                                <span aria-hidden>/</span>
                            </span>
                        ))}
                        <b aria-current="page" className="truncate font-semibold text-ember">
                            {current.label}
                        </b>
                    </nav>
                    {eyebrow && <span className={eyebrowClass}>{eyebrow}</span>}
                    <h1 className={hXl}>{title}</h1>
                    {lede && <p className={cn(ledeClass, center && "text-center")}>{lede}</p>}
                    {children}
                </div>
            </div>
        </section>
    );
}
