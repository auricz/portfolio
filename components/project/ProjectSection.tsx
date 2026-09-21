import ExtraProjects from "@/components/project/ExtraProjects";
import ProjectRow from "@/components/project/ProjectRow";
import Reveal from "@/components/utils/Reveal";
import type { Project, SectionIntroData } from "@/lib/data";
import SectionIntro from "@/components/utils/SectionIntro";

interface ProjectSectionProps {
  projects: Project[];
  projectIntro: SectionIntroData | null;
}

// Server component: the project list, descriptions, tags, and image paths
// are all rendered here from data, so only the interactive gallery pieces
// (ProjectRow) ship as client components.
export default function ProjectSection({ projects, projectIntro }: ProjectSectionProps) {
  // Projects with a null status are never shown; "extra" ones sit behind a
  // Show More button.
  const mainProjects = projects.filter((p) => p.status === "main");
  const extraProjects = projects.filter((p) => p.status === "extra");

  return (
    <div className="w-full bg-neutral-200 p-6 dark:bg-neutral-800 sm:px-10">
      <div className="mx-auto max-w-7xl flex flex-col">
        <SectionIntro intro={projectIntro} />

        {mainProjects.map((project, idx) => (
          <Reveal key={project.id} variant="right">
            <ProjectRow project={project} idx={idx} />
          </Reveal>
        ))}

        <ExtraProjects projects={extraProjects} startIdx={mainProjects.length} />
      </div>
    </div>
  );
}