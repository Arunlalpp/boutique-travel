import Link from "next/link";
import type { DestinationCard as DestinationCardType } from "@/lib/types";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowIcon, PinIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

export function DestinationCard({
    destination,
    className,
    sizes = "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw",
}: {
    destination: DestinationCardType;
    className?: string;
    sizes?: string;
}) {
    const journeys = destination.journeyCount;
    return (
        <article className={cn("spot shadow-deep", className)}>
            <Link href={`/destinations/${destination.slug}`} className="spot-link" aria-label={destination.name} />
            <div className="media-fill">
                <SmartImage image={destination.heroImage} sizes={sizes} />
            </div>
            <div className="top">
                <span className="pill glass-strong">{destination.region}</span>
            </div>
            <div className="info glass-strong">
                <span className="loc">
                    <PinIcon />
                    {destination.country}
                </span>
                <h3>{destination.name}</h3>
                <span className="tagline">{destination.shortDescription}</span>
                <div className="meta">
                    <span className="price">
                        <small>
                            {journeys > 0 ? `${journeys} journey${journeys === 1 ? "" : "s"}` : "Designed to order"}
                        </small>
                    </span>
                    <span className="go" aria-hidden>
                        <ArrowIcon />
                    </span>
                </div>
            </div>
        </article>
    );
}
