interface SkeletonProps {
  className?: string;
}

// Shimmering placeholder block shown while media is loading.
export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <span
      aria-hidden
      className={`skeleton block bg-neutral-300 dark:bg-neutral-700 ${className}`}
    />
  );
}
