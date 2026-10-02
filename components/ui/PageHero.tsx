import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/lib/types";
import { SmartImage } from "./SmartImage";
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
        <section className={cn("phero", center && "center", tall && "tall", className)}>
            {image && (
                <div className="media-fill">
                    <SmartImage image={image} sizes="100vw" priority quality={80} />
                </div>
            )}
            {!image && (
                <div
                    aria-hidden
                    className="glow"
                    style={{
                        width: 700,
                        height: 700,
                        left: -200,
                        top: -260,
                        background: "radial-gradient(circle, rgba(76,123,217,.22), transparent 70%)",
                    }}
                />
            )}
            <div className="wrap w-full">
                <div className="copy">
                    <nav aria-label="Breadcrumb" className="crumb glass" data-hero-fade>
                        {crumbs.slice(0, -1).map((c) => (
                            <span key={c.label} className="flex items-center gap-2">
                                {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
                                <span aria-hidden>/</span>
                            </span>
                        ))}
                        <b aria-current="page">{current.label}</b>
                    </nav>
                    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
                    <h1 className="h-xl">{title}</h1>
                    {lede && <p className="lede">{lede}</p>}
                    {children}
                </div>
            </div>
        </section>
    );
}
