"use client";

import type { KeyTextField } from "@prismicio/client";
import { useState } from "react";
import Turnstile from "@/components/global/turnstile";
import { useNewsletter } from "@/hooks/use-newsletter.hook";

interface NewsletterBoxProps {
  title?: KeyTextField;
  subtitle?: KeyTextField;
  variant?: "blog-detail" | "blog-listing";
  className?: string;
}

export default function NewsletterBox({
  title,
  subtitle,
  variant = "blog-detail",
  className = "",
}: NewsletterBoxProps) {
  const { state, updateField, setTurnstileToken, subscribe } = useNewsletter();
  // Turnstile loads once someone starts filling the form in.
  const [engaged, setEngaged] = useState(false);

  const titleClass = variant === "blog-detail" ? "f-28" : "f-40";
  const subtitleClass = variant === "blog-detail" ? "caption" : "sup-title";
  const wrapperClass =
    variant === "blog-detail" ? "newsletter-box scroll-fix" : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await subscribe();
  };

  return (
    <div className={`${wrapperClass} ${className}`.trim()}>
      {subtitle && <h3 className={subtitleClass}>{subtitle}</h3>}
      {!subtitle && variant === "blog-detail" && (
        <h3 className="caption">Newsletter</h3>
      )}
      <h2 className={titleClass}>{title}</h2>

      {state.isSuccess ? (
        <div className="newsletter-success">
          <p className="f-16">Thanks for signing up! Check your inbox soon for more information!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          onFocus={() => setEngaged(true)}
          className="newsletter"
        >
          <div className="input-box">
            <input
              className="text-box"
              type="text"
              name="firstName"
              autoComplete="given-name"
              aria-label="First name"
              placeholder="First name"
              value={state.formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              required
              disabled={state.isLoading}
            />
            <input
              className="text-box"
              type="text"
              name="lastName"
              autoComplete="family-name"
              aria-label="Last name"
              placeholder="Last name"
              value={state.formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              required
              disabled={state.isLoading}
            />
            <input
              type="email"
              name="email"
              autoComplete="email"
              aria-label="Email address"
              placeholder="Your email..."
              value={state.formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              required
              disabled={state.isLoading}
            />
            {/* Honeypot: off-screen and skipped by keyboard and screen
                readers, so only bots fill it in. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={state.formData.website}
              onChange={(e) => updateField("website", e.target.value)}
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
            />
            {engaged && (
              <Turnstile key={state.attempt} onToken={setTurnstileToken} />
            )}
            <input
              type="submit"
              value={state.isLoading ? "Submitting..." : "Submit"}
              disabled={state.isLoading}
            />
          </div>
          {state.error && (
            <p className="newsletter-error f-14">{state.error}</p>
          )}
        </form>
      )}
    </div>
  );
}
