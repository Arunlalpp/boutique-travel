import { cta } from "@/lib/data/home";
import { contactHref } from "@/lib/data/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";

export function CtaBand({ title = cta.title, lede = cta.lede }: { title?: string; lede?: string }) {
    return (
        <section className="cta" aria-labelledby="cta-title">
            <div className="media-fill">
                <SmartImage image={cta.image} sizes="100vw" quality={75} />
            </div>
            <div className="wrap grid place-items-center py-[90px]">
                <Reveal className="panel shadow-deep">
                    <span className="eyebrow text-ember-soft" data-reveal>
                        {cta.eyebrow}
                    </span>
                    <h2 id="cta-title" className="h-lg" data-reveal>
                        {title}
                    </h2>
                    <p className="lede" data-reveal>
                        {lede}
                    </p>
                    <div className="actions" data-reveal>
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
