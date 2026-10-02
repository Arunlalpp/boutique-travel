import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
    let body: { email?: unknown };
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (!EMAIL.test(email) || email.length > 254) {
        return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // One document per address: the id is derived from the email, so a
    // repeat signup is a no-op instead of a duplicate row in the Studio.
    const id = `subscriber.${Buffer.from(email).toString("base64url")}`;
    await writeClient.createIfNotExists({
        _id: id,
        _type: "subscriber",
        email,
        subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
}
