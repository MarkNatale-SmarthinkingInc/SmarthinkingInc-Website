# Services page redesign — action items

Last updated 2026-08-12, end of session. Renumbered and reorganised from the running
list; nothing dropped.

---

## Where we got to

**The top-level `/services` page is structurally complete** — every section in the comp
is built, in order:

| # | Section | Component |
|---|---|---|
| 1 | Hero | `hero-section.tsx` |
| 2 | Our Services | `our-services-section.tsx` → `labelled-copy-section.tsx` |
| 3 | Three services (dark) | `three-services-section.tsx` |
| 4 | How The Services Interplay | `interplay-section.tsx` → `labelled-copy-section.tsx` |
| 5 | Capabilities Per Service | `capabilities-section.tsx` |
| 6 | PROOF | `proof-section.tsx` |
| 7 | Stats + quote | `results-section.tsx` |
| 8 | CTA bar | `cta-section.tsx` |
| 9 | Word On The Street | `testimonials-section.tsx` *(copied from old page)* |
| 10 | Client logos | `clients-section.tsx` *(copied from old page)* |
| 11 | WORK | `work-link-section.tsx` *(copied from old page)* |

Styles: `src/css/pages/services.css`. Page: `src/app/services/page.tsx`.
Previous page preserved untouched at `/services-old` — **nothing deleted pending sign-off.**

Still static/hardcoded except the hero, testimonials, clients and work-link, which are
already Prismic-driven off the existing `services` document.

---

## Subpages

**Brand Foundation is built** at `/services/brand-foundation` — all 10 sections.
Components in `src/components/brand-foundation/`, styles in
`src/css/pages/service-subpage.css`, imagery in
`public/img/services-new/brand-foundation/`.

Reused rather than rebuilt: the header and footer (global), `CtaSection`, and the three
generative SVG marks. `SubpageHeroSection` lives in `src/components/services/` and is
written generically so Brand Activation and Marketing Orchestration can use it — pass
`title` lines and an `image`.

Namespace `service-subpage` is wired in `main.js`, `pageToPage.tsx` and
`hero-animations.js`, and matches **before** the `/services/` catch-all so it doesn't
fall through to the Prismic `[uid]` detail template. `SERVICE_SUBPAGES` is declared in
both `main.js` and `pageToPage.tsx` and the two must stay in sync.

