import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Prismic webhook target. Prismic POSTs here whenever content is published,
 * and we drop the "prismic" cache tag — every production fetch is tagged with
 * it in src/prismicio.ts — so the affected pages regenerate on next request.
 * That is far cheaper than the Vercel deploy hook it replaces, which rebuilt
 * and redeployed the whole site (and shipped whatever code was on the
 * production branch at that moment) for a one-word copy edit.
 *
 * The endpoint is public, and revalidating is destructive to the cache, so the
 * shared secret is required: without it anyone who found the URL could force
 * constant regeneration. Set PRISMIC_WEBHOOK_SECRET in the hosting environment
 * and paste the same value into the webhook's "Secret" field in Prismic.
 */
export async function POST(request: Request) {
  const expected = process.env.PRISMIC_WEBHOOK_SECRET;

  // Fail closed. An unset secret in production would otherwise leave the
  // endpoint wide open while looking like it was configured.
  if (!expected) {
    return NextResponse.json(
      { revalidated: false, error: "PRISMIC_WEBHOOK_SECRET is not set" },
      { status: 500 },
    );
  }

  let secret: unknown;
  try {
    // Prismic sends the passphrase as `secret` in the JSON body.
    ({ secret } = await request.json());
  } catch {
    return NextResponse.json(
      { revalidated: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (secret !== expected) {
    return NextResponse.json(
      { revalidated: false, error: "Invalid secret" },
      { status: 401 },
    );
  }

  revalidateTag("prismic");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
