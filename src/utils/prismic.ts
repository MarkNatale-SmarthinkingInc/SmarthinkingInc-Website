import {
  type FilledLinkToMediaField,
  type ImageField,
  type RichTextField,
  isFilled,
} from "@prismicio/client";

/**
 * The client wants blog posts labelled by their `subtitle` everywhere they are
 * listed or headed. `title` only mirrors the Prismic entry name (the Content
 * API cannot read the entry name itself), so it stays as the fallback for the
 * handful of posts that have no subtitle filled in.
 *
 * Anywhere this is used, `blog_post.subtitle` must be in the query's
 * `fetchLinks` when the post arrives as a content relationship.
 */
export function getBlogDisplayTitle(data?: {
  title?: string | null;
  subtitle?: string | null;
}): string {
  return data?.subtitle?.trim() || data?.title?.trim() || "";
}

export function getImageRatio(image: ImageField | FilledLinkToMediaField) {
  if ("dimensions" in image) {
    return image.dimensions?.width && image.dimensions?.height
      ? image.dimensions.width / image.dimensions.height
      : undefined;
  }
  if ("width" in image) {
    return Number(image.width) / Number(image.height);
  }
  return undefined;
}

/**
 * Prismic-with-fallback helpers for the Services pages.
 *
 * The Services page and its three subpages shipped with their copy hardcoded,
 * and only parts of them are client-editable. Rather than move that copy into
 * Prismic and risk blank sections while it is being entered, every wired field
 * falls back to what is in the component. An empty Prismic field renders
 * exactly what the page rendered before it was wired — so the migration can be
 * done a field at a time, and an accidentally-cleared field degrades to the
 * original copy instead of a hole in the page.
 */

/** Rich text if the editor filled it in, otherwise the copy shipped in code. */
export function richTextOr(
  field: RichTextField | undefined,
  fallback: string[],
): { fromPrismic: true; field: RichTextField } | { fromPrismic: false; paragraphs: string[] } {
  return isFilled.richText(field)
    ? { fromPrismic: true, field }
    : { fromPrismic: false, paragraphs: fallback };
}

/** Plain text if the editor filled it in, otherwise the value shipped in code. */
export function textOr(value: string | null | undefined, fallback: string): string {
  return value?.trim() ? value.trim() : fallback;
}
