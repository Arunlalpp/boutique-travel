import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { JourneyIndex } from "@/components/itinerary/JourneyIndex";
import { getAllItineraries } from "@/sanity/lib/queries";

export const metadata: Metadata = {
    title: "Sample Journeys",
    description: "Sample private and small-group journeys — starting points for a trip designed around you.",
    alternates: { canonical: "/itineraries" },
};

export default async function ItinerariesPage() {
    const itineraries = await getAllItineraries();

    return (
        <>
            <PageHeader
                eyebrow="Sample journeys"
                title={
                    <>
                        Places we know, <span className="serif-italic">and how we&apos;d show them</span> to you
                    </>
                }
            >
                These are starting points rather than set departures. Every journey is reshaped around your dates, your
                pace and the people you travel with.
            </PageHeader>
            <JourneyIndex journeys={itineraries} />
        </>
    );
}
