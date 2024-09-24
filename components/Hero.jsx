import React from 'react';
import Image from 'next/image';
import Me from '@/public/vivek.jpg';
// import Link from 'next/link';

export default function Hero() {
  return (
    <div className='grid grid-cols-1 place-content-center gap-4 font-medium sm:grid-cols-3'>
      <div className='flex flex-col justify-center gap-4 sm:col-span-2'>
        <h1 className='text-center text-xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-start sm:text-3xl'>
          Hey, I&rsquo;m Vivek Patel
          <span>👋</span>
        </h1>
        <h2 className='text-base sm:text-base md:text-lg lg:text-xl'>
          <span className='text-neutral-900 dark:text-neutral-50'>
            A web developer who loves photography.
          </span>
        </h2>
        <h3 className='text-base sm:text-base md:text-lg lg:text-xl'>
          I am a software engineer from Canada. I am passionate about
          Javascript, React, Next.js, and Python.
        </h3>
        <h3 className='text-base sm:text-base md:text-lg lg:text-xl'>
          Beyond the screen, I am an avid{' '}
          <span className='underline decoration-sky-500 decoration-2 underline-offset-4'>
            photographer
          </span>
          , capturing the life&rsquo;s beautiful moments through my lens.
        </h3>
        <h3 className='text-base sm:text-base md:text-lg lg:text-xl'>
          My dedication to continuous learning and mastery of new technologies
          ensures I stay at the forefront of web development.
        </h3>
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
          src={Me}
          width={300}
          height={300}
          priority={true}
          className='ease rounded-md object-cover shadow-xl shadow-[#8184f8] grayscale filter transition hover:grayscale-0 dark:shadow-indigo-500'
          alt='Picture of Vivek Patel'
        />
      </div>
    </div>
  );
}
