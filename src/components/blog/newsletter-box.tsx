"use client";

import { useNewsletter } from "@/hooks/use-newsletter.hook";
import type { KeyTextField } from "@prismicio/client";
import { useState } from "react";

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
  const { state, subscribe, setEmail } = useNewsletter();
  const [localEmail, setLocalEmail] = useState("");

  const titleClass = variant === "blog-detail" ? "f-28" : "f-40";
  const subtitleClass = variant === "blog-detail" ? "caption" : "sup-title";
  const wrapperClass =
    variant === "blog-detail" ? "newsletter-box scroll-fix" : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await subscribe(localEmail);
    if (!state.error) {
      setLocalEmail("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setLocalEmail(email);
    setEmail(email);
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
          <p
            className="f-16"
            style={{ color: "#28a745", marginBottom: "1rem" }}
          >
            ✓ Successfully subscribed to our newsletter!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="newsletter">
          <div className="input-box">
            <input
              type="email"
              placeholder="Your email..."
              value={localEmail}
              onChange={handleEmailChange}
              required
              disabled={state.isLoading}
            />
            <input
              type="submit"
              value={state.isLoading ? "Submitting..." : "Submit"}
              disabled={state.isLoading}
            />
          </div>
          {state.error && (
            <p
              className="newsletter-error f-14"
              style={{ color: "#dc3545", marginTop: "0.5rem" }}
            >
              {state.error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
