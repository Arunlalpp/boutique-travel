import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { VideoPlayer } from "@/components/stories/VideoPlayer";
import { StoryEntry } from "@/components/stories/StoryEntry";
import { JourneyCard } from "@/components/itinerary/JourneyCard";
import { SmartImage } from "@/components/ui/SmartImage";
import { getStory, getStorySlugs, getAllStories, getItineraryCard } from "@/sanity/lib/queries";
import { eyebrow, hLg, lede, sec, secHead, secHeadTitle, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
    const slugs = await getStorySlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const story = await getStory(slug);
    if (!story) return {};
    const defaultTitle = `${story.guestName} — Guest Story`;
    const title = story.seo?.metaTitle || defaultTitle;
    const description = story.seo?.metaDescription || story.excerpt;
    const ogImage = story.seo?.ogImage ?? story.poster;
    return {
        title,
        description,
        alternates: { canonical: `/stories/${story.slug}` },
        openGraph: {
            title,
            description,
            url: `/stories/${story.slug}`,
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

export default async function StoryPage({ params }: { params: Params }) {
    const { slug } = await params;
    const story = await getStory(slug);
    if (!story) notFound();

    const [journey, allStories] = await Promise.all([
        story.journeySlug ? getItineraryCard(story.journeySlug) : Promise.resolve(undefined),
        getAllStories(),
    ]);
    const more = allStories.filter((s) => s.slug !== story.slug).slice(0, 2);

    return (
        <article>
            <header className="relative isolate overflow-hidden pt-[150px] pb-12">
                <div
                    aria-hidden
                    className="pointer-events-none absolute -top-[260px] -left-[200px] size-[700px] rounded-full bg-[radial-gradient(circle,rgb(245_158_61/0.14),transparent_70%)] blur-[10px]"
                />
                <div className={wrap}>
                    <div className="grid max-w-[960px] gap-5">
                        <nav aria-label="Breadcrumb" className="glass inline-flex h-[34px] w-max max-w-full items-center gap-2 rounded-full px-3.5 text-[13px] text-mist [&_a:hover]:text-fg [&_b]:truncate [&_b]:font-semibold [&_b]:text-ember">
                            <Link href="/">Home</Link>
                            <span aria-hidden>/</span>
                            <Link href="/stories">Stories</Link>
                            <span aria-hidden>/</span>
                            <b aria-current="page">{story.guestName}</b>
                        </nav>
                        <span className={eyebrow}>Guest story · {story.travelled}</span>
                        <h1 className={cn(hLg, "leading-[1.15]! italic")}>“{story.quote}”</h1>
                        <div className="flex items-center gap-3.5">
                            <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-night-3">
                                <SmartImage image={story.portrait} sizes="56px" quality={65} />
                            </div>
                            <span>
                                <b>{story.guestName}</b>
                                <br />
                                <small className="text-dim">{story.homeTown}</small>
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className={wrap}>
                <VideoPlayer video={story.video} poster={story.poster} title={`${story.guestName}: guest film`} />
            </div>

            <section className={sec}>
                <div className={cn(wrap, "grid gap-[clamp(28px,5vw,64px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]")}>
                    <aside>
                        <dl className="glass grid gap-5 rounded-[28px] p-7 text-sm">
                            <div>
                                <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-dim">Journey</dt>
                                <dd className="mt-1 text-base">
                                    {journey ? (
                                        <Link href={`/itineraries/${journey.slug}`} className="text-ember hover:underline">
                                            {journey.title}
                                        </Link>
                                    ) : (
                                        "Private journey"
                                    )}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-dim">Travelled</dt>
                                <dd className="mt-1 text-base">{story.travelled}</dd>
                            </div>
                            {story.homeTown && (
                                <div>
                                    <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-dim">From</dt>
                                    <dd className="mt-1 text-base">{story.homeTown}</dd>
                                </div>
                            )}
                        </dl>
                    </aside>

                    <Reveal>
                        <p className="font-display text-[clamp(22px,2.6vw,30px)] leading-[1.3]" data-reveal>
                            {story.excerpt}
                        </p>
                        {story.body.map((para, i) => (
                            <p key={i} className={cn(lede, "mt-6 max-w-[64ch]!")} data-reveal>
                                {para}
                            </p>
                        ))}
                    </Reveal>
                </div>
            </section>

            {journey && (
                <section
                    aria-labelledby="journey-title"
                    className={cn(sec, "bg-linear-to-b from-night to-night-2")}
                >
                    <div className={cn(wrap, "grid items-center gap-[clamp(28px,5vw,64px)] md:grid-cols-[minmax(0,1fr)_auto]")}>
                        <div className="grid gap-4">
                            <span className={eyebrow}>The journey behind the story</span>
                            <h2 id="journey-title" className={hLg}>
                                Travel this way
                            </h2>
                            <p className={lede}>Every journey is reshaped for each guest, but this is where theirs began.</p>
                        </div>
                        <JourneyCard journey={journey} className="mx-auto md:mx-0" />
                    </div>
                </section>
            )}

            {more.length > 0 && (
                <section aria-labelledby="more-title" className={sec}>
                    <div className={wrap}>
                        <div className={secHead}>
                            <div className={secHeadTitle}>
                                <span className={eyebrow}>Keep reading</span>
                                <h2 id="more-title" className={hLg}>
                                    More guest stories
                                </h2>
                            </div>
                        </div>
                        <div className="grid gap-5.5 md:grid-cols-2">
                            {more.map((s) => (
                                <StoryEntry key={s.slug} story={s} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </article>
    );
}
