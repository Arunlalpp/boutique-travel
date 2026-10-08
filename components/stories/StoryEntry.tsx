import Link from "next/link";
import type { GuestStoryCard } from "@/lib/types";
import { SmartImage } from "@/components/ui/SmartImage";
import { PlayIcon, QuoteIcon } from "@/components/ui/Icons";

export function StoryEntry({ story }: { story: GuestStoryCard }) {
    return (
        <article className="group glass relative overflow-hidden rounded-[32px] shadow-deep transition-transform duration-500 ease-soft hover:-translate-y-1.5">
            <div className="relative aspect-4/3 overflow-hidden bg-paper-3">
                <SmartImage
                    image={story.poster}
                    sizes="(min-width: 768px) 45vw, 100vw"
                    className="transition-transform duration-[900ms] ease-soft group-hover:scale-[1.05]"
                />
                <span className="glass-strong absolute top-[18px] left-[18px] z-2 flex h-11 items-center gap-2.5 rounded-full pl-1.5 pr-4 text-[13px] font-semibold">
                    <i className="grid size-8 place-items-center rounded-full bg-ink text-paper">
                        <PlayIcon className="size-[13px]" />
                    </i>
                    {story.video ? "Watch story" : "Read story"}
                </span>
            </div>
            <div className="grid gap-5 p-[clamp(22px,3vw,32px)]">
                <QuoteIcon width={32} height={32} className="text-accent" />
                <blockquote className="font-display text-[clamp(20px,2vw,24px)] italic leading-[1.35]">
                    <Link href={`/stories/${story.slug}`} data-cursor="view" className="after:absolute after:inset-0 after:z-1">
                        “{story.quote}”
                    </Link>
                </blockquote>
                <div className="flex items-center gap-3.5">
                    <div className="relative size-12 shrink-0 overflow-hidden rounded-full bg-paper-3">
                        <SmartImage image={story.portrait} sizes="48px" quality={65} />
                    </div>
                    <span className="text-sm leading-snug">
                        <b>{story.guestName}</b>
                        <br />
                        <small className="text-dim">
                            {story.journeyTitle ?? "Private journey"} · {story.travelled}
                        </small>
                    </span>
                </div>
            </div>
        </article>
    );
}
