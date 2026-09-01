import { SubpageDotNav } from "@/components/services";

export default function IntroSection() {
  return (
    <section id="mo-intro">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-12 st-xl-os-3 st-sm-18 st-sm-os-0 center">
            <h2 className="upper subpage-eyebrow">
              Marketing Orchestration
            </h2>
            <SubpageDotNav current="marketing-orchestration" />
            <p className="f-40 Title subpage-lead">
              Your brand is symphonic in nature, so all efforts need
              orchestration: playing in the right key, keeping tempo, and
              hitting the crescendos. Sometimes you need an external conductor
              to optimize performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
