import type { Metadata } from 'next';
import ContactMeForm from './ContactForm';
import { Github } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { Twitter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Get in Touch',
  description:
    'Want to get in touch? Reach out via social media for a quick response.',
  keywords: 'contact, social media, email, linkedin, github, twitter',
  openGraph: {
    title: 'Get in Touch',
    description:
      'Want to get in touch? Reach out via social media for a quick response.',
    url: 'https://patelvivek.dev/contact',
    siteName: 'Vivek Patel',
    images: [
      {
        url: 'https://patelvivek.dev/og?title=Get%20in%20Touch',
        width: 1200,
        height: 630,
        alt: 'Get in Touch',
      },
    ],
  },
};

const ContactPage = () => {
  return (
    <div className='relative mx-auto mt-16 flex w-11/12 flex-col items-center gap-3 text-[#31363F] dark:text-[#EEEEEE] sm:mt-40 sm:w-3/4 sm:gap-6'>
      <h1 className='border-b-4 border-indigo-500 text-center text-2xl font-bold md:text-4xl'>
        Get in Touch
      </h1>
      <h2 className='text-center text-2xl font-bold text-gray-800 dark:text-white'>
        {' '}
        Have a question? Fill out my contact form or reach out via social media
        for a quick response.
      </h2>
      <div className='grid-col-1 m-10 grid w-full gap-8 sm:grid-cols-2 sm:justify-between'>
        <div className='flex flex-col justify-evenly gap-4'>
          <div className='flex flex-col gap-5'>
            <p className='text-xl'>
              <span className='font-bold text-indigo-500'>Name: </span> Vivek
              Patel
            </p>
            <p className='text-xl'>
              <span className='font-bold text-indigo-500'>Email: </span>
              <a href='mailto:me@patelvivek.dev' className='hover:underline'>
                me@patelvivek.dev
              </a>
            </p>
            <p className='text-xl'>
              <span className='font-bold text-indigo-500'>Address: </span>{' '}
              Kitchener, ON, Canada
            </p>
          </div>
          <div className='flex flex-row place-content-center gap-5'>
            <a
              href='https://www.linkedin.com/in/patelvivekdev'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Linkedin className='h-12 w-12 hover:text-indigo-400' />
            </a>
            <a
              href='https://github.com/patelvivekdev'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Github className='h-12 w-12 hover:text-indigo-400' />
            </a>
            <a
              href='https://www.twitter.com/patelvivekdev'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Twitter className='h-12 w-12 hover:text-indigo-400' />
            </a>
          </div>
        </div>
        <ContactMeForm />
      </div>
    </div>
  );
};

export default ContactPage;
