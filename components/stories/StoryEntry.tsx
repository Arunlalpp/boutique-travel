import Link from "next/link";
import { Play } from "lucide-react";
import type { GuestStoryCard } from "@/lib/types";
import { SmartImage } from "@/components/ui/SmartImage";

export function StoryEntry({ story }: { story: GuestStoryCard }) {
    return (
        <article className="group">
            <Link href={`/stories/${story.slug}`} className="block">
                <div data-reveal="mask" className="relative aspect-[4/3] overflow-hidden bg-night">
                    <SmartImage
                        image={story.poster}
                        sizes="(min-width: 768px) 45vw, 100vw"
                        className="transition-transform duration-[1600ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                    />
                    <span aria-hidden className="absolute inset-0 bg-night/20" />
                    <span className="absolute bottom-5 left-5 flex size-14 items-center justify-center rounded-full border border-paper/70 text-paper backdrop-blur-sm transition-all duration-700 group-hover:bg-paper group-hover:text-ink">
                        <Play aria-hidden strokeWidth={1} className="ml-0.5 size-5 fill-current" />
                    </span>
                </div>
                <div data-reveal className="mt-7">
                    <p className="font-serif text-2xl font-light leading-snug md:text-[1.75rem]">“{story.quote}”</p>
                    <div className="mt-6 flex items-center gap-4">
                        <span className="relative size-11 shrink-0 overflow-hidden rounded-full bg-paper-deep">
                            <SmartImage image={story.portrait} sizes="44px" tone="light" quality={65} />
                        </span>
                        <p className="text-sm leading-snug">
                            <span className="block text-ink">{story.guestName}</span>
                            <span className="block text-stone">
                                {story.journeyTitle ?? "Private journey"} · {story.travelled}
                            </span>
                        </p>
                    </div>
                </div>
            </Link>
        </article>
    );
}
