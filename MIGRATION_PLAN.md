# SmartThinking Migration Plan: HTML to Next.js + Prismic

## Overview

This document outlines the comprehensive migration strategy from the existing HTML website to a modern Next.js 15 application with Prismic CMS integration, maintaining the rich animations and luxury aesthetic.

## Phase 1: Component Architecture & Decomposition

### 1.1 Header & Navigation Components

**Components to Create:**

- `Header` - Main header wrapper with menu state management
- `Logo` - Reusable logo component with dark/light variants
- `HamburgerMenu` - Animated hamburger button with GSAP
- `Navigation` - Slide-out navigation menu
- `SocialLinks` - Reusable social media links component

**Key Features:**

- Menu overlay state management (Zustand)
- Smooth GSAP animations for menu transitions
- Responsive behavior
- Page name display logic

### 1.2 Hero Section Components

**Components to Create:**

- `HeroSection` - Main hero container
- `ParallaxImage` - Reusable parallax image component
- `HeroCaptions` - Grid-based caption layout
- `HeroTitle` - Animated main title with GSAP SplitText
- `HeroNavigation` - Inline navigation links

**Key Features:**

- Parallax scrolling effects
- GSAP text animations
- Responsive grid system
- Dynamic year display

### 1.3 Work Section Components

**Components to Create:**

- `WorkSection` - Main work section wrapper
- `WorkGrid` - Grid layout for work items
- `WorkItem` - Individual work project component
- `EqualizerCanvas` - Canvas animation component
- `ArrowLink` - Reusable arrow link component

**Key Features:**

- Canvas equalizer animations
- Hover effects with GSAP
- Lazy loading images
- Responsive grid behavior

### 1.4 Client Section Components

**Components to Create:**

- `ClientSection` - Client logos section
- `ClientGrid` - Responsive logo grid
- `ClientLogo` - Individual client logo with lazy loading

### 1.5 Testimonials Components

**Components to Create:**

- `TestimonialsSection` - Main testimonials wrapper
- `TestimonialCarousel` - Carousel with controls
- `TestimonialItem` - Individual testimonial
- `CarouselControls` - Arrow navigation buttons
- `RotatingImage` - SVG rotation animation

**Key Features:**

- GSAP carousel animations
- Touch/swipe support
- Image rotation effects
- Responsive behavior

### 1.6 Services Components

**Components to Create:**

- `ServicesSection` - Services section wrapper
- `ServicesList` - Grid layout for services
- `ServiceItem` - Individual service link
- `ImageCombo` - Multi-image layout component

### 1.7 Why Section Components

**Components to Create:**

- `WhySection` - Dark background section
- `DiamondIcons` - Decorative diamond elements

### 1.8 CTA Section Components

**Components to Create:**

- `CTASection` - Call-to-action section
- `ContactInfo` - Contact details component
- `ParallaxCTA` - Nested parallax images

### 1.9 Blog Section Components

**Components to Create:**

- `BlogSection` - Blog preview section
- `ArticleGrid` - Article layout grid
- `ArticleCard` - Individual article preview
- `TagList` - Article tags component

### 1.10 Footer Components

**Components to Create:**

- `Footer` - Main footer wrapper
- `FooterNavigation` - Navigation columns
- `ContactSection` - Contact information
- `Newsletter` - Email signup form
- `StringCanvas` - Canvas string animation
- `FooterSocial` - Social media links

## Phase 2: Prismic Content Modeling

### 2.1 Homepage Slice Architecture

**Slices to Create:**

1. `HeroSlice` - Hero section content
2. `WorkSlice` - Featured work projects
3. `ClientsSlice` - Client logo gallery
4. `TestimonialsSlice` - Testimonial carousel
5. `ServicesSlice` - Services overview
6. `WhySlice` - Why choose us section
7. `CTASlice` - Contact call-to-action
8. `BlogSlice` - Blog post previews

### 2.2 Content Types

**Document Types:**

- `Homepage` - Main homepage document
- `Work` - Individual work projects
- `Service` - Service detail pages
- `BlogPost` - Blog articles
- `Testimonial` - Customer testimonials
- `Settings` - Global site settings

**Fields Structure:**

```typescript
// Homepage Document
interface Homepage {
  hero: HeroSlice[];
  work: WorkSlice[];
  clients: ClientsSlice[];
  testimonials: TestimonialsSlice[];
  services: ServicesSlice[];
  why: WhySlice[];
  cta: CTASlice[];
  blog: BlogSlice[];
}

// Work Document
interface Work {
  title: string;
  slug: string;
  featured_image: ImageField;
  gallery: ImageField[];
  description: RichTextField;
  client: string;
  year: number;
  services: string[];
  case_study: RichTextField;
}

// Settings Document
interface Settings {
  site_title: string;
  logo_light: ImageField;
  logo_dark: ImageField;
  contact_email: string;
  contact_phone: string;
  address: RichTextField;
  social_instagram: string;
  social_linkedin: string;
  footer_text: RichTextField;
}
```

