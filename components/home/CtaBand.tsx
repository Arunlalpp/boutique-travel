import { cta } from "@/lib/data/home";
import { contactHref } from "@/lib/data/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { eyebrow, hLg, lede as ledeClass, mediaFill, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** Frosted panel centred over a full-bleed photo. Also used for the "next journey" link. */
export const ctaShell = "relative grid min-h-[620px] place-items-center overflow-hidden text-center";
export const ctaPanel =
    "relative z-2 grid max-w-[720px] justify-items-center gap-[18px] rounded-[36px] border border-white/40 bg-white/16 p-[clamp(32px,5vw,60px)] shadow-deep backdrop-blur-[26px]";

export function CtaBand({ title = cta.title, lede = cta.lede }: { title?: string; lede?: string }) {
    return (
        <section className={ctaShell} aria-labelledby="cta-title">
            <div className={mediaFill}>
                <SmartImage image={cta.image} sizes="100vw" quality={75} />
                <div className="absolute inset-0 bg-night/35" />
            </div>
            <div className={cn(wrap, "grid place-items-center py-[90px]")}>
                <Reveal className={ctaPanel}>
                    <span className={cn(eyebrow, "text-ember-soft!")} data-reveal>
                        {cta.eyebrow}
                    </span>
                    <h2 id="cta-title" className={hLg} data-reveal>
                        {title}
                    </h2>
                    <p className={cn(ledeClass, "text-center text-fg/86!")} data-reveal>
                        {lede}
                    </p>
                    <div className="flex flex-wrap justify-center gap-3" data-reveal>
                        <ButtonLink href={contactHref}>Plan my trip</ButtonLink>
                        <ButtonLink href="/packages" variant="glass" arrow={false}>
                            See packages
                        </ButtonLink>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
