import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import { promises } from "@/lib/data/ledger";
import { h2, lsec, lwrap, photo, typedItalic } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { Footprints } from "./Footprints";
import { Plus } from "./icons";

function PromiseLine({ lead, text, side }: { lead: string; text: string; side: "left" | "right" }) {
    return (
        <div
            className={cn(
                "flex items-center gap-5",
                side === "left" ? "flex-row justify-end text-right" : "flex-row-reverse justify-end text-left",
            )}
        >
            <p className={cn(typedItalic, "max-w-[28ch] text-[15px] text-white/85")}>
                <b className="font-bold text-white">{lead}</b> {text}
            </p>
            {/* Leader line toward the traveller; draws in once the block scrolls into view. */}
            <span
                aria-hidden
                className={cn(
                    "h-px w-12 shrink-0 scale-x-0 bg-ochre transition-transform delay-300 duration-700 ease-out group-data-in:scale-x-100",
                    side === "left" ? "origin-right" : "origin-left",
                )}
            />
        </div>
    );
}

/** Four promises around a traveller seen from behind. Phones get an accordion with the first promise open. */
export function WhyTravel() {
    const [a, b, c, d] = promises.items;
    return (
        <section id="why" className={cn(lsec, "bg-ledger-night text-white")} aria-labelledby="why-title">
            <div className={lwrap}>
                <Footprints step={5} className="mb-6 text-ochre" />
                <h2 id="why-title" className={h2}>
                    {promises.title}
                </h2>

                <Reveal className="group mt-14 grid grid-cols-[minmax(0,1fr)_minmax(220px,280px)_minmax(0,1fr)] items-center gap-[clamp(16px,2.5vw,32px)] max-lg:hidden">
                    <div className="grid gap-20">
                        <PromiseLine {...a} side="left" />
                        <PromiseLine {...b} side="left" />
                    </div>
                    <div className={cn(photo, "aspect-[5/8] bg-ledger-navy")} data-reveal>
                        <SmartImage image={promises.image} sizes="280px" className="grayscale-[35%]" />
                        <div className="absolute inset-0 bg-linear-to-b from-ledger-night/10 via-transparent to-ledger-night/70" />
                    </div>
                    <div className="grid gap-20">
                        <PromiseLine {...c} side="right" />
                        <PromiseLine {...d} side="right" />
                    </div>
                </Reveal>

                <div className="mt-10 grid gap-8 lg:hidden">
                    <div className={cn(photo, "aspect-[4/5] max-h-[460px] bg-ledger-navy")}>
                        <SmartImage image={promises.image} sizes="calc(100vw - 40px)" className="grayscale-[35%]" />
                    </div>
                    <div className="border-t border-white/15">
                        {promises.items.map((p, i) => (
                            <details key={p.lead} open={i === 0} className="group/item border-b border-white/15">
                                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-jost text-[17px] font-semibold tracking-[0.04em] uppercase [&::-webkit-details-marker]:hidden">
                                    {p.lead.replace(/\.$/, "")}
                                    <Plus className="size-5 text-ochre transition-transform group-open/item:rotate-45" />
                                </summary>
                                <p className={cn(typedItalic, "pb-5 text-white/80")}>{p.text}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
