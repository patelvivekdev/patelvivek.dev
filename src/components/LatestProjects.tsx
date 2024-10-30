import { getLatestProjects } from '@/lib/get-projects';
import ProjectCard from './ProjectCard';

export default async function LatestProjects() {
  const projects = await getLatestProjects();
  return (
    <>
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          title={project.metadata.title!}
          description={project.metadata.description!}
          slug={project.slug}
          tags={project.metadata.tags!}
        />
      ))}
    </>
  );
}
