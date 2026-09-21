# The Email Diagnostic: open items

Started 2026-09-21. Page: `/services/email-diagnostic`. Comp: `~/Downloads/Service Page_Email.pdf`
(the client calls it "Service Page Email"). Static build for client review, with Prismic wiring
after approval.

---

## Where it stands

All eight sections of the comp are built, in order:

| # | Section | Component |
|---|---|---|
| 1 | Hero, "20–60x ROI" (animated build-in) | `hero-section.tsx` + `hero-roi-art.tsx` |
| 2 | Intro copy | `intro-section.tsx` |
| 3 | Phone mockup (placeholder still) | `mockup-section.tsx` |
| 4 | The Diagnostic + stats graphic | `diagnostic-section.tsx` + `stats-graphic.tsx` |
| 5 | The Result | `result-section.tsx` |
| 6 | Why This Matters | `why-section.tsx` |
| 7 | About Smarthinking | `about-section.tsx` |
| 8 | CTA bar | shared `global/cta-section.tsx`, with this page's copy passed in |

Header and footer are the global ones, unchanged. Styles: `src/css/pages/email-diagnostic.css`.
Imagery: `public/img/email-diagnostic/`. Hero animation: `public/js/modules/email-diagnostic.js`.

At 1440 every section height matches the comp to within 1px, and titles, body copy and the list
were ink-width matched against the comp (see the comments in the CSS).

Namespace `email-diagnostic` is wired in `main.js`, `pageToPage.tsx` and `hero-animations.js`, and
matches before the `/services/` catch-all so it doesn't fall through to the Prismic `[uid]`
template.

---

## Questions for the client

1. **Where should "Find Out More" go?** It points at `/about` for now
   (`FIND_OUT_MORE_HREF` in `about-section.tsx`).
2. **Are the stats real?** 32,395 sent / 31,618 delivered / 9,802 opened / 588 clicked. They're a
   decorative graphic either way, but if they're a real client's numbers, confirm they can be
   shown publicly.
3. **Stats graphic on phones.** It's one outlined SVG, so below 768px it scales down to about 335px
   wide and the chart labels get very small. Options: the designer supplies a stacked mobile
   version, or I rebuild the funnel from its parts for small screens.

## Waiting on assets

4. **Phone video.** A still stands in (`ed-phones-placeholder.jpg`). When it arrives, swap the
   `<img>` for `<video autoPlay muted loop playsInline>`. The framing CSS carries over if the video
   is exported at the placeholder's composition (3172 × 1802, phones centred).
5. **Photos are ~2000px wide.** Sharp at 1440 on retina, but they'll soften on very large displays.
   Higher-res originals would help, but it isn't urgent.

## Design notes (built as the comp shows; flagging in case they're unintended)

6. **Title weight.** The comp's serif titles look a little heavier than Epica Pro Light, the only
   Epica Pro weight the site loads. Same gap as ① in `SERVICES-REDESIGN-TODO.md`.
7. **CTA bar.** Reused from the Services pages as instructed: `.BgDark` and 340px tall. The comp
   draws it pure black and 364px tall. Only the copy differs ("See where your ROI is leaking."), and
   it's passed as props, so it's ready to become a Prismic field.
8. **Small irregularities reproduced from the comp.** "The Result" title hangs ~18px left of its
   icon and list. The Why This Matters photo stops ~7px short of the right edge where the Diagnostic
   photo bleeds. The gap above the body copy is 167px in The Diagnostic and 148px in Why This
   Matters. The About block sits ~10px right of centre in the comp; I centred it.
9. **Hero motion.** The rules draw out from the trend icon, "20–60x" rises in letter by letter, R
   and O settle, the arrow climbs into place, and the reflection fades in last. It ends exactly on
   the comp and is skipped for visitors with reduced motion enabled. Tuning knobs are in the module.

## Later

10. **Prismic wiring** after approval, using the Services fallback pattern (inline copy stays as the
    fallback).
11. **SEO links** from around the site. The page is deliberately unlinked for now. There's no
    sitemap in the project, so nothing to add there.
12. **Production caching.** `/public/js` is served `immutable` for a year (⑦ in
    `SERVICES-REDESIGN-TODO.md`). `email-diagnostic.js` is new, so its first release is fine, but
    later edits to it won't reach returning visitors until that's fixed.
