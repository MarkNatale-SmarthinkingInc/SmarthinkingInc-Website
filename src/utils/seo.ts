import type { Metadata } from "next/types";

import { createClient } from "@/prismicio";

/**
 * Base URL that relative metadata (OG images, canonicals) resolve against.
 * NEXT_PUBLIC_SITE_URL is set in Vercel for the deployed environments; the
 * fallbacks keep a local checkout without an .env.local from throwing
 * "Invalid URL" on every page, which `new URL("")` otherwise does.
 */
function getMetadataBase(): URL {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (siteUrl) {
    return new URL(siteUrl);
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("http://localhost:3000");
}

export async function generateMeta(uid?: string): Promise<Metadata> {
  const client = createClient();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let page: any | null = null;

  if (uid) {
    page = await client.getByID(uid);
  }

  const settings = await client.getSingle("settings");
  return {
    metadataBase: getMetadataBase(),
    title: `${settings.data.meta_name} - ${page?.data.meta_title || settings.data.meta_title}`,
    description: page?.data.meta_description || settings.data.meta_description,
    openGraph: {
      type: "website",
      images: [
        {
          url: page?.data.meta_image.url || "",
          width: page?.data.meta_image.dimensions?.width,
          height: page?.data.meta_image.dimensions?.height,
        },
        {
          url: settings.data.meta_image.url || "",
          width: settings.data.meta_image.dimensions?.width,
          height: settings.data.meta_image.dimensions?.height,
        },
      ],
    },
    icons: {
      icon: "/favicon.png",
    },
  };
}
