"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import Skeleton from "@/components/utils/Skeleton";

interface SkeletonImageProps extends ImageProps {
  // Sizing for the skeleton of a non-fill image, which sits in the image's
  // place until it loads. Fill images ignore this; their skeleton covers the
  // (positioned) parent instead.
  skeletonClassName?: string;
}

/**
 * next/image that shows a skeleton until the image loads (or fails). Fill
 * images are overlaid by the skeleton; non-fill images are taken out of flow
 * (absolute, invisible) while loading so the skeleton holds their space, so
 * their parent must be positioned. Give it a `key` per source so the loading
 * state resets when the source changes.
 */
export default function SkeletonImage({
  skeletonClassName = "",
  className = "",
  onLoad,
  onError,
  ...props
}: SkeletonImageProps) {
  const [loaded, setLoaded] = useState<boolean>(false);

  const loadingClassName: string = props.fill ? "opacity-0" : "absolute opacity-0";

  return (
    <>
      {loaded ? null : (
        <Skeleton className={props.fill ? "absolute inset-0" : skeletonClassName} />
      )}
      <Image
        {...props}
        alt={props.alt}
        className={`${className} ${loaded ? "" : loadingClassName}`}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
      />
    </>
  );
}
