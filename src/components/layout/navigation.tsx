import { createClient } from "@/prismicio";
import { isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

export default async function Navigation() {
  const client = createClient();
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");
  return (
    <nav id="nav" className="st-xl-7 st-lg-8 st-sm-10 st-xs-18 st-xs-os-0">
      <div className="nav-links">
        {navigation.data.links.map((link) => {
          if (link.link && isFilled.link(link.link)) {
            return (
              <PrismicNextLink field={link.link} key={link.link.text}>
                {link.link.text}
              </PrismicNextLink>
            );
          }
          return null;
        })}
      </div>
      <div className="nav-social">
        <PrismicNextLink
          field={settings.data.instagram_link}
          aria-label="Visit our Instagram"
        >
          <img src="/img/svg/instagram-white.svg" alt="Instagram icon" />
        </PrismicNextLink>
        <PrismicNextLink
          field={settings.data.linkedin_link}
          aria-label="Visit our LinkedIn"
        >
          <img src="/img/svg/linkedin-white.svg" alt="LinkedIn icon" />
        </PrismicNextLink>
      </div>
    </nav>
  );
}
