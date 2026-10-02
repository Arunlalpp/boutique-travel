"use client";

import { useSaved } from "@/components/providers/SiteProviders";
import { HeartIcon } from "@/components/ui/Icons";

export function SaveJourneyButton({ slug, title }: { slug: string; title: string }) {
    const { isSaved, toggle } = useSaved();
    const saved = isSaved(slug);
    return (
        <button type="button" className="btn btn-glass" aria-pressed={saved} onClick={() => toggle(slug, title)}>
            <HeartIcon className={saved ? "fill-ember text-ember" : undefined} />
            {saved ? "Saved" : "Save for later"}
        </button>
    );
}
