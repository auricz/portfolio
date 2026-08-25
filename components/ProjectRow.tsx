"use client";

import { useState } from "react";
import Image from "next/image";
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
      {/* Description + hero image, side by side on larger viewports. */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="font-display mt-1 text-2xl font-bold text-neutral-900 dark:text-neutral-50">
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

        {/* Static project image — not clickable, no modal. */}
        <div className="relative mx-auto h-67.5 w-67.5 shrink-0 overflow-hidden rounded-lg bg-neutral-300 dark:bg-neutral-700 lg:mx-0 lg:h-125 lg:w-125">
          <Image
            src={`/projects/${project.id}/${project.doodle.fileName}`}
            alt={project.doodle.alt}
            fill
            sizes="(min-width: 640px) 500px, 270px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Images: always a horizontal row below the description, at every
          viewport width. */}
      <div className="mt-6 flex justify-around gap-5 max-h-[40vh]">
        {project.screenshots.map((image, index) => (
          <HoverImage
            key={image.id}
            src={`/projects/${project.id}/${image.fileName}`}
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
          projectId={project.id}
          images={project.screenshots}
          activeIndex={activeIndex}
          onClose={close}
          onNavigate={setActiveIndex}
        />
      ) : null}
    </div>
  );
}