/**
 * Transactional email through Resend's REST API (no SDK dependency).
 *
 * Env (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY      required
 *   ENQUIRY_TO_EMAIL    required; one address, or several separated by commas
 *   RESEND_FROM_EMAIL   optional; a sender on a domain verified in Resend,
 *                       e.g. "Backroad Ledger <journeys@backroadledger.com>".
 *                       Defaults to Resend's test sender, which can only
 *                       deliver to the Resend account owner's address.
 *   RESEND_AUDIENCE_ID  optional; Field Notes sign-ups are added to this
 *                       Resend audience instead of being emailed.
 */

const RESEND = "https://api.resend.com";
const DEFAULT_FROM = "Backroad Ledger <onboarding@resend.dev>";

export class EmailNotConfigured extends Error {}

function config() {
    const key = process.env.RESEND_API_KEY;
    const to = process.env.ENQUIRY_TO_EMAIL?.split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    if (!key || !to?.length) throw new EmailNotConfigured("RESEND_API_KEY and ENQUIRY_TO_EMAIL must be set");
    return { key, to, from: process.env.RESEND_FROM_EMAIL || DEFAULT_FROM };
}

async function resend(path: string, key: string, body: unknown) {
    const res = await fetch(`${RESEND}${path}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Resend ${path} failed: ${res.status} ${await res.text()}`);
}

export const escapeHtml = (s: string) =>
    s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Two-column table of label/value rows; empty values are skipped. Values are escaped here. */
export function rowsHtml(rows: [string, string | undefined][]) {
    const body = rows
        .filter(([, v]) => v && v.trim())
        .map(
            ([k, v]) =>
                `<tr><td style="padding:8px 16px 8px 0;color:#5b6870;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:8px 0;color:#141c20;white-space:pre-wrap">${escapeHtml(v!)}</td></tr>`,
        )
        .join("");
    return `<table style="font:15px/1.5 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;border-collapse:collapse">${body}</table>`;
}

/** Sends a notification to the team inbox. `replyTo` lets them answer the guest directly. */
export async function notifyTeam({
    subject,
    heading,
    rows,
    replyTo,
}: {
    subject: string;
    heading: string;
    rows: [string, string | undefined][];
    replyTo?: string;
}) {
    const { key, to, from } = config();
    const text = rows
        .filter(([, v]) => v && v.trim())
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");
    await resend("/emails", key, {
        from,
        to,
        subject,
        reply_to: replyTo,
        text: `${heading}\n\n${text}`,
        html: `<div style="max-width:620px"><h2 style="font:600 20px/1.3 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#141c20">${escapeHtml(heading)}</h2>${rowsHtml(rows)}</div>`,
    });
}

/** Adds a Field Notes subscriber to the Resend audience, or emails the team when no audience is set. */
export async function addSubscriber(email: string) {
    const audience = process.env.RESEND_AUDIENCE_ID;
    if (audience) {
        const key = process.env.RESEND_API_KEY;
        if (!key) throw new EmailNotConfigured("RESEND_API_KEY must be set");
        await resend(`/audiences/${encodeURIComponent(audience)}/contacts`, key, { email, unsubscribed: false });
        return;
    }
    await notifyTeam({
        subject: `Field Notes sign-up: ${email}`,
        heading: "New Field Notes sign-up",
        rows: [
            ["Email", email],
            ["Signed up", new Date().toUTCString()],
        ],
    });
}
