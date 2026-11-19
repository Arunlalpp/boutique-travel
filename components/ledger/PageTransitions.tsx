"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Page transitions for in-site navigation, using the browser's View
 * Transitions API: the current page fades and lifts away while the next
 * one settles in (styles in globals.css, ::view-transition-*). The fixed
 * header and WhatsApp button have their own view-transition-name, so they
 * stay put instead of flashing.
 *
 * Works by taking over clicks on internal links in the capture phase (before
 * next/link sees them), so every <Link> and plain <a> on the site gets the
 * transition without changing any component. Browsers without the API, and
 * visitors who prefer reduced motion, get normal navigation.
 */
export function PageTransitions() {
    const router = useRouter();
    const pathname = usePathname();
    const search = useSearchParams();
    const finish = useRef<(() => void) | null>(null);

    // The new route has rendered: let the transition animate to it.
    useEffect(() => {
        finish.current?.();
        finish.current = null;
    }, [pathname, search]);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const a = (e.target as Element | null)?.closest?.("a");
            if (!a || !a.href || a.hasAttribute("download") || a.dataset.noTransition !== undefined) return;
            if (a.target && a.target !== "_self") return;

            const url = new URL(a.href, location.href);
            if (url.origin !== location.origin || url.pathname.startsWith("/api/")) return;
            // Same page (only the hash differs): let the browser scroll to the anchor.
            if (url.pathname === location.pathname && url.search === location.search) return;

            if (
                typeof document.startViewTransition !== "function" ||
                matchMedia("(prefers-reduced-motion: reduce)").matches
            ) {
                return;
            }

            e.preventDefault();
            const href = url.pathname + url.search + url.hash;
            document.startViewTransition(
                () =>
                    new Promise<void>((resolve) => {
                        finish.current = resolve;
                        // Never hold the page frozen if a navigation stalls.
                        setTimeout(resolve, 2500);
                        router.push(href);
                    }),
            );
        };

        // Capture on window runs before React's listeners, so next/link sees
        // defaultPrevented and leaves the navigation to us.
        window.addEventListener("click", onClick, true);
        return () => window.removeEventListener("click", onClick, true);
    }, [router]);

    return null;
}
