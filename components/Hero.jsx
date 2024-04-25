import React from 'react';
import Image from 'next/image';
import Me from '@/public/vivek.jpg';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 place-content-center font-medium'>
      <div className='flex flex-col gap-4 sm:col-span-2 justify-center'>
        <h1 className='text-xl text-center sm:text-start sm:text-3xl font-bold dark:text-neutral-50 text-neutral-900'>
          Hey, I&rsquo;m Vivek Patel
          <span>👋</span>
        </h1>
        <h2 className='text-base sm:text-base md:text-lg lg:text-xl'>
          <span className='dark:text-neutral-50 text-neutral-900'>A web developer who loves photography.</span>
        </h2>
        <h3 className='text-base sm:text-base md:text-lg lg:text-xl'>
          I am a software engineer from Canada. I am passionate about web development, Javascript, React, Next.js, and Node.js.
        </h3>
        <h3 className='text-base sm:text-base md:text-lg lg:text-xl'>
          Beyond the screen, I am an avid photographer, capturing the life&rsquo;s beautiful moments through my lens.
        </h3>
        <h3 className='text-base sm:text-base md:text-lg lg:text-xl'>
          My dedication to continuous learning and mastery of new technologies ensures I stay at the forefront of web development.
        </h3>
        <div className='text-center mt-2'>
          <Link className='border w-min px-3 py-2 bg-slate-600 rounded-lg text-white font-bold hover:underline' href='/resume'>
            Resume
          </Link>
        </div>
      </div>
      <div className='col-span-1 flex flex-col justify-center items-center gap-4'>
        <Image
          src={Me}
          width={300}
          height={300}
          priority={true}
          className='rounded-md object-cover shadow-2xl shadow-zinc-500 dark:shadow-indigo-500'
          alt='Picture of Vivek Patel'
        />
      </div>
    </div>
  );
}
