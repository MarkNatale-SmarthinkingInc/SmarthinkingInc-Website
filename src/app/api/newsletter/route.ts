import { type NextRequest, NextResponse } from "next/server";

// Newsletter signups land in Jotform; Jotform's Mailchimp integration passes
// them on to the audience (and Mailchimp handles double opt-in). Like the
// contact route, this is the only way in, so the spam checks live here.

const JOTFORM_FORM_ID = "262666599867079";

// Jotform question IDs — see GET /form/{id}/questions.
const JOTFORM_FIELDS = {
  fullName: "2", // sub-fields: first, last
  email: "3",
} as const;

const MAX_LENGTH = 200;

interface NewsletterPayload {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  website?: unknown;
  turnstileToken?: unknown;
}

const clean = (value: unknown, max = MAX_LENGTH) =>
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
      { error: "Newsletter service is temporarily unavailable" },
      { status: 500 },
    );
  }

  let payload: NewsletterPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Honeypot: pretend it worked so the bot moves on, forward nothing.
  if (clean(payload.website)) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const token = clean(payload.turnstileToken, 2048);
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    null;
  if (!token || !(await verifyTurnstile(token, ip))) {
    return NextResponse.json(
      { error: "We couldn't verify your signup. Please try again." },
      { status: 400 },
    );
  }

  const firstName = clean(payload.firstName);
  const lastName = clean(payload.lastName);
  const email = clean(payload.email);

  // Jotform has the name as optional; the site requires it because the
  // newsletter is personalised.
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

  const submission = new URLSearchParams({
    [`submission[${JOTFORM_FIELDS.fullName}_first]`]: firstName,
    [`submission[${JOTFORM_FIELDS.fullName}_last]`]: lastName,
    [`submission[${JOTFORM_FIELDS.email}]`]: email,
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
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to newsletter. Please try again." },
      { status: 500 },
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
