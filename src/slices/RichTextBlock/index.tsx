import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";
import type { FC } from "react";

/**
 * Props for `RichTextBlock`.
 */
export type RichTextBlockProps =
  SliceComponentProps<Content.RichTextBlockSlice>;

/**
 * Component for "RichTextBlock" Slices.
 */
const RichTextBlock: FC<RichTextBlockProps> = ({ slice }) => {
  return (
    <PrismicRichText
      field={slice.primary.content}
      components={{
        paragraph: ({ children }) => <p className="f-20">{children}</p>,
        heading2: ({ children }) => <h3 className="f-40">{children}</h3>,
        list: ({ children }) => <ol className="f-20">{children}</ol>,
        listItem: ({ children }) => <li>{children}</li>,
        oList: ({ children }) => <ul className="f-20">{children}</ul>,
        oListItem: ({ children }) => <li>{children}</li>,
        strong: ({ children }) => <strong>{children}</strong>,
        em: ({ children }) => <em>{children}</em>,
        hyperlink: ({ children, node }) => (
          <a href={node.data.url}>{children}</a>
        ),
      }}
    />
  );
};

export default RichTextBlock;
