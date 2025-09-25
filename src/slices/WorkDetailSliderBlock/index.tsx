import type { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import type { SliceComponentProps } from "@prismicio/react";
import type { FC } from "react";

/**
 * Props for `WorkDetailSliderBlock`.
 */
export type WorkDetailSliderBlockProps =
  SliceComponentProps<Content.WorkDetailSliderBlockSlice>;

/**
 * Component for "WorkDetailSliderBlock" Slices.
 */
const WorkDetailSliderBlock: FC<WorkDetailSliderBlockProps> = ({ slice }) => {
  return (
    <div className="drag-slider xl-bottom-3 xs-bottom-4">
      <div className="slider-inner st-grid">
        {slice.primary.images?.map((item, index) => (
          <figure
            key={item.image?.url || `slider-image-${index}`}
            className={`${index === 0 ? "st-xl-12" : "st-xl-8"} img-anim`}
          >
            <PrismicNextImage field={item.image} className="lazy" />
          </figure>
        ))}
      </div>
    </div>
  );
};

export default WorkDetailSliderBlock;
