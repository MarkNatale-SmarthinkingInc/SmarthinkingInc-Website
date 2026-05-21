"use client";

import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { text: "Services", href: "/services" },
  { text: "Work", href: "/work" },
  { text: "About", href: "/about" },
  { text: "Blog", href: "/blog" },
  { text: "Contact", href: "/contact" },
];

export default function Navigation({ instagramLink, linkedinLink }: {
  instagramLink: any;
  linkedinLink: any;
}) {
  const pathname = usePathname();

  return (
    <nav id="nav" className="st-xl-7 st-lg-8 st-sm-10 st-xs-18 st-xs-os-0">
      <div className="nav-links">
        {NAV_LINKS.map((link) => (
          
            key={link.href}
            href={link.href === pathname ? "#" : link.href}
            onClick={link.href === pathname ? (e) => e.preventDefault() : undefined}
          >
            {link.text}
          </a>
        ))}
      </div>
      <div className="nav-social">
        <PrismicNextLink field={instagramLink} aria-label="Visit our Instagram">
          <img src="/img/svg/instagram-white.svg" alt="Instagram icon" />
        </PrismicNextLink>
        <PrismicNextLink field={linkedinLink} aria-label="Visit our LinkedIn">
          <img src="/img/svg/linkedin-white.svg" alt="LinkedIn icon" />
        </PrismicNextLink>
      </div>
    </nav>
  );
}