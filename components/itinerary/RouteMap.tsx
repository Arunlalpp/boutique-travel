import { Reveal } from "@/components/motion/Reveal";
import type { RoutePoint } from "@/lib/types";
import { cn, pad } from "@/lib/utils";

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

/** Stop markers appear one after another as the line draws. */
const STOP_DELAYS = [
    "delay-[200ms]",
    "delay-[500ms]",
    "delay-[800ms]",
    "delay-[1100ms]",
    "delay-[1400ms]",
    "delay-[1700ms]",
    "delay-[2000ms]",
    "delay-[2300ms]",
];

export function RouteMap({ points, country }: RouteMapProps) {
    const path = smoothPath(points);

    return (
        <Reveal className="group/route relative">
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
                    stroke="var(--color-accent)"
                    strokeWidth="0.45"
                    strokeDasharray="1.2 1.2"
                    opacity="0.35"
                />
                <path
                    d={path}
                    pathLength={1}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="0.55"
                    strokeLinecap="round"
                    strokeDasharray="1"
                    className="transition-[stroke-dashoffset] duration-[2400ms] ease-in-out in-[.js]:motion-safe:[stroke-dashoffset:1] group-data-in/route:[stroke-dashoffset:0]!"
                />

                {points.map((p, i) => {
                    const labelLeft = p.x > 70;
                    return (
                        <g
                            key={p.name}
                            className={cn(
                                "transition-opacity duration-700 in-[.js]:motion-safe:opacity-0 group-data-in/route:opacity-100!",
                                STOP_DELAYS[Math.min(i, STOP_DELAYS.length - 1)],
                            )}
                        >
                            <circle
                                cx={p.x}
                                cy={p.y}
                                r="2.6"
                                fill="var(--color-paper)"
                                stroke="var(--color-accent)"
                                strokeWidth="0.3"
                            />
                            <text
                                x={p.x}
                                y={p.y + 0.9}
                                textAnchor="middle"
                                fontSize="2.3"
                                fontFamily="var(--font-sans)"
                                fill="var(--color-ink)"
                            >
                                {i + 1}
                            </text>
                            <text
                                x={labelLeft ? p.x - 4.2 : p.x + 4.2}
                                y={p.y + 1}
                                textAnchor={labelLeft ? "end" : "start"}
                                fontSize="3.3"
                                fontFamily="var(--font-display)"
                                fill="var(--color-ink)"
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
        </Reveal>
    );
}
