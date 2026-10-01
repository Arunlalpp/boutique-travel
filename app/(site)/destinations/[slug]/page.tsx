import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ImageHero } from "@/components/ui/ImageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Gallery } from "@/components/itinerary/Gallery";
import { JourneyCard } from "@/components/itinerary/JourneyCard";
import { getDestination, getDestinationSlugs, getItinerariesForDestination } from "@/sanity/lib/queries";
import { pad } from "@/lib/utils";

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

    return (
        <article>
            <ImageHero image={destination.heroImage} eyebrow={destination.country} title={destination.name} size="medium">
                <p className="max-w-xl text-lg text-paper/80">{destination.shortDescription}</p>
            </ImageHero>

            {destination.description && (
                <section aria-labelledby="about-title" className="py-24 md:py-36">
                    <Reveal className="container-x grid gap-10 md:grid-cols-12 md:gap-8">
                        <p data-reveal className="eyebrow text-stone md:col-span-3" id="about-title">
                            About {destination.name}
                        </p>
                        <p data-reveal className="max-w-2xl text-lg text-ink-soft md:col-span-8">
                            {destination.description}
                        </p>
                    </Reveal>
                </section>
            )}

            {destination.gallery.length > 0 && (
                <section aria-labelledby="gallery-title" className="pb-24 md:pb-36">
                    <Reveal className="container-x">
                        <h2 id="gallery-title" data-reveal className="eyebrow mb-10 text-stone">
                            In pictures
                        </h2>
                        <Gallery images={destination.gallery} title={destination.name} />
                    </Reveal>
                </section>
            )}

            {journeys.length > 0 && (
                <section aria-labelledby="journeys-title" className="bg-paper-deep py-24 md:py-36">
                    <div className="container-x">
                        <Reveal>
                            <p data-reveal className="eyebrow text-stone">
                                Journeys here
                            </p>
                            <h2 id="journeys-title" data-reveal className="mt-6 text-4xl md:text-6xl">
                                Ways to see <span className="serif-italic">{destination.name}</span>
                            </h2>
                        </Reveal>
                        <div className="mt-16 grid gap-x-10 gap-y-20 md:grid-cols-2 md:gap-y-28">
                            {journeys.map((journey, i) => (
                                <Reveal key={journey.slug}>
                                    <JourneyCard
                                        journey={journey}
                                        shape={i % 2 === 0 ? "landscape" : "portrait"}
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                        index={pad(i + 1)}
                                    />
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </article>
    );
}
