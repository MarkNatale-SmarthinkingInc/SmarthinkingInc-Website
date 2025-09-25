import type { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
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
  return (
    <figure className="img-box img-100 img-anim">
      <PrismicNextImage field={slice.primary.image} className="lazy" />
    </figure>
  );
};

export default WorkDetailImageFullBlock;
