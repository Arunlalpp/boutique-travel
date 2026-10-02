"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/ui/Icons";

export function Preloader({ siteName }: { siteName: string }) {
    const [ready, setReady] = useState(false);
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        const minimumDelay = new Promise((resolve) => setTimeout(resolve, 700));
        const fontsReadyOrTimeout =
            "fonts" in document
                ? Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 2500))])
                : Promise.resolve();
        Promise.all([minimumDelay, fontsReadyOrTimeout]).then(() => setReady(true));
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("preloading", mounted);
        if (!ready) return;
        const timeout = setTimeout(() => setMounted(false), 900);
        return () => clearTimeout(timeout);
    }, [ready, mounted]);

    if (!mounted) return null;

    return (
        <div
            role={ready ? undefined : "status"}
            aria-hidden={ready || undefined}
            className={cn(
                "preloader fixed inset-0 z-[100] items-center justify-center bg-night transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out-soft)]",
                ready ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
            )}
        >
            <span className="logo text-2xl text-fg">
                <LogoMark className="!size-9" />
                {siteName}
            </span>
            <span className="sr-only">Loading {siteName}…</span>
        </div>
    );
}
