"use client";

import { useEffect, useState } from "react";
import { beginHref, ledgerNav } from "@/lib/data/ledger";
import { label } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { Close, Menu } from "./icons";

/**
 * Wordmark, four section links and the "Begin your entry" button. Sits
 * transparent over the hero video and turns solid once the guest scrolls.
 * On phones the links move into a full-screen menu.
 */
export function LedgerHeader({ siteName }: { siteName: string }) {
    const [solid, setSolid] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setSolid(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        document.documentElement.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.documentElement.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const linkClass = cn(label, "text-[12px] text-white/85 transition-colors hover:text-white");

    return (
        <>
            <header
                className={cn(
                    "fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background-color,box-shadow] duration-300",
                    solid || open
                        ? "bg-ledger-night/95 shadow-[0_1px_0_rgb(255_255_255/0.08)] backdrop-blur-md"
                        : "bg-transparent",
                )}
            >
                <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-6 px-[clamp(20px,5vw,48px)] max-lg:h-16">
                    <a
                        href="#top"
                        className="font-jost text-[19px] font-semibold tracking-[0.2em] whitespace-nowrap text-white uppercase"
                    >
                        {siteName}
                    </a>

                    <nav aria-label="Main" className="flex items-center gap-9 max-lg:hidden">
                        {ledgerNav.map((item) => (
                            <a key={item.href} href={item.href} className={linkClass}>
                                {item.label}
                            </a>
                        ))}
                        <a
                            href={beginHref}
                            className={cn(
                                label,
                                "border border-ochre px-4 py-2.5 text-[12px] text-ochre transition-colors hover:bg-ochre hover:text-ledger-ink",
                            )}
                        >
                            Begin your entry
                        </a>
                    </nav>

                    <button
                        type="button"
                        className="grid size-11 place-items-center text-white lg:hidden [&_svg]:size-6"
                        aria-expanded={open}
                        aria-controls="ledger-menu"
                        aria-label={open ? "Close menu" : "Open menu"}
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <Close /> : <Menu />}
                    </button>
                </div>
            </header>

            {/* Outside <header>: its backdrop-filter would trap a fixed child inside the header box. */}
            <nav
                id="ledger-menu"
                aria-label="Mobile"
                hidden={!open}
                className="fixed inset-x-0 top-[calc(64px+env(safe-area-inset-top,0px))] bottom-0 z-50 overflow-y-auto bg-ledger-night px-[clamp(20px,5vw,48px)] pt-8 pb-12 lg:hidden"
            >
                <ul className="grid gap-1 border-t border-white/10">
                    {ledgerNav.map((item) => (
                        <li key={item.href} className="border-b border-white/10">
                            <a
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="block py-5 font-jost text-[34px] leading-none font-semibold text-white uppercase"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <a
                    href={beginHref}
                    onClick={() => setOpen(false)}
                    className="mt-10 flex h-14 items-center justify-center bg-ochre font-jost text-sm font-semibold tracking-[0.14em] text-ledger-ink uppercase"
                >
                    Begin your entry
                </a>
                <p className="mt-6 font-type text-sm text-white/60 italic">Paths first walked by us.</p>
            </nav>
        </>
    );
}
