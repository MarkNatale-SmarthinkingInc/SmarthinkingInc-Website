"use client";

import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  text: string | null | undefined;
};

export default function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
	<div className="nav-links">
	  {links.map((link) => {
		const linkPathname = new URL(link.href, window.location.origin).pathname;
		const isActive = linkPathname === pathname;

		if (isActive) {
		  return (
			<span key={link.text} aria-current="page">
			  {link.text}
			</span>
		  );
		}

		return (
		  <a key={link.text} href={link.href}>
			{link.text}
		  </a>
		);
	  })}
	</div>
  );
}