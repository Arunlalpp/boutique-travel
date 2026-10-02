"use client";

import Link from "next/link";
import type { ItineraryCard } from "@/lib/types";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon, HeartIcon, PinIcon } from "@/components/ui/Icons";
import { useSaved } from "@/components/providers/SiteProviders";
import { cn } from "@/lib/utils";

interface JourneyCardProps {
    journey: ItineraryCard;
    sizes?: string;
    className?: string;
    priority?: boolean;
}

/** The prototype's "spot" card: a tall photo with glass pill, save heart and info panel. */
export function JourneyCard({ journey, sizes = "(min-width: 1024px) 340px, 80vw", className, priority }: JourneyCardProps) {
    const { isSaved, toggle } = useSaved();
    const saved = isSaved(journey.slug);

    return (
        <article className={cn("spot shadow-deep", className)}>
            <Link href={`/itineraries/${journey.slug}`} className="spot-link" aria-label={journey.title} />
            <div className="media-fill">
                <SmartImage image={journey.cardImage} sizes={sizes} priority={priority} />
            </div>
            <div className="top">
                <span className="pill glass-strong">{journey.style}</span>
                <button
                    type="button"
                    className="heart glass-strong"
                    aria-pressed={saved}
                    aria-label={saved ? `Remove ${journey.title} from saved` : `Save ${journey.title}`}
                    onClick={() => toggle(journey.slug, journey.title)}
                >
                    <HeartIcon />
                </button>
            </div>
            <div className="info glass-strong">
                <span className="loc">
                    <PinIcon />
                    {journey.country}
                    {journey.duration && (
                        <>
                            {" · "}
                            <span className="mono">{journey.duration}</span>
                        </>
                    )}
                </span>
                <h3>{journey.title}</h3>
                <span className="tagline">{journey.hook}</span>
                <div className="meta">
                    <span className="price">
                        {journey.startingPrice ? (
                            <>
                                <small>From </small>
                                {journey.startingPrice}
                            </>
                        ) : (
                            <small>Priced to your plans</small>
                        )}
                    </span>
                    <span className="go" aria-hidden>
                        <ArrowIcon />
                    </span>
                </div>
            </div>
        </article>
    );
}
