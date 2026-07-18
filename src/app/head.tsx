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
      {/* ActOn Beacon */}
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: `(function(w,a,b,d,s){w[a]=w[a]||{};w[a][b]=w[a][b]||{q:[],track:function(r,e,t){this.q.push({r:r,e:e,t:t||+new Date});}};var e=d.createElement(s);var f=d.getElementsByTagName(s)[0];e.async=1;e.src='//insights.smarthinkinginc.com/cdnr/aorpci9/acton/bn/tracker/47231';f.parentNode.insertBefore(e,f);})(window,'ActOn','Beacon',document,'script');ActOn.Beacon.track();`,
        }}
      />
      <script src="https://insight-engine.newfangled.com/api/v3/03af08bb76ccb06c0a26a6fb1babe0883eb1a229/include?acton-passthrough=true" />
    </head>
  );
};

export default Head;
