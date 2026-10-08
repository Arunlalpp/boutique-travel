import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteSettings } from "@/sanity/lib/queries";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { PackagePicker } from "@/components/packages/PackagePicker";
import { FaqList } from "@/components/packages/FaqList";
import { ArrowIcon } from "@/components/ui/Icons";
import { faq, inclusions } from "@/lib/data/packages";
import { contactHref } from "@/lib/data/site";
import { eyebrow, hLg, ruled, sec, textLink, wrap } from "@/lib/ui";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    return pageMetadata({
        title: "Packages",
        description: "All-inclusive packages with guides, meals, stays and transfers. Simple, honest pricing with no hidden costs.",
        path: "/packages",
        siteName: settings.name,
    });
}

const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
};

export default function PackagesPage() {
    return (
        <>
            <JsonLd data={faqData} />
            <PageHero
                crumbs={[{ label: "Home", href: "/" }, { label: "Packages" }]}
                eyebrow="Simple, honest pricing"
                title="Pick your kind of adventure."
                lede="All-inclusive packages with guides, meals, stays and transfers. No hidden costs."
            />

            <PackagePicker />

            <section className={cn(sec, "pt-0!")} aria-labelledby="incl-title">
                <div className={wrap}>
                    <h2 id="incl-title" className={cn(eyebrow, "mb-6 font-sans tracking-[0.16em]")}>
                        Every package comes with
                    </h2>
                    <Reveal className="grid grid-cols-4 gap-5 max-desk:grid-cols-2 max-xs:grid-cols-1">
                        {inclusions.map((item) => (
                            <div key={item.title} className={cn(ruled, "grid gap-1")} data-reveal>
                                <b className="text-sm font-semibold">{item.title}</b>
                                <small className="text-xs text-dim">{item.text}</small>
                            </div>
                        ))}
                    </Reveal>
                </div>
            </section>

            <section className={cn(sec, "pt-0! pb-40!")} aria-labelledby="faq-title">
                <div className={cn(wrap, "grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-[clamp(32px,6vw,90px)] max-desk:grid-cols-1")}>
                    <div className="grid content-start gap-4">
                        <span className={eyebrow}>Good to know</span>
                        <h2 id="faq-title" className={cn(hLg, "max-w-[10ch]")}>
                            Questions, answered.
                        </h2>
                        <Link href={contactHref} className={cn(textLink, "text-[13px]")}>
                            Ask a trip designer <ArrowIcon />
                        </Link>
                    </div>
                    <FaqList items={faq} />
                </div>
            </section>
        </>
    );
}
