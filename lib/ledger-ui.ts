import { twMerge } from "tailwind-merge";

/**
 * Class joiner for the ledger components. Unlike lib/utils `cn` it resolves
 * Tailwind conflicts, so an override ("text-[17px]") always beats the
 * recipe it is appended to.
 */
export const lx = (...classes: Array<string | false | null | undefined>) => twMerge(classes);
const cn = lx;

/**
 * Class recipes for the Backroad Ledger home page (app/(ledger)). The rest
 * of the site keeps its own recipes in lib/ui.ts.
 *
 * Type system from the wireframe: Jost in bold uppercase for headings and
 * labels, Courier Prime (mostly italic) for every line of body copy, as if
 * typed into a field journal.
 */

/** Centred content column. */
export const lwrap = "mx-auto w-full max-w-[1200px] px-[clamp(20px,5vw,48px)]";

/** Vertical rhythm for a full-width section; anchors clear the fixed header. */
export const lsec = "relative scroll-mt-16 py-[clamp(72px,9vw,120px)]";

/** Big uppercase display heading. Overrides the global h1–h4 serif. */
export const display = "font-jost font-semibold uppercase leading-[0.95] tracking-[-0.005em] text-balance";
export const h1 = cn(display, "text-[clamp(52px,8.6vw,124px)] leading-[0.9]");
export const h2 = cn(display, "text-[clamp(38px,5.4vw,66px)]");

/** Small spaced typewriter caps above headings. */
export const kicker = "font-type text-[11px] uppercase tracking-[0.32em] text-ochre";

/** Jost micro-label (form labels, column heads, meta). */
export const label = "font-jost text-[11px] font-semibold uppercase tracking-[0.18em]";

/** Typewriter body copy. */
export const typed = "font-type text-[15px]/[1.7]";
export const typedItalic = cn(typed, "italic");

const buttonBase =
    "group/btn inline-flex h-12 shrink-0 items-center justify-center gap-3 px-6 font-jost text-[13px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap transition-[background-color,color,border-color] duration-200 disabled:cursor-not-allowed disabled:opacity-60 [&_svg]:size-4 [&_svg]:transition-transform hover:[&_svg]:translate-x-1";

export type LedgerButton = "ochre" | "outline-light" | "outline-ink" | "ink";

const buttonVariants: Record<LedgerButton, string> = {
    ochre: "bg-ochre text-ledger-ink hover:bg-ochre-soft",
    "outline-light": "border border-white/90 text-white hover:bg-white hover:text-ledger-ink",
    "outline-ink": "border border-ledger-ink text-ledger-ink hover:bg-ledger-ink hover:text-ledger-paper",
    ink: "bg-ledger-ink text-ledger-paper hover:bg-ledger-navy",
};

export const lbtn = (variant: LedgerButton = "ochre") => cn(buttonBase, buttonVariants[variant]);

/** Underlined uppercase text link ("READ THE FULL STORY →"). */
export const underlineLink =
    "group/link inline-flex items-center gap-2.5 border-b-2 border-current pb-1 font-jost text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors [&_svg]:size-4 [&_svg]:transition-transform hover:[&_svg]:translate-x-1";

/** Photo frame with a calm placeholder colour while the image loads. */
export const photo = "relative isolate overflow-hidden bg-ledger-mist";

/** Form controls on the paper card. */
export const fieldLabel = cn(label, "mb-2 block text-[10.5px] text-ledger-ink/80");
export const control =
    "h-11 w-full border border-ledger-ink/25 bg-white px-3 font-type text-[14px] text-ledger-ink outline-0 transition-colors placeholder:text-ledger-grey focus:border-ledger-ink aria-invalid:border-[#b4402f]";
