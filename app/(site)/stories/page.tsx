import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { VideoPlayer } from "@/components/stories/VideoPlayer";
import { StoryEntry } from "@/components/stories/StoryEntry";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getAllStories, pickFeaturedStory } from "@/sanity/lib/queries";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Guest Stories",
    description: "Films and words from guests who have travelled with us.",
    alternates: { canonical: "/stories" },
};

export default async function StoriesPage() {
    const allStories = await getAllStories();
    const featured = pickFeaturedStory(allStories);
    if (!featured) return null;
    const rest = allStories.filter((s) => s.slug !== featured.slug);

    return (
        <>
            <PageHeader
                eyebrow="Guest stories"
                title={
                    <>
                        In their <span className="serif-italic">own words</span>
                    </>
                }
            >
                The best measure of a journey is how it&apos;s remembered. Short films and reflections from guests who
                have travelled with us.
            </PageHeader>

            <section aria-labelledby="featured-story" className="container-x pb-24 md:pb-36">
                <Reveal>
                    <div data-reveal="mask">
                        <VideoPlayer
                            video={featured.video}
                            poster={featured.poster}
                            title={`${featured.guestName} — ${featured.journeyTitle ?? "guest story"}`}
                        />
                    </div>
                    <div className="mt-10 grid gap-8 md:grid-cols-12">
                        <p data-reveal className="eyebrow text-stone md:col-span-3">
                            Featured film
                        </p>
                        <div className="md:col-span-8">
                            <h2 id="featured-story" data-reveal className="text-3xl leading-[1.15] md:text-5xl">
                                “{featured.quote}”
                            </h2>
                            <p data-reveal className="mt-6 text-stone">
                                {featured.guestName}, {featured.homeTown}
                                {featured.journeySlug && (
                                    <>
                                        {" · "}
                                        <Link href={`/itineraries/${featured.journeySlug}`} className="link-line text-ink">
                                            {featured.journeyTitle}
                                        </Link>
                                    </>
                                )}
                            </p>
                            <div data-reveal className="mt-8">
                                <ButtonLink href={`/stories/${featured.slug}`} variant="text">
                                    Read the full story
                                </ButtonLink>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            <section aria-label="More guest stories" className="bg-paper-deep py-24 md:py-36">
                <div className="container-x grid gap-x-12 gap-y-20 md:grid-cols-2">
                    {rest.map((story, i) => (
                        <Reveal key={story.slug} className={cn(i % 2 === 1 && "md:mt-28")}>
                            <StoryEntry story={story} />
                        </Reveal>
                    ))}
                </div>
            </section>
        </>
    );
}
