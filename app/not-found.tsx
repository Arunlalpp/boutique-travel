import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
    return (
        <section className="container-x flex min-h-[80svh] flex-col justify-center pb-24 pt-40">
            <p className="eyebrow text-stone">Page not found</p>
            <h1 className="mt-8 max-w-4xl text-[clamp(2.75rem,7vw,6.5rem)] leading-[1]">
                Even the best journeys <span className="serif-italic">take a wrong turn</span>.
            </h1>
            <p className="mt-8 max-w-md text-lg text-stone">
                The page you were looking for has moved, or never existed. Let us point you somewhere better.
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
                <ButtonLink href="/">Back to the start</ButtonLink>
                <ButtonLink href="/itineraries" variant="outline">
                    Browse journeys
                </ButtonLink>
            </div>
        </section>
    );
}
