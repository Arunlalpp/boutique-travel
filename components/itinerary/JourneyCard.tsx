"use client";

import type { ItineraryCard } from "@/lib/types";
import { SpotCard } from "@/components/ui/SpotCard";
import { HeartIcon } from "@/components/ui/Icons";
import { useSaved } from "@/components/providers/SiteProviders";
import { mono, price, priceNote } from "@/lib/ui";
import { cn } from "@/lib/utils";

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
                    className="glass-strong grid size-10 place-items-center rounded-full transition-transform duration-300 ease-soft active:scale-85 [&_svg]:size-[19px] [&_svg]:transition-colors aria-pressed:[&_svg]:fill-ember aria-pressed:[&_svg]:text-ember"
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
                <span className={price}>
                    {journey.startingPrice ? (
                        <>
                            <small className={priceNote}>From </small>
                            {journey.startingPrice}
                        </>
                    ) : (
                        <small className={cn(priceNote)}>Priced to your plans</small>
                    )}
                </span>
            }
        />
    );
}
