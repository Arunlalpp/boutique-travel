import { lx as cn } from "@/lib/ledger-ui";

/** One elephant print: a broad oval pad with four toenails along the front edge. */
function Print({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden>
            <ellipse cx="16" cy="19" rx="10" ry="9.5" fill="currentColor" />
            <circle cx="8.5" cy="8.6" r="2.5" fill="currentColor" />
            <circle cx="13.6" cy="6.4" r="2.6" fill="currentColor" />
            <circle cx="18.9" cy="6.4" r="2.6" fill="currentColor" />
            <circle cx="23.9" cy="8.6" r="2.5" fill="currentColor" />
        </svg>
    );
}

/**
 * The footprint-trail motif: a pair of prints that recurs once per section,
 * as if the elephant from "The Story" walks down the page ahead of the guest.
 */
export function Footprints({ className, step = 0 }: { className?: string; step?: number }) {
    return (
        <span aria-hidden className={cn("inline-flex items-start gap-1 opacity-70", className)}>
            <Print className={cn("size-6", step % 2 ? "-rotate-12" : "rotate-6")} />
            <Print className={cn("mt-[-6px] size-4.5 opacity-70", step % 2 ? "rotate-12" : "-rotate-6")} />
        </span>
    );
}
