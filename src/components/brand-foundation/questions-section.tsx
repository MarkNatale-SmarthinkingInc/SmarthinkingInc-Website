const QUESTIONS = [
  { n: "01", lead: "Who", rest: "are you?" },
  { n: "02", lead: "What", rest: "do you do?" },
  { n: "03", lead: "Why", rest: "does it matter?" },
];

export default function QuestionsSection() {
  return (
    <section id="bf-questions" className="BgDark">
      <div className="grid-margin">
        <figure className="questions-mark">
          <img
            src="/img/services-new/brand-foundation.svg"
            alt=""
            width={578}
            height={578}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="st-grid">
          <div className="st-xl-12 st-xl-os-3 st-sm-18 st-sm-os-0">
            <ol className="question-list">
              {QUESTIONS.map((q) => (
                <li key={q.n} className="reveal">
                  <span className="question-number f-80 upper" aria-hidden="true">
                    {q.n}
                  </span>
                  <span className="question-text Red upper">
                    <span className="f-80">{q.lead}</span>{" "}
                    <span className="f-40">{q.rest}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="f-18 Title White questions-note">
              While seemingly easy, these inquiries quickly reveal the
              development needed and the optimal path forward.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
