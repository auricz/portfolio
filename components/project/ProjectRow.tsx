"use client";

import { useState } from "react";
import Image from "next/image";
import HoverImage from "@/components/utils/HoverImage";
import SkeletonImage from "@/components/utils/SkeletonImage";
import ProjectImageModal from "@/components/project/ProjectImageModal";
import type { Project } from "@/lib/data";
import { projectImageSrc } from "@/lib/project-media";
import Reveal from "@/components/utils/Reveal";
import TagsRow from "@/components/utils/TagsRow";

interface ProjectRowProps {
  project: Project;
  idx: number;
}

export default function ProjectRow({ project, idx }: ProjectRowProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openAt = (index: number) => setActiveIndex(index);
  const close = () => setActiveIndex(null);

  return (
    <div className="border-b border-neutral-500 py-8 dark:border-neutral-600">
      {/* Description + hero image, side by side on larger viewports. */}
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <div className="mt-1 flex items-center gap-3">
            <h3 className="font-display text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              {project.title}
            </h3>
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="shrink-0 opacity-70 transition-opacity hover:opacity-100"
              >
                <Image
                  src="/links/github.svg"
                  alt=""
                  aria-hidden
                  width={32}
                  height={32}
                  className="dark:invert-100"
                  quality={25}
                />
              </a>
            ) : null}
          </div>
          <p className="mt-3 max-w-3xl text-md leading-relaxed text-neutral-600 dark:text-neutral-300 whitespace-pre-line">
            {project.description}
          </p>
          <TagsRow tags={project.tags} />
        </div>

        {/* Static project image — not clickable, no modal. */}
        <div className="relative mx-auto h-67.5 w-67.5 shrink-0 overflow-hidden rounded-lg lg:mx-0 lg:h-80 lg:w-80">
          <SkeletonImage
            src={`/projects/${project.id}/${project.heroFileName}`}
            alt={`Hero image for ${project.title}`}
            width={500}
            height={500}
            className="object-cover dark:invert-100 select-none"
            skeletonClassName="h-full w-full"
            draggable={false}
            quality={25}
            loading={idx === 0 ? "eager" : "lazy"}
          />
        </div>
      </div>

      {/* Images: always a horizontal row below the description, at every
          viewport width. */}
      <div className="mt-8 flex justify-around gap-4">
        {project.screenshots.map((image, index) => (
          <Reveal key={image.id} variant="right" className="w-full" style={{ transitionDelay: `${index * 100}ms` }}>
            <HoverImage
              src={projectImageSrc(project.id, image)}
              alt={image.alt}
              title={image.title}
              isVideo={!!image.youtubeId}
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