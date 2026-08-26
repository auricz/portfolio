"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { ArtPiece } from "@/lib/data";

interface ArtModalProps {
  piece: ArtPiece;
  dateFormatter: (date: string) => string;
  onClose: () => void;
}

// Large image with a details panel that sticks above the image on
// phones/tablets and to the right edge on wide (lg+) screens — no solid
// backgrounds; a dim, blurred backdrop shows the page behind it. The
// backdrop itself scrolls vertically when content is taller than the
// viewport; the page behind it stays locked (see the body overflow
// effect below).
export default function ArtModal({ piece, dateFormatter, onClose }: ArtModalProps) {
  const [imgDim, setImgDim] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const artSrc: string = `/art/${piece.fileName}`;

  const img: HTMLImageElement = document.createElement("img");
  img.src = artSrc;
  img.onload = () => setImgDim({ width: img.width, height: img.height});

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={piece.title}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-lg"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close artwork"
        className="fixed right-6 top-6 lg:right-4 lg:top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/20"
      >
        ✕
      </button>

      {/* Only axis that scrolls is vertical; the fixed backdrop above keeps
          the page behind it from moving. */}
      <div className="h-full w-full overflow-y-auto overflow-x-hidden" onClick={onClose}>
        <div className="flex min-h-full justify-center p-4 lg:items-center">
          <div className="flex w-full flex-col items-stretch lg:h-[85vh] lg:flex-row">
            {/* Details panel */}
            <div
              className="order-1 flex mb-4 w-full shrink-0 flex-col overflow-auto rounded-lg border-2 bg-neutral-200 p-5 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 lg:order-2 lg:mb-0 lg:ml-8 lg:w-72"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-display text-2xl font-bold text-neutral-900 pr-8 dark:text-neutral-50">{piece.title}</h2>
              <p className="mt-2 text-sm">{dateFormatter(piece.date)}</p>
              <p className="mt-1 text-sm h-[1ch]">{imgDim ? `${imgDim.width} × ${imgDim.height}` : ''}</p>
              <p className="mt-8 text-sm leading-relaxed">{piece.description}</p>
            </div>

            {/* Image area */}
            <div className="relative order-2 w-full flex-1 lg:order-1">
              <div className="flex items-baseline lg:items-center justify-center relative h-full w-full">
                <Image
                  src={artSrc}
                  alt={`Art piece titled: ${piece.title}`}
                  width={2000}
                  height={2000}
                  className="w-auto lg:max-h-[85vh] object-contain bg-white dark:bg-black"
                  onClick={(e) => e.stopPropagation()}
                  preload
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}