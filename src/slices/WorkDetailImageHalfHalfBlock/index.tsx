import type { Content } from "@prismicio/client";
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
        <img
          alt={slice.primary.left_image?.alt ?? ""}
          src={`${slice.primary.left_image?.url}&fit=clip&w=1920&q=85`}
          srcSet={[
            `${slice.primary.left_image?.url}&fit=clip&w=768&q=85 768w`,
            `${slice.primary.left_image?.url}&fit=clip&w=1024&q=85 1024w`,
            `${slice.primary.left_image?.url}&fit=clip&w=1440&q=85 1440w`,
            `${slice.primary.left_image?.url}&fit=clip&w=1920&q=85 1920w`,
          ].join(", ")}
          sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
          width={slice.primary.left_image?.dimensions?.width || 1440}
          height={slice.primary.left_image?.dimensions?.height || 810}
          loading="lazy"
          decoding="async"
          className="lazy"
        />
      </figure>
      <figure className="st-xl-8 self-start img-anim">
        <img
          alt={slice.primary.right_image?.alt ?? ""}
          src={`${slice.primary.right_image?.url}&fit=clip&w=1920&q=85`}
          srcSet={[
            `${slice.primary.right_image?.url}&fit=clip&w=768&q=85 768w`,
            `${slice.primary.right_image?.url}&fit=clip&w=1024&q=85 1024w`,
            `${slice.primary.right_image?.url}&fit=clip&w=1440&q=85 1440w`,
            `${slice.primary.right_image?.url}&fit=clip&w=1920&q=85 1920w`,
          ].join(", ")}
          sizes="
    (max-width: 767px) 100vw,
    (max-width: 1023px) 768px,
    (max-width: 1439px) 1024px,
    (max-width: 1919px) 1440px,
    1920px
  "
          width={slice.primary.right_image?.dimensions?.width || 1440}
          height={slice.primary.right_image?.dimensions?.height || 810}
          loading="lazy"
          decoding="async"
          className="lazy"
        />
      </figure>
    </div>
  );
};

export default WorkDetailImageHalfHalfBlock;
