"use client";

import { useNewsletter } from "@/hooks/use-newsletter.hook";
import { useState } from "react";

export default function FooterNewsletter() {
  const { state, subscribe, setEmail } = useNewsletter();
  const [localEmail, setLocalEmail] = useState("");

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

  if (state.isSuccess) {
    return (
      <div>
        <h3 className="caption">Sign up for updates</h3>
        <div className="newsletter-success">
          <p className="f-16">✓ Successfully subscribed to our newsletter!</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} id="newsletter">
      <h3 className="caption">Sign up for updates</h3>
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
      {state.error && <p className="newsletter-error f-14">{state.error}</p>}
    </form>
  );
}
