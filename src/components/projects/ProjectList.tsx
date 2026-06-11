import { ProjectCard } from "./ProjectCard";
import type { ProjectSuggestion } from "@/types/projects";

interface Props {
  projects: ProjectSuggestion[];
  onStart?: (id: string) => void;
}

export function ProjectList({ projects, onStart }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} onStart={onStart} />
      ))}
    </div>
  );
}
