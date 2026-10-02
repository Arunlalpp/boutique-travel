import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { JourneyIndex } from "@/components/itinerary/JourneyIndex";
import { CtaBand } from "@/components/home/CtaBand";
import { media } from "@/lib/data/media";
import { getAllItineraries, getSiteSettings } from "@/sanity/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    return pageMetadata({
        title: "Journeys",
        description: "Sample private and small-group journeys, each a starting point for a trip designed around you.",
        path: "/itineraries",
        siteName: settings.name,
    });
}

export default async function ItinerariesPage() {
    const itineraries = await getAllItineraries();

    return (
        <>
            <PageHero
                image={media.icelandCoast}
                className="pb-27.5!"
                crumbs={[{ label: "Home", href: "/" }, { label: "Journeys" }]}
                eyebrow="Sample journeys"
                title="Routes we know by heart"
                lede="These are starting points rather than set departures. Every journey is reshaped around your dates, your pace and the people you travel with."
            />
            <Suspense>
                <JourneyIndex journeys={itineraries} />
            </Suspense>
            <div className="h-[clamp(72px,9vw,128px)]" />
            <CtaBand
                title="Don’t see your kind of trip?"
                lede="Tell us where you want to wake up and how you like to travel. We’ll design the route from a blank page."
            />
        </>
    );
}
