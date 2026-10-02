"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { contactHref, isActive, mainNav } from "@/lib/data/site";
import { useSaved, useToast } from "@/components/providers/SiteProviders";
import { ArrowIcon, BagIcon, ChatIcon, CompassIcon, HeartIcon, HomeIcon, LogoMark, RouteIcon } from "@/components/ui/Icons";
import { btn, iconBtn, logoClass } from "@/lib/ui";
import { cn } from "@/lib/utils";

const tabs = [
    { label: "Home", href: "/", Icon: HomeIcon },
    { label: "Explore", href: "/destinations", Icon: CompassIcon },
    { label: "Journeys", href: "/itineraries", Icon: RouteIcon },
    { label: "Packages", href: "/packages", Icon: BagIcon },
    { label: "Contact", href: contactHref, Icon: ChatIcon },
];

export function Header({ siteName }: { siteName: string }) {
    const pathname = usePathname();
    const router = useRouter();
    const toast = useToast();
    const { saved, bumps } = useSaved();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
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
            <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-(--gutter) pt-[calc(14px+env(safe-area-inset-top,0px))]">
                <div
                    className={cn(
                        "glass pointer-events-auto mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 rounded-full pr-2.5 pl-[22px] transition-[background-color,box-shadow] duration-300 max-tab:h-14 max-tab:pl-4",
                        scrolled && "bg-night/60! shadow-[0_16px_40px_-20px_rgb(0_0_0/0.7)]",
                    )}
                >
                    <Link className={logoClass} href="/" aria-label={`${siteName} home`}>
                        <LogoMark />
                        {siteName}
                    </Link>
                    <nav className="flex gap-1 max-tab:hidden" aria-label="Main">
                        {mainNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                                className="rounded-full px-3.5 py-[9px] text-sm font-medium text-mist transition-colors hover:bg-white/7 hover:text-fg aria-[current=page]:bg-white/12 aria-[current=page]:text-fg max-[1060px]:px-2.5 max-[1060px]:text-[13.5px]"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-2">
                        <button
                            key={bumps}
                            type="button"
                            className={cn(iconBtn, "relative", bumps > 0 && "animate-bump")}
                            onClick={openSaved}
                            aria-label={`Saved journeys (${saved.length})`}
                        >
                            <HeartIcon />
                            <span
                                aria-hidden
                                className={cn(
                                    "absolute top-1 right-[3px] grid h-[18px] min-w-[18px] place-items-center rounded-full bg-ember px-1 text-[11px] font-bold text-ember-ink transition-transform duration-300 ease-soft",
                                    saved.length > 0 ? "scale-100" : "scale-0",
                                )}
                            >
                                {saved.length}
                            </span>
                        </button>
                        <Link className={cn(btn("light", "sm"), "max-tab:hidden")} href={contactHref}>
                            Plan a Trip <ArrowIcon />
                        </Link>
                    </div>
                </div>
            </header>

            <nav
                className="glass fixed inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom,0px))] z-60 hidden h-[66px] items-center justify-between rounded-full bg-[#141820]/72! px-2 max-tab:flex"
                aria-label="Mobile"
            >
                {tabs.map(({ label, href, Icon }) => (
                    <Link
                        key={href}
                        href={href}
                        aria-current={isActive(pathname, href) ? "page" : undefined}
                        className="grid h-[52px] flex-1 place-items-center gap-0.5 rounded-full text-[10.5px] font-semibold text-dim transition-all duration-300 ease-soft aria-[current=page]:flex aria-[current=page]:flex-[1.7] aria-[current=page]:justify-center aria-[current=page]:gap-[7px] aria-[current=page]:bg-ember aria-[current=page]:text-[13px] aria-[current=page]:text-ember-ink [&_svg]:size-[21px]"
                    >
                        <Icon />
                        {label}
                    </Link>
                ))}
            </nav>
        </>
    );
}
