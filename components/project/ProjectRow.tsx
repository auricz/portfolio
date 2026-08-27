"use client";

import { useState } from "react";
import Image from "next/image";
import HoverImage from "@/components/utils/HoverImage";
import ProjectImageModal from "@/components/project/ProjectImageModal";
import type { Project } from "@/lib/data";
import Reveal from "@/components/utils/Reveal";
import TagsRow from "@/components/utils/TagsRow";

interface ProjectRowProps {
  project: Project;
}

export default function ProjectRow({ project }: ProjectRowProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openAt = (index: number) => setActiveIndex(index);
  const close = () => setActiveIndex(null);

  return (
    <div className="border-b border-neutral-300 py-8 last:border-b-0 dark:border-neutral-600">
      {/* Description + hero image, side by side on larger viewports. */}
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <h3 className="font-display mt-1 text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            {project.title}
          </h3>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300 whitespace-pre-line">
            {project.description}
          </p>
          <TagsRow tags={project.tags} />
        </div>

        {/* Static project image — not clickable, no modal. */}
        <div className="relative mx-auto h-67.5 w-67.5 shrink-0 overflow-hidden rounded-lg lg:mx-0 lg:h-80 lg:w-80">
          <Image
            src={`/projects/${project.id}/${project.heroFileName}`}
            alt={`Hero image for ${project.title}`}
            width={500}
            height={500}
            className="object-cover dark:invert-100"
          />
        </div>
      </div>

      {/* Images: always a horizontal row below the description, at every
          viewport width. */}
      <div className="mt-6 flex justify-around gap-4 max-h-[40vh]">
        {project.screenshots.map((image, index) => (
          <Reveal key={image.id} variant="right" className="w-full" style={{ transitionDelay: `${index * 100}ms` }}>
            <HoverImage
              src={`/projects/${project.id}/${image.fileName}`}
              alt={image.alt}
              title={image.title}
              onClick={() => openAt(index)}
              aspectClassName="aspect-video"
              sizes="(min-width: 640px) 30vw, 33vw"
            />
          </Reveal>
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