import Link from "next/link";
import type { ReactNode } from "react";
import { display, lbtn, lsec, lwrap, typedItalic } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { Footprints } from "./Footprints";
import { ArrowRight } from "./icons";

/** Closing band on the inner pages: one line, one sentence, one way into the enquiry. */
export function CtaBand({
    title,
    text,
    href,
    action,
    children,
}: {
    title: ReactNode;
    text: string;
    href: string;
    action: string;
    children?: ReactNode;
}) {
    return (
        <section className={cn(lsec, "bg-ledger-forest text-ledger-paper")} aria-labelledby="cta-title">
            <div className={cn(lwrap, "grid justify-items-start gap-6")}>
                <Footprints step={1} className="text-ochre" />
                <h2 id="cta-title" className={cn(display, "max-w-[16ch] text-[clamp(40px,5.6vw,72px)] leading-[0.92]")}>
                    {title}
                </h2>
                <p className={cn(typedItalic, "max-w-[44ch] text-[clamp(15px,1.5vw,18px)] text-ledger-paper/85")}>
                    {text}
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                    <Link href={href} className={lbtn("ochre")}>
                        {action} <ArrowRight />
                    </Link>
                    {children}
                </div>
            </div>
        </section>
    );
}
