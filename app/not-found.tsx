import { ButtonLink } from "@/components/ui/ButtonLink";
import { eyebrow, hXl, lede, sec, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

export default function NotFound() {
    return (
        <section className={cn(sec, "flex min-h-[80svh] items-center overflow-hidden pt-40!")}>
            <div
                aria-hidden
                className="pointer-events-none absolute -top-[200px] -left-[200px] size-[700px] rounded-full bg-[radial-gradient(circle,rgb(245_158_61/0.16),transparent_70%)] blur-[10px]"
            />
            <div className={cn(wrap, "relative grid gap-6")}>
                <span className={eyebrow}>Page not found</span>
                <h1 className={cn(hXl, "max-w-[14ch]")}>Even the best trails take a wrong turn.</h1>
                <p className={lede}>
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
