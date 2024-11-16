import type { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import { getProjectByDate } from '@/lib/get-projects';

export const metadata: Metadata = {
  title: 'My Web Development Projects',
  description:
    'Explore my portfolio of React, Next.js, and web development projects. See my skills in action.',
  keywords:
    'React, Next.js, Projects, work, portfolio, web development, Vivek Patel',
  openGraph: {
    title: 'My Web Development Projects',
    description:
      'Explore my portfolio of React, Next.js, and web development projects. See my skills in action.',
    url: 'https://patelvivek.dev/projects',
    siteName: 'Vivek Patel',
    images: [
      {
        url: 'https://patelvivek.dev/og?title=My%20Web%20Development%20Projects',
        width: 1200,
        height: 630,
        alt: 'My Web Development Projects',
      },
    ],
  },
};

const ProjectPage = async () => {
  let projects = await getProjectByDate();

  return (
    <div className='mx-auto mb-5 mt-16 flex w-11/12 flex-col items-center sm:mt-40'>
      <h1 className='border-b-4 border-indigo-500 text-center text-2xl font-bold md:text-4xl'>
        All Projects
      </h1>
      <h2 className='mb-8 mt-4 text-xl'>
        Here are some of the projects I have worked on.
      </h2>
      <div className='grid grid-cols-1 gap-4'>
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.metadata.title!}
            description={project.metadata.description!}
            slug={project.slug}
            tags={project.metadata.tags!}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
