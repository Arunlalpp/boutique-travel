import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { contactHref } from "@/lib/data/site";
import { LogoMark } from "@/components/ui/Icons";
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

export function Footer({ settings }: { settings: SiteSettings }) {
    const year = new Date().getFullYear();
    const tel = settings.phone.replace(/[^+\d]/g, "");

    return (
        <footer className="site-footer">
            <div className="wrap">
                <div className="f-top">
                    <div className="grid content-start gap-4">
                        <span className="logo">
                            <LogoMark />
                            {settings.name}
                        </span>
                        <p className="max-w-[34ch] text-sm text-mist">
                            {settings.footerText ||
                                "Small-group journeys into wild, quiet places: curated stays, local guides and nights under the stars."}
                        </p>
                    </div>
                    <nav aria-label="Explore">
                        <h4>Explore</h4>
                        <ul>
                            {explore.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href}>{l.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <nav aria-label="Company">
                        <h4>Company</h4>
                        <ul>
                            {company.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href}>{l.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div>
                        <h4>Contact</h4>
                        <ul>
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
                        <h4>Newsletter</h4>
                        <p className="text-sm text-mist">One campfire story a month. No spam.</p>
                        <NewsletterForm />
                    </div>
                </div>
                <div className="f-bot">
                    <span>
                        © {year} {settings.name}. {settings.copyrightText || "All rights reserved."}
                    </span>
                    {settings.socials.length > 0 && (
                        <span className="flex flex-wrap gap-x-2">
                            {settings.socials.map((s, i) => (
                                <span key={s.label}>
                                    {i > 0 && <span aria-hidden>· </span>}
                                    <a href={s.href} target="_blank" rel="noreferrer">
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
