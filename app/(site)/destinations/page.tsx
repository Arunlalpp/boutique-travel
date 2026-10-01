import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { DestinationCard } from "@/components/destination/DestinationCard";
import { getAllDestinations } from "@/sanity/lib/queries";

export const metadata: Metadata = {
    title: "Destinations",
    description: "The places we design journeys for, and the sense of each one.",
    alternates: { canonical: "/destinations" },
};

export default async function DestinationsPage() {
    const destinations = await getAllDestinations();

    return (
        <>
            <PageHeader
                eyebrow="Destinations"
                title={
                    <>
                        Where we go, <span className="serif-italic">and why</span>
                    </>
                }
            >
                Each destination shapes the pace, the places to stay and the people you&apos;ll meet. Here&apos;s a
                little about each one.
            </PageHeader>

            <section aria-label="Destinations" className="container-x pb-24 md:pb-40">
                <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
                    {destinations.map((destination) => (
                        <Reveal key={destination.slug}>
                            <DestinationCard destination={destination} />
                        </Reveal>
                    ))}
                </div>
            </section>
        </>
    );
}
