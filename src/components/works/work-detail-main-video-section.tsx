import { type Content, isFilled } from "@prismicio/client";

interface WorkDetailMainVideoSectionProps {
  work?: Content.WorkDocument;
}

export default function WorkDetailMainVideoSection({
  work,
}: WorkDetailMainVideoSectionProps) {
  return (
    <section id="main-video" className="grid-margin">
      <div className="video-wrap st-xl-16 st-xl-os-1 xl-top-3">
        {work?.data?.video && isFilled.linkToMedia(work.data.video) && (
          <video
            id="heroVideo"
            playsInline
            loop
            preload="metadata"
            poster={work?.data?.video_poster?.url || undefined}
            width="1920"
            height="1080"
            crossOrigin="anonymous"
            aria-label={
              work?.data?.video_poster?.alt ||
              work.data.video.text ||
              "project vide"
            }
            style={{ display: "block", maxWidth: "100%", height: "auto" }}
          >
            <source src={work.data.video.url} type="video/mp4" />
          </video>
        )}
        <div className="icon-play">
          <span></span>
          <img src="/img/svg/icon-play.svg" alt="White play icon" />
        </div>
      </div>
    </section>
  );
}
