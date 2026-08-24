"use client";

import { useState } from "react";
import HoverImage from "@/components/HoverImage";
import ProjectImageModal from "@/components/ProjectImageModal";
import type { SoftwareProject } from "@/lib/data";

interface ProjectRowProps {
  project: SoftwareProject;
}

export default function ProjectRow({ project }: ProjectRowProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openAt = (index: number) => setActiveIndex(index);
  const close = () => setActiveIndex(null);

  return (
    <div className="border-b border-neutral-300 py-8 last:border-b-0 dark:border-neutral-600">
      {/* Description */}
      <div>
        <p className="text-xs font-medium text-neutral-500/85 dark:text-neutral-400">{project.year}</p>
        <h3 className="font-display mt-1 text-2xl text-neutral-900 dark:text-neutral-50">
          {project.title}
        </h3>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
          {project.description}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-neutral-400 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-500 dark:text-neutral-300"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* Images: always a horizontal row below the description, at every
          viewport width. */}
      <div className="mt-6 flex justify-around gap-5 max-h-[40vh]">
        {project.images.map((image, index) => (
          <HoverImage
            key={image.id}
            src={image.src}
            alt={image.alt}
            title={image.title}
            onClick={() => openAt(index)}
            aspectClassName="aspect-[4/3]"
            sizes="(min-width: 640px) 30vw, 33vw"
          />
        ))}
      </div>

      {activeIndex !== null ? (
        <ProjectImageModal
          projectTitle={project.title}
          images={project.images}
          activeIndex={activeIndex}
          onClose={close}
          onNavigate={setActiveIndex}
        />
      ) : null}
    </div>
  );
}
