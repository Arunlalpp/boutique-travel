/**
 * "Open Entry" buttons and the enquiry form talk through one window event,
 * so choosing an Entry anywhere on the page pre-selects it in the form.
 * (Entry pages are phase 2; until then an Entry opens straight into an enquiry.)
 */
export const ENTRY_EVENT = "ledger:entry";

export function chooseEntry(no: string) {
    window.dispatchEvent(new CustomEvent<string>(ENTRY_EVENT, { detail: no }));
    const target = document.getElementById("enquire");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
