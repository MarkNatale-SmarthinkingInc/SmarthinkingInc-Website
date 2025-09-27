import { isFilled } from "@prismicio/client";
import type { Content } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import type { SliceComponentProps } from "@prismicio/react";
import type { FC } from "react";

/**
 * Props for `WorkDetailResultsBlock`.
 */
export type WorkDetailResultsBlockProps =
  SliceComponentProps<Content.WorkDetailResultsBlockSlice>;

/**
 * Component for "WorkDetailResultsBlock" Slices.
 */
const WorkDetailResultsBlock: FC<WorkDetailResultsBlockProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="st-grid xl-top-5 xs-top-10 xs-wrap">
        <div className="st-xl-5 st-xs-16">
          <h2 className="f-40">The Results</h2>
        </div>
        {isFilled.richText(slice.primary.content) && (
          <div className="st-xl-8 st-xl-os-3 st-lg-9 st-lg-os-2 column-2 st-xs-16 st-xs-os-0 xs-top-4">
            <PrismicRichText
              field={slice.primary.content}
              components={{
                paragraph: ({ children }) => <p className="f-28">{children}</p>,
              }}
            />
          </div>
        )}
      </div>

      {isFilled.group(slice.primary.results) &&
        slice.primary.results.length > 0 && (
          <div className="result-table xl-top-2 xs-top-6">
            {slice.primary.results.map((item) => (
              <div key={item.number} className="table-item st-grid">
                <div className="st-xl-4">
                  <span className="f-100">
                    <span className="f-60">{item.number}</span>
                    {item.number?.includes("%") ? null : (
                      <sup className="f-32">%</sup>
                    )}
                  </span>
                </div>
                <div className="st-xl-4 st-xl-os-4 st-lg-5 st-lg-os-3 st-xs-9 xs-right">
                  <span className="f-100 Brown">{item.stat}</span>
                </div>
                <div className="st-xl-4 right xs-hidden">
                  <span className="caption">{item.explanation}</span>
                </div>
              </div>
            ))}
          </div>
        )}
    </section>
  );
};

export default WorkDetailResultsBlock;
