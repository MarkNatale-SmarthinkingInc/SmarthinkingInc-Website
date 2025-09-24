import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import type { FC } from "react";

/**
 * Props for `QuoteBlock`.
 */
export type QuoteBlockProps = SliceComponentProps<Content.QuoteBlockSlice>;

/**
 * Component for "QuoteBlock" Slices.
 */
const QuoteBlock: FC<QuoteBlockProps> = ({ slice }) => {
  return (
    <div className="quote">
      <p className="st-xl-os-1 st-xs-os-3 f-28 xs-bottom-3">
        {slice.primary.quote}
      </p>
      <div className="st-xl-os-1 st-xs-os-3 caption">
        {slice.primary.quote_author}
      </div>
    </div>
  );
};

export default QuoteBlock;
