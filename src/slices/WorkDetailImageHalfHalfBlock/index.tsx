import type { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import type { SliceComponentProps } from "@prismicio/react";
import type { FC } from "react";

/**
 * Props for `WorkDetailImageHalfHalfBlock`.
 */
export type WorkDetailImageHalfHalfBlockProps =
  SliceComponentProps<Content.WorkDetailImageHalfHalfBlockSlice>;

/**
 * Component for "WorkDetailImageHalfHalfBlock" Slices.
 */
const WorkDetailImageHalfHalfBlock: FC<WorkDetailImageHalfHalfBlockProps> = ({
  slice,
}) => {
  return (
    <div className="img-box img-50 st-grid">
      <figure className="st-xl-8 img-anim">
        <PrismicNextImage field={slice.primary.left_image} className="lazy" />
      </figure>
      <figure className="st-xl-8 self-start img-anim">
        <PrismicNextImage field={slice.primary.right_image} className="lazy" />
      </figure>
    </div>
  );
};

export default WorkDetailImageHalfHalfBlock;
