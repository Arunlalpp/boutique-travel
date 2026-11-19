import Link from "next/link";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal } from "@/components/motion/Reveal";
import { story } from "@/lib/data/ledger";
import { label, lsec, lwrap, photo, typedItalic, underlineLink } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { Footprints } from "./Footprints";
import { ArrowRight } from "./icons";

/** The elephant story: two overlapping photographs, the founding text, the two partners. */
export function StorySection() {
    return (
        <section id="story" className={cn(lsec, "bg-ledger-paper text-ledger-ink")} aria-labelledby="story-title">
            <div
                className={cn(
                    lwrap,
                    "grid grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] items-start gap-[clamp(40px,7vw,96px)] max-md:grid-cols-1",
                )}
            >
                <Reveal className="relative pb-[18%] max-md:pb-[22%]">
                    <div className={cn(photo, "aspect-[4/5] w-[78%]")} data-reveal>
                        <SmartImage image={story.images.main} sizes="(min-width: 768px) 36vw, 78vw" />
                    </div>
                    <div
                        className={cn(
                            photo,
                            "absolute right-0 bottom-0 aspect-[4/5] w-[46%] ring-[10px] ring-ledger-paper",
                        )}
                        data-reveal
                    >
                        <SmartImage image={story.images.inset} sizes="(min-width: 768px) 22vw, 46vw" />
                    </div>
                </Reveal>

                <div className="grid gap-6 md:pt-6">
                    <Footprints className="text-ledger-grey" />
                    <h2
                        id="story-title"
                        className="w-max font-type text-[clamp(30px,3.4vw,40px)] leading-none font-bold tracking-normal italic underline decoration-2 underline-offset-[10px]"
                    >
                        {story.title}
                    </h2>
                    <p className={cn(typedItalic, "text-[17px]")}>{story.intro}</p>
                    {story.body.map((p) => (
                        <p key={p} className={cn(typedItalic, "text-ledger-ink/85")}>
                            {p}
                        </p>
                    ))}

                    <ul className="mt-2 flex flex-wrap gap-x-10 gap-y-5">
                        {story.partners.map((p) => (
                            <li key={p.name} className="flex items-center gap-4">
                                <span className={cn(photo, "size-14 shrink-0 rounded-full")}>
                                    <SmartImage image={p.image} sizes="56px" quality={65} />
                                </span>
                                <span className="grid gap-0.5">
                                    <b className={cn(label, "text-[13px] tracking-[0.06em] normal-case")}>{p.name}</b>
                                    <span className="font-type text-xs text-ledger-grey">{p.role}</span>
                                </span>
                            </li>
                        ))}
                    </ul>

                    <Link href="/story" className={cn(underlineLink, "mt-2 w-max")}>
                        Read the full story <ArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
}
