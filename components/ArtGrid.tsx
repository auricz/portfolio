"use client";

import { useMemo, useState } from "react";
import HoverImage from "@/components/HoverImage";
import ArtModal from "@/components/ArtModal";
import type { ArtPiece, SiteData } from "@/lib/data";

interface ArtGridProps {
  pieces: ArtPiece[];
  copy: SiteData["art"];
}

// Naive date parser tolerant of the "Mon YYYY" format used in the data —
// falls back to 0 (treated as "oldest") if a piece has no date.
function toSortableTime(date: string | null): number {
  if (!date) return 0;
  const parsed = Date.parse(date + " 1");
  return Number.isNaN(parsed) ? 0 : parsed;
}

export default function ArtGrid({ pieces, copy }: ArtGridProps) {
  const [query, setQuery] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = useMemo(() => {
    const filtered = pieces.filter((p) =>
      p.title.toLowerCase().includes(query.trim().toLowerCase())
    );
    return [...filtered].sort((a, b) => {
      const diff = toSortableTime(a.date) - toSortableTime(b.date);
      return sortAscending ? diff : -diff;
    });
  }, [pieces, query, sortAscending]);

  const openPiece = pieces.find((p) => p.id === openId) ?? null;

  return (
    <div className="bg-neutral-200 px-6 py-6 dark:bg-neutral-800 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-300">
              ⌕
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={copy.searchPlaceholder}
              aria-label={copy.searchPlaceholder}
              className="w-full rounded-md border border-neutral-300 bg-white/70 py-2 pl-9 pr-3 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 dark:border-neutral-600 dark:bg-neutral-700/70 dark:text-neutral-100 dark:placeholder:text-neutral-400"
            />
          </div>
          <button
            type="button"
            onClick={() => setSortAscending((v) => !v)}
            className="flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white/70 px-3 py-2 text-sm text-neutral-700 hover:bg-white dark:border-neutral-600 dark:bg-neutral-700/70 dark:text-neutral-100 dark:hover:bg-neutral-700"
          >
            <span aria-hidden>{sortAscending ? "↑" : "↓"}</span>
            {sortAscending ? copy.sortAscendingLabel : copy.sortDescendingLabel}
          </button>
        </div>

        {visible.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {visible.map((piece) => (
              <HoverImage
                key={piece.id}
                src={piece.src}
                alt={piece.alt}
                title={piece.title}
                date={piece.date}
                onClick={() => setOpenId(piece.id)}
                aspectClassName="aspect-square"
                sizes="(min-width: 640px) 22vw, 45vw"
              />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-neutral-500 dark:text-neutral-300">
            {copy.emptyStateText}
          </p>
        )}
      </div>

      {openPiece ? <ArtModal piece={openPiece} onClose={() => setOpenId(null)} /> : null}
    </div>
  );
}
