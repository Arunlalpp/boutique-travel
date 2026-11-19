import { NextResponse } from "next/server";
import { addSubscriber, EmailNotConfigured } from "@/lib/email";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
    let body: { email?: unknown; companyWebsite?: unknown };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    if (body.companyWebsite) return NextResponse.json({ ok: true });

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!EMAIL.test(email) || email.length > 254) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    try {
        await addSubscriber(email);
    } catch (err) {
        console.error("[newsletter]", err);
        return NextResponse.json(
            { error: "Could not sign you up" },
            { status: err instanceof EmailNotConfigured ? 503 : 502 },
        );
    }
    return NextResponse.json({ ok: true });
}
