import { ArrowIcon } from "@/components/global/cta-section";

// "Find Out More" has no destination yet. It's an open question for the
// client (see EMAIL-DIAGNOSTIC-TODO.md), and /about stands in until they answer.
const FIND_OUT_MORE_HREF = "/about";

export default function AboutSection() {
  return (
    <section id="ed-about" className="BgFade ed-spaced">
      <div className="ed-about-inner center">
        <h2 className="Title upper ed-title ed-title--single">
          <span className="Dark">About</span>{" "}
          <span className="Brown">Smarthinking</span>
        </h2>
        <div className="ed-about-mark" aria-hidden="true">
          <span className="ed-about-rule" />
          <img
            src="/img/email-diagnostic/st-mark.svg"
            alt=""
            width={82}
            height={73}
          />
          <span className="ed-about-rule" />
        </div>
        <p className="Copy ed-copy ed-about-copy">
          Smarthinking Inc. is a brand marketing firm specializing in remarkable
          hotels and real estate developments. For two decades, we&rsquo;ve
          helped properties strengthen their brand value and significantly
          increase marketing ROI by focusing on true differentiation and
          unlocking full marketing potential. Our experience working within
          luxury developments and hotel operations gives us a unique perspective
          as to what it truly takes to build world-class brands.
        </p>
        <p className="Copy ed-copy ed-about-copy">
          Brand Orchestration for Remarkable Properties.
        </p>
        <div className="button-wrap ed-about-button-wrap">
          <a
            href={FIND_OUT_MORE_HREF}
            className="button button-dark cta-button ed-about-button"
          >
            <div className="main-bg" />
            <div className="icon">
              <i>
                <ArrowIcon />
                <ArrowIcon />
              </i>
            </div>
            <div className="label-wrap">
              <span>Find out more</span>
              <span>Find out more</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
