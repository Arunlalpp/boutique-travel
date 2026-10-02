import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/queries";
import { PageHero } from "@/components/ui/PageHero";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import { CompassIcon, HeartIcon, LeafIcon, ShieldIcon } from "@/components/ui/Icons";
import { GuidesRail } from "@/components/about/GuidesRail";
import { CtaBand } from "@/components/home/CtaBand";
import { guides, story, timeline, values } from "@/lib/data/about";
import { media } from "@/lib/data/media";
import { eyebrow, hLg, hMd, iconTile, lede, mono, sec, secHead, secHeadTitle, wrap } from "@/lib/ui";
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

const valueIcons = { leaf: LeafIcon, shield: ShieldIcon, heart: HeartIcon, compass: CompassIcon };

export default function AboutPage() {
    return (
        <>
            <PageHero
                image={media.nightSky}
                crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
                eyebrow="Our story"
                title="Built by campers, for curious souls."
                lede="Since 2014 we’ve guided more than 12,000 travellers into the quietest corners of the map: slowly, sustainably, and always with a story."
            />

            <section className={sec} aria-labelledby="story-title">
                <div
                    className={cn(
                        wrap,
                        "grid grid-cols-2 items-center gap-[clamp(32px,6vw,90px)] max-desk:grid-cols-1",
                    )}
                >
                    <Reveal className="relative">
                        <div
                            data-reveal
                            className="relative aspect-14/15 max-w-full overflow-hidden rounded-[32px] bg-night-3 shadow-deep"
                        >
                            <SmartImage image={story.image} sizes="(min-width: 960px) 50vw, 100vw" />
                        </div>
                        <div
                            data-reveal
                            className="glass-strong absolute -right-[18px] bottom-7 z-2 rounded-3xl px-[22px] py-[18px] shadow-deep max-desk:right-3"
                        >
                            <b className="block font-display text-[46px] leading-none font-normal">
                                {story.years.value}
                            </b>
                            <span className="text-[13px] text-mist">{story.years.label}</span>
                        </div>
                    </Reveal>
                    <Reveal className="grid gap-5">
                        <span className={eyebrow} data-reveal>
                            {story.eyebrow}
                        </span>
                        <h2 id="story-title" className={hLg} data-reveal>
                            {story.title}
                        </h2>
                        {story.paragraphs.map((p) => (
                            <p key={p} className={lede} data-reveal>
                                {p}
                            </p>
                        ))}
                        <div className="flex items-center gap-3.5" data-reveal>
                            <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-night-3">
                                <SmartImage image={story.founders.image} sizes="48px" quality={65} />
                            </div>
                            <span>
                                <b>{story.founders.names}</b>
                                <br />
                                <small className="text-dim">{story.founders.role}</small>
                            </span>
                        </div>
                    </Reveal>
                </div>
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
                        <span className={cn(mono, "text-dim")} aria-hidden>
                            Swipe the timeline →
                        </span>
                    </div>
                    <ol
                        className="flex snap-x snap-mandatory overflow-x-auto pt-[30px] pb-2.5 scrollbar-none"
                        tabIndex={0}
                        aria-label="Our timeline"
                    >
                        {timeline.map((t, i) => (
                            <li
                                key={t.year}
                                className="relative w-[260px] shrink-0 snap-start pr-7 before:absolute before:inset-x-0 before:top-[9px] before:h-px before:bg-line-2 before:content-['']"
                            >
                                <div
                                    className={cn(
                                        "relative mb-[22px] size-5 rounded-full border-2 border-ember",
                                        i === timeline.length - 1 ? "bg-ember" : "bg-night",
                                    )}
                                />
                                <div className="font-mono text-[13px] text-ember">{t.year}</div>
                                <h3 className="mt-1.5 mb-2 text-[22px]">{t.title}</h3>
                                <p className="text-sm text-mist">{t.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section
                className={cn(sec, "overflow-hidden bg-linear-to-b from-night to-night-2")}
                aria-labelledby="values-title"
            >
                <div
                    aria-hidden
                    className="pointer-events-none absolute top-0 -left-[200px] size-[600px] rounded-full bg-[radial-gradient(circle,rgb(76_123_217/0.25),transparent_70%)] blur-[10px]"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute -right-[100px] -bottom-[100px] size-[600px] rounded-full bg-[radial-gradient(circle,rgb(245_158_61/0.18),transparent_70%)] blur-[10px]"
                />
                <div className={cn(wrap, "relative")}>
                    <div className={secHead}>
                        <div className={secHeadTitle}>
                            <span className={eyebrow}>What we stand for</span>
                            <h2 id="values-title" className={hLg}>
                                Our values
                            </h2>
                        </div>
                    </div>
                    <Reveal className="grid grid-cols-4 gap-[18px] max-desk:grid-cols-2 max-xs:grid-cols-1">
                        {values.map((v) => {
                            const Icon = valueIcons[v.icon];
                            return (
                                <div key={v.title} data-reveal className="grid">
                                    <div className="glass grid content-start gap-3.5 rounded-[28px] p-7 transition-[translate,background-color] duration-400 ease-soft hover:-translate-y-1.5 hover:bg-white/12!">
                                        <div className={cn(iconTile, "size-13! rounded-2xl! [&_svg]:size-6!")}>
                                            <Icon />
                                        </div>
                                        <h3 className="text-[22px]">{v.title}</h3>
                                        <p className="text-sm text-mist">{v.text}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </Reveal>
                </div>
            </section>

            <section id="guides" className={cn(sec, "scroll-mt-24")} aria-labelledby="guides-title">
                <GuidesRail guides={guides} />
            </section>

            <CtaBand />
        </>
    );
}
