"use client";

import { useRef, useState } from "react";
import Turnstile from "@/components/global/turnstile";
import {
  isValidEmail,
  type NewsletterFormData,
  useNewsletter,
} from "@/hooks/use-newsletter.hook";

// The footer signup is one field wide by design, so it asks for one thing at
// a time: first name → last name → email. The arrow advances (so does Enter);
// Backspace in an empty field steps back.
const STEPS = [
  {
    field: "firstName",
    type: "text",
    placeholder: "First name...",
    label: "First name",
    autoComplete: "given-name",
  },
  {
    field: "lastName",
    type: "text",
    placeholder: "Last name...",
    label: "Last name",
    autoComplete: "family-name",
  },
  {
    field: "email",
    type: "email",
    placeholder: "Your email...",
    label: "Email address",
    autoComplete: "email",
  },
] as const satisfies ReadonlyArray<{
  field: keyof NewsletterFormData;
  type: string;
  placeholder: string;
  label: string;
  autoComplete: string;
}>;

export default function FooterNewsletter() {
  const { state, updateField, setTurnstileToken, setError, subscribe } =
    useNewsletter();
  const [step, setStep] = useState(0);
  // Turnstile only loads once someone starts filling the form in, so the
  // footer doesn't pull Cloudflare's script onto every page view.
  const [engaged, setEngaged] = useState(false);
  const focusPending = useRef(false);

  const current = STEPS[step];
  const isLastStep = step === STEPS.length - 1;
  const value = state.formData[current.field];

  // Each step is a fresh input (keyed), so it takes focus as it mounts. The
  // flag is set only when the visitor changes step and is consumed here, so
  // later re-renders (and the first page load) never steal focus.
  const focusOnStepChange = (el: HTMLInputElement | null) => {
    if (el && focusPending.current) {
      focusPending.current = false;
      el.focus();
    }
  };

  const goTo = (next: number) => {
    focusPending.current = true;
    setError(null);
    setStep(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!value.trim()) {
      setError(`Please enter your ${current.label.toLowerCase()}`);
      return;
    }
    if (current.field === "email" && !isValidEmail(value)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!isLastStep) {
      goTo(step + 1);
      return;
    }

    await subscribe();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value && step > 0) {
      e.preventDefault();
      goTo(step - 1);
    }
  };

  if (state.isSuccess) {
    return (
      <div>
        <h3 className="caption">Sign up for updates</h3>
        <div className="newsletter-success">
          <p className="f-16" style={{lineHeight: 0.9}}>Thanks for signing up!</p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={() => setEngaged(true)}
      id="newsletter"
      noValidate
    >
      <h3 className="caption">Sign up for updates</h3>
      <div className="input-box">
        <input
          key={current.field}
          ref={focusOnStepChange}
          className={current.type === "text" ? "text-box" : undefined}
          type={current.type}
          name={current.field}
          autoComplete={current.autoComplete}
          aria-label={`${current.label} (step ${step + 1} of ${STEPS.length})`}
          placeholder={current.placeholder}
          value={value}
          onChange={(e) => updateField(current.field, e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={state.isLoading}
        />
        <input
          type="submit"
          className={isLastStep ? undefined : "is-next"}
          aria-label={isLastStep ? undefined : "Next"}
          value={isLastStep ? (state.isLoading ? "Submitting..." : "Submit") : "→"}
          disabled={state.isLoading}
        />
      </div>
      {/* Honeypot: off-screen and skipped by keyboard and screen readers,
          so only bots fill it in. */}
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
      {state.error && <p className="newsletter-error f-14">{state.error}</p>}
    </form>
  );
}
