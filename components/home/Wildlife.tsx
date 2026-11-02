import type { GuestStoryCard } from "@/lib/types";
import { wildlife } from "@/lib/data/home";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { chip, eyebrow, hLg, lede, sec, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { StoryCarousel } from "./StoryCarousel";

export function Wildlife({ stories }: { stories: GuestStoryCard[] }) {
    return (
        // overflow-x-clip trims the spinning ring's square corners so phones never scroll sideways.
        <section className={cn(sec, "overflow-x-clip bg-linear-to-b from-night via-night-2 to-night")} aria-labelledby="wild-title">
            <div className={wrap}>
                <div className="grid grid-cols-2 items-center gap-[clamp(32px,5vw,80px)] max-tab:grid-cols-[minmax(0,1fr)]">
                    <Reveal className="grid gap-5.5">
                        <span className={eyebrow} data-reveal>
                            {wildlife.eyebrow}
                        </span>
                        <h2 id="wild-title" className={hLg} data-reveal>
                            {wildlife.title}
                        </h2>
                        <p className={lede} data-reveal>
                            {wildlife.lede}
                        </p>
                        <div className="flex flex-wrap gap-2.5" data-reveal>
                            {wildlife.chips.map((c) => (
                                <span key={c} className={chip()}>
                                    {c}
                                </span>
                            ))}
                        </div>
                        <div data-reveal>
                            <ButtonLink href="/itineraries?region=Africa" variant="glass">
                                Show wildlife journeys
                            </ButtonLink>
                        </div>
                    </Reveal>
                    <div className="relative mx-auto aspect-square w-[min(420px,100%)] max-tab:w-[min(280px,calc(100%-56px))]">
                        <svg
                            className="absolute -inset-[34px] size-[calc(100%+68px)] animate-spin-slow rounded-full border border-dashed border-line-2 max-tab:-inset-6 max-tab:size-[calc(100%+48px)]"
                            viewBox="0 0 200 200"
                            aria-hidden
                        >
                            <defs>
                                <path id="orb-circle" d="M100 100m-92 0a92 92 0 1 1 184 0a92 92 0 1 1-184 0" />
                            </defs>
                            <text fontSize="7" letterSpacing="3.2" fontFamily="var(--font-mono)" className="fill-dim">
                                <textPath href="#orb-circle">{wildlife.ring}</textPath>
                            </text>
                        </svg>
                        <div className="absolute inset-0 overflow-hidden rounded-full">
                            <SmartImage image={wildlife.image} sizes="(min-width: 860px) 420px, 80vw" />
                        </div>
                        <div className="glass-strong absolute right-[-8px] bottom-[12%] rounded-[22px] px-5 py-3.5 text-center shadow-deep max-tab:right-[-4px]">
                            <b className="block font-display text-[32px] leading-none font-normal">{wildlife.badge.value}</b>
                            <span className="text-xs text-mist">{wildlife.badge.label}</span>
                        </div>
                    </div>
                </div>

                <StoryCarousel stories={stories} />
            </div>
        </section>
    );
}
