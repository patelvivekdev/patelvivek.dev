import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

import RecentBlogs from '@/components/RecentBlogs';

export default function Home() {
  return (
    <div className='mt-32 sm:mt-40 relative flex w-11/12 sm:w-3/4 mx-auto text-[#31363F] dark:text-[#EEEEEE]  flex-col items-center gap-3 sm:gap-5'>
      <h1 className='text-center text-2xl font-bold tracking-tight md:text-4xl'>
        About
        <hr />
      </h1>
      <Hero />
      <h1 className='text-center text-2xl font-bold tracking-tight md:text-4xl'>
        Latest Project
        <hr />
      </h1>
      <div className='grid grid-cols-1 gap-4 p-5 sm:p-10'>
        <ProjectCard
          title='Market-hub'
          description="Market-hub is a MERN-powered platform for buying and selling computer items. Vendors can easily manage their products, while users enjoy a smooth shopping experience. It's a user-friendly solution for tech enthusiasts and sellers alike."
          link='projects/market-hub'
          tags={['MERN', 'React', 'Nodejs', 'Express', 'MongoDB', 'FullStack']}
        />
        <ProjectCard
          title='Acme Auth'
          description='Acme Auth is a learning project focused on integrating third-party authentication APIs. It covers registration, login, logout, password recovery, and email verification. With a responsive design and efficient routing, it showcases modern web development practices using Next.js server actions and Tailwind CSS. '
          link='projects/acme-auth'
          tags={[
            'Nextjs',
            'AppRouter',
            'ShadcnUI',
            'TailwindCSS',
            'Authentication',
            'FreeAPI',
            'RESTAPI',
            'ServerActions',
            'TypeScript',
          ]}
        />
      </div>

      <Link href='/projects'>
        <Button
          variant='outline'
          className='
          mb-5 cursor-pointer text-lg font-semibold 
          border-neutral-800 text-neutral-800 hover:underline
          dark:border-neutral-300 dark:text-neutral-300'
        >
          View all projects &rarr;
        </Button>
      </Link>

      {/* Most viewed Blogs */}
      <h3 className='text-center text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl'>
        Recent Blog
        <hr />
      </h3>
      <div className='grid grid-cols-1 gap-4 p-5 sm:p-10'>
        <RecentBlogs />
      </div>

      <Link href='/blog'>
        <Button
          variant='outline'
          className='
          mb-5 cursor-pointer text-lg font-semibold 
          border-neutral-800 text-neutral-800 hover:underline
          dark:border-neutral-300 dark:text-neutral-300'
        >
          View all Blogs &rarr;
        </Button>
      </Link>
    </div>
  );
}
