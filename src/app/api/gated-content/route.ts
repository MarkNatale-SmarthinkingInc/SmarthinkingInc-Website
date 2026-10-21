import { createClient } from "@/prismicio";
import { asLink, isFilled } from "@prismicio/client";
import { type NextRequest, NextResponse } from "next/server";

// Gated downloads on blog posts. Each post that turns the form on in Prismic
// carries its own form name, Act-On form ID and download link; this route reads
// them from the post itself, so the browser never sees (or can change) the IDs,
// and the download link is only handed out after a successful submission.
//
// Leads go straight to Act-On as an external form post. Act-On matches on the
// field *names* below, so they must stay identical to the fields on the Act-On
// form. If the team renames a field there, rename it here too.

const ACTON_ACCOUNT_ID = "47231";
// Smarthinking's Act-On tracking domain (same one the beacon in head.tsx uses).
const ACTON_DOMAIN = "https://insights.smarthinkinginc.com";

const ACTON_FIELDS = {
  email: "Email Address",
  firstName: "First Name",
  lastName: "Last Name",
  company: "Company",
  jobTitle: "Job Title",
  formName: "form_name",
  actonFormId: "acton_form_id",
} as const;

const MAX_LENGTH = 200;

interface GatedContentPayload {
  uid?: unknown;
  email?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  company?: unknown;
  jobTitle?: unknown;
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
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.error("Missing TURNSTILE_SECRET_KEY");
    return NextResponse.json(
      { error: "This form is temporarily unavailable" },
      { status: 500 },
    );
  }

  let payload: GatedContentPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Look the post up first: everything Act-On needs besides the visitor's
  // own details comes from Prismic.
  const uid = clean(payload.uid, MAX_LENGTH);
  const blogPost = uid
    ? await createClient()
        .getByUID("blog_post", uid)
        .catch(() => null)
    : null;
  const data = blogPost?.data;
  const downloadUrl = data ? asLink(data.gated_download_link) : null;

  if (
    !data?.gated_form_enabled ||
    !isFilled.keyText(data.gated_acton_form_id) ||
    !downloadUrl
  ) {
    return NextResponse.json(
      { error: "This download isn't available right now" },
      { status: 404 },
    );
  }

  // Honeypot: people never see this field. Pretend it worked so the bot
  // moves on, but don't forward anything or reveal the link.
  if (clean(payload.website, MAX_LENGTH)) {
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

  const email = clean(payload.email, MAX_LENGTH);
  const firstName = clean(payload.firstName, MAX_LENGTH);
  const lastName = clean(payload.lastName, MAX_LENGTH);
  const company = clean(payload.company, MAX_LENGTH);
  const jobTitle = clean(payload.jobTitle, MAX_LENGTH);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address" },
      { status: 400 },
    );
  }
  if (!firstName || !lastName || !company || !jobTitle) {
    return NextResponse.json(
      { error: "Please fill in every field" },
      { status: 400 },
    );
  }

  const actonFormId = data.gated_acton_form_id.trim();
  const submission = new URLSearchParams({
    [ACTON_FIELDS.email]: email,
    [ACTON_FIELDS.firstName]: firstName,
    [ACTON_FIELDS.lastName]: lastName,
    [ACTON_FIELDS.company]: company,
    [ACTON_FIELDS.jobTitle]: jobTitle,
    [ACTON_FIELDS.formName]: data.gated_form_name?.trim() ?? "",
    [ACTON_FIELDS.actonFormId]: actonFormId,
  });
  // Act-On records the visitor's IP from this field on server-side posts.
  if (ip) submission.set("_ipaddr", ip);

  // Pass the Act-On beacon cookie along so the submission is tied to the
  // visitor's existing page-view history instead of starting a new record.
  const headers: HeadersInit = {};
  const beacon = request.cookies.get(`wp${ACTON_ACCOUNT_ID}`);
  if (beacon) headers.Cookie = `${beacon.name}=${beacon.value}`;

  try {
    const res = await fetch(
      `${ACTON_DOMAIN}/acton/eform/${ACTON_ACCOUNT_ID}/${encodeURIComponent(actonFormId)}/d-ext-0001`,
      { method: "POST", headers, body: submission, redirect: "manual" },
    );

    // Act-On answers a good post with a 200 page or a redirect to the
    // form's thank-you URL; anything 4xx/5xx means it was rejected.
    if (res.status >= 400) {
      console.error(
        "Act-On submission failed:",
        res.status,
        (await res.text()).slice(0, 500),
      );
      throw new Error("Act-On rejected the submission");
    }

    return NextResponse.json({ success: true, downloadUrl }, { status: 200 });
  } catch (error) {
    console.error("Gated content submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit the form. Please try again." },
      { status: 500 },
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
