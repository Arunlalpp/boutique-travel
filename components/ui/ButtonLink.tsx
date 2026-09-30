import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "text";
  /** Use on dark/photographic backgrounds */
  inverse?: boolean;
  className?: string;
}

/**
 * The site's single button language: a quiet rectangle, uppercase tracked
 * label, and an arrow that nudges on hover.
 */
export function ButtonLink({ href, children, variant = "solid", inverse = false, className }: ButtonLinkProps) {
  const base =
    "group inline-flex items-center gap-3 text-[0.75rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500";

  const styles = {
    solid: inverse
      ? "bg-paper text-ink px-7 py-4 hover:bg-white"
      : "bg-ink text-paper px-7 py-4 hover:bg-clay",
    outline: inverse
      ? "border border-paper/50 text-paper px-7 py-4 hover:border-paper hover:bg-paper hover:text-ink"
      : "border border-ink/30 text-ink px-7 py-4 hover:border-ink hover:bg-ink hover:text-paper",
    text: inverse ? "text-paper" : "text-ink",
  }[variant];

  return (
    <Link href={href} className={cn(base, styles, className)}>
      <span className={variant === "text" ? "link-line" : undefined}>{children}</span>
      <ArrowUpRight
        aria-hidden
        strokeWidth={1.25}
        className="size-4 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}
