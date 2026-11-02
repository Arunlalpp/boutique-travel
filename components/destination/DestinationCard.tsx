import type { DestinationCard as DestinationCardType } from "@/lib/types";
import { SpotCard } from "@/components/ui/SpotCard";
import { price, priceNote } from "@/lib/ui";

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
        <SpotCard
            href={`/destinations/${destination.slug}`}
            title={destination.name}
            image={destination.heroImage}
            sizes={sizes}
            className={className}
            badge={destination.region}
            location={destination.country}
            tagline={destination.shortDescription}
            meta={
                <span className={price}>
                    <small className={priceNote}>
                        {journeys > 0 ? `${journeys} journey${journeys === 1 ? "" : "s"}` : "Designed to order"}
                    </small>
                </span>
            }
        />
    );
}
