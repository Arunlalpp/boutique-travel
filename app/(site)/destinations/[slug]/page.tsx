import type { Metadata } from "next";
import { absolute, breadcrumbs, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { Rail } from "@/components/ui/Rail";
import { Gallery } from "@/components/itinerary/Gallery";
import { JourneyCard } from "@/components/itinerary/JourneyCard";
import { CtaBand } from "@/components/home/CtaBand";
import { getDestination, getDestinationSlugs, getItinerariesForDestination, getSiteSettings } from "@/sanity/lib/queries";
import { eyebrow, hLg, hMd, sec, secHead, secHeadTitle, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
    const slugs = await getDestinationSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const destination = await getDestination(slug);
    if (!destination) return {};
    const title = destination.seo?.metaTitle || destination.name;
    const description = destination.seo?.metaDescription || destination.shortDescription;
    const settings = await getSiteSettings();
    return pageMetadata({
        title,
        description,
        path: `/destinations/${destination.slug}`,
        siteName: settings.name,
        type: "article",
    });
}

export default async function DestinationPage({ params }: { params: Params }) {
    const { slug } = await params;
    const destination = await getDestination(slug);
    if (!destination) notFound();

    const [journeys, settings] = await Promise.all([getItinerariesForDestination(destination.slug), getSiteSettings()]);
    const structuredData = [
        {
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            name: destination.name,
            description: destination.description || destination.shortDescription,
            url: absolute(settings, `/destinations/${destination.slug}`),
            image: destination.heroImage.src,
            containedInPlace: { "@type": "Country", name: destination.country },
        },
        breadcrumbs(settings, [
            ["Home", "/"],
            ["Destinations", "/destinations"],
            [destination.name, `/destinations/${destination.slug}`],
        ]),
    ];
    const enquireHref = `/enquire?destination=${destination.slug}`;

    return (
        <article>
            <JsonLd data={structuredData} />
            <PageHero
                image={destination.heroImage}
                tall
                crumbs={[
                    { label: "Home", href: "/" },
                    { label: "Destinations", href: "/destinations" },
                    { label: destination.name },
                ]}
                eyebrow={`${destination.region} · ${destination.country}`}
                title={destination.name}
                lede={destination.shortDescription}
            >
                <div className="flex flex-wrap gap-2.5">
                    <ButtonLink href={enquireHref}>Plan a trip here</ButtonLink>
                    {journeys.length > 0 && (
                        <ButtonLink href="#journeys" variant="glass" arrow={false}>
                            {journeys.length} journey{journeys.length === 1 ? "" : "s"}
                        </ButtonLink>
                    )}
                </div>
            </PageHero>

            {destination.description && (
                <section aria-labelledby="about-title" className={sec}>
                    <Reveal className={cn(wrap, "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]")}>
                        <span className={cn(eyebrow, "self-start")} id="about-title" data-reveal>
                            About {destination.name}
                        </span>
                        <p className="font-display text-[clamp(22px,2.6vw,32px)] leading-[1.35]" data-reveal>
                            {destination.description}
                        </p>
                    </Reveal>
                </section>
            )}

            {destination.gallery.length > 0 && (
                <section aria-labelledby="gallery-title" className={cn(sec, "pt-0!")}>
                    <div className={wrap}>
                        <div className={secHead}>
                            <div className={secHeadTitle}>
                                <span className={eyebrow}>In pictures</span>
                                <h2 id="gallery-title" className={hMd}>
                                    {destination.name}, up close
                                </h2>
                            </div>
                        </div>
                        <Gallery images={destination.gallery} title={destination.name} />
                    </div>
                </section>
            )}

            {journeys.length > 0 && (
                <section id="journeys" aria-labelledby="journeys-title" className={cn(sec, "scroll-mt-24 pt-0!")}>
                    <Rail
                        label={`Journeys in ${destination.name}`}
                        head={
                            <div className={secHeadTitle}>
                                <span className={eyebrow}>Journeys here</span>
                                <h2 id="journeys-title" className={hLg}>
                                    Ways to see {destination.name}
                                </h2>
                            </div>
                        }
                    >
                        {journeys.map((j) => (
                            <JourneyCard key={j.slug} journey={j} />
                        ))}
                    </Rail>
                </section>
            )}

            <CtaBand
                title={`Shall we begin with ${destination.name}?`}
                lede="Tell us who’s travelling and when. A trip designer will shape the route around you, with no obligation."
            />
        </article>
    );
}
