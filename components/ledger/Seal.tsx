import { Footprints } from "./Footprints";

/** Round wax-seal style mark: circular lettering around a single footprint pair. */
export function Seal({ name }: { name: string }) {
    const text = `${name} · Paths first walked by us · `.toUpperCase();
    return (
        <span className="relative grid size-[88px] place-items-center text-ochre" aria-hidden>
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full motion-safe:animate-spin-slow">
                <defs>
                    <path id="seal-ring" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
                </defs>
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeOpacity=".4" />
                <circle cx="50" cy="50" r="29" fill="none" stroke="currentColor" strokeOpacity=".4" />
                <text
                    fontSize="8.4"
                    letterSpacing="1.6"
                    fill="currentColor"
                    fontFamily="var(--font-jost)"
                    fontWeight="600"
                >
                    <textPath href="#seal-ring" textLength="236">
                        {text}
                    </textPath>
                </text>
            </svg>
            <Footprints className="scale-75 opacity-100" />
        </span>
    );
}
