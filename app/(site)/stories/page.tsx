import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { VideoPlayer } from "@/components/stories/VideoPlayer";
import { StoryEntry } from "@/components/stories/StoryEntry";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { CtaBand } from "@/components/home/CtaBand";
import { media } from "@/lib/data/media";
import { getAllStories, pickFeaturedStory } from "@/sanity/lib/queries";

export const metadata: Metadata = {
    title: "Guest Stories",
    description: "Films and words from guests who have travelled with us.",
    alternates: { canonical: "/stories" },
};

export default async function StoriesPage() {
    const allStories = await getAllStories();
    const featured = pickFeaturedStory(allStories);
    const rest = featured ? allStories.filter((s) => s.slug !== featured.slug) : [];

    return (
        <>
            <PageHero
                image={media.safariPlains}
                crumbs={[{ label: "Home", href: "/" }, { label: "Stories" }]}
                eyebrow="Guest stories"
                title="Told around the campfire."
                lede="The best measure of a journey is how it’s remembered. Short films and reflections from guests who have travelled with us."
            />

            {featured ? (
                <>
                    <section aria-labelledby="featured-story" className="sec pt-5">
                        <div className="wrap">
                            <VideoPlayer
                                video={featured.video}
                                poster={featured.poster}
                                title={`${featured.guestName}: ${featured.journeyTitle ?? "guest story"}`}
                            />
                            <Reveal className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                                <span className="eyebrow self-start" data-reveal>
                                    Featured film
                                </span>
                                <div className="grid gap-5">
                                    <h2 id="featured-story" className="h-md italic leading-tight" data-reveal>
                                        “{featured.quote}”
                                    </h2>
                                    <p className="text-dim" data-reveal>
                                        {featured.guestName}, {featured.homeTown}
                                        {featured.journeySlug && (
                                            <>
                                                {" · "}
                                                <Link
                                                    href={`/itineraries/${featured.journeySlug}`}
                                                    className="text-fg underline-offset-4 hover:underline"
                                                >
                                                    {featured.journeyTitle}
                                                </Link>
                                            </>
                                        )}
                                    </p>
                                    <div data-reveal>
                                        <ButtonLink href={`/stories/${featured.slug}`} variant="glass">
                                            Read the full story
                                        </ButtonLink>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </section>

                    {rest.length > 0 && (
                        <section
                            aria-label="More guest stories"
                            className="sec"
                            style={{ background: "linear-gradient(180deg,var(--color-night),var(--color-night-2))" }}
                        >
                            <div className="wrap">
                                <div className="sec-head">
                                    <div className="t">
                                        <span className="eyebrow">More stories</span>
                                        <h2 className="h-lg">In their own words</h2>
                                    </div>
                                </div>
                                <div className="grid gap-5.5 md:grid-cols-2">
                                    {rest.map((story) => (
                                        <StoryEntry key={story.slug} story={story} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </>
            ) : (
                <section className="sec pt-5">
                    <div className="wrap">
                        <div className="empty glass">
                            <h2 className="h-md">Stories are on their way</h2>
                            <p className="lede text-center">Our guests’ films and reflections will appear here soon.</p>
                        </div>
                    </div>
                </section>
            )}

            <CtaBand />
        </>
    );
}
