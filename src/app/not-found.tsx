//create a custom 404 page

import { Button } from '@/components/ui/button'
import { Link } from 'react-transition-progress/next'
// import Link from 'next/link';
// import { Link } from 'next-view-transitions';

export default function NotFound() {
  return (
    <section className='mx-auto mt-16 h-screen w-11/12 sm:mt-40'>
      <h1 className='mb-8 text-center text-2xl font-bold tracking-tighter'>
        Oh no! This page does not exist.
      </h1>
      <p className='mb-8 text-lg'>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <p className='mb-8 text-lg'>Please check the URL and try again.</p>

      <p className='mb-8 text-lg'>
        If you think this is an error, please contact me at{' '}
        <a
          href='mailto:me@patelvivek.dev'
          className='text-blue-500 hover:underline'
        >
          me@patelvivek.dev
        </a>{' '}
        Or open issues at{' '}
        <a
          className='text-blue-500 hover:underline'
          href='https://github.com/patelvivekdev/patelvivek.dev/issues/new'
        >
          Github
        </a>
      </p>

      <hr className='my-8' />
      <div className='text-center'>
        <Link href='/'>
          <Button
            variant='outline'
            className='mb-5 cursor-pointer border-gray-500 bg-gray-300 text-lg font-semibold text-gray-800 hover:bg-gray-600 hover:text-gray-300 dark:border-gray-500 dark:bg-gray-400 dark:text-black dark:hover:bg-gray-200'
          >
            Go back home
          </Button>
        </Link>
      </div>
    </section>
  )
}
