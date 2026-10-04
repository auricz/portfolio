"use client";

import { useEffect } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/lib/data";
import ModalContainer from "@/components/utils/ModalContainer";
import PlayIcon from "@/components/utils/PlayIcon";
import SkeletonImage from "@/components/utils/SkeletonImage";
import YouTubePlayer from "@/components/utils/YouTubePlayer";
import { projectImageSrc } from "@/lib/project-media";
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
        className="relative flex max-h-full w-full max-w-400 flex-col items-center gap-3"
      >
        <div className="relative flex justify-center h-[80vh] w-full">
          {active.youtubeId ? (
            <div
              className="relative self-center aspect-video w-[min(100%,calc(80vh*16/9))] overflow-hidden rounded-lg bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Only ever mounted while the modal is open and not closing;
                  the fade-out shows the thumbnail so playback stops at once. */}
              {closing ? (
                <Image
                  src={projectImageSrc(projectId, active)}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <YouTubePlayer key={active.youtubeId} videoId={active.youtubeId} title={active.title} />
              )}
            </div>
          ) : (
            <SkeletonImage
              key={active.id}
              src={projectImageSrc(projectId, active)}
              alt={active.alt}
              width={1920}
              height={1080}
              className="max-h-[80vh] w-auto object-contain"
              skeletonClassName="self-center aspect-video w-[min(100%,calc(80vh*16/9))] rounded-lg"
              loading="eager"
              onClick={(e) => e.stopPropagation()}
              quality={100}
            />
          )}
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
                  <SkeletonImage
                    src={projectImageSrc(projectId, img)}
                    alt=""
                    fill
                    sizes="50px"
                    className="object-cover"
                    quality={100}
                    unoptimized={!!img.youtubeId}
                  />
                  {img.youtubeId ? <PlayIcon className="h-6 w-6" /> : null}
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </ModalContainer>
  );
}