"use client";

import { useSaved } from "@/components/providers/SiteProviders";
import { HeartIcon } from "@/components/ui/Icons";
import { btn } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function SaveJourneyButton({ slug, title }: { slug: string; title: string }) {
    const { isSaved, toggle } = useSaved();
    const saved = isSaved(slug);
    return (
        <button type="button" className={btn("glass")} aria-pressed={saved} onClick={() => toggle(slug, title)}>
            <HeartIcon className={cn(saved && "fill-ember text-ember")} />
            {saved ? "Saved" : "Save for later"}
        </button>
    );
}
