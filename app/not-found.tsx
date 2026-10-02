import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
    return (
        <section className="sec flex min-h-[80svh] items-center overflow-hidden pt-40">
            <div
                aria-hidden
                className="glow"
                style={{
                    width: 700,
                    height: 700,
                    left: -200,
                    top: -200,
                    background: "radial-gradient(circle, rgba(245,158,61,.16), transparent 70%)",
                }}
            />
            <div className="wrap relative grid gap-6">
                <span className="eyebrow">Page not found</span>
                <h1 className="h-xl max-w-[14ch]">Even the best trails take a wrong turn.</h1>
                <p className="lede">
                    The page you were looking for has moved, or never existed. Let us point you somewhere better.
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                    <ButtonLink href="/">Back to camp</ButtonLink>
                    <ButtonLink href="/itineraries" variant="glass" arrow={false}>
                        Browse journeys
                    </ButtonLink>
                </div>
            </div>
        </section>
    );
}
