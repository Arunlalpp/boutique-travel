import { Fragment } from "react";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { FeaturedJourneys } from "@/components/home/FeaturedJourneys";
import { PullQuote } from "@/components/home/PullQuote";
import { StoriesTeaser } from "@/components/home/StoriesTeaser";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { media } from "@/lib/data/media";
import { site, whyChooseUs } from "@/lib/data/site";
import { getFeaturedItineraries } from "@/lib/data/itineraries";
import { getFeaturedStory, stories } from "@/lib/data/stories";

export default function HomePage() {
  const featuredStory = getFeaturedStory();
  const otherStories = stories.filter((s) => s.slug !== featuredStory.slug);

  return (
    <>
      <Hero
        image={media.heroMountains}
        eyebrow={site.descriptor}
        lines={[
          "Journeys composed",
          <Fragment key="slowly-for-the-few">
            <span className="serif-italic">slowly,</span> for the few.
          </Fragment>,
        ]}
        tagline="Private and small-group travel, designed from a blank page around the way you like to see the world."
      />
      <Intro />
      <FeaturedJourneys journeys={getFeaturedItineraries(4)} />
      <PullQuote attribution="The founders">
        The best journeys aren&apos;t the ones with the most in them. They&apos;re the ones that leave{" "}
        <span className="serif-italic text-clay">room for the unplanned</span>.
      </PullQuote>
      <StoriesTeaser featured={featuredStory} others={otherStories} />
      <WhyChooseUs items={whyChooseUs} />
    </>
  );
}
