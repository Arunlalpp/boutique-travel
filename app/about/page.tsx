import type { Metadata } from "next";
import { ImageHero } from "@/components/ui/ImageHero";
import { SmartImage } from "@/components/ui/SmartImage";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { media } from "@/lib/data/media";
import { aboutStats } from "@/lib/data/site";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Our Story",
    description: "A small travel studio designing private and small-group journeys, one at a time.",
    alternates: { canonical: "/about" },
};

const principles = [
    {
        title: "Fewer, better",
        text: "We cap the number of journeys we design each season, so that every guest has our full attention.",
    },
    {
        title: "Places, not products",
        text: "We only send guests where we have been ourselves, and work with people we know by name.",
    },
    {
        title: "Travel that leaves a place better",
        text: "Locally owned stays, fairly paid guides and a share of every journey given back where it happens.",
    },
];

export default function AboutPage() {
    return (
        <>
            <ImageHero
                image={media.valleyLight}
                size="medium"
                eyebrow="Our story"
                title={
                    <>
                        A small studio for <span className="serif-italic">unhurried</span> travel
                    </>
                }
            />

            <section className="py-24 md:py-40">
                <Reveal className="container-x grid gap-10 md:grid-cols-12 md:gap-8">
                    <p data-reveal className="eyebrow text-stone md:col-span-3">
                        Why we began
                    </p>
                    <div className="md:col-span-8">
                        <p data-reveal className="font-serif text-[clamp(1.75rem,3.4vw,3rem)] font-light leading-[1.2]">
                            We started with a simple frustration: the trips we remembered most were never the ones in
                            the brochures. They were the ones where someone who knew a place well had quietly opened a
                            door.
                        </p>
                        <p data-reveal className="mt-10 max-w-2xl text-lg text-ink-soft">
                            So we built a studio around that idea. A handful of designers, each of whom has lived or
                            worked in the regions they plan, designing a small number of journeys each year — privately,
                            or for groups of no more than ten.
                        </p>
                    </div>
                </Reveal>
            </section>

            <section className="pb-24 md:pb-40">
                <div className="container-x space-y-24 md:space-y-40">
                    <div className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
                        <Parallax className="aspect-[4/5] bg-paper-deep md:col-span-5" amount={12}>
                            <SmartImage image={media.walkers} sizes="(min-width: 768px) 40vw, 100vw" tone="light" />
                        </Parallax>
                        <Reveal className="md:col-span-5 md:col-start-8">
                            <p data-reveal className="eyebrow text-clay">
                                Chapter one
                            </p>
                            <h2 data-reveal className="mt-6 text-4xl md:text-5xl">
                                How it <span className="serif-italic">began</span>
                            </h2>
                            <p data-reveal className="mt-8 text-lg text-ink-soft">
                                Placeholder copy. The founders&apos; story — where they travelled, what they noticed,
                                and why they decided to build something different — will sit here, in two or three short
                                paragraphs.
                            </p>
                        </Reveal>
                    </div>

                    <div className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
                        <Reveal className="order-2 md:order-1 md:col-span-5 md:col-start-2">
                            <p data-reveal className="eyebrow text-clay">
                                Chapter two
                            </p>
                            <h2 data-reveal className="mt-6 text-4xl md:text-5xl">
                                How we <span className="serif-italic">work</span>
                            </h2>
                            <p data-reveal className="mt-8 text-lg text-ink-soft">
                                A first conversation, never a form letter. A proposal written for you. One designer from
                                the first call to the journey home — and a phone that&apos;s answered at any hour while
                                you&apos;re away.
                            </p>
                            <div data-reveal className="mt-10">
                                <ButtonLink href="/enquire" variant="text">
                                    Start a conversation
                                </ButtonLink>
                            </div>
                        </Reveal>
                        <Parallax
                            className="order-1 aspect-[5/4] bg-paper-deep md:order-2 md:col-span-5 md:col-start-8"
                            amount={12}
                        >
                            <SmartImage image={media.alpineLake} sizes="(min-width: 768px) 40vw, 100vw" tone="light" />
                        </Parallax>
                    </div>
                </div>
            </section>

            <section aria-label="The studio in numbers" className="bg-paper-deep py-20 md:py-28">
                <Reveal as="dl" className="container-x grid grid-cols-2 gap-y-12 lg:grid-cols-4">
                    {aboutStats.map((s) => (
                        <div key={s.label} data-reveal className="flex flex-col-reverse border-l border-ink/15 pl-6">
                            <dt className="mt-3 max-w-[12rem] text-sm text-stone">{s.label}</dt>
                            <dd className="font-serif text-6xl font-light md:text-7xl">{s.value}</dd>
                        </div>
                    ))}
                </Reveal>
            </section>

            <section aria-labelledby="principles-title" className="py-24 md:py-40">
                <div className="container-x">
                    <Reveal>
                        <p data-reveal className="eyebrow text-stone">
                            What we hold to
                        </p>
                        <h2 id="principles-title" data-reveal className="mt-6 max-w-3xl text-4xl md:text-6xl">
                            Three things we <span className="serif-italic">won&apos;t compromise on</span>
                        </h2>
                    </Reveal>
                    <Reveal as="ol" className="mt-16 border-t border-ink/15 md:mt-24">
                        {principles.map((p, i) => (
                            <li
                                key={p.title}
                                data-reveal
                                className="grid gap-4 border-b border-ink/15 py-10 md:grid-cols-12 md:gap-8 md:py-14"
                            >
                                <span className="eyebrow text-clay md:col-span-2 md:pt-3">{pad(i + 1)}</span>
                                <h3 className="text-3xl md:col-span-5 md:text-4xl">{p.title}</h3>
                                <p className="text-lg text-stone md:col-span-5">{p.text}</p>
                            </li>
                        ))}
                    </Reveal>
                </div>
            </section>

            <Parallax className="h-[70svh] min-h-[420px] bg-night" amount={14}>
                <SmartImage image={media.summit} sizes="100vw" />
            </Parallax>
        </>
    );
}
