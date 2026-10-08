"use client";

import type { ItineraryCard } from "@/lib/types";
import { SpotCard } from "@/components/ui/SpotCard";
import { HeartIcon } from "@/components/ui/Icons";
import { useSaved } from "@/components/providers/SiteProviders";
import { mono } from "@/lib/ui";

interface JourneyCardProps {
    journey: ItineraryCard;
    sizes?: string;
    className?: string;
    priority?: boolean;
}

export function JourneyCard({ journey, sizes = "(min-width: 1024px) 340px, 80vw", className, priority }: JourneyCardProps) {
    const { isSaved, toggle } = useSaved();
    const saved = isSaved(journey.slug);

    return (
        <SpotCard
            href={`/itineraries/${journey.slug}`}
            title={journey.title}
            image={journey.cardImage}
            sizes={sizes}
            priority={priority}
            className={className}
            badge={journey.style}
            action={
                <button
                    type="button"
                    className="grid size-8 place-items-center rounded-full bg-paper/90 text-ink transition-transform duration-300 ease-soft active:scale-85 [&_svg]:size-4 [&_svg]:transition-colors aria-pressed:bg-ink aria-pressed:text-paper aria-pressed:[&_svg]:fill-paper"
                    aria-pressed={saved}
                    aria-label={saved ? `Remove ${journey.title} from saved` : `Save ${journey.title}`}
                    onClick={() => toggle(journey.slug, journey.title)}
                >
                    <HeartIcon />
                </button>
            }
            location={
                <>
                    {journey.country}
                    {journey.duration && (
                        <>
                            {" · "}
                            <span className={mono}>{journey.duration}</span>
                        </>
                    )}
                </>
            }
            tagline={journey.hook}
            meta={
                <span className="tabular-nums">{journey.startingPrice ? `From ${journey.startingPrice}` : "Priced to your plans"}</span>
            }
        />
    );
}
