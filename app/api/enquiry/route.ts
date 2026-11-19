import { NextResponse } from "next/server";
import { entries } from "@/lib/data/ledger";
import { EmailNotConfigured, notifyTeam } from "@/lib/email";

interface EnquiryPayload {
    name: string;
    email: string;
    nationality?: string;
    travellers?: number;
    dates?: string;
    interests?: string[];
    message?: string;
    consent: boolean;
    companyWebsite?: string; // honeypot
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
    let body: Partial<EnquiryPayload>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    // Honeypot: bots that fill in the hidden field are silently accepted and dropped.
    if (body.companyWebsite) return NextResponse.json({ ok: true });

    const name = str(body.name, 120);
    const email = str(body.email, 254);
    if (!name || !EMAIL.test(email) || body.consent !== true) {
        return NextResponse.json({ error: "Missing or invalid required fields" }, { status: 400 });
    }

    // Only Entry labels the site itself offers are accepted.
    const labels = new Set(entries.map((e) => `Entry ${e.no} · ${e.name}`));
    const chosen = (Array.isArray(body.interests) ? body.interests : []).filter(
        (i): i is string => typeof i === "string" && labels.has(i),
    );
    const travellers = Number(body.travellers);

    try {
        await notifyTeam({
            subject: `New enquiry: ${name}${chosen.length ? ` · ${chosen.map((c) => c.split(" · ")[0]).join(" + ")}` : ""}`,
            heading: `${name} has begun an Entry`,
            replyTo: email,
            rows: [
                ["Name", name],
                ["Email", email],
                ["Travelling from", str(body.nationality, 80)],
                ["Travellers", Number.isFinite(travellers) && travellers > 0 ? String(Math.min(travellers, 99)) : ""],
                ["Entries", chosen.join("\n")],
                ["Travel window", str(body.dates, 120)],
                ["Message", str(body.message, 4000)],
                ["Received", new Date().toUTCString()],
            ],
        });
    } catch (err) {
        console.error("[enquiry]", err);
        const status = err instanceof EmailNotConfigured ? 503 : 502;
        return NextResponse.json({ error: "Could not send your enquiry" }, { status });
    }

    return NextResponse.json({ ok: true });
}
