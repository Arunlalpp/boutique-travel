import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/queries";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { GuidesRail } from "@/components/about/GuidesRail";
import { story, timeline, values, guides } from "@/lib/data/about";
import { media } from "@/lib/data/media";
import { eyebrow, hLg, hMd, ruled, sec, secHead, secHeadTitle, statement, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    return pageMetadata({
        title: "About",
        description: "Built by campers, for curious souls. Meet the guides, naturalists and hosts behind our small-group adventures.",
        path: "/about",
        siteName: settings.name,
    });
}

export default function AboutPage() {
    return (
        <>
            <PageHero
                crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
                eyebrow="About"
                title="Built by campers, for curious souls."
                lede="Since 2014 we’ve guided more than 12,000 travellers into the quietest corners of the map: slowly, sustainably, and always with a story."
                image={media.walkers}
            />

            <section className={sec} aria-labelledby="story-title">
                <Reveal className={cn(wrap, "grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 max-desk:grid-cols-1")}>
                    <h2 id="story-title" className={cn(eyebrow, "self-start font-sans tracking-[0.16em]")} data-reveal>
                        {story.eyebrow}
                    </h2>
                    <div className="grid gap-5" data-reveal>
                        <p className={statement}>{story.statement}</p>
                        {story.paragraphs.map((p) => (
                            <p key={p} className="max-w-[60ch] text-sm text-mist">
                                {p}
                            </p>
                        ))}
                        <p className="text-[13px]">
                            <span className="font-medium">{story.founders.names}</span>
                            <span className="text-dim">, {story.founders.role}</span>
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className={cn(sec, "pt-0!")} aria-labelledby="timeline-title">
                <div className={wrap}>
                    <div className={secHead}>
                        <div className={secHeadTitle}>
                            <span className={eyebrow}>How we got here</span>
                            <h2 id="timeline-title" className={hMd}>
                                Twelve years, one trail
                            </h2>
                        </div>
                    </div>
                    <Reveal as="ol" className="grid grid-cols-6 gap-5 max-desk:grid-cols-3 max-xs:grid-cols-2" aria-label="Our timeline">
                        {timeline.map((t) => (
                            <li key={t.year} className={cn(ruled, "grid content-start gap-1.5")} data-reveal>
                                <span className="font-mono text-[11px] text-dim">{t.year}</span>
                                <h3 className="font-sans text-sm font-semibold tracking-normal">{t.title}</h3>
                                <p className="text-xs text-mist">{t.text}</p>
                            </li>
                        ))}
                    </Reveal>
                </div>
            </section>

            <section className={cn(sec, "pt-0!")} aria-labelledby="values-title">
                <div className={wrap}>
                    <div className={secHead}>
                        <div className={secHeadTitle}>
                            <span className={eyebrow}>What we stand for</span>
                            <h2 id="values-title" className={hLg}>
                                Our values
                            </h2>
                        </div>
                    </div>
                    <Reveal as="ol" className="border-t border-line">
                        {values.map((v, k) => (
                            <li
                                key={v.title}
                                data-reveal
                                className="grid grid-cols-[48px_minmax(0,1fr)_minmax(0,1.2fr)] items-baseline gap-4 border-b border-line py-5 max-tab:grid-cols-[32px_minmax(0,1fr)]"
                            >
                                <span className="font-mono text-[11px] text-dim">{String(k + 1).padStart(2, "0")}</span>
                                <h3 className="text-[clamp(20px,2.2vw,26px)]">{v.title}</h3>
                                <p className="text-[13px] text-mist max-tab:col-start-2">{v.text}</p>
                            </li>
                        ))}
                    </Reveal>
                </div>
            </section>

            <section id="guides" className={cn(sec, "scroll-mt-24 pt-0!")} aria-labelledby="guides-title">
                <GuidesRail guides={guides} />
            </section>
        </>
    );
}
