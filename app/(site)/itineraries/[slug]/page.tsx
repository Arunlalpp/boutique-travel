import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { PageHero } from "@/components/ui/PageHero";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { RouteMap } from "@/components/itinerary/RouteMap";
import { DayByDay } from "@/components/itinerary/DayByDay";
import { Gallery } from "@/components/itinerary/Gallery";
import { SaveJourneyButton } from "@/components/itinerary/SaveJourneyButton";
import { ArrowIcon, CheckIcon, QuoteIcon } from "@/components/ui/Icons";
import { getItinerary, getItinerarySlugs, getNextItinerary, getStoriesForJourney } from "@/sanity/lib/queries";

type Params = Promise<{ slug: string }>;

const overviewComponents: PortableTextComponents = {
    block: {
        normal: ({ children }) => <p data-reveal>{children}</p>,
    },
};

export async function generateStaticParams() {
    const slugs = await getItinerarySlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const journey = await getItinerary(slug);
    if (!journey) return {};
    const title = journey.seo?.metaTitle || journey.title;
    const description = journey.seo?.metaDescription || journey.hook;
    const ogImage = journey.seo?.ogImage ?? journey.heroImage;
    return {
        title,
        description,
        alternates: { canonical: `/itineraries/${journey.slug}` },
        openGraph: {
            title,
            description,
            url: `/itineraries/${journey.slug}`,
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

export default async function ItineraryPage({ params }: { params: Params }) {
    const { slug } = await params;
    const journey = await getItinerary(slug);
    if (!journey) notFound();

    const [next, story] = await Promise.all([
        getNextItinerary(journey.slug),
        getStoriesForJourney(journey.slug).then((stories) => stories[0]),
    ]);
    const enquireHref = `/enquire?journey=${journey.slug}`;

    const facts = [
        { label: "Duration", value: journey.duration },
        { label: "Style", value: journey.style + (journey.groupSize ? ` · ${journey.groupSize}` : "") },
        { label: "Best time", value: journey.bestTime },
        { label: journey.startingPrice ? "From" : "Pace", value: journey.startingPrice || journey.pace },
    ].filter((f) => f.value);

    return (
        <article>
            <PageHero
                image={journey.heroImage}
                tall
                crumbs={[
                    { label: "Home", href: "/" },
                    { label: "Journeys", href: "/itineraries" },
                    { label: journey.title },
                ]}
                eyebrow={journey.country}
                title={journey.title}
                lede={journey.hook}
            >
                <div className="flex flex-wrap gap-2.5">
                    <ButtonLink href={enquireHref}>Plan this journey</ButtonLink>
                    <SaveJourneyButton slug={journey.slug} title={journey.title} />
                </div>
            </PageHero>

            {facts.length > 0 && (
                <section aria-label="Journey at a glance" className="wrap">
                    <dl className="glance">
                        {facts.map((f) => (
                            <div key={f.label} className="glass-strong shadow-deep">
                                <dt>{f.label}</dt>
                                <dd>{f.value}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
            )}

            <section aria-labelledby="overview-title" className="sec">
                <div className="wrap grid gap-[clamp(32px,6vw,90px)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                    <Reveal>
                        <span className="eyebrow" id="overview-title" data-reveal>
                            The journey
                        </span>
                        <div className="prose-night mt-6">
                            <PortableText value={journey.overview} components={overviewComponents} />
                        </div>
                    </Reveal>

                    {journey.highlights.length > 0 && (
                        <Reveal as="aside" aria-labelledby="highlights-title">
                            <div className="glass grid gap-6 rounded-[28px] p-7" data-reveal>
                                <h2 id="highlights-title" className="text-[26px]">
                                    Moments to look forward to
                                </h2>
                                <ul className="checklist">
                                    {journey.highlights.map((h) => (
                                        <li key={h}>
                                            <i>
                                                <CheckIcon />
                                            </i>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                                <ButtonLink href={enquireHref} className="w-full">
                                    Enquire about this journey
                                </ButtonLink>
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>

            {journey.route.length > 0 ? (
                <section
                    aria-labelledby="route-title"
                    className="sec"
                    style={{ background: "linear-gradient(180deg,var(--color-night),var(--color-night-2) 50%,var(--color-night))" }}
                >
                    <div className="wrap explore-grid">
                        <Reveal>
                            <span className="eyebrow" data-reveal>
                                The route
                            </span>
                            <h2 id="route-title" className="h-lg mt-4" data-reveal>
                                {journey.route.length} stops, one thread
                            </h2>
                            <ol className="mt-8 grid gap-2" data-reveal>
                                {journey.route.map((p, i) => (
                                    <li key={p.name} className="flex items-baseline gap-4 border-b border-line pb-3">
                                        <span className="mono w-6 text-ember">{String(i + 1).padStart(2, "0")}</span>
                                        <span className="font-display text-xl">{p.name}</span>
                                    </li>
                                ))}
                            </ol>
                            <p className="mono mt-5 text-dim" data-reveal>
                                Illustrative route, not to scale.
                            </p>
                        </Reveal>
                        <div className="map glass p-6 shadow-deep">
                            <RouteMap points={journey.route} country={journey.country} />
                        </div>
                    </div>
                </section>
            ) : (
                journey.mapImage && (
                    <section aria-labelledby="route-title" className="sec">
                        <div className="wrap explore-grid">
                            <div>
                                <span className="eyebrow">The route</span>
                                <h2 id="route-title" className="h-lg mt-4">
                                    How it comes together
                                </h2>
                            </div>
                            <div className="map shadow-deep">
                                <SmartImage image={journey.mapImage} sizes="(min-width: 900px) 55vw, 100vw" />
                            </div>
                        </div>
                    </section>
                )
            )}

            {journey.days.length > 0 && (
                <section aria-labelledby="days-title" className="sec">
                    <div className="wrap">
                        <div className="sec-head">
                            <div className="t">
                                <span className="eyebrow">Day by day</span>
                                <h2 id="days-title" className="h-lg">
                                    How the days unfold
                                </h2>
                            </div>
                            <p className="lede max-w-sm text-[15px]">
                                A suggested shape. The order, the length and where you stay can all be changed.
                            </p>
                        </div>
                        <DayByDay days={journey.days} />
                    </div>
                </section>
            )}

            {journey.gallery.length > 0 && (
                <section aria-labelledby="gallery-title" className="sec pt-0">
                    <div className="wrap">
                        <div className="sec-head">
                            <div className="t">
                                <span className="eyebrow">In pictures</span>
                                <h2 id="gallery-title" className="h-md">
                                    A glimpse of the trail
                                </h2>
                            </div>
                        </div>
                        <Gallery images={journey.gallery} title={journey.title} />
                    </div>
                </section>
            )}

            <section aria-label="What’s included" className="sec pt-0">
                <div className="wrap grid gap-[clamp(28px,5vw,64px)] lg:grid-cols-2">
                    {journey.included.length > 0 && (
                        <Reveal className="glass grid content-start gap-6 rounded-[32px] p-[clamp(24px,3.6vw,44px)]">
                            <span className="eyebrow" data-reveal>
                                Always included
                            </span>
                            <h2 className="h-md" data-reveal>
                                What’s taken care of
                            </h2>
                            <ul className="checklist" data-reveal>
                                {journey.included.map((item) => (
                                    <li key={item}>
                                        <i>
                                            <CheckIcon />
                                        </i>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-sm text-dim" data-reveal>
                                Priced individually once your journey is designed. Flights can be arranged on request.
                            </p>
                        </Reveal>
                    )}

                    {story && (
                        <Link
                            href={`/stories/${story.slug}`}
                            className="group glass-strong grid overflow-hidden rounded-[32px] shadow-deep sm:grid-cols-[2fr_3fr]"
                        >
                            <div className="relative min-h-60 overflow-hidden bg-night-3">
                                <SmartImage
                                    image={story.poster}
                                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 40vw, 100vw"
                                    className="transition-transform duration-[900ms] group-hover:scale-105"
                                />
                            </div>
                            <div className="grid content-center gap-4 p-7">
                                <QuoteIcon width={32} height={32} className="text-ember" />
                                <p className="font-display text-2xl italic leading-snug">“{story.quote}”</p>
                                <p className="text-sm text-dim">{story.guestName}</p>
                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-ember">
                                    Read their story <ArrowIcon className="size-4" />
                                </span>
                            </div>
                        </Link>
                    )}
                </div>
            </section>

            {next && (
                <Link href={`/itineraries/${next.slug}`} className="cta group min-h-115">
                    <div className="media-fill">
                        <SmartImage
                            image={next.cardImage}
                            sizes="100vw"
                            className="transition-transform duration-[1600ms] group-hover:scale-[1.03]"
                        />
                    </div>
                    <div className="panel shadow-deep">
                        <span className="eyebrow text-ember-soft">Next journey · {next.country}</span>
                        <p className="h-lg font-display">{next.title}</p>
                        <span className="btn btn-ember">
                            See the journey <ArrowIcon />
                        </span>
                    </div>
                </Link>
            )}
        </article>
    );
}
