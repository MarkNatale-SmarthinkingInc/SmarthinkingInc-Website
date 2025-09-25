import Head from "@/app/head";

import "@/css/normalize.css";
import "@/css/styles.css";
import "@/css/styles-overrides.css";

import Globals from "@/app/globals";
import PageToPage from "@/app/pageToPage";
import { Header, Navigation, PageOverlay } from "@/components/layout";
import { createClient, repositoryName } from "@/prismicio";
import { generateMeta } from "@/utils/seo";
import { PrismicPreview } from "@prismicio/next";
import type { Metadata } from "next";
import Script from "next/script";

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = createClient();

  return (
    <html lang="en">
      <Head />
      <body className="loading" data-barba="wrapper">
        <PageOverlay />
        <Header />
        <Navigation />

        {children}

        {/* Page Transition Libraries */}
        <Script src="/js/barba-prefetch.js" />
        <Script src="/js/barba.js" />

        {/* Utilities */}
        <Script src="/js/fontfaceobserver.js" />
        <Script src="/js/gsap.min.js" />

        {/* GSAP Core & Plugins - Load before interactive */}
        <Script src="/js/CustomEase.min.js" />
        <Script src="/js/ScrollTrigger.min.js" />
        <Script src="/js/ScrollSmoother.min.js" />
        <Script src="/js/SplitText.min.js" />
        <Script src="/js/Draggable.min.js" />
        <Script src="/js/InertiaPlugin.min.js" />

        <Script src="/js/vars.js" />

        {/* Main Application Logic */}
        <Script src="/js/main.js" type="module" crossOrigin="anonymous" />
      </body>
      <Globals />
      <PageToPage />
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
