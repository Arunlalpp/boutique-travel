import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { contactHref } from "@/lib/data/site";
import { LogoMark } from "@/components/ui/Icons";
import { logoClass, wrap } from "@/lib/ui";
import { NewsletterForm } from "./NewsletterForm";

const explore = [
    { label: "Destinations", href: "/destinations" },
    { label: "Journeys", href: "/itineraries" },
    { label: "Packages", href: "/packages" },
    { label: "Guest stories", href: "/stories" },
];

const company = [
    { label: "About us", href: "/about" },
    { label: "Our guides", href: "/about#guides" },
    { label: "Plan a trip", href: contactHref },
];

const heading = "mb-4 font-sans text-xs font-bold uppercase tracking-[0.16em] text-ember";
const list = "grid gap-2.5 text-sm text-mist [&_a:hover]:text-fg";

export function Footer({ settings }: { settings: SiteSettings }) {
    const year = new Date().getFullYear();
    const tel = settings.phone.replace(/[^+\d]/g, "");

    return (
        // Extra bottom padding on phones keeps the last line clear of the tab bar.
        <footer className="bg-night-deep pt-[72px] pb-10 max-tab:pb-[136px]">
            <div className={wrap}>
                <div className="grid grid-cols-[1.3fr_repeat(3,1fr)_1.4fr] gap-10 max-desk:grid-cols-2 max-desk:*:first:col-span-full max-desk:*:last:col-span-full">
                    <div className="grid content-start gap-4">
                        <span className={logoClass}>
                            <LogoMark />
                            {settings.name}
                        </span>
                        <p className="max-w-[34ch] text-sm text-mist">
                            {settings.footerText ||
                                "Small-group journeys into wild, quiet places: curated stays, local guides and nights under the stars."}
                        </p>
                    </div>
                    <nav aria-label="Explore">
                        <h4 className={heading}>Explore</h4>
                        <ul className={list}>
                            {explore.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href}>{l.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <nav aria-label="Company">
                        <h4 className={heading}>Company</h4>
                        <ul className={list}>
                            {company.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href}>{l.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div>
                        <h4 className={heading}>Contact</h4>
                        <ul className={`${list} break-words`}>
                            {settings.phone && (
                                <li>
                                    <a href={`tel:${tel}`}>{settings.phone}</a>
                                </li>
                            )}
                            {settings.email && (
                                <li>
                                    <a href={`mailto:${settings.email}`}>{settings.email}</a>
                                </li>
                            )}
                            {settings.studio && <li>{settings.studio}</li>}
                        </ul>
                    </div>
                    <div>
                        <h4 className={heading}>Newsletter</h4>
                        <p className="text-sm text-mist">One campfire story a month. No spam.</p>
                        <NewsletterForm />
                    </div>
                </div>
                <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-[13px] text-dim">
                    <span>
                        © {year} {settings.name}. {settings.copyrightText || "All rights reserved."}
                    </span>
                    {settings.socials.length > 0 && (
                        <span className="flex flex-wrap gap-x-2">
                            {settings.socials.map((s, i) => (
                                <span key={s.label}>
                                    {i > 0 && <span aria-hidden>· </span>}
                                    <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-fg">
                                        {s.label}
                                    </a>
                                </span>
                            ))}
                        </span>
                    )}
                </div>
            </div>
        </footer>
    );
}
