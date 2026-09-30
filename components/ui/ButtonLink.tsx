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
    "group relative isolate inline-flex items-center gap-3 overflow-hidden text-[0.75rem] font-medium uppercase tracking-[0.18em] transition-[color,transform] duration-300 ease-[var(--ease-out-soft)] active:scale-[0.97]";

  // A colour panel sweeps in from the left on hover/focus, instead of a flat
  // background-colour swap — the sweep itself lives behind the label via -z-10.
  // Plain `hover:`/`focus-visible:` (not `group-hover:`) because the sweep and
  // the hover trigger are the same element — `group-hover:` needs a descendant.
  const sweep =
    "before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:transition-transform before:duration-500 before:ease-[var(--ease-out-soft)] hover:before:scale-x-100 focus-visible:before:scale-x-100";

  const styles = {
    solid: inverse
      ? cn(sweep, "bg-paper text-ink px-7 py-4 before:bg-white")
      : cn(sweep, "bg-ink text-paper px-7 py-4 before:bg-clay"),
    outline: inverse
      ? cn(
          sweep,
          "border border-paper/50 px-7 py-4 text-paper before:bg-paper hover:border-paper hover:text-ink focus-visible:border-paper focus-visible:text-ink",
        )
      : cn(
          sweep,
          "border border-ink/30 px-7 py-4 text-ink before:bg-ink hover:border-ink hover:text-paper focus-visible:border-ink focus-visible:text-paper",
        ),
    text: inverse ? "text-paper" : "text-ink",
  }[variant];

  return (
    <Link href={href} className={cn(base, styles, className)}>
      <span className={variant === "text" ? "link-line" : undefined}>{children}</span>
      <ArrowUpRight
        aria-hidden
        strokeWidth={1.25}
        className="size-4 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-0.5 group-hover:translate-x-1"
      />
    </Link>
  );
}
