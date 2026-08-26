"use client";

import Image from "next/image";

interface HoverImageProps {
  src: string;
  alt: string;
  title: string;
  date?: string | null;
  onClick: () => void;
  sizes?: string;
  aspectClassName?: string;
  className?: string;
  loading?: "eager" | "lazy";
}

/**
 * Shared image tile: on hover (or focus, for keyboard users) the bottom of
 * the image darkens and reveals the title (and optional date), matching
 * the reference hover state. Used by both the Software gallery and the Art
 * grid so the interaction is consistent everywhere images appear outside a
 * modal.
 */
export default function HoverImage({
  src,
  alt,
  title,
  date,
  onClick,
  sizes = "(min-width: 640px) 33vw, 90vw",
  aspectClassName = "aspect-square",
  className = "",
  loading = "lazy",
}: HoverImageProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block w-full overflow-hidden rounded-lg bg-neutral-300 text-left dark:bg-neutral-700 cursor-pointer ${aspectClassName} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={loading}
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 via-black/25 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      <span className="absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
        <span className="block text-sm font-semibold leading-tight text-white">{title}</span>
        {date ? <span className="mt-0.5 block text-xs text-white/70">{date}</span> : null}
      </span>
    </button>
  );
}
