import { createClient } from "@/prismicio";
import type { Content } from "@prismicio/client";

/** The three subpages, keyed by the UID their Prismic document must use. */
export type ServiceSubpageUid =
  | "brand-foundation"
  | "brand-activation"
  | "marketing-orchestration";

/**
 * Fetch a subpage's Prismic document, or null when it does not exist yet.
 *
 * These are static routes, not `[uid]` ones, so the document is looked up by a
 * UID that must match the route. `getByUID` throws when nothing matches, which
 * would fail the whole page build — but every section that reads this falls
 * back to the copy shipped in code, so a missing document is a normal state
 * rather than an error. That is what lets the schema ship before the content
 * is entered.
 */
export async function getServiceSubpage(
  uid: ServiceSubpageUid,
): Promise<Content.ServiceSubpageDocument | null> {
  try {
    return await createClient().getByUID("service_subpage", uid);
  } catch {
    return null;
  }
}
