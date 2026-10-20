"use client";

import Turnstile from "@/components/global/turnstile";
import {
  type GatedContentFormData,
  useGatedContent,
} from "@/hooks/use-gated-content.hook";
import type { KeyTextField } from "@prismicio/client";
import { useState } from "react";

interface GatedContentFormProps {
  uid: string;
  heading?: KeyTextField;
  description?: KeyTextField;
}

const FIELDS: {
  name: keyof GatedContentFormData;
  label: string;
  type: "text" | "email";
  autoComplete: string;
}[] = [
  {
    name: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
  },
  {
    name: "firstName",
    label: "First name",
    type: "text",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    label: "Last name",
    type: "text",
    autoComplete: "family-name",
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    autoComplete: "organization",
  },
  {
    name: "jobTitle",
    label: "Job title",
    type: "text",
    autoComplete: "organization-title",
  },
];

// Gated download box for blog posts. Turned on per post in Prismic's
// "Gated Content" tab; the form name, Act-On form ID and download link are
// filled in there and stay on the server (see /api/gated-content).
export default function GatedContentForm({
  uid,
  heading,
  description,
}: GatedContentFormProps) {
  const { state, updateField, setTurnstileToken, submitForm } =
    useGatedContent(uid);
  // Turnstile loads once someone starts filling the form in.
  const [engaged, setEngaged] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  return (
    <aside className="gated-content">
      <h2 className="f-40">{heading || "Get the free download"}</h2>
      {description && (
        <p className="f-20 gated-content-description">{description}</p>
      )}

      {state.isSuccess ? (
        <div className="gated-content-success">
          <p className="f-20">Thank you! Your download is ready.</p>
          {state.downloadUrl && (
            <a
              className="gated-content-button"
              href={state.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Download now
            </a>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} onFocus={() => setEngaged(true)}>
          {FIELDS.map((field) => (
            <input
              key={field.name}
              className="text-box"
              type={field.type}
              name={field.name}
              autoComplete={field.autoComplete}
              aria-label={field.label}
              placeholder={field.label}
              value={state.formData[field.name]}
              onChange={(e) => updateField(field.name, e.target.value)}
              required
              disabled={state.isLoading}
            />
          ))}
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
            style={{
              position: "absolute",
              left: "-9999px",
              width: 1,
              height: 1,
            }}
          />
          {engaged && (
            <Turnstile key={state.attempt} onToken={setTurnstileToken} />
          )}
          <input
            type="submit"
            value={state.isLoading ? "Submitting..." : "Get the download"}
            disabled={state.isLoading}
          />
          {state.error && (
            <p className="gated-content-error f-14" role="alert">
              {state.error}
            </p>
          )}
        </form>
      )}
    </aside>
  );
}
