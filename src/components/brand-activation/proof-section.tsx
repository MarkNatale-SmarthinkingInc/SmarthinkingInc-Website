/**
 * PROOF band — same outlined treatment as Brand Foundation, on flat black.
 * Kept as its own component so the id can drive page-specific spacing; the
 * three subpages should share one component once Marketing Orchestration
 * lands and the common shape is settled.
 */
export default function ProofSection() {
  return (
    <section id="ba-proof">
      <div className="grid-margin">
        <h2 className="outline outline-white center ba-proof-title">Proof</h2>
      </div>
    </section>
  );
}
