import { Reveal } from "@/components/motion/Reveal";

interface PullQuoteProps {
  children: React.ReactNode;
  attribution?: string;
}

export function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <section aria-label="Statement" className="py-28 md:py-44">
      <Reveal as="figure" className="container-x mx-auto max-w-5xl text-center">
        <span data-reveal aria-hidden className="mx-auto block h-16 w-px bg-ink/25" />
        <blockquote data-reveal className="mt-12">
          <p className="font-serif text-[clamp(1.9rem,4.2vw,3.75rem)] font-light leading-[1.15] tracking-[-0.015em]">
            {children}
          </p>
        </blockquote>
        {attribution && (
          <figcaption data-reveal className="eyebrow mt-10 text-stone">
            {attribution}
          </figcaption>
        )}
      </Reveal>
    </section>
  );
}
