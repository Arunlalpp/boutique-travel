import { cn } from "./utils";

/**
 * Shared Tailwind class recipes for the design system. Components compose
 * these instead of repeating long utility strings; there is no other CSS.
 */

/** Centred content column with the design's fluid side gutter. */
export const wrap = "mx-auto w-full max-w-[1240px] px-(--gutter)";

/** Vertical rhythm for a full-width section. */
export const sec = "relative py-[clamp(72px,9vw,128px)]";

export const secHead = "mb-9 flex flex-wrap items-end justify-between gap-6";
export const secHeadTitle = "grid min-w-0 gap-3.5";

export const eyebrow =
    "inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.18em] text-ember before:h-[1.5px] before:w-[26px] before:bg-current before:content-['']";

export const lede = "max-w-[58ch] text-[17px] text-mist";
export const mono = "font-mono text-xs tracking-[0.02em]";

export const hXl = "text-[clamp(44px,7vw,92px)]";
export const hLg = "text-[clamp(34px,4.6vw,56px)]";
export const hMd = "text-[clamp(26px,3vw,36px)]";

export type ButtonVariant = "ember" | "glass" | "light" | "dark";

const buttonVariants: Record<ButtonVariant, string> = {
    ember: "bg-ember text-ember-ink shadow-ember hover:bg-ember-soft",
    glass: "glass-strong hover:bg-white/20",
    light: "bg-fg text-night",
    dark: "bg-cream-ink text-cream",
};

export function btn(variant: ButtonVariant = "ember", size: "md" | "sm" = "md") {
    return cn(
        "group/btn inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-[transform,background-color,opacity] duration-250 ease-soft active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60",
        "[&_svg]:size-4 [&_svg]:transition-transform [&_svg]:duration-250 [&_svg]:ease-soft hover:[&_svg]:translate-x-[3px]",
        size === "md" ? "h-12 px-[22px] text-[15px]" : "h-10 px-4 text-sm",
        buttonVariants[variant],
    );
}

export const iconBtn =
    "grid size-11 shrink-0 place-items-center rounded-full transition-[background-color,opacity] duration-200 hover:bg-white/18 disabled:cursor-default disabled:opacity-30 [&_svg]:size-5";

/** Toggle chip. `tone="light"` is for the cream "Top things to do" section. */
export function chip(tone: "dark" | "light" = "dark") {
    return cn(
        "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium whitespace-nowrap transition-all duration-200 aria-pressed:font-semibold",
        tone === "dark"
            ? "glass text-mist hover:border-line-2 hover:text-fg aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-night"
            : "border-cream-ink/12 bg-cream-ink/5 text-cream-mist hover:text-cream-ink aria-pressed:border-cream-ink aria-pressed:bg-cream-ink aria-pressed:text-cream",
    );
}

export const pill =
    "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-bold [&_svg]:size-[13px] [&_svg]:text-ember";

/** Rounded −/+ counter. */
export const stepper = "flex items-center gap-3";
export const stepperBtn =
    "grid size-9 place-items-center rounded-full border border-line-2 text-lg transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35";
export const stepperValue = "min-w-5 text-center font-bold tabular-nums";

/** Square accent tile holding an icon. */
export const iconTile = "grid size-12 shrink-0 place-items-center rounded-[14px] bg-ember/16 text-ember [&_svg]:size-[22px]";

export const price = "text-[17px] font-bold tabular-nums";
export const priceNote = "text-xs font-normal text-dim";

/** Uppercase label above a fact value. */
export const factLabel = "text-[11px] font-bold uppercase tracking-[0.14em] text-dim";
export const factValue = "text-lg font-semibold tabular-nums";

/** Full-bleed image layer inside a positioned parent. */
export const mediaFill = "absolute inset-0 overflow-hidden";

/** Text field inputs on dark glass. */
export const field = "grid gap-2";
export const fieldLabel = "text-[13px] font-semibold text-mist";
export const input =
    "h-[54px] w-full rounded-2xl border border-line bg-white/6 px-[18px] text-[15px] outline-0 transition-colors focus:border-ember focus:bg-white/9 aria-invalid:border-danger [&>option]:bg-night-2";

export const logoClass = "flex items-center gap-2.5 font-display text-[19px] whitespace-nowrap [&_svg]:size-7 [&_svg]:shrink-0";

/* ---------- listing pages (destinations, journeys) ---------- */
export const toolbar =
    "glass-strong sticky top-[calc(88px+env(safe-area-inset-top,0px))] z-30 -mt-[34px] flex items-center gap-2.5 rounded-full bg-[#141820]/72! p-2 shadow-deep max-tab:top-[calc(80px+env(safe-area-inset-top,0px))] max-tab:flex-wrap max-tab:rounded-3xl";
export const searchBox =
    "flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full bg-white/6 px-[18px] max-tab:basis-full [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-ember";
export const searchInput = "min-w-0 flex-1 border-0 bg-transparent text-[15px] outline-0 placeholder:text-dim";
export const toolbarSelect =
    "h-12 rounded-full border-0 bg-white/6 px-4 text-sm font-semibold outline-0 max-tab:min-w-0 max-tab:flex-1 [&>option]:bg-night-2";
export const chipRow = "flex gap-2.5 overflow-x-auto pt-7 pb-2 scrollbar-none";
export const resultLine = "mb-[22px] flex items-center justify-between gap-3 text-sm text-dim";
export const cardGrid = "grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-[22px] *:w-full!";
export const emptyState = "glass grid justify-items-center gap-3.5 rounded-[28px] px-6 py-12 text-center";

/* ---------- check lists (journey highlights, inclusions) ---------- */
export const checklist = "grid gap-3 [&>li]:flex [&>li]:items-start [&>li]:gap-3 [&>li]:text-[15px] [&>li]:text-mist";
export const checkDot =
    "mt-px grid size-6 shrink-0 place-items-center rounded-full bg-ember/18 text-ember [&_svg]:size-[13px]";
