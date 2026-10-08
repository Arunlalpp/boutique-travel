import { cn } from "./utils";

/**
 * Shared Tailwind class recipes for the design system. Components compose
 * these instead of repeating long utility strings; there is no other CSS.
 */

/** Centred content column with the design's fluid side gutter. */
export const wrap = "mx-auto w-full max-w-[1280px] px-(--gutter)";

/** Vertical rhythm for a full-width section. */
export const sec = "relative py-[clamp(44px,5.5vw,80px)]";

export const secHead = "mb-8 flex flex-wrap items-end justify-between gap-6";
export const secHeadTitle = "grid min-w-0 gap-3";

/** Small uppercase label above headings: the design's quiet section marker. */
export const eyebrow = "inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-dim";

export const lede = "max-w-[52ch] text-[15px] text-mist";
export const mono = "font-mono text-xs tracking-[0.02em]";

export const hXl = "text-[clamp(44px,6.4vw,88px)]";
export const hLg = "text-[clamp(32px,4.2vw,52px)]";
export const hMd = "text-[clamp(24px,2.6vw,32px)]";

/** Large light-weight statement paragraph (home intro, about story). */
export const statement = "font-display text-[clamp(22px,2.6vw,34px)] leading-[1.22] font-light tracking-[-0.02em] text-balance";

/** Hairline-topped column, used for stats, timeline steps and facts. */
export const ruled = "border-t border-line pt-4";

export type ButtonVariant = "primary" | "glass" | "light" | "dark";

const buttonVariants: Record<ButtonVariant, string> = {
    primary: "bg-ink text-paper hover:bg-ink/85",
    glass: "border border-line-2 bg-transparent text-ink hover:border-ink",
    light: "bg-paper text-ink hover:bg-white",
    dark: "bg-ink text-paper hover:bg-ink/85",
};

export function btn(variant: ButtonVariant = "primary", size: "md" | "sm" = "md") {
    return cn(
        "group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[transform,background-color,border-color,opacity] duration-250 ease-soft active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50",
        "[&_svg]:size-3.5 [&_svg]:transition-transform [&_svg]:duration-250 [&_svg]:ease-soft hover:[&_svg]:translate-x-[3px]",
        size === "md" ? "h-11 px-5 text-sm" : "h-9 px-4 text-[13px]",
        buttonVariants[variant],
    );
}

/** Plain text link with a trailing arrow ("Our story →"). */
export const textLink =
    "group/link inline-flex items-center gap-1.5 text-sm font-medium text-ink underline-offset-4 hover:underline [&_svg]:size-3.5 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5";

export const iconBtn =
    "grid size-10 shrink-0 place-items-center rounded-full transition-[background-color,opacity,color] duration-200 hover:bg-ink/6 disabled:cursor-default disabled:opacity-30 [&_svg]:size-4";

/** Toggle chip: outlined pill, solid ink when pressed. */
export function chip() {
    return "inline-flex h-9 items-center gap-2 rounded-full border border-line-2 px-4 text-[13px] font-medium whitespace-nowrap text-mist transition-all duration-200 hover:border-ink hover:text-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper";
}

/** Text tab ("Per person · Group of 4+"); underlined when pressed. */
export const textTab =
    "relative pb-1.5 text-[13px] font-medium text-dim transition-colors hover:text-ink aria-pressed:text-ink aria-pressed:after:absolute aria-pressed:after:inset-x-0 aria-pressed:after:bottom-0 aria-pressed:after:h-px aria-pressed:after:bg-ink aria-pressed:after:content-['']";

export const pill =
    "inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-medium [&_svg]:size-3 [&_svg]:text-accent";

/** Tiny caption printed in the corner of a photo. */
export const photoTag = "pointer-events-none absolute top-3 left-3.5 z-2 text-[11px] font-medium text-white/90 drop-shadow-sm";

/** Rounded −/+ counter. */
export const stepper = "flex items-center gap-3";
export const stepperBtn =
    "grid size-8 place-items-center rounded-full border border-line-2 text-base transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-35";
export const stepperValue = "min-w-5 text-center font-semibold tabular-nums";

/** Square accent tile holding an icon. */
export const iconTile = "grid size-11 shrink-0 place-items-center rounded-full border border-line text-ink [&_svg]:size-5";

export const price = "text-[15px] font-medium tabular-nums";
export const priceNote = "text-xs font-normal text-dim";

/** Uppercase label above a fact value. */
export const factLabel = "text-[11px] font-medium uppercase tracking-[0.14em] text-dim";
export const factValue = "text-base font-medium tabular-nums";

/** Full-bleed image layer inside a positioned parent. */
export const mediaFill = "absolute inset-0 overflow-hidden";

/** Photo frame: square corners, warm placeholder while the image loads. */
export const frame = "relative isolate overflow-hidden bg-paper-3";

/** Underlined text fields. */
export const field = "grid gap-1.5";
export const fieldLabel = "text-[11px] font-medium uppercase tracking-[0.14em] text-dim";
export const input =
    "h-11 w-full rounded-none border-0 border-b border-line-2 bg-transparent px-0 text-[15px] outline-0 transition-colors placeholder:text-dim focus:border-ink aria-invalid:border-danger [&>option]:bg-paper";

export const logoClass = "flex items-center gap-2 text-[15px] font-semibold tracking-[-0.01em] whitespace-nowrap [&_svg]:size-6 [&_svg]:shrink-0";

/* ---------- listing pages (destinations, journeys) ---------- */
export const toolbar = "flex items-center gap-4 border-b border-line-2 pb-1 max-tab:flex-wrap";
export const searchBox =
    "flex h-12 min-w-0 flex-1 items-center gap-3 max-tab:basis-full [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-dim";
export const searchInput = "min-w-0 flex-1 border-0 bg-transparent text-[15px] outline-0 placeholder:text-dim";
export const toolbarSelect =
    "h-10 cursor-pointer rounded-full border border-line-2 bg-transparent px-4 text-[13px] font-medium outline-0 max-tab:min-w-0 max-tab:flex-1 [&>option]:bg-paper";
export const chipRow = "flex gap-5 overflow-x-auto pt-5 pb-2 scrollbar-none";
export const resultLine = "mb-5 flex items-center justify-between gap-3 text-[13px] text-dim";
export const cardGrid = "grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-x-5 gap-y-10 *:w-full!";
export const emptyState = "grid justify-items-center gap-3.5 border-y border-line px-6 py-14 text-center";

/* ---------- check lists (journey highlights, inclusions) ---------- */
export const checklist = "grid gap-2.5 [&>li]:flex [&>li]:items-start [&>li]:gap-2.5 [&>li]:text-sm [&>li]:text-mist";
export const checkDot = "mt-0.5 grid size-4 shrink-0 place-items-center text-ink [&_svg]:size-3.5";
