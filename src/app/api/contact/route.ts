import { type NextRequest, NextResponse } from "next/server";

// Contact submissions land in Jotform, where the team reads and routes them.
// The form on the site is our own markup; this route is the only way in, so
// all spam checks (Turnstile + honeypot) happen here before Jotform sees it.

const JOTFORM_FORM_ID = "262657267821061";

// Jotform question IDs (the number in `q2_…`, `q3_…` in the form's source).
// If the team adds, removes or re-orders fields in Jotform, update these.
const JOTFORM_FIELDS = {
  fullName: "2", // sub-fields: first, last
  email: "3",
  phone: "4", // sub-field: full
  companyName: "5",
  message: "9",
} as const;

const MAX_LENGTH = {
  short: 200,
  message: 5000,
};

interface ContactPayload {
  firstName?: unknown;
  lastName?: unknown;
  companyName?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
}

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

async function verifyTurnstile(token: string, ip: string | null) {
  const body = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY ?? "",
    response: token,
  });
  if (ip) body.set("remoteip", ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body },
  );
  const data = (await res.json()) as { success: boolean };
  return data.success;
}

export async function POST(request: NextRequest) {
  if (!process.env.JOTFORM_API_KEY || !process.env.TURNSTILE_SECRET_KEY) {
    console.error("Missing JOTFORM_API_KEY or TURNSTILE_SECRET_KEY");
    return NextResponse.json(
      { error: "Contact service is temporarily unavailable" },
      { status: 500 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: people never see this field. Pretend it worked so the bot
  // moves on, but don't forward anything.
  if (clean(payload.website, MAX_LENGTH.short)) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const token = clean(payload.turnstileToken, 2048);
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    null;
  if (!token || !(await verifyTurnstile(token, ip))) {
    return NextResponse.json(
      { error: "We couldn't verify your submission. Please try again." },
      { status: 400 },
    );
  }

  const firstName = clean(payload.firstName, MAX_LENGTH.short);
  const lastName = clean(payload.lastName, MAX_LENGTH.short);
  const companyName = clean(payload.companyName, MAX_LENGTH.short);
  const email = clean(payload.email, MAX_LENGTH.short);
  const phone = clean(payload.phone, MAX_LENGTH.short);
  const message = clean(payload.message, MAX_LENGTH.message);

  // Required fields mirror the Jotform form.
  if (!firstName || !lastName) {
    return NextResponse.json(
      { error: "First and last name are required" },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 },
    );
  }
  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const submission = new URLSearchParams({
    [`submission[${JOTFORM_FIELDS.fullName}_first]`]: firstName,
    [`submission[${JOTFORM_FIELDS.fullName}_last]`]: lastName,
    [`submission[${JOTFORM_FIELDS.email}]`]: email,
    [`submission[${JOTFORM_FIELDS.phone}_full]`]: phone,
    [`submission[${JOTFORM_FIELDS.companyName}]`]: companyName,
    [`submission[${JOTFORM_FIELDS.message}]`]: message,
  });

  try {
    const res = await fetch(
      `https://api.jotform.com/form/${JOTFORM_FORM_ID}/submissions`,
      {
        method: "POST",
        headers: { APIKEY: process.env.JOTFORM_API_KEY },
        body: submission,
      },
    );
    const data = (await res.json()) as {
      responseCode?: number;
      message?: string;
    };

    if (!res.ok || data.responseCode !== 200) {
      console.error("Jotform submission failed:", res.status, data);
      throw new Error("Jotform rejected the submission");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit contact form. Please try again." },
      { status: 500 },
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
