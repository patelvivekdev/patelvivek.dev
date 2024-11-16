import Link from 'next/link';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import RecentBlogs from '@/components/RecentBlogs';
import LatestProjects from '@/components/LatestProjects';

export default async function Home() {
  return (
    <main className='mx-auto max-w-6xl'>
      <div className='mx-auto mb-4 mt-16 flex w-11/12 flex-col items-center gap-3 text-[#31363F] dark:text-[#EEEEEE] sm:mt-40 sm:gap-6'>
        <h1 className='border-b-4 border-indigo-500 text-center text-2xl font-bold md:text-5xl'>
          Hey, I&rsquo;m Vivek Patel
          <span>👋</span>
        </h1>
        <Hero />
        <h2 className='mt-2 border-b-4 border-indigo-500 text-center text-2xl font-bold md:text-4xl'>
          Latest Project
        </h2>
        <div className='grid grid-cols-1 gap-4'>
          <LatestProjects />
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
            className='cursor-pointer border-2 border-neutral-800 text-lg font-semibold text-neutral-800 hover:border-indigo-700 hover:underline dark:border-neutral-300 dark:text-neutral-300 hover:dark:border-indigo-700'
          >
            Read all Blogs &rarr;
          </Button>
        </Link>
      </div>
    </main>
  );
}
