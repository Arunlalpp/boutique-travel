"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GROUP_MIN, plans, pricingModes, type PricingMode } from "@/lib/data/packages";
import { money } from "@/lib/format";
import { CheckIcon, XIcon } from "@/components/ui/Icons";
import { useToast } from "@/components/providers/SiteProviders";
import { btn, checkDot, price, sec, stepper, stepperBtn, stepperValue, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** Indicator offset per tab; the three tabs are equal width so a translate is exact. */
const INDICATOR = ["translate-x-0", "translate-x-full", "translate-x-[200%]"];

export function PricingToggle({ mode, onChange }: { mode: PricingMode; onChange: (m: PricingMode) => void }) {
    const active = pricingModes.findIndex((m) => m.id === mode);
    return (
        <div className="glass-strong relative grid max-w-full grid-cols-3 rounded-full p-[5px]" role="group" aria-label="Pricing type">
            <span
                aria-hidden
                className={cn(
                    "absolute inset-y-[5px] left-[5px] w-[calc((100%-10px)/3)] rounded-full bg-fg transition-transform duration-400 ease-soft",
                    INDICATOR[active],
                )}
            />
            {pricingModes.map((m) => (
                <button
                    key={m.id}
                    type="button"
                    aria-pressed={m.id === mode}
                    onClick={() => onChange(m.id)}
                    className="group/tab relative z-1 h-[42px] rounded-full px-5 text-sm font-semibold whitespace-nowrap text-mist transition-colors duration-300 aria-pressed:text-night max-xs:px-3 max-xs:text-[13px]"
                >
                    {m.label}
                    {m.note && (
                        <small className="ml-1 text-[11px] text-ember group-aria-pressed/tab:text-ember-deep">{m.note}</small>
                    )}
                </button>
            ))}
        </div>
    );
}

export function PackagePicker() {
    const toast = useToast();
    const [mode, setMode] = useState<PricingMode>("pp");
    const [selected, setSelected] = useState("explorer");
    const [people, setPeople] = useState(2);
    const [flip, setFlip] = useState(false);
    const [sticky, setSticky] = useState(false);
    const section = useRef<HTMLElement>(null);

    const multiplier = pricingModes.find((m) => m.id === mode)!.multiplier;
    const plan = plans.find((p) => p.id === selected)!;
    const perPerson = Math.round(plan.price * multiplier);

    // Show the sticky booking bar once the plans are in or above view.
    useEffect(() => {
        const el = section.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setSticky(e.isIntersecting || e.boundingClientRect.top < 0), {
            rootMargin: "0px 0px -20% 0px",
        });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const changeMode = (m: PricingMode) => {
        if (m === mode) return;
        setFlip(true);
        setTimeout(() => {
            setMode(m);
            if (m === "group" && people < GROUP_MIN) setPeople(GROUP_MIN);
            setFlip(false);
        }, 200);
    };

    const fewer = () => {
        const n = Math.max(1, people - 1);
        setPeople(n);
        if (mode === "group" && n < GROUP_MIN) {
            setMode("pp");
            toast("Under 4 people, so switched to per-person pricing");
        }
    };

    const choose = (id: string, el: HTMLElement) => {
        setSelected(id);
        if (window.innerWidth < 960) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    };

    const bookHref = `/enquire?${new URLSearchParams({
        package: plan.name,
        pricing: mode,
        travellers: String(people),
    }).toString()}`;

    return (
        <>
            <div className="mt-2 flex justify-center px-(--gutter)">
                <PricingToggle mode={mode} onChange={changeMode} />
            </div>

            <section className={cn(sec, "pt-5!")} aria-label="Packages" ref={section}>
                <div className={wrap}>
                    <div className="grid grid-cols-3 items-stretch gap-[22px] max-desk:-mx-(--gutter) max-desk:flex max-desk:snap-x max-desk:snap-mandatory max-desk:overflow-x-auto max-desk:px-(--gutter) max-desk:pt-2.5 max-desk:pb-6 max-desk:scrollbar-none">
                        {plans.map((p) => {
                            const on = p.id === selected;
                            return (
                                <article
                                    key={p.id}
                                    data-on={on || undefined}
                                    className="glass relative flex cursor-pointer flex-col gap-5 rounded-[32px] p-8 text-left transition-[translate,border-color,background-color] duration-400 ease-soft hover:-translate-y-1.5 data-on:border-ember! data-on:bg-ember/8! data-on:shadow-[0_0_0_1px_var(--color-ember),0_30px_70px_-30px_rgb(245_158_61/0.45)] max-desk:w-[min(320px,82vw)] max-desk:shrink-0 max-desk:snap-center"
                                    onClick={(e) => choose(p.id, e.currentTarget)}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <h3 className="text-[28px]">{p.name}</h3>
                                        {p.popular && (
                                            <span className="rounded-full bg-ember px-2.5 py-[5px] text-[11px] font-bold tracking-[0.06em] whitespace-nowrap text-ember-ink">
                                                MOST POPULAR
                                            </span>
                                        )}
                                    </div>
                                    <span className="-mt-2.5 text-sm text-dim">{p.duration}</span>
                                    <div className="flex flex-wrap items-baseline gap-2">
                                        <b
                                            className={cn(
                                                "font-display text-[54px] leading-none font-normal tabular-nums transition-opacity duration-250",
                                                flip && "opacity-0",
                                            )}
                                        >
                                            {money(p.price * multiplier)}
                                        </b>
                                        <span className="text-[13px] text-dim">/ person</span>
                                    </div>
                                    <p className="text-[14.5px] text-mist">{p.description}</p>
                                    <ul className="grid gap-3 border-t border-line pt-[18px]">
                                        {p.included.map((i) => (
                                            <li key={i} className="flex items-center gap-2.5 text-sm text-mist">
                                                <i className={cn(checkDot, "mt-0! size-[22px]!")}>
                                                    <CheckIcon />
                                                </i>
                                                {i}
                                            </li>
                                        ))}
                                        {p.excluded.map((i) => (
                                            <li
                                                key={i}
                                                className="flex items-center gap-2.5 text-sm text-dim line-through decoration-white/25"
                                            >
                                                <i className={cn(checkDot, "mt-0! size-[22px]! bg-white/7! text-dim!")}>
                                                    <XIcon />
                                                </i>
                                                <span className="sr-only">Not included: </span>
                                                {i}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        type="button"
                                        aria-pressed={on}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            choose(p.id, e.currentTarget.closest("article")!);
                                        }}
                                        className="mt-auto flex h-12 items-center justify-center gap-2.5 rounded-full border border-line-2 font-semibold aria-pressed:border-ember aria-pressed:bg-ember aria-pressed:text-ember-ink"
                                    >
                                        {on ? "Selected" : `Choose ${p.name}`}
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <div
                aria-label="Booking summary"
                className={cn(
                    "glass-strong fixed bottom-[calc(20px+env(safe-area-inset-bottom,0px))] left-1/2 z-55 flex w-[min(860px,calc(100vw-24px))] -translate-x-1/2 items-center justify-between gap-4 rounded-full bg-[#141820]/80! py-2 pr-2 pl-[26px] shadow-deep transition-[translate,visibility] duration-500 ease-soft max-tab:bottom-[calc(88px+env(safe-area-inset-bottom,0px))] max-tab:rounded-3xl max-tab:pl-[18px]",
                    sticky ? "visible translate-y-0" : "invisible translate-y-[140%]",
                )}
            >
                <div className="grid min-w-0 leading-[1.3]">
                    <small className="text-xs text-dim">{pricingModes.find((m) => m.id === mode)!.summary}</small>
                    <b className="truncate text-base">
                        {plan.name} · {plan.short}
                    </b>
                </div>
                <div className="flex items-center gap-3.5">
                    <div className={cn(stepper, "max-tab:hidden")}>
                        <button type="button" className={stepperBtn} aria-label="Fewer travellers" disabled={people <= 1} onClick={fewer}>
                            −
                        </button>
                        <output aria-live="polite" aria-label="Travellers" className={stepperValue}>
                            {people}
                        </output>
                        <button
                            type="button"
                            className={stepperBtn}
                            aria-label="More travellers"
                            disabled={people >= 12}
                            onClick={() => setPeople(people + 1)}
                        >
                            +
                        </button>
                    </div>
                    <span className={price} aria-live="polite">
                        {money(perPerson * people)}
                    </span>
                    <Link className={btn("ember")} href={bookHref}>
                        Book now
                    </Link>
                </div>
            </div>
        </>
    );
}
