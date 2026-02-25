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

  const videoData = slice.primary.video;
  const videoId = videoData?.video_id;

  const getVideoId = (): string | null => {
    if (videoId) return String(videoId);
    const html = videoData?.html ?? "";
    const htmlMatch = html.match(/video\/(\d+)/);
    if (htmlMatch) return htmlMatch[1];
    const embedUrl = videoData?.embed_url ?? "";
    const urlMatch = embedUrl.match(/vimeo\.com\/(\d+)/);
    return urlMatch ? urlMatch[1] : null;
  };

  const extractedVideoId = getVideoId();
  if (!extractedVideoId) return null;

  return (
    <figure className="img-box video-box img-100 img-anim">
      <div
        className="video-embed"
        style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
      >
        <iframe
          src={`https://player.vimeo.com/video/${extractedVideoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          title="Work Video"
        />
      </div>
    </figure>
  );
};

export default WorkDetailVideoFullBlock;
