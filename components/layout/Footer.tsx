import Link from "next/link";
import { mainNav, site } from "@/lib/data/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { Wordmark } from "./Wordmark";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="grain relative overflow-hidden bg-night text-paper">
            <Reveal className="container-x relative border-b border-paper/10 py-24 md:py-36">
                <p data-reveal className="eyebrow text-paper/50">
                    Begin a conversation
                </p>
                <h2 data-reveal className="mt-6 max-w-4xl text-5xl md:text-7xl lg:text-8xl">
                    Where would you like to <span className="serif-italic text-clay-soft">find yourself</span> next?
                </h2>
                <div data-reveal className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center">
                    <ButtonLink href="/enquire" inverse>
                        Plan your journey
                    </ButtonLink>
                    <p className="text-sm text-paper/60">
                        Or call the studio on{" "}
                        <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="link-line text-paper">
                            {site.phone}
                        </a>
                    </p>
                </div>
            </Reveal>

            <div className="container-x relative grid gap-12 py-16 md:grid-cols-12">
                <div className="md:col-span-5">
                    <Wordmark />
                    <p className="mt-4 max-w-xs text-sm text-paper/60">{site.description}</p>
                </div>

                <nav aria-label="Footer" className="md:col-span-2">
                    <p className="eyebrow text-paper/40">Explore</p>
                    <ul className="mt-5 space-y-3 text-sm">
                        {mainNav.map((item) => (
                            <li key={item.href}>
                                <Link href={item.href} className="link-line text-paper/80 hover:text-paper">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/enquire" className="link-line text-paper/80 hover:text-paper">
                                Enquire
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="md:col-span-3">
                    <p className="eyebrow text-paper/40">The studio</p>
                    <ul className="mt-5 space-y-3 text-sm text-paper/80">
                        <li>
                            <a href={`mailto:${site.email}`} className="link-line hover:text-paper">
                                {site.email}
                            </a>
                        </li>
                        <li>{site.studio}</li>
                        <li>{site.hours}</li>
                    </ul>
                </div>

                <div className="md:col-span-2">
                    <p className="eyebrow text-paper/40">Follow</p>
                    <ul className="mt-5 space-y-3 text-sm">
                        {site.socials.map((s) => (
                            <li key={s.label}>
                                <a
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="link-line text-paper/80 hover:text-paper"
                                >
                                    {s.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="container-x relative flex flex-col gap-2 border-t border-paper/10 py-8 text-xs text-paper/40 md:flex-row md:justify-between">
                <p>
                    © {year} {site.name}. All rights reserved.
                </p>
                <p>Design preview — placeholder brand, copy and photography.</p>
            </div>
        </footer>
    );
}
