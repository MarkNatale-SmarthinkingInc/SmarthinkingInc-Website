# Prismic Content Model: Homepage Hero Section

## Document Type: Homepage

### Main Tab Fields

#### 1. **Hero Background Image** (`hero_background_image`)

- **Type**: Image
- **Purpose**: Large parallax background image for hero section
- **Thumbnails**:
  - Mobile: 768x1024
  - Desktop: 1920x1080
- **Used in**: `<figure className="parallax">`

#### 2. **Hero Left Caption** (`hero_left_caption`)

- **Type**: Text
- **Purpose**: Left caption text (e.g., "Brilliant Brands")
- **Used in**: Left grid column with `xs-hidden` class

#### 3. **Hero Center Caption** (`hero_center_caption`)

- **Type**: Text
- **Purpose**: Center tagline text
- **Example**: "Marketing for Luxury Hotels & Real Estate Developments"
- **Used in**: Center grid column

#### 4. **Hero Main Title** (`hero_main_title`)

- **Type**: Text
- **Purpose**: Large main headline
- **Example**: "Orchestrating the Symphonic Nature of Luxury Brands"
- **Used in**: `<h1 className="f-120 upper">`

#### 5. **Hero Subtitle** (`hero_subtitle`)

- **Type**: RichText
- **Purpose**: Branded tagline with formatting
- **Example**: "Think Critically.<br />Act Creatively.®"
- **Allowed formats**: heading2, strong, em, hyperlink
- **Used in**: `<h2 className="f-40">`

#### 6. **Hero Navigation** (`hero_navigation`)

- **Type**: Group (Repeatable)
- **Purpose**: Navigation links in hero section
- **Fields**:
  - `link_text` (Text): Display text (e.g., "Services")
  - `link_url` (Link): URL destination (e.g., "/services")
- **Used in**: `<nav>` element with links

### SEO & Metadata Tab Fields

#### 7. **Meta Title** (`meta_title`)

- **Type**: Text
- **Purpose**: Page title for SEO
- **Example**: "Smarthinking Inc. - Luxury Marketing Agency"

#### 8. **Meta Description** (`meta_description`)

- **Type**: Text
- **Purpose**: Page description for SEO
- **Example**: "Smarthinking Inc. is a luxury marketing agency..."

#### 9. **Meta Image** (`meta_image`)

- **Type**: Image
- **Purpose**: Social sharing image
- **Dimensions**: 1200x630 (optimal for social media)

## Component Implementation

### Static Component

```tsx
// src/components/homepage/hero-section.tsx
// Contains hardcoded content for development
```

### Prismic Component

```tsx
// src/components/homepage/hero-section-prismic.tsx
// Uses Prismic fields and components
```

## Content Strategy

### Default Content Values:

- **Left Caption**: "Brilliant Brands"
- **Center Caption**: "Marketing for Luxury Hotels & Real Estate Developments"
- **Main Title**: "Orchestrating the Symphonic Nature of Luxury Brands"
- **Subtitle**: "Think Critically.<br />Act Creatively.®"
- **Navigation Links**:
  - Services → /services
  - Work → /work
  - About → /about
  - Think Tank → /blog
  - Contact → /contact

### Content Management Benefits:

1. **Easy Updates**: Change hero content without code changes
2. **Image Management**: Upload and optimize images through Prismic
3. **SEO Control**: Manage meta tags and descriptions
4. **Link Management**: Update navigation without touching code
5. **Content Preview**: Preview changes before publishing

## Technical Implementation

### TypeScript Integration:

- Uses auto-generated `Content.HomepageDocument` types
- Full type safety for all fields
- IntelliSense support for content fields

### Prismic Components Used:

- `PrismicNextImage`: Optimized image rendering
- `PrismicRichText`: Rich text content with custom components
- `PrismicNextLink`: Automatic link resolution

### Performance Features:

- Image optimization with Next.js
- Responsive image thumbnails
- Priority loading for hero image
- Automatic copyright year generation
