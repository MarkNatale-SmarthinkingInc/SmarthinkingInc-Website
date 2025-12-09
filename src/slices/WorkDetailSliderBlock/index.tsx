import type { Content } from "@prismicio/client";
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
            className="st-xl-10 img-anim"
          >
            <img
              alt={item.image?.alt ?? ""}
              src={`${item.image?.url}&fit=clip&w=1920&q=85`}
              srcSet={[
                `${item.image?.url}&fit=clip&w=768&q=85 768w`,
                `${item.image?.url}&fit=clip&w=1024&q=85 1024w`,
                `${item.image?.url}&fit=clip&w=1440&q=85 1440w`,
                `${item.image?.url}&fit=clip&w=1920&q=85 1920w`,
              ].join(", ")}
              sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
              width={item.image?.dimensions?.width || 1440}
              height={item.image?.dimensions?.height || 810}
              loading="lazy"
              decoding="async"
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
