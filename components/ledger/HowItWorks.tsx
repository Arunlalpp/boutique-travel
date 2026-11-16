import { Reveal } from "@/components/motion/Reveal";
import { steps } from "@/lib/data/ledger";
import { display, h2, lsec, lwrap, typedItalic } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { Footprints } from "./Footprints";

/** Four steps from first note to the printed ledger. Numerals fade in as the row scrolls in. */
export function HowItWorks() {
    return (
        <section className={cn(lsec, "bg-ledger-stone text-ledger-ink")} aria-labelledby="how-title">
            <div className={lwrap}>
                <Footprints step={2} className="mb-6 text-ledger-grey" />
                <h2 id="how-title" className={h2}>
                    Every journey is an Entry
                </h2>
                <Reveal
                    as="ol"
                    className="mt-12 grid grid-cols-4 gap-x-6 gap-y-12 max-lg:grid-cols-2 max-sm:grid-cols-1"
                >
                    {steps.map((s, i) => (
                        <li key={s.title} className="grid content-start gap-3 border-t-2 border-ledger-ink pt-4">
                            <span
                                data-reveal
                                style={{ transitionDelay: `${i * 140}ms` }}
                                className="font-jost text-[clamp(64px,6.6vw,88px)] leading-none font-semibold text-ledger-grey/60 tabular-nums"
                            >
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className={cn(display, "text-[17px] leading-tight")}>{s.title}</h3>
                            <p className={cn(typedItalic, "text-[14px] text-ledger-ink/80")}>{s.text}</p>
                        </li>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
