/** Minimal className joiner (no dependency needed for an MVP). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDuration(days: number): string {
  return `${days} days`;
}

/** Two-digit index for editorial numbering: 1 → "01" */
export function pad(n: number): string {
  return String(n).padStart(2, "0");
}
