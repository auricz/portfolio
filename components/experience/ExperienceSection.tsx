import ExperienceRow from "@/components/experience/ExperienceRow";
import Reveal from "@/components/utls/Reveal";
import type { Experience } from "@/lib/data";

interface ExperienceSectionProps {
  experiences: Experience[];
}

// Server component: mirrors SoftwareSection — all data resolved here, no
// interactivity needed since Experience rows have no gallery or modal.
export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <div className="w-full bg-neutral-200 px-6 py-2 dark:bg-neutral-800 sm:px-10">
      <div className="mx-auto max-w-7xl">
        {experiences.map((experience) => (
          <Reveal key={experience.id} variant="right">
            <ExperienceRow experience={experience} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}