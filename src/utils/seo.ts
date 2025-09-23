import type { Metadata } from "next/types";

import { createClient } from "@/prismicio";

export async function generateMeta(uid?: string): Promise<Metadata> {
  const client = createClient();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let page: any | null = null;

  if (uid) {
    page = await client.getByID(uid);
  }

  const settings = await client.getSingle("settings");
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || ""),
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
