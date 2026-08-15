import type { NextConfig } from "next";

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
    // `immutable` promises the URL's bytes will never change, so it is only
    // safe on content-addressed URLs. Nothing under /js carries a hash, so it
    // is split by how often the file actually changes:
    //
    //   - our own code changes every deploy, so it must revalidate. The
    //     browser still caches it and still sends If-None-Match; an unchanged
    //     file costs a 304 with an empty body, not a re-download.
    //   - the vendored libraries change only when we upgrade them by hand,
    //     and an upgrade lands under a new filename, so they stay immutable.
    const revalidate = "public, max-age=0, must-revalidate";
    const immutable = "public, max-age=31536000, immutable";

    return [
      {
        // Vendored libraries (gsap, barba, fontfaceobserver, …). Broad on
        // purpose: when several entries match one path the LAST one wins, so
        // this baseline is stated first and the entries below override it for
        // our own files.
        source: "/js/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: immutable,
          },
        ],
      },
      {
        source: "/js/main.js",
        headers: [{ key: "Cache-Control", value: revalidate }],
      },
      {
        source: "/js/vars.js",
        headers: [{ key: "Cache-Control", value: revalidate }],
      },
      {
        source: "/js/modules/:path*",
        headers: [{ key: "Cache-Control", value: revalidate }],
      },
      {
        source: "/img/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
