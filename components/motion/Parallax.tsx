"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, motion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Travel distance as a percentage of the inner layer's height */
  amount?: number;
}

/**
 * Wraps an image in an overflow-hidden frame and drifts it gently as the
 * frame scrolls through the viewport. The inner layer is oversized so no
 * edges ever show.
 */
export function Parallax({ children, className, amount = 10 }: ParallaxProps) {
  const frame = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motion.full, () => {
        gsap.fromTo(
          layer.current,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      mm.add(motion.reduced, () => {
        gsap.set(layer.current, { yPercent: 0 });
      });
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={cn("relative overflow-hidden", className)}>
      <div ref={layer} className="absolute -inset-y-[8%] inset-x-0">
        {children}
      </div>
    </div>
  );
}
