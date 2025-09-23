import type { FilledLinkToMediaField, ImageField } from "@prismicio/client";

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
