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
				// Extract just the pathname portion, handling both relative and absolute URLs
				const linkPathname = link.href.startsWith("http")
					? new URL(link.href).pathname
					: link.href;

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