import type { Content } from "@prismicio/client";
import Image from "next/image";
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
      <Image
        alt={slice.primary.image?.alt ?? ""}
        src={`${slice.primary.image?.url}&fit=clip&w=1440`}
        sizes="(max-width: 768px) 100vw, 1440px"
        blurDataURL={`${slice.primary.image?.url}&w=100&blur=40`}
        placeholder="blur"
        width={slice.primary.image?.dimensions?.width || 1440}
        height={slice.primary.image?.dimensions?.height || 810}
        className="lazy"
      />
    </figure>
  );
};

export default ImageBlock;
