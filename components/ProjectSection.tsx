import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";
import type { Project, SiteData } from "@/lib/data";
import SectionIntro from "./SectionIntro";

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
        <SectionIntro intro={projectIntro} />

        {projects.map((project) => (
          <Reveal key={project.id} variant="right">
            <ProjectRow project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}