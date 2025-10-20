"use client";

import { useContact } from "@/hooks/use-contact.hook";
import Image from "next/image";

interface ContactDetailProps {
  data: import("@prismicio/client").Content.ContactDocumentData;
}

export default function ContactDetailSection({ data }: ContactDetailProps) {
  const { state, updateField, submitForm, reset } = useContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  const handleReset = () => {
    reset();
  };

  return (
    <section id="contact-detail" className="grid-margin st-grid xs-wrap fadeIn">
      <div className="st-xl-10 st-sm-7 st-xs-18 st-grid sm-wrap ">
        <div className="st-xl-4 st-sm-7 st-xs-18 xs-both-1">
          <h2 className="f-60">{data.contact_title}</h2>
        </div>
        <div className="st-xl-5 st-xl-os-1 st-sm-7 st-sm-os-0 st-xs-18 fadeUp">
          <figure className="sm-top-1">
            <Image
              alt={data.contact_image?.alt ?? ""}
              src={`${data.contact_image?.url}&fit=clip&w=1440`}
              sizes="(max-width: 768px) 100vw, 1440px"
              blurDataURL={`${data.contact_image?.url}&w=100&blur=40`}
              placeholder="blur"
              width={data.contact_image?.dimensions?.width || 1440}
              height={data.contact_image?.dimensions?.height || 810}
              className="lazy"
            />
          </figure>
          <address>
            <h3 className="sup-title">General inquiries</h3>
            <a
              className="f-20 text-link"
              href={`mailto:${data.general_inquiries_email}`}
            >
              {data.general_inquiries_email}
            </a>
            <br />
            <a
              className="f-20 text-link"
              href={`tel:${data.general_inquiries_phone}`}
            >
              {data.general_inquiries_phone}
            </a>
          </address>
          <address>
            <h3 className="sup-title">Press inquiries</h3>
            <a
              className="f-20 text-link"
              href={`mailto:${data.press_inquiries_email}`}
            >
              {data.press_inquiries_email}
            </a>
            <br />
            <a
              className="f-20 text-link"
              href={`tel:${data.press_inquiries_phone}`}
            >
              {data.press_inquiries_phone}
            </a>
          </address>
        </div>
      </div>
      <div id="contact-form" className="st-xl-8 st-sm-11 st-xs-18 xs-top-3">
        {state.isSuccess ? (
          <div className="fadeUp">
            <div className="success-message">
              <h3>Thank you!</h3>
              <p>
                Your message has been sent successfully. We'll get back to you
                soon.
              </p>
              <button type="button" onClick={handleReset}>
                Send another message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="fadeUp">
            {state.error && (
              <div
                className="error-message"
                style={{
                  padding: "1rem",
                  backgroundColor: "#ffeaea",
                  borderRadius: "8px",
                  marginBottom: "1rem",
                  color: "#d32f2f",
                }}
              >
                {state.error}
              </div>
            )}

            <input
              className="text-box"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First name"
              value={state.formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              disabled={state.isLoading}
              required
            />
            <input
              className="text-box"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last name"
              value={state.formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              disabled={state.isLoading}
              required
            />
            <input
              className="text-box"
              type="text"
              id="cName"
              name="cName"
              placeholder="Company Name"
              value={state.formData.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              disabled={state.isLoading}
              required
            />
            <input
              className="text-box"
              type="email"
              placeholder="Email"
              name="mail"
              value={state.formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              disabled={state.isLoading}
              required
            />
            <input
              className="text-box"
              type="tel"
              placeholder="Phone"
              name="phone"
              value={state.formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              disabled={state.isLoading}
              required
            />
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Message"
              value={state.formData.message}
              onChange={(e) => updateField("message", e.target.value)}
              disabled={state.isLoading}
            />
            <div className="form-button">
              <input
                type="submit"
                value={state.isLoading ? "Submitting..." : "Submit"}
                disabled={state.isLoading}
                style={{
                  opacity: state.isLoading ? 0.7 : 1,
                  cursor: state.isLoading ? "not-allowed" : "pointer",
                }}
              />
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
