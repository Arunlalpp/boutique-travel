import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { DestinationIndex } from "@/components/destination/DestinationIndex";
import { eyebrow, factLabel, factValue, frame, hLg, photoTag, ruled, sec, secHead, secHeadTitle, textLink, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";
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
                crumbs={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
                eyebrow={`${destinations.length} places to wake up`}
                title="Where will you wake up next?"
                lede="From misty tea hills to high-altitude deserts. Pick a landscape and we’ll build the journey around it."
            />

            <DestinationIndex destinations={destinations} />

            {spotlight && (
                <section className={sec} aria-labelledby="spotlight-title">
                    <div className={wrap}>
                        <div className={secHead}>
                            <div className={secHeadTitle}>
                                <span className={eyebrow}>Destination of the month</span>
                                <h2 id="spotlight-title" className={hLg}>
                                    {spotlight.name}
                                </h2>
                            </div>
                            <Link href={`/destinations/${spotlight.slug}`} className={cn(textLink, "text-[13px]")}>
                                Explore {spotlight.name} <ArrowIcon />
                            </Link>
                        </div>
                        <div className={cn(frame, "aspect-16/7 max-tab:aspect-4/3")}>
                            <SmartImage image={spotlight.heroImage} sizes="(min-width: 1280px) 1220px, 100vw" />
                            <span className={photoTag}>{spotlight.shortDescription}</span>
                        </div>
                        <Reveal as="dl" className="mt-6 grid grid-cols-4 gap-5 max-tab:grid-cols-2">
                            {[
                                ["Region", spotlight.region],
                                ["Country", spotlight.country],
                                ["Journeys", spotlight.journeyCount || "Bespoke"],
                            ].map(([k, v]) => (
                                <div key={k} className={cn(ruled, "grid gap-1")} data-reveal>
                                    <dt className={factLabel}>{k}</dt>
                                    <dd className={factValue}>{v}</dd>
                                </div>
                            ))}
                            <div className={cn(ruled, "grid gap-1")} data-reveal>
                                <dt className={factLabel}>Plan</dt>
                                <dd>
                                    <Link href={`/enquire?destination=${spotlight.slug}`} className={textLink}>
                                        Start a trip <ArrowIcon />
                                    </Link>
                                </dd>
                            </div>
                        </Reveal>
                    </div>
                </section>
            )}
        </>
    );
}
