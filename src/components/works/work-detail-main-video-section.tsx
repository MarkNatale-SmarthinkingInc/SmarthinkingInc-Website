import { type Content, isFilled } from "@prismicio/client";

interface WorkDetailMainVideoSectionProps {
  work?: Content.WorkDocument;
}

export default function WorkDetailMainVideoSection({
  work,
}: WorkDetailMainVideoSectionProps) {
  const isFilledVideo = isFilled.embed(work?.data?.video);
  if (!isFilledVideo) return null;

  const embed = work?.data?.video?.thumbnail_url;
  console.log(embed);

  return (
    <section id="main-video" className="grid-margin">
      <div className="video-wrap st-xl-16 st-xl-os-1 xl-top-3">
        {work?.data?.video && isFilled.embed(work.data.video) && (
          <div
            className="video-embed"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
            dangerouslySetInnerHTML={{ __html: work.data.video.html ?? "" }}
          />
        )}
        {/* <div className="icon-play">
          <span></span>
          <img src="/img/svg/icon-play.svg" alt="White play icon" />
        </div> */}
      </div>
    </section>
  );
}
