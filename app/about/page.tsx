import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import Image from 'next/image';
import Me from '@/public/me.jpg';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'About me.',
  keywords: 'about, me, bio, resume',
};

const AboutPage = () => {
  return (
    <div className='mx-auto mt-40 h-full w-4/5'>
      <h1 className='text-4xl font-bold text-blue-600 text-center'>About Me</h1>
      <div className='mt-5 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        <div className='mx-auto flex w-full flex-col gap-6 p-10 lg:col-span-2'>
          <h2 className='text-4xl font-bold text-blue-600'>
            I&rsquo;m passionate about <strong className='text-c'>web development</strong>, armed with a background in Computer
            Engineering. Currently, I&rsquo;m immersed in the world of web development at Conestoga College, where I&rsquo;m
            expanding my skills and crafting captivating web applications.
          </h2>
          <h2 className='text-3xl font-medium text-blue-500'>
            Beyond the screen, I&rsquo;m an avid <strong className='text-c'>photographer</strong>, capturing life&rsquo;s
            beautiful moments through my lens. I also love exploring the great outdoors, seeking inspiration in nature&rsquo;s
            wonders.
          </h2>
          {/* <h2 className='text-3xl font-medium text-blue-500'>
          I'm a passionate web developer specializing in building dynamic, user-centric applications using React, Next.js, and Node.js. With proficiency in databases like MongoDB, MySQL, and PostgreSQL, along with Python and JavaScript, I consistently deliver robust solutions. My dedication to continuous learning and mastery of new technologies ensures I stay at the forefront of web development.
          </h2> */}
        </div>
        <div className='mx-auto p-10 text-center'>
          <div className='mb-10 transform sm:rotate-6'>
            <Image
              className='rounded shadow-2xl shadow-zinc-500 dark:shadow-indigo-500'
              src={Me}
              width={300}
              height={300}
              alt='Picture of the author'
              priority={true}
            />
          </div>
          <a href='https://docs.google.com/document/d/15IjjdYF3EHWjILCojA5dOHLi1mW7dZLliq8mRrNmCJk/edit?usp=sharing'>
            <Button
              variant='outline'
              className='mt-4 transform transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-teal-500'
            >
              Download CV
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
