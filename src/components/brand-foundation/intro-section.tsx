import { SubpageDotNav } from "@/components/services";

export default function IntroSection() {
  return (
    <section id="bf-intro">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-12 st-xl-os-3 st-sm-18 st-sm-os-0 center">
            <h2 className="upper subpage-eyebrow">Brand Foundation</h2>
            <SubpageDotNav current="brand-foundation" />
            <p className="f-40 Title subpage-lead">
              Before the development of naming, colors, logos, icons,(or
              actually anything for that matter), we build the{" "}
              <strong>Brand Foundation</strong>. This ensures that your brand is
              properly forged with the necessary raw materials: strategy,
              insights, and a definitive point of view. We start with three
              elemental questions:
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
