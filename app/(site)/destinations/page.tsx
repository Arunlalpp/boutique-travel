import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { DestinationIndex } from "@/components/destination/DestinationIndex";
import { media } from "@/lib/data/media";
import { eyebrow, factLabel, factValue, hLg, lede, mediaFill, sec, wrap } from "@/lib/ui";
import { getAllDestinations, getSiteSettings } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    return pageMetadata({
        title: "Destinations",
        description: "From misty hills to high-altitude deserts. Pick a landscape and we’ll build the journey around it.",
        path: "/destinations",
        siteName: settings.name,
    });
}

export default async function DestinationsPage() {
    const destinations = await getAllDestinations();
    const spotlight = destinations.find((d) => d.featured) ?? destinations[0];

    return (
        <>
            <PageHero
                image={media.summit}
                className="pb-27.5!"
                crumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
                eyebrow={`${destinations.length} places to wake up`}
                title="Where will you wake up next?"
                lede="From misty tea hills to high-altitude deserts. Pick a landscape and we’ll build the journey around it."
            />

            <DestinationIndex destinations={destinations} />

            {spotlight && (
                <section className={sec} aria-labelledby="spotlight-title">
                    <div className={wrap}>
                        <div className="relative flex min-h-[540px] items-center justify-end overflow-hidden rounded-[36px] bg-night-3 p-[clamp(16px,3vw,40px)] shadow-deep max-tab:min-h-0 max-tab:pt-[220px]">
                            <div className={mediaFill}>
                                <SmartImage image={spotlight.heroImage} sizes="(min-width: 1240px) 1160px, 100vw" />
                            </div>
                            <Reveal className="glass-strong relative z-2 grid w-[min(500px,100%)] gap-[18px] rounded-[30px] p-[clamp(24px,3.4vw,40px)]">
                                <span className={eyebrow} data-reveal>
                                    Destination of the month
                                </span>
                                <h2 id="spotlight-title" className={hLg} data-reveal>
                                    {spotlight.name}
                                </h2>
                                <p className={lede} data-reveal>
                                    {spotlight.shortDescription}
                                </p>
                                <dl className="flex flex-wrap gap-[26px]" data-reveal>
                                    {[
                                        ["Region", spotlight.region],
                                        ["Country", spotlight.country],
                                        ["Journeys", spotlight.journeyCount || "Bespoke"],
                                    ].map(([k, v]) => (
                                        <div key={k}>
                                            <dt className={factLabel}>{k}</dt>
                                            <dd className={factValue}>{v}</dd>
                                        </div>
                                    ))}
                                </dl>
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
