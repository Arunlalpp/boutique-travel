import { enquiry } from "@/lib/data/ledger";
import { display, label, lsec, lwrap, typedItalic } from "@/lib/ledger-ui";
import { lx as cn } from "@/lib/ledger-ui";
import { LedgerEnquiryForm } from "./LedgerEnquiryForm";

export function EnquirySection({ whatsapp, email }: { whatsapp?: string; email?: string }) {
    const wa = whatsapp?.replace(/[^\d]/g, "");
    return (
        <section
            id="enquire"
            className={cn(lsec, "bg-ledger-forest text-ledger-paper")}
            aria-labelledby="enquire-title"
        >
            <div
                className={cn(
                    lwrap,
                    "grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start gap-[clamp(40px,6vw,80px)] max-lg:grid-cols-1",
                )}
            >
                <div className="grid gap-7 lg:sticky lg:top-28">
                    <h2 id="enquire-title" className={cn(display, "text-[clamp(52px,6.8vw,88px)] leading-[0.92]")}>
                        {enquiry.title.map((line) => (
                            <span key={line} className="block">
                                {line}
                            </span>
                        ))}
                    </h2>
                    <p className={cn(typedItalic, "max-w-[34ch] text-[clamp(16px,1.6vw,19px)] text-ledger-paper/90")}>
                        {enquiry.lede}
                    </p>
                    {(wa || email) && (
                        <div className="grid max-w-[400px] gap-2.5 border-t border-white/15 pt-6">
                            <p className={cn(label, "text-ochre")}>Prefer to talk first?</p>
                            {wa && (
                                <a
                                    href={`https://wa.me/${wa}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-max font-type text-[15px] hover:underline"
                                >
                                    WhatsApp · {whatsapp}
                                </a>
                            )}
                            {email && (
                                <a
                                    href={`mailto:${email}`}
                                    className="w-max font-type text-[15px] break-all hover:underline"
                                >
                                    Email · {email}
                                </a>
                            )}
                            <p className="font-type text-[13px] text-ledger-paper/65 italic">{enquiry.replyNote}</p>
                        </div>
                    )}
                </div>
                <LedgerEnquiryForm />
            </div>
        </section>
    );
}
