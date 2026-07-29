import Script from "next/script";

const Head = () => {
	return (
		<head>
			<Script
				strategy="beforeInteractive"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{
					__html: `history.scrollRestoration = "manual"`,
				}}
			/>
			{/* Google Analytics (GA4) */}
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-9ZXMBYYH4V"
				strategy="afterInteractive"
			/>
			<Script
				id="ga4-init"
				strategy="afterInteractive"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: inline GA4 init snippet
				dangerouslySetInnerHTML={{
					__html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-9ZXMBYYH4V');`,
				}}
			/>
			{/* End Google Analytics */}
			{/* Google Tag Manager */}
			<Script
				id="gtm-loader"
				strategy="afterInteractive"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: inline GTM loader snippet
				dangerouslySetInnerHTML={{
					__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NGMSM8ND');`,
				}}
			/>
			{/* End Google Tag Manager */}
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
