import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import { CompassIcon, HeartIcon, LeafIcon, ShieldIcon } from "@/components/ui/Icons";
import { GuidesRail } from "@/components/about/GuidesRail";
import { CtaBand } from "@/components/home/CtaBand";
import { guides, story, timeline, values } from "@/lib/data/about";
import { media } from "@/lib/data/media";

export const metadata: Metadata = {
    title: "About",
    description:
        "Built by campers, for curious souls. Meet the guides, naturalists and hosts behind our small-group adventures.",
    alternates: { canonical: "/about" },
};

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

            <section className="sec" aria-labelledby="story-title">
                <div className="wrap story">
                    <Reveal className="ph-wrap">
                        <div className="ph shadow-deep" data-reveal>
                            <SmartImage image={story.image} sizes="(min-width: 960px) 50vw, 100vw" />
                        </div>
                        <div className="yr glass-strong shadow-deep" data-reveal>
                            <b>{story.years.value}</b>
                            <span>{story.years.label}</span>
                        </div>
                    </Reveal>
                    <Reveal className="grid gap-5">
                        <span className="eyebrow" data-reveal>
                            {story.eyebrow}
                        </span>
                        <h2 id="story-title" className="h-lg" data-reveal>
                            {story.title}
                        </h2>
                        {story.paragraphs.map((p) => (
                            <p key={p} className="lede" data-reveal>
                                {p}
                            </p>
                        ))}
                        <div className="q-who" data-reveal>
                            <div className="avatar">
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

            <section className="sec pt-0" aria-labelledby="timeline-title">
                <div className="wrap">
                    <div className="sec-head">
                        <div className="t">
                            <span className="eyebrow">How we got here</span>
                            <h2 id="timeline-title" className="h-md">
                                Twelve years, one trail
                            </h2>
                        </div>
                        <span className="mono text-dim" aria-hidden>
                            Swipe the timeline →
                        </span>
                    </div>
                    <ol className="timeline" tabIndex={0} aria-label="Our timeline">
                        {timeline.map((t) => (
                            <li key={t.year} className="tl">
                                <div className="n" />
                                <div className="y">{t.year}</div>
                                <h3 className="text-[22px]">{t.title}</h3>
                                <p>{t.text}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            <section
                className="sec overflow-hidden"
                aria-labelledby="values-title"
                style={{ background: "linear-gradient(180deg,var(--color-night),var(--color-night-2))" }}
            >
                <div
                    aria-hidden
                    className="glow"
                    style={{
                        width: 600,
                        height: 600,
                        left: -200,
                        top: 0,
                        background: "radial-gradient(circle,rgba(76,123,217,.25),transparent 70%)",
                    }}
                />
                <div
                    aria-hidden
                    className="glow"
                    style={{
                        width: 600,
                        height: 600,
                        right: -100,
                        bottom: -100,
                        background: "radial-gradient(circle,rgba(245,158,61,.18),transparent 70%)",
                    }}
                />
                <div className="wrap relative">
                    <div className="sec-head">
                        <div className="t">
                            <span className="eyebrow">What we stand for</span>
                            <h2 id="values-title" className="h-lg">
                                Our values
                            </h2>
                        </div>
                    </div>
                    <Reveal className="values">
                        {values.map((v) => {
                            const Icon = valueIcons[v.icon];
                            return (
                                <div key={v.title} className="value glass" data-reveal>
                                    <div className="ib">
                                        <Icon />
                                    </div>
                                    <h3>{v.title}</h3>
                                    <p>{v.text}</p>
                                </div>
                            );
                        })}
                    </Reveal>
                </div>
            </section>

            <section id="guides" className="sec scroll-mt-24" aria-labelledby="guides-title">
                <GuidesRail guides={guides} />
            </section>

            <CtaBand />
        </>
    );
}
