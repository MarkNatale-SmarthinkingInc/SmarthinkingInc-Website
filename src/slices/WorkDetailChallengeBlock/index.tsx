import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import type { FC } from "react";

/**
 * Props for `WorkDetailChallengeBlock`.
 */
export type WorkDetailChallengeBlockProps =
  SliceComponentProps<Content.WorkDetailChallengeBlockSlice>;

/**
 * Component for "WorkDetailChallengeBlock" Slices.
 */
const WorkDetailChallengeBlock: FC<WorkDetailChallengeBlockProps> = ({
  slice,
}) => {
  return (
    <div className="st-grid xs-bottom-8 xs-wrap">
      <div className="st-xl-5 st-xs-16">
        <h2 className="f-40">The Challenge</h2>
      </div>
      <div className="st-xl-8 st-xl-os-3 st-lg-9 st-lg-os-2 column-2 st-xs-16 st-xs-os-0 xs-top-4">
        <PrismicRichText
          field={slice.primary.content}
          components={{
            paragraph: ({ children }) => <p>{children}</p>,
            strong: ({ children }) => <strong>{children}</strong>,
            em: ({ children }) => <em>{children}</em>,
            hyperlink: ({ children, node }) => (
              <a href={node.data.url}>{children}</a>
            ),
            list: ({ children }) => <ol>{children}</ol>,
            listItem: ({ children }) => <li>{children}</li>,
            oList: ({ children }) => <ul>{children}</ul>,
            oListItem: ({ children }) => <li>{children}</li>,
          }}
        />
      </div>
    </div>
  );
};

export default WorkDetailChallengeBlock;
