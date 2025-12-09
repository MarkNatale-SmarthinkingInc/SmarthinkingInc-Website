import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import type { FC } from "react";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock: FC<ImageBlockProps> = ({ slice }) => {
  return (
    <figure>
      <img
        alt={slice.primary.image?.alt ?? ""}
        src={`${slice.primary.image?.url}&fit=clip&w=1920&q=85`}
        srcSet={[
          `${slice.primary.image?.url}&fit=clip&w=768&q=85 768w`,
          `${slice.primary.image?.url}&fit=clip&w=1024&q=85 1024w`,
          `${slice.primary.image?.url}&fit=clip&w=1440&q=85 1440w`,
          `${slice.primary.image?.url}&fit=clip&w=1920&q=85 1920w`,
        ].join(", ")}
        sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
        width={slice.primary.image?.dimensions?.width || 1440}
        height={slice.primary.image?.dimensions?.height || 810}
        loading="lazy"
        decoding="async"
        className="lazy"
      />
    </figure>
  );
};

export default ImageBlock;
