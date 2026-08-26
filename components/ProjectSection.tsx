import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";
import type { Project, SiteData } from "@/lib/data";

interface ProjectSectionProps {
  projects: Project[];
  projectIntro: SiteData["projectIntro"];
}

// Server component: the project list, descriptions, tags, and image paths
// are all rendered here from data, so only the interactive gallery pieces
// (ProjectRow) ship as client components.
export default function ProjectSection({ projects, projectIntro }: ProjectSectionProps) {
  return (
    <div className="w-full bg-neutral-200 p-6 dark:bg-neutral-800 sm:px-10">
      <div className="mx-auto max-w-7xl flex flex-col">
        {projectIntro && 
          <div className="flex flex-col pb-6 border-b border-neutral-300 dark:border-neutral-600">
            <p className="text-sm max-w-2xl text-center self-center text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
              {projectIntro}
            </p>
          </div>
        }

        {projects.map((project) => (
          <Reveal key={project.id} variant="right">
            <ProjectRow project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}