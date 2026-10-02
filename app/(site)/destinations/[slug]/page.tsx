import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { Rail } from "@/components/ui/Rail";
import { Gallery } from "@/components/itinerary/Gallery";
import { JourneyCard } from "@/components/itinerary/JourneyCard";
import { CtaBand } from "@/components/home/CtaBand";
import { getDestination, getDestinationSlugs, getItinerariesForDestination } from "@/sanity/lib/queries";

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
    const ogImage = destination.seo?.ogImage ?? destination.heroImage;
    return {
        title,
        description,
        alternates: { canonical: `/destinations/${destination.slug}` },
        openGraph: {
            title,
            description,
            url: `/destinations/${destination.slug}`,
            images: [{ url: ogImage.src, width: 1200, height: 630, alt: ogImage.alt }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage.src],
        },
    };
}

export default async function DestinationPage({ params }: { params: Params }) {
    const { slug } = await params;
    const destination = await getDestination(slug);
    if (!destination) notFound();

    const journeys = await getItinerariesForDestination(destination.slug);
    const enquireHref = `/enquire?destination=${destination.slug}`;

    return (
        <article>
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
                <section aria-labelledby="about-title" className="sec">
                    <Reveal className="wrap grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                        <span className="eyebrow self-start" id="about-title" data-reveal>
                            About {destination.name}
                        </span>
                        <p className="font-display text-[clamp(22px,2.6vw,32px)] leading-[1.35]" data-reveal>
                            {destination.description}
                        </p>
                    </Reveal>
                </section>
            )}

            {destination.gallery.length > 0 && (
                <section aria-labelledby="gallery-title" className="sec pt-0">
                    <div className="wrap">
                        <div className="sec-head">
                            <div className="t">
                                <span className="eyebrow">In pictures</span>
                                <h2 id="gallery-title" className="h-md">
                                    {destination.name}, up close
                                </h2>
                            </div>
                        </div>
                        <Gallery images={destination.gallery} title={destination.name} />
                    </div>
                </section>
            )}

            {journeys.length > 0 && (
                <section id="journeys" aria-labelledby="journeys-title" className="sec scroll-mt-24 pt-0">
                    <Rail
                        label={`Journeys in ${destination.name}`}
                        head={
                            <div className="t">
                                <span className="eyebrow">Journeys here</span>
                                <h2 id="journeys-title" className="h-lg">
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
