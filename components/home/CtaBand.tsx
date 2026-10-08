import Link from "next/link";
import { cta } from "@/lib/data/home";
import { contactHref } from "@/lib/data/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { frame, hXl, lede as ledeClass, photoTag, sec, textLink, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** Light card on a photo; used for the "next journey" link on journey pages. */
export const ctaShell = "relative grid min-h-[520px] place-items-center overflow-hidden text-center";
export const ctaPanel = "relative z-2 grid max-w-[640px] justify-items-center gap-4 bg-paper p-[clamp(28px,4vw,48px)]";

/** Closing call to action: big headline, short lede and button, then a wide photo. */
export function CtaBand({ title = cta.title, lede = cta.lede }: { title?: string; lede?: string }) {
    return (
        <section className={sec} aria-labelledby="cta-title">
            <div className={wrap}>
                <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-end gap-x-[clamp(24px,5vw,80px)] gap-y-6 max-desk:grid-cols-1">
                    <h2 id="cta-title" className={cn(hXl, "max-w-[12ch]")}>
                        {title}
                    </h2>
                    <div className="grid max-w-90 gap-5 pb-2 desk:justify-self-end">
                        <p className={cn(ledeClass, "text-sm")}>{lede}</p>
                        <div className="flex flex-wrap items-center gap-5">
                            <ButtonLink href={contactHref}>Plan my trip</ButtonLink>
                            <Link href="/packages" className={cn(textLink, "text-[13px] text-mist")}>
                                or see packages
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={cn(frame, "mt-[clamp(32px,4vw,48px)] aspect-16/6 max-tab:aspect-4/3")}>
                    <SmartImage image={cta.image} sizes="(min-width: 1280px) 1220px, 100vw" quality={75} />
                    <span className={photoTag}>{cta.image.alt}</span>
                </div>
            </div>
        </section>
    );
}
