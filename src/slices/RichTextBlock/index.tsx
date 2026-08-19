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
        // Prismic authors leave stray empty paragraphs behind; each one used
        // to eat a full paragraph gap and read as a random hole in the flow.
        // Return an empty fragment, not null — Prismic's serializer treats a
        // nullish result as "not handled" and falls back to a bare <p>.
        paragraph: ({ children, node }) =>
          node.text.trim() ? <p className="f-20">{children}</p> : <></>,
        heading2: ({ children }) => <h3 className="f-40">{children}</h3>,
        // `list` is Prismic's bulleted list and `oList` its numbered one;
        // these two were mapped to the wrong elements.
        list: ({ children }) => <ul className="f-20">{children}</ul>,
        listItem: ({ children }) => <li>{children}</li>,
        oList: ({ children }) => <ol className="f-20">{children}</ol>,
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
