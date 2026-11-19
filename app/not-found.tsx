import type { Metadata } from "next";
import Link from "next/link";
import { Footprints } from "@/components/ledger/Footprints";
import { ArrowRight } from "@/components/ledger/icons";
import { h1, kicker, lbtn, lwrap, typedItalic } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";

export const metadata: Metadata = {
    title: "Page not found",
    robots: { index: false, follow: true },
};

export default function NotFound() {
    return (
        <section className="flex min-h-[86svh] items-center bg-ledger-navy text-white">
            <div className={cn(lwrap, "grid justify-items-start gap-6 pt-28 pb-16")}>
                <Footprints className="text-ochre" />
                <p className={kicker}>Page not found</p>
                <h1 className={cn(h1, "max-w-[12ch] text-[clamp(44px,7vw,96px)]")}>This path isn’t in the ledger.</h1>
                <p className={cn(typedItalic, "max-w-[42ch] text-white/85")}>
                    The page you were looking for has moved, or was never walked. The Entries are a better place to
                    start.
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                    <Link href="/entries" className={lbtn("ochre")}>
                        Read the ledger <ArrowRight />
                    </Link>
                    <Link href="/" className={lbtn("outline-light")}>
                        Home
                    </Link>
                </div>
            </div>
        </section>
    );
}
