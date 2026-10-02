"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { GROUP_MIN, plans, pricingModes, type PricingMode } from "@/lib/data/packages";
import { money } from "@/lib/format";
import { CheckIcon, XIcon } from "@/components/ui/Icons";
import { useToast } from "@/components/providers/SiteProviders";
import { cn } from "@/lib/utils";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function PricingToggle({ mode, onChange }: { mode: PricingMode; onChange: (m: PricingMode) => void }) {
    const group = useRef<HTMLDivElement>(null);
    const [ind, setInd] = useState<{ left: number; width: number } | null>(null);

    useIsoLayoutEffect(() => {
        const place = () => {
            const on = group.current?.querySelector<HTMLElement>('[aria-pressed="true"]');
            if (on) setInd({ left: on.offsetLeft, width: on.offsetWidth });
        };
        place();
        window.addEventListener("resize", place);
        document.fonts?.ready.then(place);
        return () => window.removeEventListener("resize", place);
    }, [mode]);

    return (
        <div ref={group} className="seg glass-strong" role="group" aria-label="Pricing type">
            <span className="thumb-ind" style={ind ? { left: ind.left, width: ind.width } : { opacity: 0 }} aria-hidden />
            {pricingModes.map((m) => (
                <button key={m.id} type="button" aria-pressed={m.id === mode} onClick={() => onChange(m.id)}>
                    {m.label}
                    {m.note && <small>{m.note}</small>}
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
    const section = useRef<HTMLDivElement>(null);

    const multiplier = pricingModes.find((m) => m.id === mode)!.multiplier;
    const plan = plans.find((p) => p.id === selected)!;
    const perPerson = Math.round(plan.price * multiplier);

    // Show the sticky booking bar only while the plans are in or above view.
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
            <div className="mt-2 flex justify-center">
                <PricingToggle mode={mode} onChange={changeMode} />
            </div>

            <section className="sec pt-5" aria-label="Packages" ref={section}>
                <div className="wrap">
                    <div className="plans">
                        {plans.map((p) => {
                            const on = p.id === selected;
                            return (
                                <article
                                    key={p.id}
                                    className={cn("plan glass", on && "on")}
                                    onClick={(e) => choose(p.id, e.currentTarget)}
                                >
                                    <div className="hd">
                                        <h3>{p.name}</h3>
                                        {p.popular && <span className="badge">MOST POPULAR</span>}
                                    </div>
                                    <span className="-mt-2.5 text-sm text-dim">{p.duration}</span>
                                    <div className="amt">
                                        <b className={cn(flip && "opacity-0")}>{money(p.price * multiplier)}</b>
                                        <span>/ person</span>
                                    </div>
                                    <p className="text-[14.5px] text-mist">{p.description}</p>
                                    <ul>
                                        {p.included.map((i) => (
                                            <li key={i}>
                                                <i>
                                                    <CheckIcon />
                                                </i>
                                                {i}
                                            </li>
                                        ))}
                                        {p.excluded.map((i) => (
                                            <li key={i} className="no">
                                                <i>
                                                    <XIcon />
                                                </i>
                                                <span className="sr-only">Not included: </span>
                                                {i}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        type="button"
                                        className="sel"
                                        aria-pressed={on}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            choose(p.id, e.currentTarget.closest("article")!);
                                        }}
                                    >
                                        {on ? "Selected" : `Choose ${p.name}`}
                                    </button>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <div className={cn("stickybar glass-strong shadow-deep", sticky && "on")} aria-label="Booking summary">
                <div className="sum">
                    <small>{pricingModes.find((m) => m.id === mode)!.summary}</small>
                    <b>
                        {plan.name} · {plan.short}
                    </b>
                </div>
                <div className="right">
                    <div className="stepper">
                        <button type="button" aria-label="Fewer travellers" disabled={people <= 1} onClick={fewer}>
                            −
                        </button>
                        <output aria-live="polite" aria-label="Travellers">
                            {people}
                        </output>
                        <button
                            type="button"
                            aria-label="More travellers"
                            disabled={people >= 12}
                            onClick={() => setPeople(people + 1)}
                        >
                            +
                        </button>
                    </div>
                    <span className="price" aria-live="polite">
                        {money(perPerson * people)}
                    </span>
                    <Link className="btn btn-ember" href={bookHref}>
                        Book now
                    </Link>
                </div>
            </div>
        </>
    );
}
