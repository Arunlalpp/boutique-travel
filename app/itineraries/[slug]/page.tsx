import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { ImageHero } from "@/components/ui/ImageHero";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { RouteMap } from "@/components/itinerary/RouteMap";
import { DayByDay } from "@/components/itinerary/DayByDay";
import { Gallery } from "@/components/itinerary/Gallery";
import { getItinerary, getNextItinerary, itineraries } from "@/lib/data/itineraries";
import { getStoriesForJourney } from "@/lib/data/stories";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
    return itineraries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const journey = getItinerary(slug);
    if (!journey) return {};
    return {
        title: journey.title,
        description: journey.hook,
        alternates: { canonical: `/itineraries/${journey.slug}` },
        openGraph: {
            title: journey.title,
            description: journey.hook,
            url: `/itineraries/${journey.slug}`,
            images: [{ url: journey.heroImage.src, width: 1200, height: 630, alt: journey.heroImage.alt }],
        },
        twitter: {
            card: "summary_large_image",
            title: journey.title,
            description: journey.hook,
            images: [journey.heroImage.src],
        },
    };
}

export default async function ItineraryPage({ params }: { params: Params }) {
    const { slug } = await params;
    const journey = getItinerary(slug);
    if (!journey) notFound();

    const next = getNextItinerary(journey.slug);
    const story = getStoriesForJourney(journey.slug)[0];
    const enquireHref = `/enquire?journey=${journey.slug}`;

    const facts = [
        { label: "Duration", value: `${journey.durationDays} days` },
        { label: "Style", value: journey.style + (journey.groupSize ? ` · ${journey.groupSize}` : "") },
        { label: "Best time", value: journey.bestTime },
        { label: "Pace", value: journey.pace },
    ];

    return (
        <article>
            <ImageHero
                image={journey.heroImage}
                eyebrow={
                    <span className="flex items-center gap-3">
                        <Link href="/itineraries" className="link-line">
                            Journeys
                        </Link>
                        <span aria-hidden className="h-px w-6 bg-paper/40" />
                        {journey.country}
                    </span>
                }
                title={journey.title}
            >
                <p className="max-w-xl text-lg text-paper/80">{journey.hook}</p>
            </ImageHero>

            <section aria-label="Journey at a glance" className="border-b border-ink/15">
                <dl className="container-x grid grid-cols-2 gap-px bg-ink/15 !px-0 lg:grid-cols-4">
                    {facts.map((f) => (
                        <div key={f.label} className="bg-paper px-5 py-8 md:px-10">
                            <dt className="eyebrow text-stone">{f.label}</dt>
                            <dd className="mt-3 font-serif text-xl font-light leading-snug md:text-2xl">{f.value}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section aria-labelledby="overview-title" className="py-24 md:py-36">
                <div className="container-x grid gap-16 md:grid-cols-12 md:gap-8">
                    <Reveal className="md:col-span-7">
                        <p data-reveal className="eyebrow text-stone" id="overview-title">
                            The journey
                        </p>
                        {journey.narrative.map((para, i) => (
                            <p
                                key={i}
                                data-reveal
                                className={
                                    i === 0
                                        ? "mt-8 font-serif text-[clamp(1.6rem,2.8vw,2.4rem)] font-light leading-[1.25]"
                                        : "mt-8 max-w-2xl text-lg text-ink-soft"
                                }
                            >
                                {para}
                            </p>
                        ))}
                    </Reveal>

                    <Reveal as="aside" className="md:col-span-4 md:col-start-9" aria-labelledby="highlights-title">
                        <div data-reveal className="border-t border-ink pt-8">
                            <h2 id="highlights-title" className="eyebrow !font-sans !tracking-[0.22em] text-ink">
                                Moments to look forward to
                            </h2>
                            <ul className="mt-8 space-y-5">
                                {journey.highlights.map((h) => (
                                    <li key={h} className="flex gap-4 text-ink-soft">
                                        <Check
                                            aria-hidden
                                            strokeWidth={1.25}
                                            className="mt-1 size-4 shrink-0 text-clay"
                                        />
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-10">
                                <ButtonLink href={enquireHref}>Enquire about this journey</ButtonLink>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section aria-labelledby="route-title" className="bg-paper-deep py-24 md:py-36">
                <div className="container-x grid gap-12 md:grid-cols-12 md:gap-8">
                    <Reveal className="md:col-span-4">
                        <p data-reveal className="eyebrow text-stone">
                            The route
                        </p>
                        <h2 id="route-title" data-reveal className="mt-6 text-4xl md:text-5xl">
                            {journey.route.length} stops, <span className="serif-italic">one thread</span>
                        </h2>
                        <ol data-reveal className="mt-10 space-y-3">
                            {journey.route.map((p, i) => (
                                <li key={p.name} className="flex items-baseline gap-4 border-b border-ink/10 pb-3">
                                    <span className="eyebrow w-6 text-clay">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="font-serif text-xl font-light">{p.name}</span>
                                </li>
                            ))}
                        </ol>
                        <p data-reveal className="mt-6 text-xs text-stone">
                            Illustrative route, not to scale.
                        </p>
                    </Reveal>
                    <div className="text-ink md:col-span-7 md:col-start-6">
                        <RouteMap points={journey.route} country={journey.country} />
                    </div>
                </div>
            </section>

            <section aria-labelledby="days-title" className="py-24 md:py-36">
                <div className="container-x">
                    <Reveal className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
                        <div>
                            <p data-reveal className="eyebrow text-stone">
                                Day by day
                            </p>
                            <h2 id="days-title" data-reveal className="mt-6 text-4xl md:text-6xl">
                                How the days <span className="serif-italic">unfold</span>
                            </h2>
                        </div>
                        <p data-reveal className="max-w-sm text-stone">
                            A suggested shape. Everything here — the order, the length, where you stay — can be changed.
                        </p>
                    </Reveal>
                    <DayByDay days={journey.days} />
                </div>
            </section>

            <section aria-labelledby="gallery-title" className="pb-24 md:pb-36">
                <Reveal className="container-x">
                    <h2 id="gallery-title" data-reveal className="eyebrow mb-10 text-stone">
                        In pictures
                    </h2>
                    <Gallery images={journey.gallery} title={journey.title} />
                </Reveal>
            </section>

            <section aria-label="Details" className="border-t border-ink/15 py-24 md:py-36">
                <div className="container-x grid gap-16 md:grid-cols-12 md:gap-8">
                    <Reveal className="md:col-span-5">
                        <h2 data-reveal className="text-4xl md:text-5xl">
                            What&apos;s <span className="serif-italic">taken care of</span>
                        </h2>
                        <ul data-reveal className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                            {journey.included.map((item) => (
                                <li key={item} className="flex items-center gap-4 py-4 text-ink-soft">
                                    <Check aria-hidden strokeWidth={1.25} className="size-4 shrink-0 text-clay" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <p data-reveal className="mt-6 text-sm text-stone">
                            Priced individually once your journey is designed. International flights can be arranged on
                            request.
                        </p>
                    </Reveal>

                    {story && (
                        <Reveal className="md:col-span-6 md:col-start-7">
                            <Link href={`/stories/${story.slug}`} className="group grid gap-6 sm:grid-cols-5">
                                <div
                                    data-reveal="mask"
                                    className="relative aspect-[4/5] overflow-hidden bg-paper-deep sm:col-span-2"
                                >
                                    <SmartImage
                                        image={story.poster}
                                        sizes="(min-width: 768px) 20vw, 40vw"
                                        tone="light"
                                        className="transition-transform duration-[1600ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                                    />
                                </div>
                                <div data-reveal className="flex flex-col justify-center sm:col-span-3">
                                    <p className="eyebrow text-stone">A guest&apos;s story</p>
                                    <p className="mt-5 font-serif text-2xl font-light leading-snug md:text-3xl">
                                        “{story.quote}”
                                    </p>
                                    <p className="mt-5 text-sm text-stone">{story.guestName}</p>
                                    <span className="eyebrow mt-6 inline-flex items-center gap-2 text-ink">
                                        <span className="link-line">Watch their story</span>
                                        <ArrowRight aria-hidden strokeWidth={1.25} className="size-4" />
                                    </span>
                                </div>
                            </Link>
                        </Reveal>
                    )}
                </div>
            </section>

            <section aria-label="Enquire" className="bg-paper-deep py-24 md:py-32">
                <Reveal className="container-x flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <p data-reveal className="eyebrow text-stone">
                            Make it yours
                        </p>
                        <h2 data-reveal className="mt-6 text-4xl md:text-6xl">
                            Shall we begin with <span className="serif-italic">{journey.country}</span>?
                        </h2>
                        <p data-reveal className="mt-6 max-w-lg text-stone">
                            Tell us a little about who&apos;s travelling and when. A designer will come back to you
                            within two working days — no obligation, no hard sell.
                        </p>
                    </div>
                    <div data-reveal>
                        <ButtonLink href={enquireHref}>Start an enquiry</ButtonLink>
                    </div>
                </Reveal>
            </section>

            <Link
                href={`/itineraries/${next.slug}`}
                className="group relative block h-[60svh] min-h-[420px] overflow-hidden bg-night text-paper"
            >
                <SmartImage
                    image={next.cardImage}
                    sizes="100vw"
                    className="opacity-70 transition-all duration-[1600ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.03] group-hover:opacity-85"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/80 to-night/10" />
                <div className="container-x relative flex h-full flex-col justify-end pb-14">
                    <p className="eyebrow text-paper/70">Next journey · {next.country}</p>
                    <p className="mt-4 flex items-end justify-between gap-6 font-serif text-[clamp(2.25rem,6vw,5.5rem)] font-light leading-none">
                        <span>{next.title}</span>
                        <ArrowRight
                            aria-hidden
                            strokeWidth={1}
                            className="mb-2 size-10 shrink-0 transition-transform duration-700 group-hover:translate-x-2 md:size-14"
                        />
                    </p>
                </div>
            </Link>
        </article>
    );
}
