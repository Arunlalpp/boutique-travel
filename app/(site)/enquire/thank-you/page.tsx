import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getSiteSettings } from "@/sanity/lib/queries";
import { hLg, lede, sec, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    return pageMetadata({
        title: "Thank You",
        description: "Your enquiry has been received.",
        path: "/enquire/thank-you",
        siteName: settings.name,
        noindex: true,
    });
}

type SearchParams = Promise<{ name?: string | string[]; contact?: string | string[] }>;

export default async function ThankYouPage({ searchParams }: { searchParams: SearchParams }) {
    const params = await searchParams;
    const name = (Array.isArray(params.name) ? params.name[0] : params.name)?.slice(0, 60);
    const contactRaw = Array.isArray(params.contact) ? params.contact[0] : params.contact;
    const contactBy = ["email", "phone", "whatsapp"].includes((contactRaw || "").toLowerCase())
        ? contactRaw!.toLowerCase() === "whatsapp"
            ? "WhatsApp"
            : contactRaw!.toLowerCase()
        : "email";
    const settings = await getSiteSettings();
    const tel = settings.phone.replace(/[^+\d]/g, "");

    return (
        <section className={cn(sec, "flex min-h-[80svh] items-center overflow-hidden pt-40!")}>
            <div
                aria-hidden
                className="pointer-events-none absolute -top-[200px] left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(123_211_137/0.14),transparent_70%)] blur-[10px]"
            />
            <div className={wrap}>
                <div className="glass-strong mx-auto grid max-w-160 gap-6 rounded-[36px] p-[clamp(24px,3.6vw,44px)] shadow-deep">
                    <div className="grid justify-items-center gap-3.5 py-3 text-center">
                        <div className="grid size-[72px] place-items-center rounded-full bg-ok/15 text-ok">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="size-[34px] animate-draw [stroke-dasharray:30] [stroke-dashoffset:30]">
                                <path d="M5 12.5l4.5 4.5L19 7.5" />
                            </svg>
                        </div>
                        <h1 className={hLg}>Thanks{name ? `, ${name}` : ""}!</h1>
                        <p className={cn(lede, "text-center")}>
                            Your enquiry is with our trip designers. Expect to hear from us by {contactBy} soon, usually
                            within the hour during studio hours.
                        </p>
                        <div className="mt-2 flex flex-wrap justify-center gap-2.5">
                            <ButtonLink href="/itineraries">Browse journeys</ButtonLink>
                            <ButtonLink href="/stories" variant="glass" arrow={false}>
                                Read guest stories
                            </ButtonLink>
                        </div>
                        {settings.phone && (
                            <p className="mt-4 text-sm text-dim">
                                Prefer to talk?{" "}
                                <a href={`tel:${tel}`} className="text-fg underline-offset-4 hover:underline">
                                    {settings.phone}
                                </a>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
