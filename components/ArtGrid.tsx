"use client";

import { useState } from "react";
import HoverImage from "@/components/HoverImage";
import ArtModal from "@/components/ArtModal";
import type { ArtPiece } from "@/lib/data";

interface ArtGridProps {
  pieces: ArtPiece[];
}

// Sort by date descending, then title ascending
const sortByDateDesc = (a: ArtPiece, b: ArtPiece) => {
  const dateCompare = Date.parse(b.date) - Date.parse(a.date);
  if (dateCompare !== 0) return dateCompare;
  return a.title.localeCompare(b.title);
}

// Format dates to MMM DD, YYYY (ex: Jan 1, 2026)
const dateFormatter = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export default function ArtGrid({ pieces }: ArtGridProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const openPiece = pieces.find((p) => p.id === openId) ?? null;

  return (
    <div className="bg-neutral-200 px-6 py-6 dark:bg-neutral-800 sm:px-10">
      <div className="mx-auto max-w-7xl flex flex-col">
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pieces.sort(sortByDateDesc).map((piece) => (
            <HoverImage
              key={piece.id}
              src={`/art/${piece.fileName}`}
              alt={piece.title}
              title={piece.title}
              date={dateFormatter(piece.date)}
              onClick={() => setOpenId(piece.id)}
              aspectClassName="aspect-square"
              sizes="(min-width: 640px) 22vw, 45vw"
            />
          ))}
        </div>
      </div>

      {openPiece ? <ArtModal piece={openPiece} dateFormatter={dateFormatter} onClose={() => setOpenId(null)} /> : null}
    </div>
  );
}
