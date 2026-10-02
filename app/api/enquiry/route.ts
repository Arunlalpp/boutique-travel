import { NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/writeClient";

interface EnquiryPayload {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    nationality?: string;
    journey: string;
    destination?: string;
    packageName?: string;
    style: string;
    dates?: string;
    travellers: number;
    budget?: string;
    interests?: string[];
    message?: string;
    contactBy: string;
    consent: boolean;
    companyWebsite?: string; // honeypot
}

function isValid(body: Partial<EnquiryPayload>): body is EnquiryPayload {
    return (
        typeof body.firstName === "string" &&
        body.firstName.trim().length > 0 &&
        typeof body.lastName === "string" &&
        body.lastName.trim().length > 0 &&
        typeof body.email === "string" &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) &&
        body.consent === true
    );
}

export async function POST(request: Request) {
    let body: Partial<EnquiryPayload>;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    // Honeypot: bots that fill in the hidden field are silently accepted and dropped.
    if (body.companyWebsite) {
        return NextResponse.json({ ok: true });
    }

    if (!isValid(body)) {
        return NextResponse.json({ error: "Missing or invalid required fields" }, { status: 400 });
    }

    const [journeyId, destinationId] = await Promise.all([
        body.journey && body.journey !== "bespoke"
            ? writeClient.fetch<string | null>(`*[_type == "itinerary" && slug.current == $slug][0]._id`, {
                  slug: body.journey,
              })
            : null,
        typeof body.destination === "string" && body.destination
            ? writeClient.fetch<string | null>(`*[_type == "destination" && slug.current == $slug][0]._id`, {
                  slug: body.destination,
              })
            : null,
    ]);

    await writeClient.create({
        _type: "enquiry",
        name: `${body.firstName} ${body.lastName}`.trim(),
        email: body.email,
        phone: body.phone || undefined,
        nationality: body.nationality || undefined,
        travelStyle: body.style,
        travelDates: body.dates || undefined,
        groupSize: body.travellers,
        budget: body.budget || undefined,
        interests: body.interests ?? [],
        message: body.message || undefined,
        journey: journeyId ? { _type: "reference", _ref: journeyId } : undefined,
        destination: destinationId ? { _type: "reference", _ref: destinationId } : undefined,
        packageName: typeof body.packageName === "string" ? body.packageName.slice(0, 120) || undefined : undefined,
        preferredContact: body.contactBy,
        submittedAt: new Date().toISOString(),
        status: "New",
    });

    return NextResponse.json({ ok: true });
}
