"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav, site } from "@/lib/data/site";
import { cn, pad } from "@/lib/utils";
import { gsap, motion } from "@/lib/gsap";
import { Wordmark } from "./Wordmark";

const OVER_IMAGE = [/^\/$/, /^\/itineraries\/[^/]+$/, /^\/about$/];

export function Header() {
    const pathname = usePathname();
    const overImage = OVER_IMAGE.some((re) => re.test(pathname));
    const root = useRef<HTMLElement>(null);

    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        let lastY = window.scrollY;
        let ticking = false;

        const update = () => {
            const y = window.scrollY;
            const delta = y - lastY;
            setScrolled(y > 40);
            if (Math.abs(delta) > 8) {
                setHidden(y > 240 && delta > 0);
                lastY = y;
            }
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => setOpen(false), [pathname]);

    useEffect(() => {
        document.documentElement.style.overflow = open ? "hidden" : "";
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const transparent = overImage && !scrolled && !open;

    useEffect(() => {
        const show = hidden && !open;
        const reduced = window.matchMedia(motion.reduced).matches;
        gsap.to(root.current, {
            yPercent: show ? -100 : 0,
            y: show ? "-0.75rem" : 0,
            opacity: show ? 0 : 1,
            duration: reduced ? 0 : 0.9,
            ease: motion.ease,
            overwrite: "auto",
        });
    }, [hidden, open]);

    return (
        <>
            <header
                ref={root}
                className={cn(
                    "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,box-shadow,margin,border-radius,backdrop-filter] duration-1000 ease-[var(--ease-out-soft)]",
                    transparent
                        ? "mx-3 mt-3 rounded-2xl border border-paper/25 bg-paper/10 text-paper shadow-[0_4px_24px_rgba(0,0,0,0.15)] backdrop-blur-xl md:mx-0 md:mt-0 md:rounded-none md:border-x-0 md:border-t-0 md:border-b md:border-transparent md:bg-transparent md:shadow-none md:backdrop-blur-none"
                        : open
                          ? "mx-3 mt-3 rounded-2xl border border-paper/15 bg-night/60 text-paper shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:mx-0 md:mt-0 md:rounded-none md:border-x-0 md:border-t-0 md:border-b md:border-transparent md:bg-night md:shadow-none md:backdrop-blur-none"
                          : "mx-3 mt-3 rounded-2xl border border-ink/10 bg-paper/70 text-ink shadow-[0_8px_32px_rgba(18,25,26,0.1)] backdrop-blur-xl md:mx-0 md:mt-0 md:rounded-none md:border-x-0 md:border-t-0 md:border-b md:border-ink/10 md:bg-paper/90 md:shadow-none md:backdrop-blur-md",
                )}
            >
                <div className="container-x flex h-16 items-center justify-between md:h-20">
                    <Link href="/" aria-label={`${site.name} — home`} className="relative z-10">
                        <Wordmark />
                    </Link>

                    <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
                        {mainNav.map((item) => {
                            const active = pathname === item.href || pathname.startsWith(item.href + "/");
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={active ? "page" : undefined}
                                    className={cn("link-line text-sm tracking-wide", active && "bg-[length:100%_1px]")}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                        <Link
                            href="/enquire"
                            className={cn(
                                "group relative isolate overflow-hidden border px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-[color,transform] duration-300 ease-[var(--ease-out-soft)] before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:transition-transform before:duration-500 before:ease-[var(--ease-out-soft)] hover:before:scale-x-100 focus-visible:before:scale-x-100 active:scale-[0.96]",
                                transparent
                                    ? "border-paper/50 before:bg-paper hover:text-ink focus-visible:text-ink"
                                    : "border-ink/30 before:bg-ink hover:text-paper focus-visible:text-paper",
                            )}
                        >
                            Plan a journey
                        </Link>
                    </nav>

                    <button
                        type="button"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? "Close menu" : "Open menu"}
                        className="relative -mr-2 size-10 shrink-0 p-2 transition-transform duration-300 active:scale-90 md:hidden"
                    >
                        <Menu
                            strokeWidth={1.25}
                            aria-hidden
                            className={cn(
                                "absolute inset-2 transition-all duration-300 ease-[var(--ease-out-soft)]",
                                open ? "rotate-45 opacity-0" : "rotate-0 opacity-100",
                            )}
                        />
                        <X
                            strokeWidth={1.25}
                            aria-hidden
                            className={cn(
                                "absolute inset-2 transition-all duration-300 ease-[var(--ease-out-soft)]",
                                open ? "rotate-0 opacity-100" : "-rotate-45 opacity-0",
                            )}
                        />
                    </button>
                </div>
            </header>

            <div
                id="mobile-menu"
                aria-hidden={!open}
                className={cn(
                    "grain fixed inset-0 z-40 flex flex-col overflow-hidden bg-night/85 pt-28 text-paper backdrop-blur-2xl transition-[opacity,visibility] duration-500 md:hidden",
                    open ? "visible opacity-100" : "invisible opacity-0",
                )}
            >
                <nav aria-label="Mobile" className="container-x relative flex flex-1 flex-col justify-center">
                    {[...mainNav, { label: "Plan a journey", href: "/enquire" }].map((item, i) => {
                        const active = pathname === item.href || pathname.startsWith(item.href + "/");
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? "page" : undefined}
                                tabIndex={open ? 0 : -1}
                                className={cn(
                                    "group flex items-baseline gap-5 border-t border-paper/10 py-5 transition-all duration-700 ease-[var(--ease-out-soft)] first:border-t-0",
                                    open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                                )}
                                style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
                            >
                                <span className="eyebrow text-clay">{pad(i + 1)}</span>
                                <span
                                    className={cn(
                                        "font-serif text-4xl font-normal transition-colors duration-300",
                                        active ? "text-clay" : "text-paper group-hover:text-paper/70",
                                    )}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
                <div className="container-x relative border-t border-paper/10 py-8 text-sm text-paper/60">
                    <p>{site.email}</p>
                    <p>{site.phone}</p>
                </div>
            </div>
        </>
    );
}
