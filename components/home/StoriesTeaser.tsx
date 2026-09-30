import Link from "next/link";
import { Play } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { GuestStory } from "@/lib/types";
import { getItinerary } from "@/lib/data/itineraries";

interface StoriesTeaserProps {
  featured: GuestStory;
  others: GuestStory[];
}

export function StoriesTeaser({ featured, others }: StoriesTeaserProps) {
  const journey = getItinerary(featured.journeySlug);

  return (
    <section aria-labelledby="stories-title" className="grain relative overflow-hidden bg-night py-24 text-paper md:py-40">
      <div className="container-x relative grid gap-14 md:grid-cols-12 md:gap-8">
        {/* Film still */}
        <Link
          href={`/stories/${featured.slug}`}
          className="group relative block md:col-span-7"
          aria-label={`Watch ${featured.guestName}'s story`}
        >
          <Parallax className="aspect-[4/3] bg-night-soft md:aspect-[5/4]" amount={10}>
            <SmartImage
              image={featured.poster}
              sizes="(min-width: 768px) 58vw, 100vw"
              className="transition-transform duration-[1600ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
            />
            <div aria-hidden className="absolute inset-0 bg-night/25" />
          </Parallax>
          <span className="absolute left-1/2 top-1/2 flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/60 backdrop-blur-sm transition-all duration-700 ease-[var(--ease-out-soft)] group-hover:scale-110 group-hover:bg-paper group-hover:text-ink md:size-28">
            <Play aria-hidden strokeWidth={1} className="ml-1 size-7 fill-current" />
          </span>
          <span className="eyebrow absolute bottom-5 left-5 text-paper/80">Guest film</span>
        </Link>

        {/* Words */}
        <Reveal className="flex flex-col justify-center md:col-span-4 md:col-start-9">
          <p data-reveal className="eyebrow flex items-center gap-4 text-paper/50">
            <span>03</span>
            <span aria-hidden className="h-px w-10 bg-paper/30" />
            <span id="stories-title">Guest stories</span>
          </p>
          <blockquote data-reveal className="mt-8">
            <p className="font-serif text-3xl font-light leading-[1.2] md:text-4xl">“{featured.quote}”</p>
          </blockquote>
          <p data-reveal className="mt-8 text-sm text-paper/60">
            {featured.guestName}, {featured.homeTown}
            {journey && (
              <>
                <br />
                <span className="text-paper/40">Travelled on </span>
                <Link href={`/itineraries/${journey.slug}`} className="link-line text-paper/80">
                  {journey.title}
                </Link>
              </>
            )}
          </p>
          <div data-reveal className="mt-10">
            <ButtonLink href="/stories" variant="outline" inverse>
              More guest stories
            </ButtonLink>
          </div>
        </Reveal>

        {/* Other voices */}
        <Reveal as="ul" className="grid gap-8 border-t border-paper/10 pt-10 sm:grid-cols-3 md:col-span-12 md:mt-12">
          {others.slice(0, 3).map((story) => (
            <li key={story.slug} data-reveal>
              <Link href={`/stories/${story.slug}`} className="group flex items-start gap-4">
                <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-night-soft">
                  <SmartImage image={story.portrait} sizes="56px" />
                </span>
                <span>
                  <span className="block font-serif text-lg leading-snug text-paper/90 transition-colors group-hover:text-paper">
                    {story.excerpt}
                  </span>
                  <span className="mt-2 block text-xs text-paper/50">{story.guestName}</span>
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
