"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav, site } from "@/lib/data/site";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";

/** Routes whose first section is a full-bleed photograph */
const OVER_IMAGE = [/^\/$/, /^\/itineraries\/[^/]+$/, /^\/about$/];

export function Header() {
  const pathname = usePathname();
  const overImage = OVER_IMAGE.some((re) => re.test(pathname));

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  // Solid after leaving the top; hides on scroll down, returns on scroll up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 240 && y > lastY);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Lock page scroll while the menu is open; close on Escape
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const transparent = overImage && !scrolled && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-700 ease-[var(--ease-out-soft)]",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          transparent
            ? "border-b border-transparent text-paper"
            : open
              ? "border-b border-transparent bg-night text-paper"
              : "border-b border-ink/10 bg-paper/90 text-ink backdrop-blur-md",
        )}
      >
        <div className="container-x flex h-20 items-center justify-between">
          <Link href="/" aria-label={`${site.name} — home`} className="relative z-10">
            <Wordmark />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-10 md:flex">
            {mainNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn("link-line text-sm tracking-wide", active && "bg-[length:100%_1px]")}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/enquire"
              className={cn(
                "border px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500",
                transparent
                  ? "border-paper/50 hover:bg-paper hover:text-ink"
                  : "border-ink/30 hover:bg-ink hover:text-paper",
              )}
            >
              Plan a journey
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 p-2 md:hidden"
          >
            {open ? <X strokeWidth={1.25} className="size-6" /> : <Menu strokeWidth={1.25} className="size-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-night pt-28 text-paper transition-[opacity,visibility] duration-500 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="container-x flex flex-1 flex-col gap-2">
          {[...mainNav, { label: "Plan a journey", href: "/enquire" }].map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              tabIndex={open ? 0 : -1}
              className={cn(
                "font-serif text-4xl font-light transition-all duration-700 ease-[var(--ease-out-soft)]",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="container-x border-t border-paper/10 py-8 text-sm text-paper/60">
          <p>{site.email}</p>
          <p>{site.phone}</p>
        </div>
      </div>
    </>
  );
}
