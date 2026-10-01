import { Compass, Leaf, PhoneCall, Users, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionIntro } from "@/components/ui/SectionIntro";
import type { Highlight } from "@/lib/types";
import { pad } from "@/lib/utils";

const icons: Record<Highlight["icon"], LucideIcon> = {
    compass: Compass,
    users: Users,
    leaf: Leaf,
    phone: PhoneCall,
};

export function WhyChooseUs({ items }: { items: Highlight[] }) {
    return (
        <section aria-labelledby="why-title" className="py-24 md:py-40">
            <div className="container-x">
                <Reveal>
                    <SectionIntro
                        index="04"
                        eyebrow="Why travel with us"
                        title={
                            <span id="why-title">
                                Small by design, <span className="serif-italic">and on purpose</span>
                            </span>
                        }
                    />
                </Reveal>

                <Reveal as="ul" className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-24 lg:grid-cols-4">
                    {items.map((item, i) => {
                        const Icon = icons[item.icon];
                        return (
                            <li key={item.title} data-reveal className="border-t border-ink/15 pt-8">
                                <div className="flex items-center justify-between text-stone">
                                    <span className="eyebrow">{pad(i + 1)}</span>
                                    <Icon aria-hidden strokeWidth={1} className="size-7 text-clay" />
                                </div>
                                <h3 className="mt-10 text-2xl">{item.title}</h3>
                                <p className="mt-4 text-[0.95rem] text-stone">{item.text}</p>
                            </li>
                        );
                    })}
                </Reveal>
            </div>
        </section>
    );
}
