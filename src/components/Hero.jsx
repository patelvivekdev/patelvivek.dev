import React from 'react';
import Image from 'next/image';
// import { Link } from 'next-view-transitions';

export default async function Hero() {
  return (
    <div className='mt-4 grid grid-cols-1 place-content-center gap-4 font-medium sm:grid-cols-3'>
      <div className='flex flex-col justify-center gap-4 sm:col-span-2'>
        {/* <h2 className='text-center text-2xl font-bold md:text-start md:text-3xl'>
          <span className='border-b-4 border-indigo-500'>About Me</span>
        </h2> */}
        {/* <h2 className='text-base sm:text-base md:text-lg lg:text-xl'>
          <span className='text-neutral-900 dark:text-neutral-50'>
            A web developer who loves photography.
          </span>
        </h2> */}
        <h2 className='text-base sm:text-base md:text-lg lg:text-xl'>
          I am a software engineer from Canada. I am passionate about
          <span className='underline decoration-sky-500 decoration-2 underline-offset-4'>
            {' '}
            Javascript, React, Next.js, Python and AI.
          </span>
        </h2>
        <h2 className='text-base sm:text-base md:text-lg lg:text-xl'>
          Beyond the screen, I am an avid{' '}
          <span className='underline decoration-sky-500 decoration-2 underline-offset-4'>
            photographer
          </span>
          , capturing the life&rsquo;s beautiful moments through my lens.
        </h2>
        <h2 className='text-base sm:text-base md:text-lg lg:text-xl'>
          I believe in
          <span className='underline decoration-sky-500 decoration-2 underline-offset-4'>
            {' '}
            continuous learning
          </span>
          , which helps me stay current with the latest technologies in web
          development.
        </h2>
        {/* <div className='mt-2 text-center'>
          <Link
            className='w-min rounded-lg border bg-indigo-500 px-3 py-2 font-bold text-white hover:underline'
            href='/resume'
          >
            Resume
          </Link>
        </div> */}
      </div>
      <div className='col-span-1 flex flex-row items-center justify-center gap-4'>
        <Image
          src='/vivek.jpg'
          width={300}
          height={300}
          priority={true}
          className='ease rounded-md object-cover shadow-xl shadow-[#8184f8] grayscale-0 filter transition hover:grayscale dark:shadow-indigo-500'
          alt='Picture of Vivek Patel'
        />
      </div>
    </div>
  );
}
