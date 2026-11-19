import { WhatsApp } from "./icons";

/** Floating WhatsApp shortcut, bottom-right on every screen. */
export function WhatsAppButton({ number }: { number?: string }) {
    const digits = number?.replace(/[^\d]/g, "");
    if (!digits) return null;
    const text = encodeURIComponent("Hello! I'd like to begin an Entry with Backroad Ledger.");
    return (
        <a
            href={`https://wa.me/${digits}?text=${text}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Message us on WhatsApp"
            className="fixed [view-transition-name:whatsapp] right-[clamp(16px,3vw,28px)] bottom-[calc(clamp(16px,3vw,28px)+env(safe-area-inset-bottom,0px))] z-60 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_30px_-10px_rgb(0_0_0/0.55)] transition-transform hover:scale-105 [&_svg]:size-7"
        >
            <WhatsApp />
        </a>
    );
}
