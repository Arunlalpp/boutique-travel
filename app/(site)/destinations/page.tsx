import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { DestinationIndex } from "@/components/destination/DestinationIndex";
import { media } from "@/lib/data/media";
import { getAllDestinations } from "@/sanity/lib/queries";

export const metadata: Metadata = {
    title: "Destinations",
    description: "From misty hills to high-altitude deserts. Pick a landscape and we’ll build the journey around it.",
    alternates: { canonical: "/destinations" },
};

export default async function DestinationsPage() {
    const destinations = await getAllDestinations();
    const spotlight = destinations.find((d) => d.featured) ?? destinations[0];

    return (
        <>
            <PageHero
                image={media.summit}
                className="pb-27.5"
                crumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
                eyebrow={`${destinations.length} places to wake up`}
                title="Where will you wake up next?"
                lede="From misty tea hills to high-altitude deserts. Pick a landscape and we’ll build the journey around it."
            />

            <DestinationIndex destinations={destinations} />

            {spotlight && (
                <section className="sec" aria-labelledby="spotlight-title">
                    <div className="wrap">
                        <div className="feature shadow-deep">
                            <div className="media-fill">
                                <SmartImage image={spotlight.heroImage} sizes="(min-width: 1240px) 1160px, 100vw" />
                            </div>
                            <Reveal className="panel glass-strong">
                                <span className="eyebrow" data-reveal>
                                    Destination of the month
                                </span>
                                <h2 id="spotlight-title" className="h-lg" data-reveal>
                                    {spotlight.name}
                                </h2>
                                <p className="lede" data-reveal>
                                    {spotlight.shortDescription}
                                </p>
                                <div className="facts" data-reveal>
                                    <div className="fact">
                                        <div className="k">Region</div>
                                        <div className="v">{spotlight.region}</div>
                                    </div>
                                    <div className="fact">
                                        <div className="k">Country</div>
                                        <div className="v">{spotlight.country}</div>
                                    </div>
                                    <div className="fact">
                                        <div className="k">Journeys</div>
                                        <div className="v">{spotlight.journeyCount || "Bespoke"}</div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2.5" data-reveal>
                                    <ButtonLink href={`/enquire?destination=${spotlight.slug}`}>
                                        Plan {spotlight.name}
                                    </ButtonLink>
                                    <ButtonLink href={`/destinations/${spotlight.slug}`} variant="glass" arrow={false}>
                                        Explore {spotlight.name}
                                    </ButtonLink>
                                </div>
                            </Reveal>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
