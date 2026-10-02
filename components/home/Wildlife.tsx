import type { GuestStoryCard } from "@/lib/types";
import { wildlife } from "@/lib/data/home";
import { SmartImage } from "@/components/ui/SmartImage";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { StoryCarousel } from "./StoryCarousel";

export function Wildlife({ stories }: { stories: GuestStoryCard[] }) {
    return (
        <section
            className="sec overflow-x-clip"
            aria-labelledby="wild-title"
            style={{ background: "linear-gradient(180deg,var(--color-night),var(--color-night-2) 50%,var(--color-night))" }}
        >
            <div className="wrap">
                <div className="wild">
                    <Reveal className="grid gap-5.5">
                        <span className="eyebrow" data-reveal>
                            {wildlife.eyebrow}
                        </span>
                        <h2 id="wild-title" className="h-lg" data-reveal>
                            {wildlife.title}
                        </h2>
                        <p className="lede" data-reveal>
                            {wildlife.lede}
                        </p>
                        <div className="feat-list" data-reveal>
                            {wildlife.chips.map((c) => (
                                <span key={c} className="chip">
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
                    <div className="orb">
                        <svg className="orb-ring" viewBox="0 0 200 200" aria-hidden>
                            <defs>
                                <path id="orb-circle" d="M100 100m-92 0a92 92 0 1 1 184 0a92 92 0 1 1-184 0" />
                            </defs>
                            <text fontSize="7" letterSpacing="3.2" fontFamily="var(--font-mono)">
                                <textPath href="#orb-circle">{wildlife.ring}</textPath>
                            </text>
                        </svg>
                        <div className="img">
                            <SmartImage image={wildlife.image} sizes="(min-width: 860px) 420px, 80vw" />
                        </div>
                        <div className="badge glass-strong shadow-deep">
                            <b>{wildlife.badge.value}</b>
                            <span>{wildlife.badge.label}</span>
                        </div>
                    </div>
                </div>

                <StoryCarousel stories={stories} />
            </div>
        </section>
    );
}
