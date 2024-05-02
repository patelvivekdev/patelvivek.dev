//create a custom 404 page

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className='mt-16 sm:mt-40 w-11/12 sm:w-3/4 mx-auto'>
      <h1 className='font-medium text-2xl mb-8 tracking-tighter'>Oh no! This page does not exist.</h1>
      <p className='text-lg mb-8'>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <p className='text-lg mb-8'>Please check the URL and try again.</p>

      <p className='text-lg mb-8'>
        If you think this is an error, please contact me at
        <a href='mailto:me@patelvivek.dev' className='text-blue-500 hover:underline'>
          {' '}
          me@patelvivek.dev
        </a>
      </p>

      <hr className='my-8' />
      <div className='text-center'>
        <Link href='/'>
          <Button
            variant='outline'
            className='mb-5 cursor-pointer text-lg font-semibold
                border-gray-500  bg-gray-300 text-gray-800 hover:bg-gray-600 hover:text-gray-300
                dark:border-gray-500 dark:bg-gray-400 dark:text-black dark:hover:bg-gray-200'
          >
            Go back home
          </Button>
        </Link>
      </div>
    </section>
  );
}
