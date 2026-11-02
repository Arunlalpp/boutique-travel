import { impact } from "@/lib/data/home";
import { SmartImage } from "@/components/ui/SmartImage";
import { PinIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { eyebrow, hLg, mediaFill, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function ImpactBand() {
    return (
        <section
            className="relative flex min-h-[720px] items-end overflow-hidden max-tab:min-h-0"
            aria-labelledby="impact-title"
        >
            <div className={mediaFill}>
                <SmartImage image={impact.image} sizes="100vw" quality={75} />
                <div className="absolute inset-0 bg-linear-to-b from-night via-night/25 via-40% to-night" />
            </div>
            <div className="glass-strong absolute top-[40%] right-[clamp(16px,6vw,120px)] z-2 flex h-10 items-center gap-2 rounded-full px-4 text-[13px] font-semibold max-tab:hidden [&_svg]:size-[15px] [&_svg]:text-ember">
                <PinIcon />
                {impact.place}
            </div>
            <Reveal className={cn(wrap, "relative z-2 pt-[120px] pb-[72px]")}>
                <span className={eyebrow} data-reveal>
                    {impact.eyebrow}
                </span>
                <h2 id="impact-title" className={cn(hLg, "mt-3.5 max-w-[16ch]")} data-reveal>
                    {impact.title}
                </h2>
                <div className="mt-9 grid grid-cols-4 gap-[18px] max-tab:grid-cols-2">
                    {impact.stats.map((s) => (
                        <div key={s.label} data-reveal className="grid">
                            <div className="glass-strong flex flex-col-reverse gap-1.5 rounded-3xl px-[26px] pt-[26px] pb-[22px] transition-[translate,background-color] duration-400 ease-soft hover:-translate-y-1.5 hover:bg-white/14!">
                                <span className="text-xs font-bold tracking-[0.14em] text-mist uppercase">{s.label}</span>
                                <b className="font-display font-normal text-[clamp(40px,4.4vw,58px)] leading-none tabular-nums">
                                    {s.value}
                                </b>
                            </div>
                        </div>
                    ))}
                </div>
            </Reveal>
        </section>
    );
}