Still to do: Brand Activation and Marketing Orchestration (their cards on the services
page and the What's Next cards already point at the routes, which 404 until built), then
Prismic wiring for all of it.

---

## Blocking on you

### ① Epica Pro Bold / SemiBold webfont — the one real asset gap
`.woff2` + `.woff` into `src/css/fonts/`. `fonts.css` declares **Epica Pro Light (300)
only**; every bold on the site is Epica *Sans* Pro. The comp uses a genuine bold serif in
four places, all currently faux-bolded by the browser at `font-weight: 600`:
- "Symphonic Approach" — Our Services, para 3
- The three service names in Interplay, para 1
- Capabilities column headers (Brand Foundation / Brand Activation / Marketing Orchestration)
- Stat numbers and labels in the circles (20–60ˣ, ROI, etc.)

I'll add the `@font-face` block when the files land — no markup changes needed.

### ② Copy — two grammar slips, transcribed verbatim rather than silently edited
- Interplay para 2: "…the stronger the result **are**…" → "the results are"
- Results intro: "…and ultimately **drive** ROI in all efforts." → "drives"

### ③ Capability copy
Only "Brand Strategy" has real copy in the comp. The other **eight are 13–15 word Lorem
placeholders** awaiting the client's text.

### ④ Design decisions to confirm with the designer
- **Diamond colour** — comp samples `#FC6E03`; the existing `icon-diamond-red.svg`
  (orange despite the filename) is `#F26722`. Probably JPEG/colour drift.
- **Hero left caption + "CONTACT US" typeface** — comp shows serif, live site renders
  sans via the global `.caption`. Changing it hits every page.
- **PROOF background** — I used `#000`, because the comp samples this band at `#040404`
  while reading the three-services band as `#1A1416` (an exact `.BgDark` match), so the
  darker black looks deliberate. Switch to `.BgDark` if that's wrong.
- **PROOF strings layering** — in the comp the strings render *over* the letters. I put
  them behind, since you described the canvas as background and that matches every other
  `.string-canvas` on the site. One `z-index` change if the designer meant otherwise.
- **Scroll-reveal** — only the three service cards animate in (fade + rise, staggered
  left-to-right). Decide whether other sections should get the same treatment.

### ⑤ Structural — the orphaned service detail pages
The eight capability names still match existing Prismic `service` docs at
`/services/[uid]`. Those pages are now **unreachable from the new services page**.
Decide: keep live, retire, or link from somewhere else.

---

## Deferred fixes (agreed, not now)

### ⑥ Remove `width: 100vw` from `body` in `src/css/styles.css`
You want this done properly at source, after the current QA round.

Two declarations to delete: **`styles.css:4611`** (base) and **`styles.css:4638`**
(inside `@media max-width: 768px`). Deleting them lets `body` fall back to `width: auto`,
which resolves against the containing block's *content box* and is already
scrollbar-aware — the correct behaviour. `100vw` replaces it with a viewport measure that
counts the scrollbar gutter.

When you do, also delete the now-redundant `@media (min-width: 769px) { body { width:
100% } }` at the bottom of `styles-overrides.css` — it exists only to shadow line 4611.

**Entangled dependency:** the mobile block also sets `body { overflow-y: scroll }`
(`styles.css:4639`). That forced scrollbar is invisible *only because* `width: 100vw`
parks it off-screen. Remove the width there without addressing it and it reappears as a
literal second scrollbar below 768px — I hit exactly this and reverted. Decide on both
together. It looks deliberate (likely reserving gutter space so pages don't shift
horizontally between short and tall content); on real phones it renders nothing, since
mobile browsers use overlay scrollbars.

Wider context: 9 `100vw` uses in `styles.css`. Seven are low risk — the footer marquee
(4863) and circle-slider label tracks (1983, 2403) carry their own `overflow: hidden`;
the overlay at 1135 is `position: fixed`. **Line 2272 is worth a look** — it's
`position: absolute`, so it does contribute to overflow.

### ⑦ `/public/js` and `/public/img` served `immutable, max-age=31536000`
`next.config.ts`. Filenames are unversioned, so **any edit to `main.js` or a module never
reaches a returning visitor** — they keep the year-old cached copy. This bit me twice
during the build. I scoped the header to production only, so dev now sends `no-cache`,
but **production still has the problem**. Options: short max-age, or a build-time version
query. Needs doing before launch.

### ⑧ Capabilities → Prismic
Already shaped for it. `CAPABILITY_GROUPS` in `capabilities-section.tsx` is
`{ title: [line1, line2], items: [{ label, copy }] }`. Prismic can't nest repeatable
groups inside repeatable groups, so this is either three separate groups (one per
service) or — my preference — **one flat repeatable with a "service" key** that the
component groups, letting the client add a capability to any column without a schema
change. Panel `id`s derive from the label via `slug()`, so `aria-controls` stays correct
as copy is edited. No markup change needed; just swap the constant for document data.

### ⑩ Brand Foundation — decisions and placeholders
- **The collage is an approximation.** The comp arranges those seven Cove pieces as a
  loose editorial collage; I built it as a full-width render, the brand sketch riding up
  over it, then a two-column grid with the right column offset lower. Close in feel, not
  pixel-matched — worth a look.
- **Imagery was resized** to max 2400px at quality 82 (9.3MB → ~7MB for the folder).
  Originals were not kept, so re-export from the design source if you want them back.
  Note `Service-Brand-Foundation-1.jpg` is the hero and stayed at its native 1972px.
- **Bold serif again** — the eyebrow, the deliverable terms and "Brand Foundation" in the
  intro all want Epica Pro Bold (see ①). Faux-bolded until the files land.
- Copy was transcribed from the comp at full resolution and should be accurate, but it
  is worth a proofread against the source document.

### ⑨ Optimise `marketing-orchestration.svg`
**838KB** (the other two marks are 42KB and 71KB). SVGO or a lower path count on export
would likely cut it ~10× with no visible difference.

---

## Done this session

- **Site-wide vw/scrollbar overflow — FIXED.** Full-width (18/18) columns inside a
  `.grid-margin` now resolve `width: 100%` against their parent instead of `95.83334vw`
  against the viewport, gutter `margin-right` zeroed. In `styles-overrides.css`, scoped
  to `.grid-margin` so the fixed `#menu` overlay is untouched, each rule inside its own
  breakpoint. **Touches every page — worth QA attention.** Verified home / work / about /
  blog / contact / services / services-old at 500px and 1440px.
- **Pale strip beside full-bleed sections — FIXED above 768px** via `body { width: 100% }`
  scoped to `min-width: 769px`. Still present below 768px; see ⑥ for why.

---

## Gotchas worth knowing (bit me; will bite again)

- **`.st-grid.grid-middle` is declared twice** in `styles.css` — `align-items: center` at
  line 107 *and* `justify-content: center` at line 122. Using it for vertical alignment
  silently centres horizontally too, shifting the whole row. Anywhere else on the site
  using it may be getting centring it doesn't want.
- **`fadeUp` is hero-only.** `hero-animations.js` sets *every* `.fadeUp` on the page to
  `opacity: 0` and only reveals the ones in its own intro timeline. Putting it on a
  below-fold section renders that section permanently invisible.
- **Every `st-*` column class carries `margin-right: 1.38888vw`** (`[class^="st-xl"]`),
  so flex siblings self-space and `st-*-os-N` offsets stack *on top* of that.
- **A leading `os-1` with no trailing offset pushes a row right.** Invisible with
  left-aligned content; obvious with centred content (cost me 41px on the stat circles).
- **`h1`–`h6` already default to Epica Pro**, and `p + p { margin-top: 1.5em }` is the
  global paragraph rhythm — no need to re-declare either.
- The comp is a **1440px artboard at 2.778×**. Calibrate off fixed-px things
  (`.caption` at 16px, the `.sup-title` diamond) — vw-based elements scale with the
  viewport and can't fix the scale.

## Notes / non-blocking

- **Browser-pane screenshots DO work — solved 2026-08-14.** They were never broken. The
  preview tab runs with `visibilityState: "hidden"`, which throttles `requestAnimationFrame`,
  so the GSAP intro never finishes: `#smooth-wrapper` and `.parallax` sit at ~0–3% opacity
  and the capture looks blank/washed out. Settle the page first and it captures correctly:

  ```js
  gsap.globalTimeline.getChildren(true, true, true).forEach(t => { try { t.progress(1) } catch (e) {} });
  if (typeof smoother !== 'undefined' && smoother) { smoother.paused(false); smoother.scrollTop(0); }
  ```

  Run that via `javascript_tool`, then screenshot. Give the hero image a beat — the first
  frame after settling can catch it mid-paint; a second capture is clean. This should cut
  the review round-trips substantially.
- Comp masters live in `~/Downloads/Service Page_master.jpeg` (4000×24730) plus the
  separate hero JPG and a PDF.
