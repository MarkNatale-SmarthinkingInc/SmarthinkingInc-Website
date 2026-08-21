import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";
import type { FC } from "react";

import { getVimeoEmbedUrl } from "@/utils/vimeo";

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
  const embedUrl = getVimeoEmbedUrl(slice.primary.video);
  if (!embedUrl) return null;

  return (
    <figure className="img-box video-box img-100 img-anim">
      <div
        className="video-embed"
        style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
      >
        <iframe
          src={embedUrl}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          title="Work Video"
        />
      </div>
    </figure>
  );
};

export default WorkDetailVideoFullBlock;
