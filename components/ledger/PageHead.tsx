import Link from "next/link";
import type { ReactNode } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import type { ImageAsset } from "@/lib/types";
import { h1, kicker as kickerClass, label, lwrap, typedItalic } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";

interface PageHeadProps {
    kicker: string;
    title: ReactNode;
    lede?: ReactNode;
    image?: ImageAsset;
    /** [label, href] pairs; the current page is the last item and has no link. */
    crumbs?: [string, string?][];
    children?: ReactNode;
    className?: string;
}

/**
 * Opening band for the inner pages: navy night (or a darkened photograph)
 * so the transparent header reads over it, the same as over the home reel.
 */
export function PageHead({ kicker, title, lede, image, crumbs, children, className }: PageHeadProps) {
    return (
        <header
            className={cn(
                "relative isolate flex flex-col justify-end overflow-hidden bg-ledger-navy text-white",
                image ? "min-h-[min(78svh,760px)]" : "min-h-[min(56svh,520px)]",
                className,
            )}
        >
            {image && (
                <div className="absolute inset-0 -z-10" aria-hidden>
                    <SmartImage image={{ ...image, alt: "" }} sizes="100vw" priority quality={80} />
                    <div className="absolute inset-0 bg-linear-to-b from-ledger-navy/85 via-ledger-navy/35 to-ledger-navy/90" />
                    <div className="absolute inset-0 bg-linear-to-r from-ledger-navy/70 via-ledger-navy/15 to-transparent" />
                </div>
            )}
            <div className={cn(lwrap, "grid gap-6 pt-[clamp(120px,18vh,180px)] pb-[clamp(48px,7vw,88px)]")}>
                {crumbs && (
                    <nav aria-label="Breadcrumb">
                        <ol className={cn(label, "flex flex-wrap gap-x-2 gap-y-1 text-[10.5px] text-white/65")}>
                            {crumbs.map(([text, href], i) => (
                                <li key={text} className="flex gap-2">
                                    {i > 0 && <span aria-hidden>/</span>}
                                    {href ? (
                                        <Link href={href} className="transition-colors hover:text-white">
                                            {text}
                                        </Link>
                                    ) : (
                                        <span aria-current="page" className="text-white/90">
                                            {text}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}
                <p className={kickerClass}>{kicker}</p>
                <h1 className={cn(h1, "max-w-[14ch] text-[clamp(44px,7vw,104px)]")}>{title}</h1>
                {lede && (
                    <p className={cn(typedItalic, "max-w-[46ch] text-[clamp(15px,1.4vw,18px)] text-white/90")}>
                        {lede}
                    </p>
                )}
                {children}
            </div>
        </header>
    );
}
