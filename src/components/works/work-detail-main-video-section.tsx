"use client";

import { type Content, isFilled } from "@prismicio/client";

interface WorkDetailMainVideoSectionProps {
  work?: Content.WorkDocument;
}

export default function WorkDetailMainVideoSection({
  work,
}: WorkDetailMainVideoSectionProps) {
  const isFilledVideo = isFilled.embed(work?.data?.video);
  if (!isFilledVideo) return null;

  const videoData = work?.data?.video;
  const videoId = videoData?.video_id;

  // Extract video ID from embed URL or video_id field
  const getVideoId = (): string | null => {
    if (videoId) return String(videoId);
    // Try to extract from embed HTML
    const html = videoData?.html ?? "";
    const htmlMatch = html.match(/video\/(\d+)/);
    if (htmlMatch) return htmlMatch[1];
    // Try to extract from embed_url
    const embedUrl = videoData?.embed_url ?? "";
    const urlMatch = embedUrl.match(/vimeo\.com\/(\d+)/);
    return urlMatch ? urlMatch[1] : null;
  };

  const extractedVideoId = getVideoId();

  if (!extractedVideoId) return null;

  return (
    <section id="main-video" className="grid-margin">
      <div className="video-wrap st-xl-16 st-xl-os-1 xl-top-3">
        <div className="video-embed" style={{backgroundColor: 'rgba(0,0,0,0.2)'}}>
          <iframe
            src={`https://player.vimeo.com/video/${extractedVideoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1`}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            title="Work Video"
          />
        </div>
      </div>
    </section>
  );
}
