"use client";

import { useState } from "react";
import ProjectRow from "@/components/project/ProjectRow";
import Reveal from "@/components/utils/Reveal";
import type { Project } from "@/lib/data";

interface ExtraProjectsProps {
  projects: Project[];
  // Index of the first extra project in the full list, so the eager-loading
  // check in ProjectRow (idx === 0) stays correct.
  startIdx: number;
}

// Holds the "extra" projects behind a Show More button. Renders nothing at
// all when there are no extra projects.
export default function ExtraProjects({ projects, startIdx }: ExtraProjectsProps) {
  const [expanded, setExpanded] = useState<boolean>(false);

  if (projects.length === 0) return null;

  if (!expanded) {
    return (
      <div className="flex justify-center py-8">
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="
            px-4 py-2
            border-4 border-neutral-300 dark:border-neutral-700
            rounded-full
            bg-white dark:bg-black hover:bg-neutral-200 dark:hover:bg-neutral-800
            text-sm font-medium uppercase tracking-widest
            text-neutral-600 dark:text-neutral-300
            focus-visible:outline-2 focus-visible:outline-offset-1
            transition-colors duration-200
            cursor-pointer
          "
        >
          Show More
        </button>
      </div>
    );
  }

  return (
    <>
      {projects.map((project, i) => (
        <Reveal key={project.id} variant="right">
          <ProjectRow project={project} idx={startIdx + i} />
        </Reveal>
      ))}
    </>
  );
}
