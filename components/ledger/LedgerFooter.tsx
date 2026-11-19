import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { beginHref, ledgerNav } from "@/lib/data/ledger";
import { label, lwrap } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { CookieSettingsButton } from "./CookieNotice";
import { FieldNotesForm } from "./FieldNotesForm";
import { Seal } from "./Seal";

const heading = cn(label, "mb-4 text-ochre");
const list = "grid gap-2.5 font-type text-[14px] text-white [&_a:hover]:text-ochre";

export function LedgerFooter({ settings }: { settings: SiteSettings }) {
    const wa = (settings.whatsapp || settings.phone)?.replace(/[^\d]/g, "");
    return (
        <footer className="bg-ledger-night pt-[clamp(56px,7vw,88px)] pb-10 text-white">
            <div className={lwrap}>
                <div className="grid grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,0.6fr))] gap-10 max-lg:grid-cols-3 max-lg:*:first:col-span-full max-sm:grid-cols-2">
                    <div className="grid content-start gap-4">
                        <Link
                            href="/"
                            className="w-max font-jost text-[clamp(20px,2.2vw,26px)] font-semibold tracking-[0.18em] uppercase"
                        >
                            {settings.name}
                        </Link>
                        <p className="font-type text-[14px] text-white/75 italic">Paths first walked by us.</p>
                        <Seal name={settings.name} />
                    </div>
                    <nav aria-label="Explore">
                        <h3 className={heading}>Explore</h3>
                        <ul className={list}>
                            {ledgerNav.map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href}>{l.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <nav aria-label="Plan">
                        <h3 className={heading}>Plan</h3>
                        <ul className={list}>
                            <li>
                                <Link href={beginHref}>Begin Your Entry</Link>
                            </li>
                            {wa && (
                                <li>
                                    <a href={`https://wa.me/${wa}`} target="_blank" rel="noreferrer">
                                        WhatsApp
                                    </a>
                                </li>
                            )}
                            {settings.email && (
                                <li>
                                    <a href={`mailto:${settings.email}`}>Email</a>
                                </li>
                            )}
                            <li>
                                <Link href="/story#promise">Responsible travel</Link>
                            </li>
                        </ul>
                    </nav>
                    {settings.socials.length > 0 && (
                        <nav aria-label="Follow">
                            <h3 className={heading}>Follow</h3>
                            <ul className={list}>
                                {settings.socials.map((s) => (
                                    <li key={s.label}>
                                        <a href={s.href} target="_blank" rel="noreferrer">
                                            {s.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </div>

                <div className="mt-14 max-w-[720px]">
                    <FieldNotesForm />
                </div>

                <div className="mt-12 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-6 font-type text-[12.5px] text-white/60">
                    <span>
                        © {settings.name} · {new Date().getFullYear()}
                    </span>
                    <CookieSettingsButton />
                </div>
            </div>
        </footer>
    );
}
