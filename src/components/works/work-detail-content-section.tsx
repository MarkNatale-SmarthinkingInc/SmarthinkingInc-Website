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

        {/* SECTION - The Results */}
        <div className="st-grid xl-top-5 xs-top-10 xs-wrap">
          <div className="st-xl-5 st-xs-16">
            <h2 className="f-40">The Results</h2>
          </div>
          <div className="st-xl-8 st-xl-os-3 st-lg-9 st-lg-os-2 column-2 st-xs-16 st-xs-os-0 xs-top-4">
            <p>
              Sed scelerisque augue erat, eu hendrerit eros sollicitudin eu.
              Praesent vel ultrices sapien, ut egestas tellus. Phasellus
              pulvinar neque ut orci pretium efficitur. Aliquam volutpat, lorem
              nec tincidunt aliquet, lorem risus interdum nisl, nec suscipit
              lacus lectus at arcu. Praesent molestie metus quis turpis feugiat
              finibus. In sapien ipsum, molestie in rhoncus volutpat, tincidunt
              nec ex. Fusce euismod tristique ligula, id maximus lacus imperdiet
              in. Nunc justo lacus, tincidunt non arcu non, posuere tempor
              sapien. Donec et tempor metu onvallis ut dolor sed tristique.
            </p>
          </div>
        </div>

        {/* RESULT TABLE */}
        <div className="result-table xl-top-2 xs-top-6">
          <div className="table-item st-grid">
            <div className="st-xl-4">
              <span className="f-100">
                <span className="f-60">+</span>14<sup className="f-32">%</sup>
              </span>
            </div>
            <div className="st-xl-4 st-xl-os-4 st-lg-5 st-lg-os-3 st-xs-9 xs-right">
              <span className="f-100 Brown">ROI</span>
            </div>
            <div className="st-xl-4 right xs-hidden">
              <span className="caption">Return of investment</span>
            </div>
          </div>
          <div className="table-item st-grid">
            <div className="st-xl-4">
              <span className="f-100">
                <span className="f-60">-</span>09<sup className="f-32">%</sup>
              </span>
            </div>
            <div className="st-xl-4 st-xl-os-4 st-lg-5 st-lg-os-3 st-xs-9 xs-right">
              <span className="f-100 Brown">CAC</span>
            </div>
            <div className="st-xl-4 right xs-hidden">
              <span className="caption">Customer acquisition cost</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
