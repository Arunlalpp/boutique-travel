import Link from "next/link";
import type { DestinationCard as DestinationCardType } from "@/lib/types";
import { SmartImage } from "@/components/ui/SmartImage";

export function DestinationCard({ destination }: { destination: DestinationCardType }) {
    return (
        <article className="group">
            <Link href={`/destinations/${destination.slug}`} className="block" aria-label={`${destination.name} — view destination`}>
                <div data-reveal="mask" className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
                    <SmartImage
                        image={destination.heroImage}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        tone="light"
                        className="transition-transform duration-[1600ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                    />
                </div>
                <div data-reveal className="mt-6">
                    <p className="eyebrow text-stone">{destination.country}</p>
                    <h3 className="mt-3 text-3xl leading-tight">
                        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-[var(--ease-out-soft)] group-hover:bg-[length:100%_1px]">
                            {destination.name}
                        </span>
                    </h3>
                    <p className="mt-3 max-w-md text-[0.95rem] text-stone">{destination.shortDescription}</p>
                </div>
            </Link>
        </article>
    );
}
