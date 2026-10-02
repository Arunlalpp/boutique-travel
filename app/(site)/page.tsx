import { HeroCarousel } from "@/components/home/HeroCarousel";
import { BookingBar } from "@/components/home/BookingBar";
import { ExploreMap } from "@/components/home/ExploreMap";
import { Wildlife } from "@/components/home/Wildlife";
import { ImpactBand } from "@/components/home/ImpactBand";
import { ExperiencesRail } from "@/components/home/ExperiencesRail";
import { CtaBand } from "@/components/home/CtaBand";
import { JourneyCard } from "@/components/itinerary/JourneyCard";
import { Rail } from "@/components/ui/Rail";
import { brandSlide, trustChips, type HeroSlide } from "@/lib/data/home";
import { chip, eyebrow, hLg, sec, secHeadTitle, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { getAllDestinations, getAllStories, getFeaturedItineraries, getSiteSettings } from "@/sanity/lib/queries";

export default async function HomePage() {
    const [settings, featured, destinations, stories] = await Promise.all([
        getSiteSettings(),
        getFeaturedItineraries(8),
        getAllDestinations(),
        getAllStories(),
    ]);

    const slides: HeroSlide[] = [
        brandSlide,
        ...featured.slice(0, 2).map((j) => ({
            image: j.cardImage,
            title: j.title,
            sub: `${j.country} · ${j.duration}`,
            lede: j.hook,
            place: `${j.country} · ${j.style}`,
            href: `/itineraries/${j.slug}`,
        })),
    ];

    return (
        <>
            <HeroCarousel slides={slides} eyebrow={settings.descriptor || "Boutique adventures since 2014"} />

            <div className={wrap}>
                <BookingBar
                    destinations={destinations.map((d) => ({ slug: d.slug, name: d.name, country: d.country }))}
                />
                <div className="mt-[22px] flex flex-wrap justify-center gap-2.5">
                    {trustChips.map((c) => (
                        <span key={c} className={cn(chip(), "h-9 text-[13px]")}>
                            {c}
                        </span>
                    ))}
                </div>
            </div>

            <ExploreMap destinations={destinations} />

            {featured.length > 0 && (
                <section className={cn(sec, "pt-0!")} aria-labelledby="featured-title">
                    <Rail
                        label="Featured journeys"
                        head={
                            <div className={secHeadTitle}>
                                <span className={eyebrow}>Hand-picked</span>
                                <h2 id="featured-title" className={hLg}>
                                    Nights you’ll remember
                                </h2>
                            </div>
                        }
                    >
                        {featured.map((j) => (
                            <JourneyCard key={j.slug} journey={j} />
                        ))}
                    </Rail>
                </section>
            )}

            <Wildlife stories={stories} />
            <ImpactBand />
            <ExperiencesRail />
            <CtaBand />
        </>
    );
}
