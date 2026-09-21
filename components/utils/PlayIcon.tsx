interface PlayIconProps {
  className?: string;
}

/**
 * Centered play badge overlaid on a video thumbnail. The parent must be
 * `relative`; size the badge with `className` (e.g. "h-14 w-14").
 */
export default function PlayIcon({ className = "h-14 w-14" }: PlayIconProps) {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span
        className={`flex items-center justify-center rounded-full bg-black/60 text-white transition-transform duration-200 group-hover:scale-110 ${className}`}
      >
        <svg viewBox="0 0 24 24" className="h-1/2 w-1/2 translate-x-[8%]" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </span>
  );
}
