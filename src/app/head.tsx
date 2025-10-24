import Script from "next/script";

const Head = () => {
  return (
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Script
        strategy="beforeInteractive"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: `history.scrollRestoration = "manual"`,
        }}
      />
    </head>
  );
};

export default Head;
