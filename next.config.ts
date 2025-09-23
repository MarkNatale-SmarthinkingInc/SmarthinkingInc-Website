import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.prismic.io",
      },
    ],
  },

  /* config options here */
  sassOptions: {
    additionalData: `
    @use "@/styles/utils" as *;
	`,
  },
};

export default nextConfig;
