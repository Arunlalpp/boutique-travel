import { impact } from "@/lib/data/home";
import { SmartImage } from "@/components/ui/SmartImage";
import { PinIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";

export function ImpactBand() {
    return (
        <section className="canyon" aria-labelledby="impact-title">
            <div className="media-fill">
                <SmartImage image={impact.image} sizes="100vw" quality={75} />
            </div>
            <div className="loc-tag glass-strong">
                <PinIcon />
                {impact.place}
            </div>
            <Reveal className="wrap inner">
                <span className="eyebrow" data-reveal>
                    {impact.eyebrow}
                </span>
                <h2 id="impact-title" className="h-lg mt-3.5 max-w-[16ch]" data-reveal>
                    {impact.title}
                </h2>
                <dl className="stats">
                    {impact.stats.map((s) => (
                        <div key={s.label} className="stat glass-strong flex flex-col-reverse" data-reveal>
                            <dt>
                                <span>{s.label}</span>
                            </dt>
                            <dd>
                                <b>{s.value}</b>
                            </dd>
                        </div>
                    ))}
                </dl>
            </Reveal>
        </section>
    );
}
