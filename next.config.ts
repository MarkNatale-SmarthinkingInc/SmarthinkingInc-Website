import type { NextConfig } from "next";

// These paths are served under unversioned filenames, so an immutable year-long
// cache means an edit to e.g. /js/main.js never reaches a returning visitor.
// Kept for production; disabled in dev so local changes are actually picked up.
const staticAssetCacheControl =
  process.env.NODE_ENV === "production"
    ? "public, max-age=31536000, immutable"
    : "no-cache, no-store, must-revalidate";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.prismic.io",
      },
      {
        hostname: "smartthinking-cms.cdn.prismic.io",
      },
    ],
  },

  /* config options here */
  sassOptions: {
    additionalData: `
    @use "@/styles/utils" as *;
	`,
  },

  async headers() {
    return [
      {
        source: "/js/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: staticAssetCacheControl,
          },
        ],
      },
      {
        source: "/img/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: staticAssetCacheControl,
          },
        ],
      },
      {
        source: "/favicon.png",
        headers: [
          {
            key: "Cache-Control",
            value: staticAssetCacheControl,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
