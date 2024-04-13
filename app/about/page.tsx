import type { Metadata } from 'next';
import { About } from './About';

export const metadata: Metadata = {
  title: 'About Me',
  description: 'About me.',
  keywords: 'about, me, bio, resume',
};

const AboutPage = () => {
  return (
    //       <div className='mb-10 transform sm:rotate-6'>
    //         <Image
    //           className='rounded shadow-2xl shadow-zinc-500 dark:shadow-indigo-500'
    //           src={Me}
    //           width={300}
    //           height={300}
    //           alt='Picture of the author'
    //           priority={true}
    //         />
    //       </div>
    <About />
  );
};

export default AboutPage;
