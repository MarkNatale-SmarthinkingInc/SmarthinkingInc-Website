// Static for now — becomes a repeatable Prismic group when the page is wired up.
// Copy is final, from Servivces_Home_Capabilities-Final.docx.
const CAPABILITY_GROUPS = [
  {
    title: ["Brand", "Foundation"],
    items: [
      {
        label: "Brand Strategy",
        copy: "Encompassing elements like Brand Narrative, Brand Promise, Brand Hierarchy, Brand Identity, and more. It ultimately aims to define who you are, what you do, and (most importantly) why it matters.",
      },
    ],
  },
  {
    title: ["Brand", "Activation"],
    items: [
      {
        label: "Marketing Collateral",
        copy: "The whole is greater than the sum of its parts. Marketing Collateral is a broad range of products that ultimately serve to enhance the sale. As complicated as a digital destination and as simple as the napkins you use at your coffee bar. The possibilities, and therefore the results, are endless.",
      },
      {
        label: "Advertising",
        copy: "Equal parts strategy, logic, and charm combine to give rise to an audience of qualified prospects. Our creative campaigns are targeted at the intended audience and delivered through digital, print, and custom content pieces, to name a few.",
      },
      {
        label: "Websites",
        copy: "Fresh, immersive experiences that transport the viewer and create demand. Everything from design and user experience to programming and optimization. We also develop creative, interactive multimedia that fully immerses viewers in the brand, making it a powerful tool in our marketing strategy.",
      },
      // The comp listed Email Marketing and Social Media separately; the final
      // copy merges them into one row.
      {
        label: "Email + Social Media Marketing",
        copy: "We provide the daily dose of information to keep your audience informed. Our team specializes in creating captivating, engaging campaigns, collaborations, and event activations that deliver strong ROI.",
      },
      {
        label: "Film + Photography",
        copy: "High-impact motion pictures and still images that effectively, vividly, and precisely convey your story while staying true to your brand. Bringing your brand and location to life is essential when marketing real estate and hospitality, at all stages of development.",
      },
      {
        label: "Photorealistic Renderings",
        copy: "Give people the proper vision, and they will take it from there. Exceed the viewer’s expectations, transporting them to where imagination merges with reality. Our renderings, crafted with precision and artistry, have the power to ignite the spark of inspiration within the viewer.",
      },
    ],
  },
  {
    title: ["Marketing", "Orchestration"],
    items: [
      {
        label: "Communications Planning + Execution",
        copy: "Plan the work. Work the plan. Our comprehensive research process and market analysis enable us to achieve marketing objectives successfully. We meticulously identify project objectives, key audiences, target markets, and the competitive landscape, then develop a comprehensive marketing strategy and budget to ensure successful execution of the plan.",
      },
    ],
  },
];

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function CapabilitiesSection() {
  return (
    <section id="capabilities">
      <div className="grid-margin">
        <div className="st-grid">
          <div className="st-xl-10 st-xl-os-1 st-sm-18 st-sm-os-0">
            <h2 className="f-100 capabilities-title">
              <span className="Brown">Capabilities</span>
              <br />
              Per Service
            </h2>
          </div>
        </div>

        <div className="st-grid sm-wrap xl-top-3">
          {CAPABILITY_GROUPS.map((group) => (
            <div
              key={group.title.join(" ")}
              className="st-xl-5 st-xl-os-1 st-sm-18 st-sm-os-0 sm-top-2 capability-group"
            >
              <h3 className="f-32 upper capability-group-title">
                {group.title[0]}{" "}
                <br className="sm-hidden" />
                {group.title[1]}
              </h3>

              <ul className="capability-list">
                {group.items.map((item) => {
                  const id = slug(item.label);
                  return (
                    <li key={item.label} className="capability">
                      <button
                        type="button"
                        className="capability-toggle f-18 Title"
                        aria-expanded="false"
                        aria-controls={`capability-panel-${id}`}
                      >
                        <span>{item.label}</span>
                        <span className="capability-icon" aria-hidden="true" />
                      </button>
                      <div
                        className="capability-panel"
                        id={`capability-panel-${id}`}
                      >
                        <p className="f-18 Title">{item.copy}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
