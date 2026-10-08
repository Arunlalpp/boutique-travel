import type { ImageAsset } from "@/lib/types";
import { Rail } from "@/components/ui/Rail";
import { SmartImage } from "@/components/ui/SmartImage";
import { eyebrow, frame, hLg, photoTag, secHeadTitle } from "@/lib/ui";
import { cn } from "@/lib/utils";

interface Guide {
    name: string;
    role: string;
    bio: string;
    image: ImageAsset;
}

/** Portrait cards with name and role underneath; the bio sits in the photo's corner caption. */
export function GuidesRail({ guides }: { guides: Guide[] }) {
    return (
        <Rail
            label="Our guides"
            head={
                <div className={secHeadTitle}>
                    <span className={eyebrow}>Meet the guides</span>
                    <h2 id="guides-title" className={hLg}>
                        The people behind the campfire
                    </h2>
                </div>
            }
        >
            {guides.map((g) => (
                <figure key={g.name} className="grid w-[clamp(200px,19vw,240px)] max-w-full content-start gap-3">
                    <div className={cn(frame, "aspect-3/4")}>
                        <SmartImage image={g.image} sizes="(min-width: 1024px) 240px, 60vw" />
                        <span className={photoTag}>{g.role}</span>
                    </div>
                    <figcaption className="grid gap-0.5">
                        <b className="text-sm font-semibold">{g.name}</b>
                        <span className="text-xs text-dim">{g.bio}</span>
                    </figcaption>
                </figure>
            ))}
        </Rail>
    );
}
