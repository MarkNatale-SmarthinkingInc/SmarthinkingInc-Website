import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import type { FC } from "react";

/**
 * Props for `WorkDetailImageFullBlock`.
 */
export type WorkDetailImageFullBlockProps =
  SliceComponentProps<Content.WorkDetailImageFullBlockSlice>;

/**
 * Component for "WorkDetailImageFullBlock" Slices.
 */
const WorkDetailImageFullBlock: FC<WorkDetailImageFullBlockProps> = ({
  slice,
}) => {
  const image = slice.primary.image;

  if (!image?.url) return null;

  const srcSet = [
    `${image.url}&fit=clip&w=768&q=85 768w`,
    `${image.url}&fit=clip&w=1024&q=85 1024w`,
    `${image.url}&fit=clip&w=1440&q=85 1440w`,
    `${image.url}&fit=clip&w=1920&q=85 1920w`,
  ].join(", ");

  return (
    <figure className="img-box img-100 img-anim">
      <img
        alt={image.alt ?? ""}
        src={`${image.url}&fit=clip&w=1920&q=85`}
        srcSet={srcSet}
        sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
        width={image.dimensions?.width || 1440}
        height={image.dimensions?.height || 810}
        loading="lazy"
        decoding="async"
        className="lazy"
      />
    </figure>
  );
};

export default WorkDetailImageFullBlock;
