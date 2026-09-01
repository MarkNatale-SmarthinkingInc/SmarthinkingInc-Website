/**
 * PROOF band. Same word as the services page but a different treatment: the
 * comp draws it outlined on flat black, with no string canvas behind it. The
 * outline is .outline.outline-white, which is how the old page renders "WORK".
 */
export default function BrandFoundationProofSection() {
  return (
    <section id="bf-proof">
      <div className="grid-margin">
        <h2 className="outline outline-white center bf-proof-title">Proof</h2>
      </div>
    </section>
  );
}
