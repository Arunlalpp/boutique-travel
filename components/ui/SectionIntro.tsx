import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionIntroProps {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  inverse?: boolean;
  className?: string;
}

/**
 * Editorial section header: numbered eyebrow on a hairline, large serif title,
 * optional supporting copy. Children elements animate via a parent <Reveal>.
 */
export function SectionIntro({ index, eyebrow, title, children, inverse, className }: SectionIntroProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p
        data-reveal
        className={cn("eyebrow flex items-center gap-4", inverse ? "text-paper/60" : "text-stone")}
      >
        {index && <span>{index}</span>}
        <span aria-hidden className={cn("h-px w-10", inverse ? "bg-paper/30" : "bg-ink/25")} />
        <span>{eyebrow}</span>
      </p>
      <h2 data-reveal className="mt-6 text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {children && (
        <div data-reveal className={cn("mt-6 max-w-xl text-base md:text-lg", inverse ? "text-paper/70" : "text-stone")}>
          {children}
        </div>
      )}
    </div>
  );
}
