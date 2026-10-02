"use client";

import { useEffect, useRef, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps<T extends ElementType> = {
    as?: T;
    children: ReactNode;
    className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Fades and lifts every descendant marked `data-reveal` once the block
 * scrolls into view. Pure CSS transitions toggled by one attribute, so it
 * costs a single shared IntersectionObserver instead of an animation library.
 *
 * Items only start hidden when JavaScript is running (the `.js` class set in
 * app/layout.tsx) and the visitor hasn't asked for reduced motion.
 */
const revealClasses = cn(
    "[&_[data-reveal]]:transition-[opacity,translate] [&_[data-reveal]]:duration-[900ms] [&_[data-reveal]]:ease-soft",
    "in-[.js]:motion-safe:[&_[data-reveal]]:translate-y-7 in-[.js]:motion-safe:[&_[data-reveal]]:opacity-0",
    "data-in:[&_[data-reveal]]:translate-y-0! data-in:[&_[data-reveal]]:opacity-100!",
);

let observer: IntersectionObserver | null = null;
function observe(el: Element) {
    observer ??= new IntersectionObserver(
        (entries) => {
            for (const e of entries) {
                if (e.isIntersecting) {
                    e.target.setAttribute("data-in", "");
                    observer?.unobserve(e.target);
                }
            }
        },
        { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
}

export function Reveal<T extends ElementType = "div">({ as, children, className, ...rest }: RevealProps<T>) {
    const Tag = (as ?? "div") as ElementType;
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (!("IntersectionObserver" in window)) {
            el.setAttribute("data-in", "");
            return;
        }
        observe(el);
        return () => observer?.unobserve(el);
    }, []);

    return (
        <Tag ref={ref} className={cn(revealClasses, className)} {...rest}>
            {children}
        </Tag>
    );
}
