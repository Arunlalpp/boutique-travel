"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GROUP_MIN, plans, pricingModes, type PricingMode } from "@/lib/data/packages";
import { money } from "@/lib/format";
import { ArrowIcon, CheckIcon, XIcon } from "@/components/ui/Icons";
import { useToast } from "@/components/providers/SiteProviders";
import { btn, checkDot, price, sec, stepper, stepperBtn, stepperValue, textTab, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function PricingToggle({ mode, onChange }: { mode: PricingMode; onChange: (m: PricingMode) => void }) {
    return (
        <div className="flex flex-wrap gap-6" role="group" aria-label="Pricing type">
            {pricingModes.map((m) => (
                <button key={m.id} type="button" aria-pressed={m.id === mode} onClick={() => onChange(m.id)} className={textTab}>
                    {m.label}
                    {m.note && <small className="ml-1 text-[11px] text-accent">{m.note}</small>}
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
            <div className={cn(wrap, "mt-8")}>
                <PricingToggle mode={mode} onChange={changeMode} />
            </div>

            <section className={cn(sec, "pt-6!")} aria-label="Packages" ref={section}>
                <div className={wrap}>
                    <div className="grid grid-cols-3 items-stretch border-t border-line max-desk:-mx-(--gutter) max-desk:flex max-desk:snap-x max-desk:snap-mandatory max-desk:overflow-x-auto max-desk:px-(--gutter) max-desk:pb-4 max-desk:scrollbar-none">
                        {plans.map((p) => {
                            const on = p.id === selected;
                            return (
                                <article
                                    key={p.id}
                                    data-on={on || undefined}
                                    className="relative flex cursor-pointer flex-col gap-4 border-l border-line px-[clamp(20px,2.4vw,32px)] pt-6 pb-2 text-left first:border-l-0 first:pl-0 last:pr-0 max-desk:w-[min(300px,80vw)] max-desk:shrink-0 max-desk:snap-start max-desk:first:pl-0"
                                    onClick={(e) => choose(p.id, e.currentTarget)}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-[11px] font-medium tracking-[0.14em] text-dim uppercase">{p.duration}</span>
                                        {p.popular && (
                                            <span className="text-[10.5px] font-medium tracking-[0.14em] whitespace-nowrap text-accent uppercase">
                                                Most popular
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-[clamp(24px,2.4vw,30px)]">{p.name}</h3>
                                    <div className="flex flex-wrap items-baseline gap-1.5">
                                        <b
                                            className={cn(
                                                "font-display text-[clamp(36px,3.6vw,46px)] leading-none font-light tracking-[-0.03em] tabular-nums transition-opacity duration-250",
                                                flip && "opacity-0",
                                            )}
                                        >
                                            {money(p.price * multiplier)}
                                        </b>
                                        <span className="text-xs text-dim">/ person</span>
                                    </div>
                                    <p className="text-[13px] text-mist">{p.description}</p>
                                    <ul className="grid gap-2.5 border-t border-line pt-4">
                                        {p.included.map((i) => (
                                            <li key={i} className="flex items-center gap-2.5 text-[13px] text-mist">
                                                <i className={checkDot}>
                                                    <CheckIcon />
                                                </i>
                                                {i}
                                            </li>
                                        ))}
                                        {p.excluded.map((i) => (
                                            <li key={i} className="flex items-center gap-2.5 text-[13px] text-dim line-through decoration-ink/25">
                                                <i className={cn(checkDot, "text-dim")}>
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
                                        className="mt-auto flex h-11 items-center justify-center gap-2 rounded-full border border-line-2 text-sm font-medium transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper [&_svg]:size-3.5"
                                    >
                                        {on ? "Selected" : `Choose ${p.name}`}
                                        <ArrowIcon />
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
                    "fixed bottom-[calc(20px+env(safe-area-inset-bottom,0px))] left-1/2 z-55 flex w-[min(820px,calc(100vw-24px))] -translate-x-1/2 items-center justify-between gap-4 rounded-full border border-line bg-paper/95 py-2 pr-2 pl-6 shadow-deep backdrop-blur-md transition-[translate,visibility] duration-500 ease-soft max-tab:bottom-[calc(88px+env(safe-area-inset-bottom,0px))] max-tab:rounded-2xl max-tab:pl-4",
                    sticky ? "visible translate-y-0" : "invisible translate-y-[140%]",
                )}
            >
                <div className="grid min-w-0 leading-[1.3]">
                    <small className="text-xs text-dim">{pricingModes.find((m) => m.id === mode)!.summary}</small>
                    <b className="truncate text-sm font-semibold">
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
                    <Link className={btn("primary", "sm")} href={bookHref}>
                        Book now
                    </Link>
                </div>
            </div>
        </>
    );
}
