"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { SoftwareImage } from "@/lib/data";

interface ProjectImageModalProps {
  projectTitle: string;
  images: SoftwareImage[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ProjectImageModal({
  projectTitle,
  images,
  activeIndex,
  onClose,
  onNavigate,
}: ProjectImageModalProps) {
  const active = images[activeIndex];

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((activeIndex - 1 + images.length) % images.length);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, images.length, onClose, onNavigate]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${projectTitle} — ${active.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        ✕
      </button>

      <div
        className="relative flex max-h-full w-full max-w-4xl flex-col items-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[60vh] w-full">
          <Image
            src={active.src}
            alt={active.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        <div className="flex w-full items-center justify-between text-sm text-white/80">
          <span>
            {projectTitle} — {active.title}
          </span>
          <span>
            {activeIndex + 1} / {images.length}
          </span>
        </div>

        {images.length > 1 ? (
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => onNavigate(i)}
                aria-label={`Show ${img.title}`}
                aria-current={i === activeIndex}
                className={`h-14 w-14 overflow-hidden rounded-md border-2 transition-colors ${
                  i === activeIndex ? "border-white" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <span className="relative block h-full w-full">
                  <Image src={img.src} alt="" fill sizes="56px" className="object-cover" />
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
