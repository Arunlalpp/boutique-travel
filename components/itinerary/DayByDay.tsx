import { Reveal } from "@/components/motion/Reveal";
import { BedIcon, FoodIcon, PinIcon } from "@/components/ui/Icons";
import type { ItineraryDay } from "@/lib/types";

const tag =
    "inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-white/6 px-3 text-[13px] text-mist [&_svg]:size-3.5 [&_svg]:text-accent";

export function DayByDay({ days }: { days: ItineraryDay[] }) {
    return (
        <Reveal as="ol" className="grid gap-3.5">
            {days.map((day) => (
                <li
                    key={day.label}
                    data-reveal
                    className="glass grid grid-cols-[140px_minmax(0,1fr)] gap-6 rounded-[26px] p-[clamp(22px,3vw,32px)] max-[700px]:grid-cols-1 max-[700px]:gap-2"
                >
                    <p className="pt-1.5 font-mono text-[13px] text-accent">{day.label}</p>
                    <div>
                        <h3 className="text-[clamp(24px,2.4vw,30px)]">{day.title}</h3>
                        <p className="mt-2.5 max-w-[64ch] text-mist">{day.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {day.location && (
                                <span className={tag}>
                                    <PinIcon />
                                    {day.location}
                                </span>
                            )}
                            {day.stay && (
                                <span className={tag}>
                                    <BedIcon />
                                    {day.stay}
                                </span>
                            )}
                            {day.meals && (
                                <span className={tag}>
                                    <FoodIcon />
                                    {day.meals}
                                </span>
                            )}
                        </div>
                    </div>
                </li>
            ))}
        </Reveal>
    );
}
