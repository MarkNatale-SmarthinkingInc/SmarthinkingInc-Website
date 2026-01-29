# SmartThinking Project Guidelines

## Commands

```bash
npm run dev          # Development server with Turbopack
npm run build        # Production build
npm run start        # Start production server (port 3005)
npm run lint         # Run Biome/Next.js linting
npm run slicemachine # Prismic Slice Machine UI
```

## Tech Stack

- **Next.js 15.5.7** (App Router)
- **React 19.1.1**
- **TypeScript**
- **Prismic CMS** (document-based, not slice-based for homepage)
- **GSAP Professional** (ScrollTrigger, SplitText, Draggable, InertiaPlugin)
- **Zustand** for state management
- **SCSS/Sass** for styling
- **Lenis** for smooth scrolling
- **Biome** for linting (tab indentation)

## Project Structure

```
src/
├── app/           # Next.js App Router
├── components/    # Reusable UI components
├── slices/        # Prismic slice components
├── stores/        # Zustand state stores
├── lib/           # Third-party library configs (gsap.ts)
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── styles/        # SCSS files and mixins
└── assets/        # Static assets
```

## Critical Patterns

### GSAP Animations

```typescript
import { useGSAP } from '@gsap/react'
import gsap from '@/lib/gsap'  // Always use centralized config

const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo('.element',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: '.element' }
    )
  }, { scope: containerRef })

  return <div ref={containerRef}>...</div>
}
```

### Zustand Stores

```typescript
import { create } from "zustand"
import { combine } from "zustand/middleware"

const useStore = create(
  combine(INITIAL_VALUES, (set, get) => ({
    setValue: (value: string) => set({ value }),
    toggle: () => set({ isOpen: !get().isOpen }),
  }))
)
```

### Prismic Components

- Use `Content.HomepageDocumentData` for types
- Use `isFilled` helpers from `@prismicio/client` for validation
- `PrismicNextImage` requires NO alt attribute (handled automatically)
- Conditional rendering: always check `data.field_name && (...)`
- Rich text for titles: wrap in main component, use paragraph/strong/em as child spans

```typescript
import { type Content, isFilled } from "@prismicio/client"
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next"
import { PrismicRichText } from "@prismicio/react"

interface SectionProps {
  data: Content.HomepageDocumentData
}

export default function Section({ data }: SectionProps) {
  return (
    <section>
      {data.section_title && <h2>{data.section_title}</h2>}
      <PrismicNextImage field={data.section_image} />

      {/* Rich text for titles */}
      <h2 className="f-60">
        <PrismicRichText
          field={data.section_title}
          components={{
            paragraph: ({ children }) => <span>{children}</span>,
            strong: ({ children }) => <span className="Brown">{children}</span>,
          }}
        />
      </h2>
    </section>
  )
}
```

## File Naming Conventions

- **Component files**: kebab-case (`hero-section.tsx`)
- **Component exports**: PascalCase (`export default HeroSection`)
- **Stores**: camelCase with suffix (`ui.store.ts`, `ui.selectors.ts`)
- **Hooks**: kebab-case with prefix (`use-header-color.hook.ts`)

## Import Order

1. React/Next.js
2. Third-party libraries
3. Internal (`@/`)
4. Relative imports

## Migration Context

This project is migrating from `html-version/` to Next.js 15:
- Extract HTML first, preserve original behavior
- No premature optimization
- Test static version before Prismic integration
- GSAP scripts loaded via Next.js Script components from `public/js/`

## Linting Note

When encountering Prismic linting errors, ask the user to reload the schema rather than attempting to fix them directly.
