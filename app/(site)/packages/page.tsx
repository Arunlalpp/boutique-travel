import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { PackagePicker } from "@/components/packages/PackagePicker";
import { FaqList } from "@/components/packages/FaqList";
import { BusIcon, FoodIcon, GuideIcon, TentIcon } from "@/components/ui/Icons";
import { faq, inclusions } from "@/lib/data/packages";
import { contactHref } from "@/lib/data/site";
import { media } from "@/lib/data/media";

export const metadata: Metadata = {
    title: "Packages",
    description: "All-inclusive packages with guides, meals, stays and transfers. Simple, honest pricing with no hidden costs.",
    alternates: { canonical: "/packages" },
};

const icons = { tent: TentIcon, food: FoodIcon, bus: BusIcon, guide: GuideIcon };

export default function PackagesPage() {
    return (
        <>
            <PageHero
                image={media.alpineLake}
                center
                className="pb-10"
                crumbs={[{ label: "Home", href: "/" }, { label: "Packages" }]}
                eyebrow="Simple, honest pricing"
                title="Pick your kind of adventure"
                lede="All-inclusive packages with guides, meals, stays and transfers. No hidden costs."
            />

            <PackagePicker />

            <section className="sec pt-0" aria-labelledby="incl-title">
                <div className="wrap">
                    <div className="sec-head">
                        <div className="t">
                            <span className="eyebrow">Always included</span>
                            <h2 id="incl-title" className="h-md">
                                Every package comes with
                            </h2>
                        </div>
                    </div>
                    <Reveal className="incl">
                        {inclusions.map((item) => {
                            const Icon = icons[item.icon];
                            return (
                                <div key={item.title} className="glass" data-reveal>
                                    <div className="ib">
                                        <Icon />
                                    </div>
                                    <span>
                                        <b>{item.title}</b>
                                        <small>{item.text}</small>
                                    </span>
                                </div>
                            );
                        })}
                    </Reveal>
                </div>
            </section>

            <section className="sec pb-40 pt-0" aria-labelledby="faq-title">
                <div className="wrap faq">
                    <div className="grid content-start gap-[18px]">
                        <span className="eyebrow">Good to know</span>
                        <h2 id="faq-title" className="h-lg">
                            Questions, answered.
                        </h2>
                        <p className="lede">
                            Can’t find what you need? Our trip designers reply within an hour, 9am to 9pm IST.
                        </p>
                        <div>
                            <ButtonLink href={contactHref} variant="glass" arrow={false}>
                                Ask a trip designer
                            </ButtonLink>
                        </div>
                    </div>
                    <FaqList items={faq} />
                </div>
            </section>
        </>
    );
}
