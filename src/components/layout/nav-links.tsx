"use client";

import { usePathname } from "next/navigation";
import { PrismicNextLink } from "@prismicio/next";
import type { LinkField } from "@prismicio/client";

type NavLink = {
	field: LinkField;
	text: string | null | undefined;
};

export default function NavLinks({ links }: { links: NavLink[] }) {
	const pathname = usePathname();

	return (
		<div className="nav-links">
			{links.map((link) => {
				// Prismic fills `url` on the resolved link field
				const href = (link.field as { url?: string }).url ?? "";
				const linkPathname = href.startsWith("http")
					? new URL(href).pathname
					: href;

				const isActive = linkPathname === pathname;

				if (isActive) {
					return (
						<span key={link.text} aria-current="page">
							{link.text}
						</span>
					);
				}

				return (
					<PrismicNextLink key={link.text} field={link.field}>
						{link.text}
					</PrismicNextLink>
				);
			})}
		</div>
	);
}