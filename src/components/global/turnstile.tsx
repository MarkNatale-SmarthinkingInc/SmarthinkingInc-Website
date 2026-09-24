"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

interface TurnstileApi {
	render: (el: HTMLElement, options: Record<string, unknown>) => string;
	remove: (widgetId: string) => void;
}

declare global {
	interface Window {
		turnstile?: TurnstileApi;
	}
}

interface TurnstileProps {
	// Called with a fresh token, or null when it expires or errors.
	onToken: (token: string | null) => void;
	className?: string;
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Cloudflare Turnstile, rendered explicitly so it mounts and unmounts cleanly
// with React. "interaction-only" keeps it invisible unless Cloudflare actually
// wants the visitor to click something. Tokens are single-use: to get a new
// one after a submit, remount this component (change its `key`).
export default function Turnstile({ onToken, className }: TurnstileProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const onTokenRef = useRef(onToken);
	onTokenRef.current = onToken;
	const [scriptReady, setScriptReady] = useState(
		() => typeof window !== "undefined" && !!window.turnstile,
	);

	useEffect(() => {
		if (!scriptReady || !SITE_KEY || !containerRef.current || !window.turnstile)
			return;

		const widgetId = window.turnstile.render(containerRef.current, {
			sitekey: SITE_KEY,
			appearance: "interaction-only",
			theme: "light",
			callback: (token: string) => onTokenRef.current(token),
			"expired-callback": () => onTokenRef.current(null),
			"error-callback": () => onTokenRef.current(null),
		});

		return () => window.turnstile?.remove(widgetId);
	}, [scriptReady]);

	if (!SITE_KEY) {
		console.error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set");
		return null;
	}

	return (
		<>
			<div ref={containerRef} className={className} />
			<Script
				src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
				strategy="afterInteractive"
				onReady={() => setScriptReady(true)}
			/>
		</>
	);
}
