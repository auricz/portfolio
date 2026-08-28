"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { ArtPiece } from "@/lib/data";
import ModalContainer from "@/components/utils/ModalContainer";
import { useModalTransition } from "@/lib/use-modal-transition";

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
  const { closing, close: triggerClose } = useModalTransition(onClose);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") triggerClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [triggerClose]);

  const artSrc: string = `/art/${piece.fileName}`;

  const img: HTMLImageElement = document.createElement("img");
  img.src = artSrc;
  img.onload = () => setImgDim({ width: img.width, height: img.height});

  return (
    <ModalContainer
      btnAddClassName="top-6 right-6 lg:top-4 lg:right-4 flex items-center justify-center"
      ariaLabel={`Modal dialog for ${piece.title ?? "Untitled"}`}
      onClose={triggerClose}
      closing={closing}
    >
      {/* Only axis that scrolls is vertical; the fixed backdrop above keeps
          the page behind it from moving. */}
      <div className="h-full w-full overflow-y-auto overflow-x-hidden">
        <div className="flex min-h-full justify-center p-4 lg:items-center">
          <div className="flex w-full flex-col items-stretch lg:h-[85vh] lg:flex-row">
            {/* Details panel */}
            <div
              className={`
                art-panel ${closing ? "art-panel-closing" : ""} 
                order-1 lg:order-2
                flex flex-col shrink-0 
                mb-4 p-5 lg:mb-0 lg:ml-8
                w-full lg:w-100
                overflow-auto 
                rounded-lg border-2 bg-neutral-200 dark:bg-neutral-800
                text-neutral-700 dark:text-neutral-200
              `}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-display text-3xl font-bold text-neutral-900 pr-8 lg:pr-0 dark:text-neutral-50">
                {piece.title ?? <i className="text-neutral-500 dark:text-neutral-400">Untitled</i>}
              </h2>
              <p className="mt-2 text-sm">{dateFormatter(piece.date)}</p>
              <p className="mt-1 text-sm h-[1ch]">{imgDim ? `${imgDim.width} × ${imgDim.height}` : ''}</p>
              <p className="mt-8 text-md leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: piece.description ?? `<i className="text-neutral-500 dark:text-neutral-400">No description provided</i>`}} />
            </div>

            {/* Image area */}
            <div className="relative order-2 w-full flex-1 lg:order-1">
              <div className="flex items-baseline lg:items-center justify-center relative h-full w-full">
                <Image
                  src={artSrc}
                  alt={`Art piece titled: ${piece.title}`}
                  width={2000}
                  height={2000}
                  className="w-auto lg:max-h-[85vh] object-contain"
                  onClick={(e) => e.stopPropagation()}
                  draggable={false}
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}