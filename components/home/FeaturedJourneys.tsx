import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { JourneyCard } from "@/components/itinerary/JourneyCard";
import type { Itinerary } from "@/lib/types";
import { pad } from "@/lib/utils";

const layout = [
    { col: "md:col-span-7", shape: "landscape" as const, sizes: "(min-width: 768px) 58vw, 100vw" },
    {
        col: "md:col-span-4 md:col-start-9 md:mt-48",
        shape: "portrait" as const,
        sizes: "(min-width: 768px) 33vw, 100vw",
    },
    {
        col: "md:col-span-4 md:col-start-2 md:mt-8",
        shape: "portrait" as const,
        sizes: "(min-width: 768px) 33vw, 100vw",
    },
    {
        col: "md:col-span-6 md:col-start-7 md:mt-40",
        shape: "landscape" as const,
        sizes: "(min-width: 768px) 50vw, 100vw",
    },
];

export function FeaturedJourneys({ journeys }: { journeys: Itinerary[] }) {
    return (
        <section aria-labelledby="featured-title" className="bg-paper-deep py-24 md:py-40">
            <div className="container-x">
                <Reveal className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                    <SectionIntro
                        index="02"
                        eyebrow="Sample journeys"
                        title={
                            <span id="featured-title">
                                A few places we <span className="serif-italic">know by heart</span>
                            </span>
                        }
                    >
                        Starting points, not set menus. Each can be reshaped around your dates, your pace and the people
                        you travel with.
                    </SectionIntro>
                    <div data-reveal className="shrink-0">
                        <ButtonLink href="/itineraries" variant="outline">
                            All journeys
                        </ButtonLink>
                    </div>
                </Reveal>

                <div className="mt-16 grid gap-x-8 gap-y-20 md:mt-24 md:grid-cols-12">
                    {journeys.slice(0, 4).map((journey, i) => {
                        const l = layout[i % layout.length];
                        return (
                            <Reveal key={journey.slug} className={l.col}>
                                <JourneyCard journey={journey} shape={l.shape} sizes={l.sizes} index={pad(i + 1)} />
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
