import type { ReactNode } from "react";

interface LabelledCopySectionProps {
  id: string;
  label: string;
  /** Extra classes on the section itself, e.g. "BgFade" for the tinted variant. */
  className?: string;
  children: ReactNode;
}

/**
 * Diamond label on the left, running copy on the right. Shared by "Our Services"
 * and "How The Services Interplay", which are the same layout on different
 * backgrounds. The section is full-bleed so a background colour reaches the
 * viewport edges; the grid margin sits on the inner wrapper.
 */
export default function LabelledCopySection({
  id,
  label,
  className,
  children,
}: LabelledCopySectionProps) {
  return (
    <section
      id={id}
      className={`labelled-copy${className ? ` ${className}` : ""}`}
    >
      <div className="grid-margin">
        <div className="st-grid sm-wrap">
          <div className="st-xl-6 st-xl-os-1 st-sm-18 st-sm-os-0">
            <h2 className="f-40 upper section-label">{label}</h2>
          </div>
          <div className="st-xl-10 st-sm-18 st-sm-os-0 sm-top-2 section-copy">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
