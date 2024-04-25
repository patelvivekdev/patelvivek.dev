import type { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';

export const metadata: Metadata = {
  title: 'My Web Development Projects',
  description: 'Explore my portfolio of React, Next.js, and web development projects. See my skills in action.',
  keywords: 'React, Next.js, Projects, work, portfolio, web development, Vivek Patel',
};

const ProjectPage = () => {
  const projects = [
    {
      slug: 'market-hub',
      title: 'Market Hub: A multi-vendor marketplace',
      description:
        "Market-hub is a MERN-powered platform for buying and selling computer items. Vendors can easily manage their products, while users enjoy a smooth shopping experience. It's a user-friendly solution for tech enthusiasts and sellers alike.",
      link: 'projects/market-hub',
      tags: ['MERN', 'React', 'Nodejs', 'Express', 'MongoDB', 'FullStack'],
    },
    {
      slug: 'acme-auth',
      title: 'Acme Auth: A Next.js Based Authentication',
      description:
        'Acme Auth is a learning project focused on integrating third-party authentication APIs. It covers registration, login, logout, password recovery, and email verification. With a responsive design and efficient routing, it showcases modern web development practices using Next.js server actions and Tailwind CSS.',
      link: 'projects/acme-auth',
      tags: [
        'Nextjs',
        'React',
        'AppRouter',
        'ShadcnUI',
        'TailwindCSS',
        'Authentication',
        'FreeAPI',
        'RESTAPI',
        'ServerActions',
        'TypeScript',
      ],
    },
    {
      slug: 'nextjs-blog',
      title: 'Next.js 14 Blog with App Router and MDX',
      description:
        'Explore a Next.js 14 project demonstrating the new App Router, server actions, and MDX integration for streamlined blog creation.',
      image: {
        src: 'https://firebasestorage.googleapis.com/v0/b/patelvivekdev.appspot.com/o/images%2Fdefault.png?alt=media&token=d917a346-35fd-4e33-ac34-3c725b6f2769',
        alt: 'Next.js 14 Blog logo',
      },
      link: 'projects/nextjs-blog',
      tags: ['NextJs', 'React', 'MDX', 'App Router', 'Server Components', 'Server Actions', 'Blog'],
    },
  ];

  return (
    <div className='mx-auto mt-40 mb-5 flex w-11/12 sm:w-3/4 flex-col items-center'>
      <h1 className='text-center text-2xl font-bold md:text-4xl border-b-4 border-indigo-500'>All Projects</h1>
      <h3 className='mb-8 mt-4 text-base'>Here are some of the projects I have worked on.</h3>
      <div className='grid grid-cols-1 gap-4'>
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            description={project.description}
            link={project.link}
            tags={project.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
