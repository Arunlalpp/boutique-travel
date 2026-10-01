import Link from "next/link";
import type { Itinerary } from "@/lib/types";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

interface JourneyCardProps {
    journey: Itinerary;
    shape?: "landscape" | "portrait" | "wide";
    sizes?: string;
    index?: string;
    className?: string;
}

const aspect = {
    landscape: "aspect-[4/3]",
    portrait: "aspect-[4/5]",
    wide: "aspect-[16/10]",
};

export function JourneyCard({
    journey,
    shape = "landscape",
    sizes = "(min-width: 1024px) 50vw, 100vw",
    index,
    className,
}: JourneyCardProps) {
    return (
        <article className={cn("group", className)}>
            <Link
                href={`/itineraries/${journey.slug}`}
                className="block"
                aria-label={`${journey.title} — view journey`}
            >
                <div data-reveal="mask" className={cn("relative overflow-hidden bg-paper-deep", aspect[shape])}>
                    <SmartImage
                        image={journey.cardImage}
                        sizes={sizes}
                        tone="light"
                        className="transition-transform duration-[1600ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-4 top-4 bg-paper/90 px-3 py-1.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink backdrop-blur">
                        {journey.style}
                    </span>
                </div>

                <div data-reveal className="mt-6">
                    <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-stone">
                        {index && <span className="text-ink">{index}</span>}
                        <span>{journey.country}</span>
                        <span aria-hidden className="h-px w-4 bg-ink/25" />
                        <span>{journey.durationDays} days</span>
                    </p>
                    <h3 className="mt-3 text-3xl leading-tight md:text-[2.25rem]">
                        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-[var(--ease-out-soft)] group-hover:bg-[length:100%_1px]">
                            {journey.title}
                        </span>
                    </h3>
                    <p className="mt-3 max-w-md text-[0.95rem] text-stone">{journey.hook}</p>
                </div>
            </Link>
        </article>
    );
}
