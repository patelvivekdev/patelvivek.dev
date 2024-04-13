'use client';
import React from 'react';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import Image from 'next/image';
import Me from '@/public/vivek.jpg';
import Link from 'next/link';

const content = [
  {
    title: 'About Me',
    description:
      "I'm passionate about web development, armed with a background in Computer Engineering. Currently, I'm immersed in the world of web development at Conestoga College, where I'm expanding my skills and crafting captivating web applications.",
    content: (
      <div className='h-full w-full flex items-center justify-center text-white'>
        <Image
          src={Me}
          width={300}
          height={300}
          quality={100}
          priority={true}
          className='h-full w-full object-cover'
          alt='Picture of Vivek Patel'
        />
      </div>
    ),
  },
  {
    title: 'Hobbies',
    description:
      "Beyond the screen, I'm an avid photographer, capturing the life's beautiful moments through my lens. I also love exploring the great outdoors, seeking inspiration in nature&rsquo;s wonders.",
    content: (
      <div className='h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white'>
        Hobbies
      </div>
    ),
  },
  {
    title: 'Skills',
    description:
      "I'm using React, Next.js, and Node.js. With proficiency in databases like MongoDB, MySQL, and PostgreSQL, along with Python and JavaScript, I consistently deliver robust solutions. My dedication to continuous learning and mastery of new technologies ensures I stay at the forefront of web development.",
    content: (
      <div className='h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white'>
        Skills
      </div>
    ),
  },
  {
    title: 'Resume',
    description: (
      <>
        <p>check out my resume</p>
        <Link className='border px-3 py-2 text-center block md:hidden bg-slate-600 rounded-lg text-white' href='/resume'>
          Resume
        </Link>
      </>
    ),
    content: (
      <div className='h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white'>
        <Link className='border px-3 py-2 bg-slate-600 rounded-lg text-white' href='/resume'>
          Resume
        </Link>
      </div>
    ),
  },
];
export function About() {
  return <StickyScroll content={content} />;
}
