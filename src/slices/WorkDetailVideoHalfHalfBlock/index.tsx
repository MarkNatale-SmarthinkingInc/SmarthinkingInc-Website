import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import type { FC } from "react";
import Image from "next/image";

/**
 * Props for `WorkDetailVideoHalfHalfBlock`.
 */
export type WorkDetailVideoHalfHalfBlockProps =
  SliceComponentProps<Content.WorkDetailVideoHalfHalfBlockSlice>;

/**
 * Component for "WorkDetailVideoHalfHalfBlock" Slices.
 */
const WorkDetailVideoHalfHalfBlock: FC<WorkDetailVideoHalfHalfBlockProps> = ({
  slice,
}) => {
  const isFilledVideo1 = isFilled.embed(slice.primary.video_1);
  const isFilledVideo2 = isFilled.embed(slice.primary.video_2);
  const isFilledImage1 = isFilled.image(slice.primary.image_1);
  const isFilledImage2 = isFilled.image(slice.primary.image_2);

  if (!isFilledVideo1 && !isFilledImage1 && !isFilledVideo2 && !isFilledImage2)
    return null;

  return (
    <div className="img-box video-box img-50 st-grid">
      {isFilledVideo1 && !isFilledImage1 && (
        <figure className="st-xl-8 img-anim">
          <div
            className="video-embed"
            style={{
              aspectRatio:
                Number(slice.primary.video_1.width ?? 1) /
                Number(slice.primary.video_1.height ?? 1),
            }}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: slice.primary.video_1.html ?? "",
            }}
          />
        </figure>
      )}
      {isFilledImage1 && (
        <figure className="st-xl-8 img-anim">
          <Image
            alt={slice.primary.image_1?.alt ?? ""}
            src={`${slice.primary.image_1?.url}&fit=clip&w=1440`}
            sizes="(max-width: 768px) 100vw, 1440px"
            blurDataURL={`${slice.primary.image_1?.url}&w=100&blur=40`}
            placeholder="blur"
            width={slice.primary.image_1?.dimensions?.width || 1440}
            height={slice.primary.image_1?.dimensions?.height || 810}
            className="lazy"
          />
        </figure>
      )}
      {isFilledVideo2 && !isFilledImage2 && (
        <figure className="st-xl-8 self-start img-anim">
          <div
            className="video-embed"
            style={{
              aspectRatio:
                Number(slice.primary.video_2.width ?? 1) /
                Number(slice.primary.video_2.height ?? 1),
            }}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{
              __html: slice.primary.video_2.html ?? "",
            }}
          />
        </figure>
      )}
      {isFilledImage2 && (
        <figure className="st-xl-8 self-start img-anim">
          <Image
            alt={slice.primary.image_2?.alt ?? ""}
            src={`${slice.primary.image_2?.url}&fit=clip&w=1440`}
            sizes="(max-width: 768px) 100vw, 1440px"
            blurDataURL={`${slice.primary.image_2?.url}&w=100&blur=40`}
            placeholder="blur"
            width={slice.primary.image_2?.dimensions?.width || 1440}
            height={slice.primary.image_2?.dimensions?.height || 810}
            className="lazy"
          />
        </figure>
      )}
    </div>
  );
};

export default WorkDetailVideoHalfHalfBlock;
