import type { FilledLinkToMediaField, ImageField } from "@prismicio/client";

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
