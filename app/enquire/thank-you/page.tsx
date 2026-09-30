import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your enquiry has been received.",
  // Never indexable — this page only makes sense right after a form submission.
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ name?: string | string[]; contact?: string | string[] }>;

export default async function ThankYouPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const name = Array.isArray(params.name) ? params.name[0] : params.name;
  const contactRaw = Array.isArray(params.contact) ? params.contact[0] : params.contact;
  const contactBy = (contactRaw || "email").toLowerCase();

  return (
    <section className="container-x flex min-h-[70vh] items-center pb-24 pt-40 md:pb-40 md:pt-52">
      <Reveal className="max-w-2xl">
        <div data-reveal className="flex size-14 items-center justify-center rounded-full bg-ink text-paper">
          <Check aria-hidden strokeWidth={1.25} className="size-6" />
        </div>
        <h1 data-reveal className="mt-10 text-[clamp(2.75rem,5.5vw,5rem)] leading-[1]">
          Thank you{name ? `, ` : ""}
          {name && <span className="serif-italic">{name}</span>}.
        </h1>
        <p data-reveal className="mt-6 max-w-lg text-lg text-ink-soft">
          Your enquiry is with us. A journey designer will be in touch by {contactBy} within two working days to
          start the conversation.
        </p>
        <p data-reveal className="mt-8 border-l-2 border-clay pl-4 text-sm text-stone">
          Design preview: this form isn&apos;t connected to a backend yet, so no details were actually sent.
        </p>
        <div data-reveal className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
          <ButtonLink href="/itineraries">Browse journeys</ButtonLink>
          <Link href="/stories" className="link-line text-sm">
            Read guest stories
          </Link>
        </div>
        <p data-reveal className="mt-14 border-t border-ink/15 pt-10 text-sm text-stone">
          Prefer to talk? <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="link-line">{site.phone}</a>
        </p>
      </Reveal>
    </section>
  );
}
