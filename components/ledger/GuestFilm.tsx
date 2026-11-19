"use client";

import { useState } from "react";
import { SmartImage } from "@/components/ui/SmartImage";
import type { ImageAsset } from "@/lib/types";
import { photo } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { Play } from "./icons";

export interface FilmLike {
    guest: string;
    country: string;
    entry: string;
    duration?: string;
    poster: ImageAsset;
    embed?: string;
}

export const meta = (f: FilmLike) => `${f.guest} · ${f.country} · Entry no. ${f.entry}`;

/** Poster frame that swaps to the Vimeo/YouTube player on click (no third-party script until then). */
export function Film({
    film,
    large,
    playing,
    onPlay,
    sizes,
}: {
    film: FilmLike;
    sizes?: string;
    large?: boolean;
    playing: boolean;
    onPlay: () => void;
}) {
    if (playing && film.embed) {
        return (
            <div className="relative aspect-video bg-black">
                <iframe
                    src={`${film.embed}${film.embed.includes("?") ? "&" : "?"}autoplay=1`}
                    title={`Film: ${meta(film)}`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 size-full"
                />
            </div>
        );
    }
    return (
        <button
            type="button"
            onClick={onPlay}
            className={cn(photo, "group block aspect-video w-full bg-ledger-navy")}
            aria-label={`Play film: ${meta(film)}${film.duration ? ` (${film.duration})` : ""}`}
        >
            <SmartImage image={film.poster} sizes={sizes ?? (large ? "(min-width: 1024px) 60vw, 100vw" : "160px")} />
            <span className="absolute inset-0 bg-ledger-deep/30 transition-colors group-hover:bg-ledger-deep/10" />
            <span
                className={cn(
                    "absolute top-1/2 left-1/2 grid -translate-1/2 place-items-center rounded-full border border-white/90 bg-ledger-deep/60 text-white transition-transform group-hover:scale-105",
                    large ? "size-16 [&_svg]:size-6" : "size-9 [&_svg]:size-4",
                )}
            >
                <Play className="ml-0.5" />
            </span>
            {large && film.duration && (
                <span className="absolute right-3 bottom-3 border border-white/30 bg-ledger-deep/80 px-2 py-1 font-type text-[11px] text-white">
                    {film.duration}
                </span>
            )}
            {playing && !film.embed && (
                <span className="absolute inset-x-0 bottom-0 bg-ledger-deep/90 px-4 py-3 text-left font-type text-[12.5px] text-white italic">
                    This guest film is being edited and will be here soon.
                </span>
            )}
        </button>
    );
}

/** A single large film that manages its own play state (guest pages). */
export function FilmPlayer({ film }: { film: FilmLike }) {
    const [playing, setPlaying] = useState(false);
    return (
        <Film
            film={film}
            large
            playing={playing}
            onPlay={() => setPlaying(true)}
            sizes="(min-width: 1200px) 1100px, 100vw"
        />
    );
}
