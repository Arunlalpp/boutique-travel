import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}

/** Typographic page header for listing pages (no photograph). */
export function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <Reveal as="header" className="container-x pb-16 pt-40 md:pb-24 md:pt-52">
      <p data-reveal className="eyebrow flex items-center gap-4 text-stone">
        <span aria-hidden className="h-px w-10 bg-ink/25" />
        {eyebrow}
      </p>
      <h1 data-reveal className="mt-8 max-w-5xl text-[clamp(2.75rem,7.5vw,7rem)] leading-[0.98]">
        {title}
      </h1>
      {children && (
        <div data-reveal className="mt-10 max-w-xl text-lg text-stone">
          {children}
        </div>
      )}
    </Reveal>
  );
}
