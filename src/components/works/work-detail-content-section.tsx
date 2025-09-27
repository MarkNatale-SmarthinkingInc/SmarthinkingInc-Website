import { components } from "@/slices";
import type { Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

interface WorkDetailContentSectionProps {
  work?: Content.WorkDocument;
}

export default function WorkDetailContentSection({
  work,
}: WorkDetailContentSectionProps) {
  return (
    <div id="project-content" className="grid-margin">
      <div className="st-xl-16 st-xl-os-1 xl-top-3 xs-top-6">
        <SliceZone slices={work?.data.slices} components={components} />
      </div>
    </div>
  );
}
