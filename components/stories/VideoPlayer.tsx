"use client";

import { useState } from "react";
import { PlayIcon } from "@/components/ui/Icons";
import type { ImageAsset, VideoEmbed } from "@/lib/types";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
    video?: VideoEmbed;
    poster: ImageAsset;
    title: string;
    className?: string;
}

function embedUrl(video: VideoEmbed): string {
    return video.provider === "youtube"
        ? `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`
        : `https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0&dnt=1`;
}

export function VideoPlayer({ video, poster, title, className }: VideoPlayerProps) {
    const [state, setState] = useState<"idle" | "playing" | "pending">("idle");

    return (
        <div className={cn("relative aspect-video overflow-hidden rounded-[32px] bg-night-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,.55)]", className)}>
            {state === "playing" && video ? (
                <iframe
                    src={embedUrl(video)}
                    title={title}
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                    allowFullScreen
                    className="absolute inset-0 size-full"
                />
            ) : (
                <button
                    type="button"
                    onClick={() => setState(video ? "playing" : "pending")}
                    className="group absolute inset-0 text-fg"
                    aria-label={`Play film: ${title}`}
                >
                    <SmartImage
                        image={poster}
                        sizes="(min-width: 1024px) 80vw, 100vw"
                        className="transition-transform duration-[1600ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
                    />
                    <span
                        aria-hidden
                        className="absolute inset-0 bg-night/30 transition-colors duration-700 group-hover:bg-night/20"
                    />
                    <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ember text-ember-ink shadow-[0_10px_30px_-10px_rgba(245,158,61,.7)] transition-all duration-700 ease-[var(--ease-out-soft)] group-hover:scale-110 group-hover:bg-ember-soft md:size-24">
                        <PlayIcon className="ml-1 size-7 md:size-8" />
                    </span>
                </button>
            )}

            {state === "pending" && (
                <div
                    role="status"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-night/85 px-6 text-center text-fg backdrop-blur-sm"
                >
                    <PlayIcon className="size-8 text-ember" />
                    <p className="font-display text-2xl">The guest film will play here.</p>
                    <p className="max-w-sm text-sm text-mist">
                        Films are hosted on YouTube or Vimeo and embedded once supplied by the client.
                    </p>
                    <button
                        type="button"
                        onClick={() => setState("idle")}
                        className="btn btn-glass btn-sm mt-2"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}
