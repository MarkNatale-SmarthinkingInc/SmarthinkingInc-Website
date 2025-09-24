import type { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import type { SliceComponentProps } from "@prismicio/react";
import type { FC } from "react";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock: FC<ImageBlockProps> = ({ slice }) => {
  return (
    <figure>
      <PrismicNextImage field={slice.primary.image} className="lazy" />
    </figure>
  );
};

export default ImageBlock;
