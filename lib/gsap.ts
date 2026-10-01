"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const motion = {
    ease: "expo.out",
    duration: 1.4,
    stagger: 0.12,
    full: "(prefers-reduced-motion: no-preference)",
    reduced: "(prefers-reduced-motion: reduce)",
} as const;

export { gsap, ScrollTrigger, useGSAP };
