"use client";

import { useState } from "react";
import { Play, Film } from "lucide-react";
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

/**
 * Click-to-load player for externally hosted films (YouTube / Vimeo).
 * Nothing loads from the video host until the guest presses play — faster
 * pages and no third-party cookies up front.
 */
export function VideoPlayer({ video, poster, title, className }: VideoPlayerProps) {
  const [state, setState] = useState<"idle" | "playing" | "pending">("idle");

  return (
    <div className={cn("relative aspect-video overflow-hidden bg-night", className)}>
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
          className="group absolute inset-0 text-paper"
          aria-label={`Play film: ${title}`}
        >
          <SmartImage
            image={poster}
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="transition-transform duration-[1600ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
          />
          <span aria-hidden className="absolute inset-0 bg-night/30 transition-colors duration-700 group-hover:bg-night/20" />
          <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/60 backdrop-blur-sm transition-all duration-700 ease-[var(--ease-out-soft)] group-hover:scale-110 group-hover:bg-paper group-hover:text-ink md:size-28">
            <Play aria-hidden strokeWidth={1} className="ml-1 size-6 fill-current md:size-8" />
          </span>
        </button>
      )}

      {state === "pending" && (
        <div
          role="status"
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-night/85 px-6 text-center text-paper backdrop-blur-sm"
        >
          <Film aria-hidden strokeWidth={1} className="size-8 text-clay-soft" />
          <p className="font-serif text-2xl font-light">The guest film will play here.</p>
          <p className="max-w-sm text-sm text-paper/60">
            Films are hosted on YouTube or Vimeo and embedded once supplied by the client.
          </p>
          <button
            type="button"
            onClick={() => setState("idle")}
            className="eyebrow mt-2 border-b border-paper/40 pb-1 text-paper/80 hover:text-paper"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
