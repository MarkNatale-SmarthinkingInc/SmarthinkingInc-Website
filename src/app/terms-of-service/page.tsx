import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";

export default async function PrivacyPolicyPage() {
  const client = createClient();
  const termsOfService = await client.getSingle("terms_of_service");
  return (
    <div id="smooth-content" className="legal" data-page="legal">
      <section id="legal-wrap" className="grid-margin">
        <div className="st-grid scroll-fix-wrap">
          <aside className="st-xl-5 scroll-fix xl-self-start xs-hidden fadeUp">
            <ul className="f-18 upper CopyBold">
              <li>
                <Link href="/terms-of-service" className="selected">
                  Terms of service
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </aside>
          <div className="st-xl-11 st-xl-os-1 st-xs-18 st-xs-os-0 text-content fadeUp">
            <PrismicRichText
              field={termsOfService.data.content}
              components={{
                heading1: ({ children }) => (
                  <h1 className="f-80">{children}</h1>
                ),
                heading2: ({ children }) => (
                  <h2 className="number-title f-40">{children}</h2>
                ),
                paragraph: ({ children }) => <p>{children}</p>,
                oList: ({ children }) => <ol className="f-20">{children}</ol>,
                listItem: ({ children }) => <li>{children}</li>,
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
