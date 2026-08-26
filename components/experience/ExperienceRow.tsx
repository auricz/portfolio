import Image from "next/image";
import type { Experience } from "@/lib/data";
import TagsRow from "@/components/utils/TagsRow";

interface ExperienceRowProps {
  experience: Experience;
}

export default function ExperienceRow({ experience }: ExperienceRowProps) {
  return (
    <div className="border-b border-neutral-300 py-8 last:border-b-0 dark:border-neutral-600">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
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
          <TagsRow tags={experience.tags} />
        </div>

        {/* Company logo — static, not clickable, no gallery below. */}
        <div className="relative mx-auto h-65 w-65 shrink-0 overflow-hidden rounded-lg text-black bg-white lg:mx-0">
          <Image
            src={`/experiences/${experience.logoFileName}`}
            alt={`Logo for ${experience.company}`}
            fill
            sizes="(min-width: 640px) 400px, 260px"
            className="object-contain p-8"
          />
        </div>
      </div>
    </div>
  );
}