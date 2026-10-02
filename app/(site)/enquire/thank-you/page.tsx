import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getSiteSettings } from "@/sanity/lib/queries";

export const metadata: Metadata = {
    title: "Thank You",
    description: "Your enquiry has been received.",
    robots: { index: false, follow: false },
};

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
        <section className="sec flex min-h-[80svh] items-center pt-40">
            <div
                aria-hidden
                className="glow"
                style={{
                    width: 700,
                    height: 700,
                    left: "50%",
                    top: -200,
                    marginLeft: -350,
                    background: "radial-gradient(circle, rgba(123,211,137,.14), transparent 70%)",
                }}
            />
            <div className="wrap">
                <div className="form glass-strong shadow-deep mx-auto max-w-160">
                    <div className="success">
                        <div className="tick">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <path d="M5 12.5l4.5 4.5L19 7.5" />
                            </svg>
                        </div>
                        <h1 className="h-lg">Thanks{name ? `, ${name}` : ""}!</h1>
                        <p className="lede text-center">
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
