import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import RecentBlogs from '@/components/RecentBlogs';

export default function Home() {
  return (
    <div className='mt-16 sm:mt-40 relative flex w-11/12 sm:w-3/4 mx-auto text-[#31363F] dark:text-[#EEEEEE] flex-col items-center gap-3 sm:gap-6'>
      <h1 className='text-center text-2xl font-bold md:text-4xl border-b-4 border-indigo-500'>About</h1>
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
      <h2 className='mt-2 text-center text-2xl font-bold md:text-4xl border-b-4 border-indigo-500'>Latest Project</h2>
      <div className='grid grid-cols-1 gap-4'>
        <ProjectCard
          title='Market Hub: A multi-vendor marketplace'
          description="Market-hub is a MERN-powered platform for buying and selling computer items. Vendors can easily manage their products, while users enjoy a smooth shopping experience. It's a user-friendly solution for tech enthusiasts and sellers alike."
          link='projects/market-hub'
          tags={['MERN', 'React', 'Nodejs', 'Express', 'MongoDB', 'FullStack']}
        />
        <ProjectCard
          title='Acme Auth: A Next.js Based Authentication'
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
          cursor-pointer text-lg font-semibold border-2
          border-neutral-800 text-neutral-800 hover:underline
          dark:border-neutral-300 dark:text-neutral-300
          hover:border-indigo-500 hover:dark:border-indigo-500
          '
        >
          View all projects &rarr;
        </Button>
      </Link>

      {/* Most viewed Blogs */}
      <h3 className='text-center text-2xl font-bold md:text-4xl border-b-4 border-indigo-500'>Recent Blog</h3>
      <div className='grid grid-cols-1 gap-4'>
        <RecentBlogs />
      </div>

      <Link href='/blog'>
        <Button
          variant='outline'
          className='mb-5
          cursor-pointer text-lg font-semibold border-2
          border-neutral-800 text-neutral-800 hover:underline
          dark:border-neutral-300 dark:text-neutral-300
          hover:border-indigo-500 hover:dark:border-indigo-500
          '
        >
          Read all Blogs &rarr;
        </Button>
      </Link>
    </div>
  );
}
