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
  console.log(work?.data?.video);

  return (
    <section id="main-video" className="grid-margin">
      <div className="video-wrap st-xl-16 st-xl-os-1 xl-top-3">
        <div
          className="video-embed"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: work.data.video.html ?? "" }}
        />
      </div>
    </section>
  );
}
