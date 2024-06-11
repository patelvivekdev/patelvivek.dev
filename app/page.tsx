import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import RecentBlogs from '@/components/RecentBlogs';
import { getLatestProjects } from '@/lib/get-projects';

export default function Home() {
  const projects = getLatestProjects();
  return (
    <div className='mx-auto mt-16 flex w-11/12 flex-col items-center gap-3 text-[#31363F] dark:text-[#EEEEEE] sm:mt-40 sm:gap-6'>
      <h1 className='border-b-4 border-indigo-500 text-center text-2xl font-bold md:text-4xl'>
        About
      </h1>
      <Hero />
      {/* <h2 className='mt-2 text-center text-2xl font-bold md:text-4xl border-b-4 border-indigo-500'>Github States</h2>
      <div className='text-center gap-4'>
        <Image
          src='http://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=patelvivekdev&theme=github'
          width={500}
          height={500}
          alt='Github'
          className='cursor-pointer'
        />
      </div> */}
      <h2 className='mt-2 border-b-4 border-indigo-500 text-center text-2xl font-bold md:text-4xl'>
        Latest Project
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
      <Link href='/projects'>
        <Button
          variant='outline'
          className='cursor-pointer border-2 border-neutral-800 text-lg font-semibold text-neutral-800 hover:border-indigo-700 hover:underline dark:border-neutral-300 dark:text-neutral-300 hover:dark:border-indigo-700'
        >
          View all projects &rarr;
        </Button>
      </Link>

      {/* Most viewed Blogs */}
      <h3 className='border-b-4 border-indigo-500 text-center text-2xl font-bold md:text-4xl'>
        Recent Blog
      </h3>
      <div className='grid grid-cols-1 gap-4'>
        <RecentBlogs />
      </div>

      <Link href='/blog'>
        <Button
          variant='outline'
          className='mb-5 cursor-pointer border-2 border-neutral-800 text-lg font-semibold text-neutral-800 hover:border-indigo-700 hover:underline dark:border-neutral-300 dark:text-neutral-300 hover:dark:border-indigo-700'
        >
          Read all Blogs &rarr;
        </Button>
      </Link>
    </div>
  );
}
