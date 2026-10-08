"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { contactHref, isActive, mainNav } from "@/lib/data/site";
import { useSaved, useToast } from "@/components/providers/SiteProviders";
import { ArrowIcon, BagIcon, ChatIcon, CompassIcon, HeartIcon, HomeIcon, UserIcon } from "@/components/ui/Icons";
import { iconBtn, logoClass, textLink } from "@/lib/ui";
import { cn } from "@/lib/utils";

const tabIcons: Record<string, typeof HomeIcon> = { "/": HomeIcon, "/about": UserIcon, "/destinations": CompassIcon, "/packages": BagIcon, [contactHref]: ChatIcon };

export function Header({ siteName }: { siteName: string }) {
    const pathname = usePathname();
    const router = useRouter();
    const toast = useToast();
    const { saved, bumps } = useSaved();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const openSaved = () => {
        if (!saved.length) {
            toast("Tap ♥ on any journey to save it here");
            return;
        }
        router.push("/itineraries?saved=1");
    };

    return (
        <>
            <header
                className={cn(
                    "sticky top-0 z-50 border-b bg-paper/92 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md transition-colors duration-300",
                    scrolled ? "border-line" : "border-transparent",
                )}
            >
                <div className="mx-auto grid h-16 max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center gap-6 px-(--gutter) max-tab:h-14 max-tab:grid-cols-[1fr_auto]">
                    <Link className={logoClass} href="/" aria-label={`${siteName} home`}>
                        {siteName}
                    </Link>
                    <nav className="flex gap-7 max-tab:hidden max-[1060px]:gap-5" aria-label="Main">
                        {mainNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                                className="text-[13px] text-dim transition-colors hover:text-ink aria-[current=page]:font-medium aria-[current=page]:text-ink"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center justify-end gap-3">
                        <button
                            key={bumps}
                            type="button"
                            className={cn(iconBtn, "relative size-9", bumps > 0 && "animate-bump")}
                            onClick={openSaved}
                            aria-label={`Saved journeys (${saved.length})`}
                        >
                            <HeartIcon />
                            <span
                                aria-hidden
                                className={cn(
                                    "absolute top-0.5 right-0 grid h-4 min-w-4 place-items-center rounded-full bg-ink px-1 text-[10px] font-semibold text-paper transition-transform duration-300 ease-soft",
                                    saved.length > 0 ? "scale-100" : "scale-0",
                                )}
                            >
                                {saved.length}
                            </span>
                        </button>
                        <Link className={cn(textLink, "text-[13px] max-tab:hidden")} href={contactHref}>
                            Plan a trip <ArrowIcon />
                        </Link>
                    </div>
                </div>
            </header>

            <nav
                className="fixed inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom,0px))] z-60 hidden h-16 items-center justify-between gap-1 rounded-full border border-line bg-paper/90 px-1.5 shadow-[0_18px_40px_-16px_rgb(23_23_21/0.35)] backdrop-blur-xl max-tab:flex"
                aria-label="Mobile"
            >
                {mainNav.map(({ label, href }) => {
                    const Icon = tabIcons[href] ?? HomeIcon;
                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-current={isActive(pathname, href) ? "page" : undefined}
                            className="grid h-13 min-w-0 flex-1 place-items-center content-center gap-0.5 rounded-full text-[10px] font-medium text-dim transition-all duration-300 ease-soft hover:text-ink aria-[current=page]:flex aria-[current=page]:flex-[1.9] aria-[current=page]:items-center aria-[current=page]:justify-center aria-[current=page]:gap-1.5 aria-[current=page]:bg-ink aria-[current=page]:text-[12.5px] aria-[current=page]:text-paper [&_svg]:size-5 [&_svg]:shrink-0 aria-[current=page]:[&_svg]:size-4.5"
                        >
                            <Icon />
                            {label}
                        </Link>
                    );
                })}
            </nav>
        </>
    );
}
