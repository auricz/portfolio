import Image from "next/image";
import type { Experience } from "@/lib/data";

interface ExperienceRowProps {
  experience: Experience;
}

export default function ExperienceRow({ experience }: ExperienceRowProps) {
  return (
    <div className="border-b border-neutral-300 py-8 last:border-b-0 dark:border-neutral-600">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-display font-bold  mt-1 text-2xl text-neutral-900 dark:text-neutral-50">
            {experience.title}
          </h3>
          <h4 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-neutral-500/90 dark:text-neutral-400">
            {experience.company} | {experience.year}
          </h4>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
            {experience.description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {experience.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-neutral-400 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-500 dark:text-neutral-300"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Company logo — static, not clickable, no gallery below. */}
        <div className="relative mx-auto h-65 w-65 shrink-0 overflow-hidden rounded-lg bg-neutral-300 dark:bg-neutral-700 sm:mx-0 sm:h-125 sm:w-125">
          <Image
            src={experience.logo.src}
            alt={experience.logo.alt}
            fill
            sizes="(min-width: 640px) 500px, 260px"
            className="object-contain p-8"
          />
        </div>
      </div>
    </div>
  );
}