"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { ArtPiece } from "@/lib/data";

interface ArtModalProps {
  piece: ArtPiece;
  dateFormatter: (date: string) => string;
  onClose: () => void;
}

// Large image with a details panel that always sticks to the right edge —
// no solid backgrounds; a dim, blurred backdrop shows the page behind it.
export default function ArtModal({ piece, dateFormatter, onClose }: ArtModalProps) {
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={piece.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close artwork"
        className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white cursor-pointer hover:bg-white/20"
      >
        ✕
      </button>

      <div
        className="flex h-[85vh] w-full items-stretch"
        
      >
        {/* Image area: flex-1 so it fills the space left of the panel;
            object-contain centers the image within it, giving equal
            margins on either side of the image. */}
        <div className="relative min-w-0 flex-1">
          <Image
            src={`/art/${piece.fileName}`}
            alt={`Art piece titled: ${piece.title}`}
            fill
            sizes="(min-width: 640px) 60vw, 100vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Details panel: always on the right, no solid background. */}
        <div  
          className="ml-4 flex w-52 shrink-0 flex-col rounded-lg bg-neutral-200 text-neutral-700 dark:text-neutral-200 dark:bg-neutral-800 border-2 p-5 overflow-auto sm:ml-8 sm:w-72 sm:p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="font-display text-xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-2xl">{piece.title}</h2>
          <p className="mt-1 text-sm">{dateFormatter(piece.date)}</p>
          <p className="mt-8 text-sm leading-relaxed">{piece.description}</p>
        </div>
      </div>
    </div>
  );
}