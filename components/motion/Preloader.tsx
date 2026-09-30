"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data/site";
import { cn } from "@/lib/utils";

/**
 * Brief full-screen brand moment on first load. Lives in the root layout,
 * which Next's App Router doesn't remount on client-side navigation, so
 * this never reappears between pages within a visit.
 *
 * Gated behind the `.js` class set by the inline script in app/layout.tsx
 * (see globals.css `.preloader`) so a visitor without JavaScript never
 * gets stuck behind it — server-rendered content is visible immediately
 * either way, and this overlay simply never becomes visible without JS.
 */
export function Preloader() {
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const minimumDelay = new Promise((resolve) => setTimeout(resolve, 700));
    // Race fonts.ready against a hard cap: a stalled font load (slow network,
    // a blocked request) must never leave a visitor stuck behind this overlay.
    const fontsReadyOrTimeout =
      "fonts" in document
        ? Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 2500))])
        : Promise.resolve();
    Promise.all([minimumDelay, fontsReadyOrTimeout]).then(() => setReady(true));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("preloading", mounted);
    if (!ready) return;
    const timeout = setTimeout(() => setMounted(false), 900); // matches the exit transition below
    return () => clearTimeout(timeout);
  }, [ready, mounted]);

  if (!mounted) return null;

  return (
    <div
      role={ready ? undefined : "status"}
      aria-hidden={ready || undefined}
      className={cn(
        "preloader fixed inset-0 z-[100] items-center justify-center bg-night transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out-soft)]",
        ready ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100",
      )}
    >
      <span className="font-serif text-2xl font-light tracking-[0.01em] text-paper">
        {site.name}
        <span aria-hidden className="ml-1 inline-block size-1.5 translate-y-[-2px] rounded-full bg-clay" />
      </span>
      <span className="sr-only">Loading {site.name}…</span>
    </div>
  );
}
