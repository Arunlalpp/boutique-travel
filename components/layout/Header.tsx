"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contactHref, isActive, mainNav } from "@/lib/data/site";
import { useSaved, useToast } from "@/components/providers/SiteProviders";
import { ArrowIcon, BagIcon, ChatIcon, CompassIcon, HeartIcon, HomeIcon, LogoMark, RouteIcon } from "@/components/ui/Icons";
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
    const savedBtn = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const el = savedBtn.current;
        if (!el || !bumps) return;
        el.classList.remove("bump");
        void el.offsetWidth;
        el.classList.add("bump");
    }, [bumps]);

    const openSaved = () => {
        if (!saved.length) {
            toast("Tap ♥ on any journey to save it here");
            return;
        }
        router.push("/itineraries?saved=1");
    };

    return (
        <>
            <header className={cn("nav", scrolled && "scrolled")}>
                <div className="nav-in glass">
                    <Link className="logo" href="/" aria-label={`${siteName} home`}>
                        <LogoMark />
                        {siteName}
                    </Link>
                    <nav className="links" aria-label="Main">
                        {mainNav.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="nav-right">
                        <button
                            ref={savedBtn}
                            type="button"
                            className="icon-btn saved"
                            onClick={openSaved}
                            aria-label={`Saved journeys (${saved.length})`}
                        >
                            <HeartIcon />
                            <span className={cn("count", saved.length > 0 && "on")} aria-hidden>
                                {saved.length}
                            </span>
                        </button>
                        <Link className="btn btn-light btn-sm" href={contactHref}>
                            Plan a Trip <ArrowIcon />
                        </Link>
                    </div>
                </div>
            </header>

            <nav className="tabbar glass" aria-label="Mobile">
                {tabs.map(({ label, href, Icon }) => (
                    <Link key={href} href={href} aria-current={isActive(pathname, href) ? "page" : undefined}>
                        <Icon />
                        {label}
                    </Link>
                ))}
            </nav>
        </>
    );
}
