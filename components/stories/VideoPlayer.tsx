"use client";

import { useState } from "react";
import { PlayIcon } from "@/components/ui/Icons";
import type { ImageAsset, VideoEmbed } from "@/lib/types";
import { SmartImage } from "@/components/ui/SmartImage";
import { btn } from "@/lib/ui";
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
        <div className={cn("relative aspect-video overflow-hidden rounded-[32px] bg-paper-3 shadow-deep", className)}>
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
                    className="group absolute inset-0 text-ink"
                    aria-label={`Play film: ${title}`}
                >
                    <SmartImage
                        image={poster}
                        sizes="(min-width: 1024px) 80vw, 100vw"
                        className="transition-transform duration-[1600ms] ease-soft group-hover:scale-[1.03]"
                    />
                    <span
                        aria-hidden
                        className="absolute inset-0 bg-paper/30 transition-colors duration-700 group-hover:bg-paper/20"
                    />
                    <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-ink shadow-accent transition-all duration-700 ease-soft group-hover:scale-110 group-hover:bg-accent-soft md:size-24">
                        <PlayIcon className="ml-1 size-7 md:size-8" />
                    </span>
                </button>
            )}

            {state === "pending" && (
                <div
                    role="status"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-paper/85 px-6 text-center text-ink backdrop-blur-sm"
                >
                    <PlayIcon className="size-8 text-accent" />
                    <p className="font-display text-2xl">The guest film will play here.</p>
                    <p className="max-w-sm text-sm text-mist">
                        Films are hosted on YouTube or Vimeo and embedded once supplied by the client.
                    </p>
                    <button
                        type="button"
                        onClick={() => setState("idle")}
                        className={cn(btn("glass", "sm"), "mt-2")}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}
