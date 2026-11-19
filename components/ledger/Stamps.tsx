import { lx as cn } from "@/lib/ledger-ui";

/** Three passport-style stamps; the earned ones are inked and tilted. */
export function Stamps({ entry, count, className }: { entry: string; count: number; className?: string }) {
    return (
        <div className={cn("flex gap-2", className)} role="img" aria-label={`${count} of 3 stamps earned`}>
            {[0, 1, 2].map((s) => (
                <span
                    key={s}
                    aria-hidden
                    className={cn(
                        "grid size-10 place-items-center rounded-full border border-dashed font-jost text-[8px] font-semibold tracking-[0.08em] uppercase",
                        s < count ? "-rotate-12 border-ochre-deep text-ochre-deep" : "border-current opacity-30",
                    )}
                >
                    {s < count ? `No.${entry}` : ""}
                </span>
            ))}
        </div>
    );
}
