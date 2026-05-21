import Head from "@/app/head";

import "@/css/normalize.css";
import "@/css/vars.css";
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
      {/* Google Tag Manager - head snippet */}
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NGMSM8ND');`,
        }}
      />
      {/* End Google Tag Manager */}
      <body className="loading">
        {/* Google Tag Manager - noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NGMSM8ND"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <PageOverlay />
        <Header />
        <Navigation />

        {children}

        {/* Page Transition Libraries - Critical for navigation */}
        <Script src="/js/barba-prefetch.js" strategy="beforeInteractive" />
        <Script src="/js/barba.js" strategy="beforeInteractive" />

        {/* FontFaceObserver - needed before vars.js */}
        <Script src="/js/fontfaceobserver.js" strategy="beforeInteractive" />

        {/* GSAP Core - Critical for all animations */}
        <Script src="/js/gsap.min.js" strategy="beforeInteractive" />
        <Script src="/js/CustomEase.min.js" strategy="beforeInteractive" />
        <Script src="/js/ScrollTrigger.min.js" strategy="beforeInteractive" />
        <Script src="/js/ScrollSmoother.min.js" strategy="beforeInteractive" />
        <Script src="/js/SplitText.min.js" strategy="beforeInteractive" />
        <Script src="/js/Draggable.min.js" strategy="beforeInteractive" />
        <Script src="/js/InertiaPlugin.min.js" strategy="beforeInteractive" />

        <Script src="/js/vars.js" strategy="afterInteractive" />

        {/* Main Application Logic */}
        <Script
          src="/js/main.js"
          type="module"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
      <Globals />
      <PageToPage />
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}