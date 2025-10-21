import type { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import type { FC } from "react";

/**
 * Props for `WorkDetailVideoFullBlock`.
 */
export type WorkDetailVideoFullBlockProps =
  SliceComponentProps<Content.WorkDetailVideoFullBlockSlice>;

/**
 * Component for "WorkDetailVideoFullBlock" Slices.
 */
const WorkDetailVideoFullBlock: FC<WorkDetailVideoFullBlockProps> = ({
  slice,
}) => {
  const isFilledVideo = isFilled.embed(slice.primary.video);
  if (!isFilledVideo) return null;

  return (
    <figure className="img-box video-box img-100 img-anim">
      <div
        className="video-embed"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: slice.primary.video.html ?? "",
        }}
      />
    </figure>
  );
};

export default WorkDetailVideoFullBlock;
