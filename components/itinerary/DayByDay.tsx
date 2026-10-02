import { Reveal } from "@/components/motion/Reveal";
import { BedIcon, FoodIcon, PinIcon } from "@/components/ui/Icons";
import type { ItineraryDay } from "@/lib/types";

export function DayByDay({ days }: { days: ItineraryDay[] }) {
    return (
        <Reveal as="ol" className="days">
            {days.map((day) => (
                <li key={day.label} className="day glass" data-reveal>
                    <p className="lbl">{day.label}</p>
                    <div>
                        <h3>{day.title}</h3>
                        <p>{day.description}</p>
                        <div className="tags">
                            {day.location && (
                                <span>
                                    <PinIcon />
                                    {day.location}
                                </span>
                            )}
                            {day.stay && (
                                <span>
                                    <BedIcon />
                                    {day.stay}
                                </span>
                            )}
                            {day.meals && (
                                <span>
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
