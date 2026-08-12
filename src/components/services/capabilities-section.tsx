// Static for now — becomes a repeatable Prismic group when the page is wired up.
// Only "Brand Strategy" has real copy in the comp; the rest is placeholder.
const CAPABILITY_GROUPS = [
  {
    title: ["Brand", "Foundation"],
    items: [
      {
        label: "Brand Strategy",
        copy: "Defining who you are, what you do, and (most importantly) why it matters!",
      },
    ],
  },
  {
    title: ["Brand", "Activation"],
    items: [
      {
        label: "Marketing Collateral",
        copy: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt labore.",
      },
      {
        label: "Advertising",
        copy: "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex commodo.",
      },
      {
        label: "Websites",
        copy: "Duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu fugiat nulla.",
      },
      {
        label: "Email Marketing",
        copy: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim.",
      },
      {
        label: "Social Media",
        copy: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam.",
      },
      {
        label: "Film + Photography",
        copy: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit consequuntur magni.",
      },
      {
        label: "Photorealistic Renderings",
        copy: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit.",
      },
    ],
  },
  {
    title: ["Marketing", "Orchestration"],
    items: [
      {
        label: "Communications Planning + Execution",
        copy: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
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
