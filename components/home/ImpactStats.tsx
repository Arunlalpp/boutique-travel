import { impact } from "@/lib/data/home";
import { Reveal } from "@/components/motion/Reveal";
import { eyebrow, ruled, sec, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** Four big figures on hairline rules. */
export function ImpactStats() {
    return (
        <section className={cn(sec, "pt-0!")} aria-labelledby="impact-title">
            <div className={wrap}>
                <h2 id="impact-title" className={cn(eyebrow, "mb-6 font-sans tracking-[0.16em]")}>
                    {impact.eyebrow}
                </h2>
                <Reveal as="dl" className="grid grid-cols-4 gap-5 max-tab:grid-cols-2 max-tab:gap-y-8">
                    {impact.stats.map((s) => (
                        <div key={s.label} data-reveal className={cn(ruled, "flex flex-col-reverse gap-2")}>
                            <dt className="text-xs text-dim">{s.label}</dt>
                            <dd className="font-display text-[clamp(40px,4.6vw,60px)] leading-none font-light tracking-[-0.03em] tabular-nums">
                                {s.value}
                            </dd>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
