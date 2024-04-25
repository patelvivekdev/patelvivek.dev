import type { Metadata } from 'next';
import ContactMeForm from './ContactForm';
import { Github } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { Twitter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Get in Touch | Vivek Patel',
  description: 'Want to get in touch? Reach out via social media for a quick response.',
};

const ContactPage = () => {
  return (
    <div className='mt-32 sm:mt-40 relative flex w-11/12 sm:w-3/4 mx-auto text-[#31363F] dark:text-[#EEEEEE] flex-col items-center gap-3 sm:gap-6'>
      <h1 className='text-center text-2xl font-bold md:text-4xl border-b-4 border-indigo-500'>Get in Touch</h1>
      <h2 className='text-2xl text-center font-bold text-gray-800 dark:text-white'>
        {' '}
        Have a question? Fill out my contact form or reach out via social media for a quick response.
      </h2>
      <div className='w-full grid grid-col-1 sm:grid-cols-2 gap-4 m-10 justify-between'>
        <div className='flex flex-col justify-evenly gap-4'>
          <div className='flex flex-col gap-5'>
            <p className='text-xl'>
              <span className='text-indigo-500 font-bold'>Name: </span> Vivek Patel
            </p>
            <p className='text-xl'>
              <span className='text-indigo-500 font-bold'>Email: </span>
              <a href='mailto:me@patelvivek.dev' className='hover:underline'>
                me@patelvivek.dev
              </a>
            </p>
            <p className='text-xl'>
              <span className='text-indigo-500 font-bold'>Address: </span> Kitchener, ON, Canada
            </p>
          </div>
          <div className='flex flex-row gap-5 place-content-center'>
            <a href='https://www.linkedin.com/in/patelvivekdev' target='_blank' rel='noopener noreferrer'>
              <Linkedin className='h-8 w-8 hover:text-indigo-400' />
            </a>
            <a href='https://github.com/patelvivekdev' target='_blank' rel='noopener noreferrer'>
              <Github className='h-8 w-8 hover:text-indigo-400' />
            </a>
            <a href='https://www.twitter.com/patelvivekdev' target='_blank' rel='noopener noreferrer'>
              <Twitter className='h-8 w-8 hover:text-indigo-400' />
            </a>
          </div>
        </div>
        <ContactMeForm />
      </div>
    </div>
  );
};

export default ContactPage;
