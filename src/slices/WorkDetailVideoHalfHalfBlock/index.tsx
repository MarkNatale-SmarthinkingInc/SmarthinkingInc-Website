import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import type { FC } from "react";

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

  if (!isFilledVideo1 && !isFilledVideo2) return null;

  return (
    <div className="img-box video-box img-50 st-grid">
      {isFilledVideo1 && (
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
      {isFilledVideo2 && (
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
    </div>
  );
};

export default WorkDetailVideoHalfHalfBlock;
