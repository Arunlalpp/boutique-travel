"use client";

import { useRef } from "react";
import { gsap, useGSAP, motion } from "@/lib/gsap";
import type { RoutePoint } from "@/lib/types";
import { pad } from "@/lib/utils";

function smoothPath(points: RoutePoint[]): string {
    if (points.length < 2) return "";
    const d = [`M ${points[0].x} ${points[0].y}`];
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i - 1] ?? points[i];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2] ?? p2;
        const t = 0.18;
        const c1 = { x: p1.x + (p2.x - p0.x) * t, y: p1.y + (p2.y - p0.y) * t };
        const c2 = { x: p2.x - (p3.x - p1.x) * t, y: p2.y - (p3.y - p1.y) * t };
        d.push(`C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`);
    }
    return d.join(" ");
}

interface RouteMapProps {
    points: RoutePoint[];
    country: string;
}

export function RouteMap({ points, country }: RouteMapProps) {
    const root = useRef<HTMLDivElement>(null);
    const path = smoothPath(points);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add(motion.full, () => {
                const line = root.current?.querySelector<SVGPathElement>("[data-route-line]");
                if (!line) return;
                const length = line.getTotalLength();
                const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 75%", once: true } });
                tl.fromTo(
                    line,
                    { strokeDasharray: length, strokeDashoffset: length },
                    { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut" },
                ).fromTo(
                    "[data-route-stop]",
                    { opacity: 0, scale: 0.6, transformOrigin: "center" },
                    { opacity: 1, scale: 1, duration: 0.8, stagger: 2.4 / points.length, ease: "back.out(2)" },
                    0.1,
                );
            });
            mm.add(motion.reduced, () => {
                const line = root.current?.querySelector<SVGPathElement>("[data-route-line]");
                if (line) gsap.set(line, { strokeDasharray: "none", strokeDashoffset: 0 });
                gsap.set("[data-route-stop]", { opacity: 1, scale: 1 });
            });
        },
        { scope: root },
    );

    return (
        <div ref={root} className="relative">
            <svg
                viewBox="-8 -8 116 116"
                role="img"
                aria-label={`Illustrated route through ${country}: ${points.map((p) => p.name).join(", ")}`}
                className="h-auto w-full"
            >
                <defs>
                    <pattern id="route-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="0.5" cy="0.5" r="0.35" fill="currentColor" opacity="0.22" />
                    </pattern>
                </defs>
                <rect x="-8" y="-8" width="116" height="116" fill="url(#route-grid)" />

                <g fill="none" stroke="currentColor" strokeWidth="0.15" opacity="0.18">
                    <ellipse cx="52" cy="48" rx="46" ry="34" />
                    <ellipse cx="54" cy="50" rx="34" ry="24" />
                    <ellipse cx="56" cy="52" rx="22" ry="14" />
                </g>

                <g transform="translate(98 2)" fill="var(--color-dim)">
                    <path d="M0 -3 L1.4 2 L0 1 L-1.4 2 Z" />
                    <text y="7" textAnchor="middle" fontSize="2.6" letterSpacing="0.3">
                        N
                    </text>
                </g>

                <path
                    d={path}
                    fill="none"
                    stroke="var(--color-ember)"
                    strokeWidth="0.45"
                    strokeDasharray="1.2 1.2"
                    opacity="0.35"
                />
                <path
                    data-route-line
                    d={path}
                    fill="none"
                    stroke="var(--color-ember)"
                    strokeWidth="0.55"
                    strokeLinecap="round"
                />

                {points.map((p, i) => {
                    const labelLeft = p.x > 70;
                    return (
                        <g key={p.name} data-route-stop>
                            <circle
                                cx={p.x}
                                cy={p.y}
                                r="2.6"
                                fill="var(--color-night)"
                                stroke="var(--color-ember)"
                                strokeWidth="0.3"
                            />
                            <text
                                x={p.x}
                                y={p.y + 0.9}
                                textAnchor="middle"
                                fontSize="2.3"
                                fontFamily="var(--font-sans)"
                                fill="var(--color-fg)"
                            >
                                {i + 1}
                            </text>
                            <text
                                x={labelLeft ? p.x - 4.2 : p.x + 4.2}
                                y={p.y + 1}
                                textAnchor={labelLeft ? "end" : "start"}
                                fontSize="3.3"
                                fontFamily="var(--font-display)"
                                fill="var(--color-fg)"
                            >
                                {p.name}
                            </text>
                        </g>
                    );
                })}
            </svg>

            <ol className="sr-only">
                {points.map((p, i) => (
                    <li key={p.name}>
                        {pad(i + 1)} {p.name}
                    </li>
                ))}
            </ol>
        </div>
    );
}
