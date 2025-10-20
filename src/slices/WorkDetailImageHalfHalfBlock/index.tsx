import type { Content } from "@prismicio/client";
import Image from "next/image";
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
        <Image
          alt={slice.primary.left_image?.alt ?? ""}
          src={`${slice.primary.left_image?.url}&fit=clip&w=1440`}
          sizes="(max-width: 768px) 100vw, 1440px"
          blurDataURL={`${slice.primary.left_image?.url}&w=100&blur=40`}
          placeholder="blur"
          width={slice.primary.left_image?.dimensions?.width || 1440}
          height={slice.primary.left_image?.dimensions?.height || 810}
          className="lazy"
        />
      </figure>
      <figure className="st-xl-8 self-start img-anim">
        <Image
          alt={slice.primary.right_image?.alt ?? ""}
          src={`${slice.primary.right_image?.url}&fit=clip&w=1440`}
          sizes="(max-width: 768px) 100vw, 1440px"
          blurDataURL={`${slice.primary.right_image?.url}&w=100&blur=40`}
          placeholder="blur"
          width={slice.primary.right_image?.dimensions?.width || 1440}
          height={slice.primary.right_image?.dimensions?.height || 810}
          className="lazy"
        />
      </figure>
    </div>
  );
};

export default WorkDetailImageHalfHalfBlock;
