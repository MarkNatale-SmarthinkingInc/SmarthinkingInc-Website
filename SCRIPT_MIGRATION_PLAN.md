# Script Migration Plan: HTML → Next.js 15

## Overview

This document outlines the strategy for migrating all JavaScript files and script tags from `html-version/index.html` to the Next.js 15 application following modern practices.

## Current Scripts Analysis

### From `html-version/index.html`:

```html
<script src="js/barba.js"></script>
<script src="js/barba-prefetch.js"></script>
<script src="js/fontfaceobserver.js"></script>
<script src="js/gsap.min.js"></script>
<script src="js/CustomEase.min.js"></script>
<script src="js/ScrollTrigger.min.js"></script>
<script src="js/ScrollTrigger.min.js"></script>
<!-- Duplicate -->
<script src="js/ScrollSmoother.min.js"></script>
<script src="js/SplitText.min.js"></script>
<script src="js/vars.js"></script>
<script type="module" src="../js/main.js"></script>
```

### Script Categories:

1. **GSAP Core & Plugins**
   - `gsap.min.js` - Core GSAP library
   - `CustomEase.min.js` - Custom easing functions
   - `ScrollTrigger.min.js` - Scroll-based animations
   - `ScrollSmoother.min.js` - Smooth scrolling
   - `SplitText.min.js` - Text animation utilities

2. **Page Transitions**
   - `barba.js` - Page transition library
   - `barba-prefetch.js` - Prefetch extension

3. **Utilities**
   - `fontfaceobserver.js` - Font loading detection
   - `vars.js` - Global variables
   - `main.js` - Main application logic

4. **Custom Modules** (in `html-version/js/modules/`)
   - `drag.js`, `equalizer.js`, `hero-animations.js`
   - `home.js`, `lazy-load.js`, `menu.js`
   - `piano.js`, `rotate-slider.js`, `services.js`
   - `strings.js`, `stripe-hover.js`, `testimonials.js`
   - `text-anim.js`, `video.js`, `work-hover.js`, `work.js`

## Migration Strategy

### Option 1: Modern NPM Packages (RECOMMENDED) ✅

**Advantages:**

- Type safety with TypeScript
- Better tree shaking and bundle optimization
- Automatic updates and security patches
- Proper ESM imports
- Better development experience

**Implementation:**

#### 1. Install NPM Dependencies

```bash
npm install gsap @gsap/react
npm install fontfaceobserver
npm install lenis # Modern smooth scrolling alternative
```

#### 2. Configure GSAP in `src/lib/gsap.ts`

```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, ScrollSmoother);

export default gsap;
export { ScrollTrigger, SplitText, CustomEase, ScrollSmoother };
```

#### 3. Create Animation Modules in `src/lib/animations/`

- `src/lib/animations/hero.ts` (from `hero-animations.js`)
- `src/lib/animations/text.ts` (from `text-anim.js`)
- `src/lib/animations/equalizer.ts` (from `equalizer.js`)
- etc.

#### 4. Replace Barba with Next.js PageToPage Component

- Use existing `src/app/pageToPage.tsx`
- Enhance with custom page transition logic

### Option 2: Script Tags in Layout (FALLBACK) ⚠️

**When to use:**

- If GSAP professional licenses are tied to specific files
- If certain scripts can't be easily converted
- For quick prototyping

**Implementation:**

#### Add to `src/app/layout.tsx`:

```typescript
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body className="loading" data-barba="wrapper">
        <PageOverlay />
        <Header />
        <Navigation />
        <main>{children}</main>

        {/* GSAP Scripts */}
        <Script
          src="/js/gsap.min.js"
          strategy="beforeInteractive"
          priority
        />
        <Script
          src="/js/CustomEase.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/js/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/js/ScrollSmoother.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/js/SplitText.min.js"
          strategy="beforeInteractive"
        />

        {/* Utilities */}
        <Script
          src="/js/fontfaceobserver.js"
          strategy="afterInteractive"
        />
        <Script
          src="/js/vars.js"
          strategy="beforeInteractive"
        />

        {/* Main Application */}
        <Script
          src="/js/main.js"
          strategy="afterInteractive"
          type="module"
        />
      </body>
      <Globals />
      <PageToPage />
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
```

