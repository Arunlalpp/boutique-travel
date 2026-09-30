import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { media } from "@/lib/data/media";

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="py-24 md:py-40">
      <Reveal className="container-x grid gap-y-12 md:grid-cols-12 md:gap-x-8">
        <p data-reveal className="eyebrow flex items-center gap-4 self-start text-stone md:col-span-2 md:pt-1">
          <span>01</span>
          <span aria-hidden className="h-px w-10 bg-ink/25" />
        </p>

        <div className="md:col-span-10">
          <p data-reveal className="eyebrow text-stone">
            Our approach
          </p>
          <h2 id="intro-title" data-reveal className="mt-6 text-[clamp(2rem,4.4vw,4rem)] leading-[1.08]">
            We plan very few journeys each year, so that each one can be{" "}
            <span className="serif-italic text-clay">entirely your own</span> — shaped around how you like to travel,
            not how most people do.
          </h2>
        </div>

        <div className="md:col-span-4 md:col-start-3 md:mt-16">
          <Parallax className="aspect-[4/5] bg-paper-deep" amount={12}>
            <SmartImage image={media.traveller} sizes="(min-width: 768px) 33vw, 100vw" tone="light" />
          </Parallax>
        </div>

        <div className="flex flex-col justify-end md:col-span-4 md:col-start-8 md:mt-16">
          <p data-reveal className="text-lg text-ink-soft">
            Every journey begins with a conversation and a blank page. From there, one designer shapes the route, the
            pace and the people you&apos;ll meet — then stays with you until you&apos;re home.
          </p>
          <p data-reveal className="mt-5 text-stone">
            Private journeys for couples and families. Small groups of no more than ten. Nothing off the shelf.
          </p>
          <div data-reveal className="mt-10">
            <ButtonLink href="/about" variant="text">
              Read our story
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
