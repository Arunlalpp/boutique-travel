import { site } from "@/lib/data/site";

/**
 * Placeholder wordmark. Replace with the client's logo (inline SVG so it can
 * inherit `currentColor` over photography and on light pages).
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={className}>
      <span className="font-serif text-2xl font-light tracking-[0.01em]">{site.name}</span>
      <span aria-hidden className="ml-1 inline-block size-1.5 translate-y-[-2px] rounded-full bg-clay" />
    </span>
  );
}
