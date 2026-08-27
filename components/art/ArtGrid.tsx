"use client";

import { useEffect, useRef, useState } from "react";
import HoverImage from "@/components/utils/HoverImage";
import ArtModal from "@/components/art/ArtModal";
import Reveal from "@/components/utils/Reveal";
import type { ArtPiece } from "@/lib/data";

interface ArtGridProps {
  pieces: ArtPiece[];
}

// Sort by date descending, then title ascending, then filename
const sortByDateDesc = (a: ArtPiece, b: ArtPiece) => {
  const dateCompare = Date.parse(b.date) - Date.parse(a.date);
  if (dateCompare !== 0) return dateCompare;
  if (a.title && b.title) return a.title.localeCompare(b.title);
  return a.fileName.localeCompare(b.fileName);
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
  const [colCount, setColCount] = useState<number>(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const openPiece: ArtPiece | null = pieces.find((p) => p.id === openId) ?? null;

  // Function to calculate number of columns based on rendered grid
  const updateCols = () => {
    if (gridRef.current) {
      const gridStyles: CSSStyleDeclaration = window.getComputedStyle(gridRef.current);
      const colCount = gridStyles
        .getPropertyValue("grid-template-columns")
        .split(" ").length;
        setColCount(colCount);
    }
  };

  // Update column count on resize
  useEffect(() => {
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  return (
    <div className="bg-neutral-200 px-6 py-6 dark:bg-neutral-800 sm:px-10">
      <div className="mx-auto max-w-7xl flex flex-col">
        <div 
          className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
          ref={gridRef}
        >
          {pieces.sort(sortByDateDesc).map((piece, i) => (
            <Reveal key={piece.id} variant="up" style={{ transitionDelay: `${(i % colCount) * 100}ms` }}>
              <HoverImage
                src={`/art/${piece.fileName}`}
                alt={piece.title ?? "Untitled"}
                title={piece.title}
                date={dateFormatter(piece.date)}
                onClick={() => setOpenId(piece.id)}
                aspectClassName="aspect-square"
                sizes="(min-width: 640px) 22vw, 45vw"
                loading={i < 4 ? "eager" : "lazy"}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {openPiece ? <ArtModal piece={openPiece} dateFormatter={dateFormatter} onClose={() => setOpenId(null)} /> : null}
    </div>
  );
}