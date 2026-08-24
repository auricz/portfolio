"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { ArtPiece } from "@/lib/data";

interface ArtModalProps {
  piece: ArtPiece;
  onClose: () => void;
}

// X/Twitter-style photo viewer: large image with a side panel holding the
// title, date, and description. On small viewports the panel moves above
// the image instead of beside it.
export default function ArtModal({ piece, onClose }: ArtModalProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close artwork"
        className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        ✕
      </button>

      <div
        className="flex h-full w-full max-w-5xl flex-col overflow-y-auto bg-neutral-950 sm:h-auto sm:max-h-[85vh] sm:flex-row sm:overflow-hidden sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel: title, date, description. Appears above the image on
            small viewports, beside it on larger ones. */}
        <div className="order-1 shrink-0 border-b border-neutral-800 p-6 sm:order-2 sm:w-72 sm:border-b-0 sm:border-l sm:p-6">
          <h2 className="font-display text-2xl text-neutral-50">{piece.title}</h2>
          {piece.date ? <p className="mt-1 text-sm text-neutral-500">{piece.date}</p> : null}
          <p className="mt-4 text-sm leading-relaxed text-neutral-300">{piece.description}</p>
        </div>

        <div className="relative order-2 min-h-[45vh] flex-1 sm:order-1 sm:min-h-0">
          <Image src={piece.src} alt={piece.alt} fill sizes="(min-width: 640px) 60vw, 100vw" className="object-contain" priority />
        </div>
      </div>
    </div>
  );
}
