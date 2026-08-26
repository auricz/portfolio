"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/lib/data";
import ModalContainer from "@/components/utils/ModalContainer";
import { useModalTransition } from "@/lib/use-modal-transition";

interface ProjectImageModalProps {
  projectTitle: string;
  projectId: string;
  images: ProjectImage[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ProjectImageModal({
  projectTitle,
  projectId,
  images,
  activeIndex,
  onClose,
  onNavigate,
}: ProjectImageModalProps) {
  const active = images[activeIndex];
  const { closing, close: triggerClose } = useModalTransition(onClose);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") triggerClose();
      if (e.key === "ArrowRight") onNavigate((activeIndex + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((activeIndex - 1 + images.length) % images.length);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, images.length, triggerClose, onNavigate]);

  return (
    <ModalContainer
      bgAddClassName="p-4"
      btnAddClassName="top-4 right-4 flex items-center justify-center"
      ariaLabel={`${projectTitle} — ${active.title}`}
      onClose={triggerClose}
      closing={closing}
    >
      <div
        className="relative flex max-h-full w-full max-w-4xl flex-col items-center gap-3"
      >
        <div className="relative h-[60vh] w-full">
          <Image
            src={`/projects/${projectId}/${active.fileName}`}
            alt={active.alt}
            fill
            sizes="(min-width:640px) 100vw, 100vw"
            className="object-contain bg-white dark:bg-black"
            onClick={(e) => e.stopPropagation()}
            
          />
        </div>

        <div className="flex w-full items-center justify-between text-sm text-white" onClick={(e) => e.stopPropagation()}>
          <span>
            {projectTitle} — {active.title}
          </span>
          <span>
            {activeIndex + 1} / {images.length}
          </span>
        </div>

        {images.length > 1 ? (
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                onClick={() => onNavigate(i)}
                aria-label={`Show ${img.title}`}
                aria-current={i === activeIndex}
                className={`h-14 w-14 overflow-hidden rounded-md border-2 transition-colors cursor-pointer ${
                  i === activeIndex ? "border-white" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <span className="relative block h-full w-full">
                  <Image src={`/projects/${projectId}/${img.fileName}`} alt="" fill sizes="50px" className="object-cover" />
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </ModalContainer>
  );
}