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
          <h2 className='text-3xl font-medium text-blue-500'>
            I&rsquo;m a versatile web developer with expertise in a wide range of technologies. My skills include building
            interactive web applications using technologies like <strong className='text-c'>React</strong>,{' '}
            <strong className='text-c'>Next JS</strong>, and <strong className='text-c'>Node.js</strong>. I have experience with
            databases like <strong className='text-c'>MongoDB</strong>, <strong className='text-c'>MySQL</strong>, and{' '}
            <strong className='text-c'>PostgreSQL</strong>, and I&rsquo;m proficient in programming languages such as{' '}
            <strong className='text-c'>Python</strong> and <strong className='text-c'>JavaScript</strong>. I&rsquo;m also
            well-versed in version control with <strong className='text-c'>Git</strong> and{' '}
            <strong className='text-c'>GitHub</strong>. My passion for coding drives me to continually explore and master new
            technologies, making me a valuable asset in the world of web development.
          </h2>
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
