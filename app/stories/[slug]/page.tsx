import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { VideoPlayer } from "@/components/stories/VideoPlayer";
import { StoryEntry } from "@/components/stories/StoryEntry";
import { JourneyCard } from "@/components/itinerary/JourneyCard";
import { SmartImage } from "@/components/ui/SmartImage";
import { getStory, stories } from "@/lib/data/stories";
import { getItinerary } from "@/lib/data/itineraries";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
    return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const story = getStory(slug);
    if (!story) return {};
    const title = `${story.guestName} — Guest Story`;
    return {
        title,
        description: story.excerpt,
        alternates: { canonical: `/stories/${story.slug}` },
        openGraph: {
            title,
            description: story.excerpt,
            url: `/stories/${story.slug}`,
            images: [{ url: story.poster.src, width: 1200, height: 630, alt: story.poster.alt }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: story.excerpt,
            images: [story.poster.src],
        },
    };
}

export default async function StoryPage({ params }: { params: Params }) {
    const { slug } = await params;
    const story = getStory(slug);
    if (!story) notFound();

    const journey = getItinerary(story.journeySlug);
    const more = stories.filter((s) => s.slug !== story.slug).slice(0, 2);

    return (
        <article>
            <Reveal as="header" className="container-x pb-14 pt-40 md:pb-20 md:pt-52">
                <p data-reveal className="eyebrow flex items-center gap-3 text-stone">
                    <Link href="/stories" className="link-line">
                        Guest stories
                    </Link>
                    <span aria-hidden className="h-px w-6 bg-ink/25" />
                    {story.travelled}
                </p>
                <h1 data-reveal className="mt-8 max-w-5xl text-[clamp(2.25rem,5.5vw,5rem)] leading-[1.05]">
                    “{story.quote}”
                </h1>
                <div data-reveal className="mt-10 flex items-center gap-4">
                    <span className="relative size-14 overflow-hidden rounded-full bg-paper-deep">
                        <SmartImage image={story.portrait} sizes="56px" tone="light" />
                    </span>
                    <p className="leading-snug">
                        <span className="block">{story.guestName}</span>
                        <span className="block text-sm text-stone">{story.homeTown}</span>
                    </p>
                </div>
            </Reveal>

            <Reveal className="container-x">
                <div data-reveal="mask">
                    <VideoPlayer video={story.video} poster={story.poster} title={`${story.guestName} — guest film`} />
                </div>
            </Reveal>

            <section className="container-x grid gap-14 py-24 md:grid-cols-12 md:gap-8 md:py-32">
                <Reveal as="aside" className="md:col-span-3">
                    <dl data-reveal className="space-y-6 border-t border-ink pt-6 text-sm">
                        <div>
                            <dt className="eyebrow text-stone">Journey</dt>
                            <dd className="mt-2">
                                {journey ? (
                                    <Link href={`/itineraries/${journey.slug}`} className="link-line">
                                        {journey.title}
                                    </Link>
                                ) : (
                                    "Private journey"
                                )}
                            </dd>
                        </div>
                        <div>
                            <dt className="eyebrow text-stone">Travelled</dt>
                            <dd className="mt-2">{story.travelled}</dd>
                        </div>
                        <div>
                            <dt className="eyebrow text-stone">From</dt>
                            <dd className="mt-2">{story.homeTown}</dd>
                        </div>
                    </dl>
                </Reveal>

                <Reveal className="md:col-span-7 md:col-start-5">
                    <p data-reveal className="font-serif text-[clamp(1.5rem,2.6vw,2.1rem)] font-light leading-[1.3]">
                        {story.excerpt}
                    </p>
                    {story.body.map((para, i) => (
                        <p key={i} data-reveal className="mt-7 text-lg text-ink-soft">
                            {para}
                        </p>
                    ))}
                </Reveal>
            </section>

            {journey && (
                <section aria-labelledby="journey-title" className="bg-paper-deep py-24 md:py-32">
                    <div className="container-x grid gap-12 md:grid-cols-12 md:gap-8">
                        <Reveal className="md:col-span-4">
                            <p data-reveal className="eyebrow text-stone">
                                The journey behind the story
                            </p>
                            <h2 id="journey-title" data-reveal className="mt-6 text-4xl md:text-5xl">
                                Travel <span className="serif-italic">this way</span>
                            </h2>
                            <p data-reveal className="mt-6 text-stone">
                                Every journey is reshaped for each guest — but this is where theirs began.
                            </p>
                        </Reveal>
                        <Reveal className="md:col-span-7 md:col-start-6">
                            <JourneyCard journey={journey} shape="wide" sizes="(min-width: 768px) 55vw, 100vw" />
                        </Reveal>
                    </div>
                </section>
            )}

            <section aria-labelledby="more-title" className="py-24 md:py-32">
                <div className="container-x">
                    <h2 id="more-title" className="eyebrow mb-12 text-stone">
                        More guest stories
                    </h2>
                    <div className="grid gap-x-12 gap-y-16 md:grid-cols-2">
                        {more.map((s) => (
                            <Reveal key={s.slug}>
                                <StoryEntry story={s} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </article>
    );
}
