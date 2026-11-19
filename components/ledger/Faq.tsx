import { display, typedItalic } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { Plus } from "./icons";

/** Question list on <details>, so it opens without JavaScript. The first answer starts open. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
    return (
        <div className="border-t-2 border-ledger-ink">
            {items.map((item, i) => (
                <details key={item.q} open={i === 0} className="group border-b border-ledger-line">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                        <span className={cn(display, "text-[clamp(16px,1.6vw,19px)] leading-tight")}>{item.q}</span>
                        <Plus className="size-5 shrink-0 text-ochre-deep transition-transform group-open:rotate-45" />
                    </summary>
                    <p className={cn(typedItalic, "max-w-[64ch] pb-6 text-ledger-ink/80")}>{item.a}</p>
                </details>
            ))}
        </div>
    );
}
