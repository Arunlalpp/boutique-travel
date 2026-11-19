import type { Metadata } from "next";
import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/ledger/CtaBand";
import { Footprints } from "@/components/ledger/Footprints";
import { PageHead } from "@/components/ledger/PageHead";
import { WhyTravel } from "@/components/ledger/WhyTravel";
import { ArrowRight } from "@/components/ledger/icons";
import { JsonLd } from "@/components/seo/JsonLd";
import { entryHref, frames, story } from "@/lib/data/ledger";
import { entryByNo, storyPage } from "@/lib/data/ledger-pages";
import { display, h2, label, lbtn, lsec, lwrap, photo, typedItalic } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { breadcrumbs, pageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    return pageMetadata({
        title: "Our Story",
        description: story.intro,
        path: "/story",
        siteName: settings.name,
    });
}

export default async function StoryPage() {
    const settings = await getSiteSettings();

    return (
        <>
            <JsonLd
                data={breadcrumbs(settings, [
                    ["Home", "/"],
                    ["Our Story", "/story"],
                ])}
            />
            <PageHead
                kicker={storyPage.kicker}
                title={storyPage.title}
                lede={storyPage.lede}
                image={story.images.main}
                crumbs={[["Home", "/"], ["Our Story"]]}
            />

            {/* The elephant story, in full */}
            <section className={cn(lsec, "bg-ledger-paper text-ledger-ink")} aria-labelledby="story-title">
                <div
                    className={cn(
                        lwrap,
                        "grid grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] items-start gap-[clamp(40px,7vw,96px)] max-md:grid-cols-1",
                    )}
                >
                    <div className="grid max-w-[62ch] gap-6">
                        <Footprints className="text-ledger-grey" />
                        <h2
                            id="story-title"
                            className="w-max font-type text-[clamp(30px,3.4vw,40px)] leading-none font-bold italic underline decoration-2 underline-offset-[10px]"
                        >
                            {story.title}
                        </h2>
                        <p className={cn(typedItalic, "text-[clamp(17px,1.7vw,20px)]")}>{story.intro}</p>
                        {[...story.body, ...story.more].map((p) => (
                            <p key={p} className={cn(typedItalic, "text-ledger-ink/85")}>
                                {p}
                            </p>
                        ))}
                    </div>
                    <Reveal className="grid gap-5 md:sticky md:top-28">
                        <div className={cn(photo, "aspect-[4/5]")} data-reveal>
                            <SmartImage image={story.images.inset} sizes="(min-width: 768px) 40vw, 100vw" />
                        </div>
                        <p className="font-type text-[12.5px] text-ledger-ink/65 italic" data-reveal>
                            Field note · the first camp, before there was a ledger.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* The two partners */}
            <section className={cn(lsec, "bg-ledger-stone text-ledger-ink")} aria-labelledby="partners-title">
                <div className={lwrap}>
                    <h2 id="partners-title" className={h2}>
                        Two of us, every route
                    </h2>
                    <ul className="mt-12 grid grid-cols-2 gap-[clamp(28px,4vw,56px)] max-md:grid-cols-1">
                        {story.partners.map((p) => (
                            <li
                                key={p.name}
                                className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] gap-6 max-sm:grid-cols-1"
                            >
                                <div className={cn(photo, "aspect-[4/5]")}>
                                    <SmartImage image={p.image} sizes="(min-width: 768px) 22vw, 100vw" />
                                </div>
                                <div className="grid content-end gap-3">
                                    <b className={cn(display, "text-[22px]")}>{p.name}</b>
                                    <span className={cn(label, "text-[10.5px] text-ledger-ink/70")}>{p.role}</span>
                                    <p className={cn(typedItalic, "text-[14px] text-ledger-ink/80")}>
                                        {storyPage.partnerBio}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* How a route is scouted */}
            <section className={cn(lsec, "bg-ledger-paper text-ledger-ink")} aria-labelledby="scout-title">
                <div className={lwrap}>
                    <Footprints step={2} className="mb-6 text-ledger-grey" />
                    <h2 id="scout-title" className={h2}>
                        How a route is scouted
                    </h2>
                    <Reveal
                        as="ol"
                        className="mt-12 grid grid-cols-4 gap-x-6 gap-y-12 max-lg:grid-cols-2 max-sm:grid-cols-1"
                    >
                        {storyPage.scouting.map((s, i) => (
                            <li key={s.title} className="grid content-start gap-3 border-t-2 border-ledger-ink pt-4">
                                <span
                                    data-reveal
                                    style={{ transitionDelay: `${i * 140}ms` }}
                                    className="font-jost text-[clamp(56px,5.6vw,76px)] leading-none font-semibold text-ledger-grey/60 tabular-nums"
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className={cn(display, "text-[17px] leading-tight")}>{s.title}</h3>
                                <p className={cn(typedItalic, "text-[14px] text-ledger-ink/80")}>{s.text}</p>
                            </li>
                        ))}
                    </Reveal>
                </div>
            </section>

            {/* Responsible-travel promise */}
            <div id="promise" className="scroll-mt-16">
                <WhyTravel />
            </div>

            {/* Hosts directory */}
            <section id="hosts" className={cn(lsec, "bg-ledger-paper text-ledger-ink")} aria-labelledby="hosts-title">
                <div className={lwrap}>
                    <Footprints step={3} className="mb-6 text-ledger-grey" />
                    <div className="grid max-w-[620px] gap-4">
                        <h2 id="hosts-title" className={h2}>
                            Meet your hosts
                        </h2>
                        <p className={cn(typedItalic, "text-ledger-ink/80")}>{storyPage.hostsLede}</p>
                    </div>
                    <ul className="mt-12 grid grid-cols-4 gap-x-6 gap-y-12 max-lg:grid-cols-2 max-sm:grid-cols-1">
                        {frames.hosts.map((h) => (
                            <li key={h.role} className="grid content-start gap-4">
                                <div className={cn(photo, "aspect-square")}>
                                    <SmartImage
                                        image={h.image}
                                        sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 100vw"
                                    />
                                </div>
                                <div className="grid gap-1">
                                    <b className={cn(display, "text-[17px] tracking-[0.04em] normal-case")}>{h.name}</b>
                                    <span className="font-type text-[13px] text-ledger-ink/70">{h.role}</span>
                                </div>
                                <ul className="grid gap-1.5 border-t border-ledger-line pt-3">
                                    {h.entries.map((no) => {
                                        const e = entryByNo(no);
                                        return (
                                            e && (
                                                <li key={no}>
                                                    <Link
                                                        href={entryHref(e)}
                                                        className="group grid gap-1 font-jost text-[12px] leading-snug font-semibold tracking-[0.1em] uppercase"
                                                    >
                                                        <span className="text-[10.5px] text-ochre-deep">
                                                            Entry no. {e.no}
                                                        </span>
                                                        <span className="inline-flex items-center gap-2">
                                                            {e.name}
                                                            <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                                                        </span>
                                                    </Link>
                                                </li>
                                            )
                                        );
                                    })}
                                </ul>
                            </li>
                        ))}
                    </ul>
                    <p className={cn(typedItalic, "mt-14 max-w-[62ch] text-ledger-ink/80")}>
                        [Placeholder] Every host is someone we have stayed with ourselves. We pay hosts directly and
                        fairly, agree group sizes with them in advance, and never bring more guests than a home or
                        village can welcome on its own terms.
                    </p>
                </div>
            </section>

            <CtaBand
                title="Walk a route of your own"
                text="Tell us what kind of traveller you are, and we will begin writing your Entry."
                href="/enquire"
                action="Begin your entry"
            >
                <Link href="/entries" className={lbtn("outline-light")}>
                    Read the ledger
                </Link>
            </CtaBand>
        </>
    );
}
