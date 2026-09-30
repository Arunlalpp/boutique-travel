"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, motion } from "@/lib/gsap";
import type { ImageAsset } from "@/lib/types";
import { SmartImage } from "./SmartImage";
import { cn } from "@/lib/utils";

interface ImageHeroProps {
  image: ImageAsset;
  eyebrow: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  size?: "tall" | "medium";
}

/** Full-bleed photographic header for detail pages. */
export function ImageHero({ image, eyebrow, title, children, size = "tall" }: ImageHeroProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motion.full, () => {
        gsap
          .timeline({ defaults: { ease: motion.ease } })
          .fromTo("[data-hero-media]", { scale: 1.1 }, { scale: 1, duration: 2.6, ease: "power2.out" }, 0)
          .fromTo("[data-hero-line]", { yPercent: 110, y: 0 }, { yPercent: 0, y: 0, duration: 1.5 }, 0.25)
          .fromTo("[data-hero-fade]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1.3, stagger: 0.1 }, 0.7);

        gsap.to("[data-hero-media]", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className={cn(
        "relative flex items-end overflow-hidden bg-night text-paper",
        size === "tall" ? "h-[88svh] min-h-[560px]" : "h-[70svh] min-h-[480px]",
      )}
    >
      <div data-hero-media className="absolute inset-0 will-change-transform">
        <SmartImage image={image} sizes="100vw" priority />
      </div>
      <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night/50 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/20 to-transparent" />

      <div className="container-x relative pb-12 md:pb-16">
        <div data-hero-fade className="eyebrow mb-6 text-paper/75">
          {eyebrow}
        </div>
        <h1 className="max-w-5xl overflow-hidden pb-[0.08em] text-[clamp(2.5rem,7vw,6.5rem)] leading-[1]">
          <span data-hero-line className="block">
            {title}
          </span>
        </h1>
        {children && (
          <div data-hero-fade className="mt-8">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
