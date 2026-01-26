"use client";

import { type Content, isFilled } from "@prismicio/client";
import { useCallback, useRef, useState } from "react";

interface WorkDetailMainVideoSectionProps {
  work?: Content.WorkDocument;
}

export default function WorkDetailMainVideoSection({
  work,
}: WorkDetailMainVideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isFilledVideo = isFilled.embed(work?.data?.video);
  if (!isFilledVideo) return null;

  const videoData = work?.data?.video;
  const thumbnailUrl = videoData?.thumbnail_url;
  const videoId = videoData?.video_id;

  // Extract video ID from embed URL if not directly available
  const getVideoId = () => {
    if (videoId) return videoId;
    const html = videoData?.html ?? "";
    const match = html.match(/video\/(\d+)/);
    return match ? match[1] : null;
  };

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    // Wait for iframe to mount, then play
    setTimeout(() => {
      if (iframeRef.current && typeof window !== "undefined" && (window as any).Vimeo) {
        const player = new (window as any).Vimeo.Player(iframeRef.current);
        player.play();
      }
    }, 100);
  }, []);

  const extractedVideoId = getVideoId();

  if (!extractedVideoId) return null;

  return (
    <section id="main-video" className="grid-margin">
      <div className="video-wrap st-xl-16 st-xl-os-1 xl-top-3">
        <div className="video-embed">
          {!isPlaying ? (
            <div className="video-thumbnail-wrapper" onClick={handlePlay}>
              {thumbnailUrl && (
                <img
                  src={thumbnailUrl}
                  alt="Video thumbnail"
                  className="video-thumbnail"
                />
              )}
              <button
                type="button"
                className="video-play-button"
                aria-label="Play video"
              >
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="40"
                    cy="40"
                    r="38"
                    stroke="white"
                    strokeWidth="2"
                    fill="rgba(0,0,0,0.4)"
                  />
                  <path
                    d="M32 26L56 40L32 54V26Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              id="vimeo-player"
              src={`https://player.vimeo.com/video/${extractedVideoId}?autoplay=1&background=0`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              allowFullScreen
              title="Video player"
            />
          )}
        </div>
      </div>
    </section>
  );
}
