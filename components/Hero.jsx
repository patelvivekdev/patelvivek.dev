import React from 'react';
import Image from 'next/image';
import Me from '@/public/vivek.jpg';

export default function Hero() {
  return (
    <div className='mt-32 sm:mt-40 grid grid-cols-2 place-content-center font-medium'>
      <div>
        <h1 className='text-xl sm:text-3xl md:text-4xl lg:text-5xl dark:text-neutral-50 text-neutral-900'>
          Hey, I&rsquo;m Vivek Patel
          <span>👋</span>
        </h1>
        <h2 className='text-lg sm:text-2xl md:text-3xl lg:text-3xl'>
          <span className='dark:text-neutral-50 text-neutral-900'>A web developer who loves photography.</span>
        </h2>
      </div>
      <Image
        src={Me}
        width={300}
        height={300}
        priority={true}
        className='rounded-md object-cover shadow-2xl shadow-zinc-500 dark:shadow-indigo-500'
        alt='Picture of Vivek Patel'
      />
    </div>
  );
}
