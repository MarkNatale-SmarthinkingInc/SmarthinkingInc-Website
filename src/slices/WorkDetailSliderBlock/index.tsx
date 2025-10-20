import type { Content } from "@prismicio/client";
import Image from "next/image";
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
            <Image
              alt={item.image?.alt ?? ""}
              src={`${item.image?.url}&fit=clip&w=1440`}
              sizes="(max-width: 768px) 100vw, 1440px"
              blurDataURL={`${item.image?.url}&w=100&blur=40`}
              placeholder="blur"
              width={item.image?.dimensions?.width || 1440}
              height={item.image?.dimensions?.height || 810}
              className="lazy"
            />
          </figure>
        ))}
      </div>
      <div id="drag-progress">
        <div className="drag-inner"></div>
      </div>
    </div>
  );
};

export default WorkDetailSliderBlock;
