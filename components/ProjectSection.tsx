import ProjectRow from "@/components/ProjectRow";
import type { Project } from "@/lib/data";

interface ProjectSectionProps {
  projects: Project[];
}

// Server component: the project list, descriptions, tags, and image paths
// are all rendered here from data, so only the interactive gallery pieces
// (ProjectRow) ship as client components.
export default function ProjectSection({ projects }: ProjectSectionProps) {
  return (
    <div className="w-full bg-neutral-200 px-6 py-2 dark:bg-neutral-800 sm:px-10">
      <div className="mx-auto max-w-7xl">
        {projects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