## Recommended Implementation Plan

### Phase 1: Core GSAP Migration (Week 1)

1. ✅ **Install GSAP packages**

   ```bash
   npm install gsap @gsap/react
   ```

2. ✅ **Set up `src/lib/gsap.ts`**
   - Configure all GSAP plugins
   - Export typed GSAP instance

3. ✅ **Update existing components**
   - Modify `pageToPage.tsx` to use NPM GSAP
   - Test existing animations still work

### Phase 2: Animation Modules Migration (Week 2)

1. ✅ **Create animation library structure**

   ```
   src/lib/animations/
   ├── hero.ts
   ├── text.ts
   ├── equalizer.ts
   ├── menu.ts
   ├── testimonials.ts
   ├── work.ts
   └── index.ts
   ```

2. ✅ **Migrate each module**
   - Convert `html-version/js/modules/*.js` to TypeScript
   - Add proper typing
   - Use modern ES6+ syntax

3. ✅ **Create custom hooks**
   ```
   src/hooks/
   ├── use-hero-animations.hook.ts
   ├── use-text-animations.hook.ts
   ├── use-scroll-animations.hook.ts
   └── index.ts
   ```

### Phase 3: Utility Migration (Week 3)

1. ✅ **Font loading**
   - Install `fontfaceobserver` NPM package
   - Create `src/lib/fonts.ts`

2. ✅ **Variables management**
   - Convert `vars.js` to `src/utils/constants.ts`
   - Use TypeScript interfaces

3. ✅ **Smooth scrolling**
   - Install Lenis: `npm install lenis`
   - Configure in `src/lib/scroll.ts`

### Phase 4: Main Logic Migration (Week 4)

1. ✅ **Analyze main.js structure**
   - Identify initialization logic
   - Map to appropriate React lifecycle

2. ✅ **Create application initialization**
   - Use `src/app/globals.tsx` for global setup
   - Move page-specific logic to components

3. ✅ **Remove Barba dependency**
   - Enhance `pageToPage.tsx` component
   - Implement custom page transitions

## File Structure After Migration

```
src/
├── lib/
│   ├── gsap.ts              # GSAP configuration
│   ├── fonts.ts             # Font loading logic
│   ├── scroll.ts            # Lenis smooth scrolling
│   └── animations/
│       ├── hero.ts
│       ├── text.ts
│       ├── equalizer.ts
│       └── index.ts
├── hooks/
│   ├── use-gsap-animations.hook.ts
│   ├── use-scroll-trigger.hook.ts
│   └── use-smooth-scroll.hook.ts
├── components/
│   ├── animations/
│   │   ├── equalizer-canvas.tsx
│   │   ├── string-animation.tsx
│   │   └── text-reveal.tsx
│   └── layout/
│       ├── header.tsx
│       ├── navigation.tsx
│       └── page-overlay.tsx
└── utils/
    ├── constants.ts         # From vars.js
    └── animation-utils.ts   # Helper functions
```

## Benefits of NPM Migration

1. **Type Safety**: Full TypeScript support
2. **Bundle Optimization**: Tree shaking removes unused code
3. **Development Experience**: Better IDE support and debugging
4. **Performance**: Modern bundling and optimization
5. **Maintainability**: Easier updates and dependency management
6. **Server-Side Compatibility**: Works with SSR/SSG

## Fallback Plan

If NPM migration faces issues:

1. Copy all JS files to `public/js/`
2. Use Next.js Script component in layout
3. Gradually migrate one module at a time
4. Maintain backward compatibility

## Next Steps

1. **Start with Phase 1**: Core GSAP migration using NPM packages
2. **Test thoroughly**: Ensure all existing animations work
3. **Migrate incrementally**: One animation module at a time
4. **Monitor performance**: Compare bundle sizes and loading times
5. **Document changes**: Update component documentation

This approach gives us the benefits of modern tooling while maintaining the rich animation experience of the original site.
