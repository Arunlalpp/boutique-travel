"use client";

import { useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { gsap, useGSAP, motion } from "@/lib/gsap";

type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
  /** Delay before the group starts, in seconds */
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Scroll-triggered reveal. Any descendant marked with `data-reveal`
 * fades and rises into place, staggered, when the group enters view.
 *
 *   data-reveal          → fade + rise
 *   data-reveal="mask"   → image uncovers from the bottom edge
 *
 * With prefers-reduced-motion, content is simply shown.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  children,
  className,
  delay = 0,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();

      mm.add(motion.full, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]:not([data-reveal='mask'])", root);
        const masks = gsap.utils.toArray<HTMLElement>("[data-reveal='mask']", root);

        const tl = gsap.timeline({
          delay,
          scrollTrigger: { trigger: root, start: "top 85%", once: true },
        });

        if (masks.length) {
          tl.fromTo(
            masks,
            { opacity: 1, clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut", stagger: 0.15 },
            0,
          );
        }
        if (items.length) {
          tl.fromTo(
            items,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: motion.duration, ease: motion.ease, stagger: motion.stagger },
            masks.length ? 0.35 : 0,
          );
        }
      });

      mm.add(motion.reduced, () => {
        gsap.set(root.querySelectorAll("[data-reveal]"), { opacity: 1, clearProps: "transform,clipPath" });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
