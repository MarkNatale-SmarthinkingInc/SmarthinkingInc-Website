import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import FooterNewsletter from "./footer-newsletter";

export default async function FooterSection() {
  const client = createClient();
  const navigation = await client.getSingle("navigation");
  const services = await client.getAllByType("service", {
    orderings: [
      {
        field: "my.service.order",
        direction: "asc",
      },
    ],
  });
  const settings = await client.getSingle("settings");
  const footer = await client.getSingle("footer");

  return (
    <footer id="footer">
      <div className="footer-top grid-margin st-grid xs-wrap">
        <div className="st-xl-3 st-sm-5 st-xs-7">
          <h3 className="caption">Navigation</h3>
          <ul className="f-20">
            {navigation.data.links?.map((item, index) =>
              item.link && isFilled.link(item.link) ? (
                <li key={`nav-${index}-${item.link.text}`}>
                  <PrismicNextLink field={item.link} className="text-link">
                    {item.link.text}
                  </PrismicNextLink>
                </li>
              ) : null
            )}
          </ul>
        </div>
        <div className="st-xl-4 st-sm-6 st-xs-10">
          <h3 className="caption">Services</h3>
          <ul className="f-20">
            {services.map((service, index) =>
              service.data?.title ? (
                <li key={`service-${index}-${service.data.title}`}>
                  <PrismicNextLink document={service} className="text-link">
                    {service.data.title}
                  </PrismicNextLink>
                </li>
              ) : null
            )}
          </ul>
        </div>
        <div className="st-xl-8 st-xl-os-3 st-sm-7 st-sm-os-0 st-xs-10 st-xs-os-7 xs-top-5">
          <h3 className="caption">Contact</h3>
          <address className="st-grid f-20 sm-wrap">
            <div className="st-xl-4 st-sm-7">
              {footer.data.contact_email && (
                <>
                  <a
                    href={`mailto:${footer.data.contact_email}`}
                    className="text-link"
                  >
                    {footer.data.contact_email}
                  </a>
                  <br />
                </>
              )}
              {footer.data.contact_phone && (
                <a
                  href={`tel:${footer.data.contact_phone.replace(/\D/g, "")}`}
                  className="text-link"
                >
                  {footer.data.contact_phone}
                </a>
              )}
            </div>
            <div className="st-xl-4 st-sm-7 sm-top-1">
              {footer.data.contact_address && (
                <PrismicRichText
                  field={footer.data.contact_address}
                  components={{
                    paragraph: ({ children }) => <span>{children}</span>,
                  }}
                />
              )}
            </div>
          </address>
        </div>
      </div>
      <div className="footer-middle st-grid grid-margin sm-wrap sm-reverse">
        <div className="st-xl-10 st-sm-18 f-20 self-end sm-center sm-top-1">
          <span>©{new Date().getFullYear()} Smarthinking Inc. All rights reserved</span>
          <Link href="/terms-of-service" className="text-link">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="text-link">
            Privacy Policy
          </Link>
        </div>
        <div className="st-xl-8 st-sm-18 st-grid sm-top-2 xs-top-5 xs-wrap">
          <div className="st-xs-18">
            <FooterNewsletter />
          </div>
          <div className="social self-end">
            <PrismicNextLink
              field={settings.data.instagram_link}
              aria-label="Visit our Instagram"
            >
              <img src="/img/svg/instagram.svg" alt="Instagram icon" />
            </PrismicNextLink>
            <PrismicNextLink
              field={settings.data.linkedin_link}
              aria-label="Visit our LinkedIn"
            >
              <img src="/img/svg/linkedin.svg" alt="LinkedIn icon" />
            </PrismicNextLink>
          </div>
        </div>
      </div>
      <div className="footer-bottom string-canvas">
        <figure>
          <img src="/img/svg/logo-dark.svg" alt="Smarthinking Inc. logo" />
          <img src="/img/svg/logo-dark.svg" alt="" aria-hidden="true" />
        </figure>
        <canvas className="string-lines gridFooter"></canvas>
      </div>
    </footer>
  );
}
