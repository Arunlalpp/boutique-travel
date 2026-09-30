import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { EnquiryForm } from "@/components/enquire/EnquiryForm";
import { itineraries } from "@/lib/data/itineraries";
import { site } from "@/lib/data/site";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Plan a Journey",
  description: "Tell us about the journey you have in mind. A designer will reply personally within two working days.",
  alternates: { canonical: "/enquire" },
};

const steps = [
  { title: "A conversation", text: "A designer calls to listen — to where you'd like to go and how you like to travel." },
  { title: "A first proposal", text: "Within a week, a written journey shaped around you, with places to stay and why." },
  { title: "Refined together", text: "We adjust until it's right. Nothing is booked until you're certain." },
];

type SearchParams = Promise<{ journey?: string | string[] }>;

export default async function EnquirePage({ searchParams }: { searchParams: SearchParams }) {
  const { journey } = await searchParams;
  const initialJourney = Array.isArray(journey) ? journey[0] : journey;

  return (
    <section className="container-x grid gap-16 pb-24 pt-40 md:pb-40 md:pt-52 lg:grid-cols-12 lg:gap-8">
      <Reveal as="aside" className="lg:col-span-4">
        <div className="lg:sticky lg:top-32">
          <p data-reveal className="eyebrow flex items-center gap-4 text-stone">
            <span aria-hidden className="h-px w-10 bg-ink/25" />
            Plan a journey
          </p>
          <h1 data-reveal className="mt-8 text-[clamp(2.75rem,5.5vw,5rem)] leading-[1]">
            Let&apos;s begin <span className="serif-italic">with you</span>
          </h1>
          <p data-reveal className="mt-8 text-lg text-stone">
            Share as much or as little as you like. There&apos;s no obligation, and every enquiry is read by a person.
          </p>

          <ol data-reveal className="mt-14 space-y-8 border-t border-ink/15 pt-10">
            {steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-2">
                <span className="eyebrow pt-1 text-clay">{pad(i + 1)}</span>
                <div>
                  <p className="font-serif text-xl font-light">{s.title}</p>
                  <p className="mt-2 text-sm text-stone">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div data-reveal className="mt-14 border-t border-ink/15 pt-10 text-sm">
            <p className="eyebrow text-stone">Prefer to talk?</p>
            <p className="mt-4">
              <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="link-line font-serif text-2xl font-light">
                {site.phone}
              </a>
            </p>
            <p className="mt-2 text-stone">{site.hours}</p>
            <p className="mt-4">
              <a href={`mailto:${site.email}`} className="link-line">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="lg:col-span-7 lg:col-start-6">
        <div data-reveal>
          <EnquiryForm
            journeys={itineraries.map((j) => ({ slug: j.slug, title: j.title }))}
            initialJourney={initialJourney}
          />
        </div>
      </Reveal>
    </section>
  );
}
