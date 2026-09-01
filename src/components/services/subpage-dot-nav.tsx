import Link from "next/link";

/** The three service subpages, in the order the comp shows them. */
const SUBPAGES = [
  { slug: "brand-foundation", label: "Brand Foundation" },
  { slug: "brand-activation", label: "Brand Activation" },
  { slug: "marketing-orchestration", label: "Marketing Orchestration" },
] as const;

export type SubpageSlug = (typeof SUBPAGES)[number]["slug"];

interface SubpageDotNavProps {
  /** The page this nav sits on — its dot is the highlighted one. */
  current: SubpageSlug;
}

/**
 * The diamond row under the intro eyebrow.
 *
 * Visually it mirrors the "Word On The Street" controls on /services
 * (#testimonial-box .t-control): the same brown diamond, the same red one at
 * scale(1.6) for the current item, the same 1000ms easing — drawn at the
 * smaller size the subpage comp uses.
 *
 * Functionally it is different: these are links, one per service subpage, so
 * the row doubles as navigation between the three. That is also why it is a
 * <nav> rather than the decorative aria-hidden <p> it replaced.
 */
export default function SubpageDotNav({ current }: SubpageDotNavProps) {
  return (
    <nav className="dot-rule" aria-label="Service pages">
      {SUBPAGES.map((page) => {
        const isCurrent = page.slug === current;
        return (
          <Link
            key={page.slug}
            href={`/services/${page.slug}`}
            className={isCurrent ? "active" : undefined}
            aria-current={isCurrent ? "page" : undefined}
          >
            {/* Visually hidden — the dot carries the meaning, but the link
                still needs an accessible name. */}
            <span>{page.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
