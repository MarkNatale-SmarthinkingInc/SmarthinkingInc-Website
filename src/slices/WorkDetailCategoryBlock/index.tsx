import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import type { FC } from "react";

/**
 * Props for `WorkDetailCategoryBlock`.
 */
export type WorkDetailCategoryBlockProps =
  SliceComponentProps<Content.WorkDetailCategoryBlockSlice>;

/**
 * Component for "WorkDetailCategoryBlock" Slices.
 */
const WorkDetailCategoryBlock: FC<WorkDetailCategoryBlockProps> = ({
  slice,
}) => {
  return (
    <div className="category st-grid xs-wrap xl-top-3">
      <div className="st-xl-5 st-xs-16">
        <h3 className="sup-title">
          {isFilled.contentRelationship(slice.primary.service) &&
          slice.primary.service.data?.title
            ? slice.primary.service.data.title
            : null}
        </h3>
      </div>
      <div className="st-xl-6 st-xl-os-3 st-lg-7 st-lg-os-2 st-xs-16 st-xs-os-0 xs-top-3">
        <PrismicRichText
          field={slice.primary.description}
          components={{
            paragraph: ({ children }) => <p>{children}</p>,
            strong: ({ children }) => <strong>{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            hyperlink: ({ children, node }) => (
              <a href={node.data.url}>{children}</a>
            ),
          }}
        />
      </div>
      <div className="st-xl-2 right xs-hidden">
        <span className="caption">{slice.primary.caption}</span>
      </div>
    </div>
  );
};

export default WorkDetailCategoryBlock;
