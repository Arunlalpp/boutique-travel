import { BedDouble, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import type { ItineraryDay } from "@/lib/types";

/** Day-by-day outline as an editorial timeline. */
export function DayByDay({ days }: { days: ItineraryDay[] }) {
  return (
    <ol className="border-t border-ink/15">
      {days.map((day) => (
        <Reveal as="li" key={day.label} className="grid gap-4 border-b border-ink/15 py-10 md:grid-cols-12 md:gap-8 md:py-12">
          <p data-reveal className="eyebrow text-clay md:col-span-3 md:pt-2">
            {day.label}
          </p>
          <div data-reveal className="md:col-span-9">
            <h3 className="text-3xl md:text-4xl">{day.title}</h3>
            <p className="mt-5 max-w-2xl text-ink-soft">{day.description}</p>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-stone">
              <span className="inline-flex items-center gap-2">
                <MapPin aria-hidden strokeWidth={1.25} className="size-4" />
                {day.location}
              </span>
              {day.stay && (
                <span className="inline-flex items-center gap-2">
                  <BedDouble aria-hidden strokeWidth={1.25} className="size-4" />
                  {day.stay}
                </span>
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