## Phase 3: Technical Implementation Strategy

### 3.1 Project Setup & Dependencies

**Core Dependencies:**

- Next.js 15 with App Router
- React 19
- TypeScript
- Prismic SDK
- GSAP Professional (with plugins)
- Zustand for state management
- SCSS/Sass
- Lenis for smooth scrolling

**GSAP Plugins Required:**

- ScrollTrigger
- SplitText
- Draggable
- InertiaPlugin
- MorphSVG
- MotionPath

### 3.2 File Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Homepage)
│   ├── work/
│   │   ├── page.tsx
│   │   └── [uid]/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── [uid]/page.tsx
│   ├── about/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [uid]/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── ui/
│   │   ├── ParallaxImage.tsx
│   │   ├── ArrowLink.tsx
│   │   ├── Button.tsx
│   │   └── index.ts
│   └── animations/
│       ├── EqualizerCanvas.tsx
│       ├── StringCanvas.tsx
│       └── index.ts
├── slices/
│   ├── HeroSlice/
│   ├── WorkSlice/
│   ├── TestimonialsSlice/
│   └── index.ts
├── stores/
│   ├── ui.store.ts
│   ├── menu.store.ts
│   └── index.ts
├── hooks/
│   ├── use-gsap-animations.hook.ts
│   ├── use-scroll-animations.hook.ts
│   └── use-parallax.hook.ts
├── styles/
│   ├── globals.scss
│   ├── components/
│   ├── mixins/
│   └── variables/
└── lib/
    ├── gsap.ts
    ├── prismic.ts
    └── utils.ts
```

### 3.3 Animation Migration Strategy

**GSAP Integration:**

1. Create centralized GSAP configuration in `lib/gsap.ts`
2. Register all professional plugins
3. Create reusable animation hooks
4. Implement smooth page transitions
5. Maintain existing animation timings and easing

**Key Animation Components:**

- Text splitting and reveal animations
- Parallax scroll effects
- Canvas-based animations (equalizer, strings)
- Image hover effects
- Menu transitions
- Carousel/slider interactions

### 3.4 State Management

**Zustand Stores:**

- `ui.store.ts` - General UI state (loading, theme)
- `menu.store.ts` - Navigation menu state
- `carousel.store.ts` - Testimonial carousel state

## Phase 4: Migration Execution Plan

### 4.1 Stage 1: Foundation (Week 1)

- [ ] Set up Next.js 15 project with TypeScript
- [ ] Configure Prismic integration
- [ ] Set up GSAP with professional plugins
- [ ] Create basic layout components (Header, Footer)
- [ ] Implement base styling system with SCSS
- [ ] Set up Zustand stores

### 4.2 Stage 2: Core Components (Week 2)

- [ ] Create reusable UI components
- [ ] Implement navigation and menu functionality
- [ ] Build parallax image component
- [ ] Create canvas animation components
- [ ] Set up smooth scrolling with Lenis

### 4.3 Stage 3: Homepage Slices (Week 3)

- [ ] Create all Prismic slice components
- [ ] Implement hero section with animations
- [ ] Build work section with equalizer effects
- [ ] Create testimonials carousel
- [ ] Implement services and CTA sections

### 4.4 Stage 4: Content Migration (Week 4)

- [ ] Set up Prismic content types
- [ ] Create homepage document structure
- [ ] Migrate all homepage content to Prismic
- [ ] Test responsive behavior
- [ ] Optimize animations for performance

### 4.5 Stage 5: Additional Pages (Week 5)

- [ ] Create work detail pages
- [ ] Build services pages
- [ ] Implement blog functionality
- [ ] Create about and contact pages
- [ ] Set up dynamic routing

### 4.6 Stage 6: Polish & Optimization (Week 6)

- [ ] Performance optimization
- [ ] SEO implementation
- [ ] Accessibility improvements
- [ ] Mobile optimization
- [ ] Testing and bug fixes

## Phase 5: Content Strategy

### 5.1 Content Preparation

- Extract all text content from HTML
- Organize images and assets
- Create content hierarchy in Prismic
- Set up preview functionality

### 5.2 SEO Migration

- Maintain existing URL structure
- Implement proper meta tags
- Set up structured data
- Configure sitemap generation

## Success Criteria

1. **Visual Fidelity:** New site matches existing design 100%
2. **Animation Quality:** All GSAP animations work smoothly
3. **Performance:** Lighthouse scores > 90 across all metrics
4. **Responsiveness:** Perfect mobile and tablet experience
5. **CMS Integration:** Easy content management through Prismic
6. **Code Quality:** Clean, maintainable, well-documented code

## Risk Mitigation

1. **GSAP License:** Ensure professional plugins are properly licensed
2. **Performance:** Monitor bundle size and optimize imports
3. **Browser Compatibility:** Test across all major browsers
4. **Animation Performance:** Use GPU acceleration where possible
5. **Content Migration:** Backup all existing content before migration

This plan provides a comprehensive roadmap for migrating the SmartThinking website while maintaining its luxury aesthetic and smooth animations.
