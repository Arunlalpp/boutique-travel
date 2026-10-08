import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowIcon } from "@/components/ui/Icons";
import { BookingBar } from "@/components/home/BookingBar";
import { ThingsToDo } from "@/components/home/ThingsToDo";
import { ImpactStats } from "@/components/home/ImpactStats";
import { GuestQuote } from "@/components/home/GuestQuote";
import { CtaBand } from "@/components/home/CtaBand";
import { DestinationCard } from "@/components/destination/DestinationCard";
import { Reveal } from "@/components/motion/Reveal";
import { Rail } from "@/components/ui/Rail";
import { hero, intro } from "@/lib/data/home";
import { contactHref } from "@/lib/data/site";
import { eyebrow, hLg, sec, secHeadTitle, statement, textLink, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { getAllDestinations, getAllStories, getSiteSettings } from "@/sanity/lib/queries";

export default async function HomePage() {
    const [settings, destinations, stories] = await Promise.all([getSiteSettings(), getAllDestinations(), getAllStories()]);
    const ordered = [...destinations].sort((a, b) => Number(b.featured) - Number(a.featured));

    return (
        <>
            <PageHero
                crumbs={[{ label: "Home" }]}
                eyebrow={settings.descriptor || "Boutique adventures since 2014"}
                title={hero.title}
                lede={hero.lede}
                image={hero.image}
                overlay={
                    <BookingBar
                        className="desk:absolute desk:bottom-0 desk:left-0 desk:w-[min(780px,72%)] max-desk:mt-3"
                        destinations={destinations.map((d) => ({ slug: d.slug, name: d.name, country: d.country }))}
                    />
                }
            >
                <div className="flex flex-wrap items-center gap-5">
                    <ButtonLink href={contactHref}>Plan a trip</ButtonLink>
                    <Link href="/itineraries" className={cn(textLink, "text-[13px]")}>
                        Journeys <ArrowIcon />
                    </Link>
                </div>
            </PageHero>

            <section className={sec} aria-labelledby="intro-title">
                <Reveal className={cn(wrap, "grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 max-desk:grid-cols-1")}>
                    <h2 id="intro-title" className={cn(eyebrow, "self-start font-sans tracking-[0.16em]")} data-reveal>
                        {intro.eyebrow}
                    </h2>
                    <div className="grid gap-5" data-reveal>
                        <p className={statement}>{intro.text}</p>
                        <Link href="/about" className={cn(textLink, "text-[13px]")}>
                            Our story <ArrowIcon />
                        </Link>
                    </div>
                </Reveal>
            </section>

            {ordered.length > 0 && (
                <section className={cn(sec, "pt-0!")} aria-labelledby="next-title">
                    <Rail
                        label="Destinations"
                        head={
                            <div className={secHeadTitle}>
                                <span className={eyebrow}>Destinations</span>
                                <h2 id="next-title" className={hLg}>
                                    Where to next
                                </h2>
                            </div>
                        }
                    >
                        {ordered.map((d) => (
                            <DestinationCard key={d.slug} destination={d} sizes="(min-width: 1024px) 300px, 70vw" />
                        ))}
                    </Rail>
                </section>
            )}

            <ThingsToDo />
            <ImpactStats />
            <GuestQuote stories={stories} />
            <CtaBand />
        </>
    );
}
