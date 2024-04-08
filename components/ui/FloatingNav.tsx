'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export const FloatingNav = ({
  navItems,
}: {
  navItems: {
    name: string;
    link: string;
  }[];
}) => {
  const pathname = usePathname();

  return (
    <div
      className={
        'fixed inset-x-0 top-8 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-full border border-transparent bg-white px-4 py-2  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:border-white/[0.2] dark:bg-black'
      }
    >
      {navItems.map((navItem: any, idx: number) => (
        <Link
          key={`link=${idx}`}
          href={navItem.link}
          className={cn(
            'relative flex items-center space-x-1 text-neutral-600 hover:text-neutral-500 dark:text-neutral-50 dark:hover:text-neutral-300',
          )}
        >
          {pathname === navItem.link && (
            <span className='relative border-neutral-200 py-2 font-medium text-black dark:border-white/[0.2] dark:text-white sm:px-1 sm:text-sm lg:rounded-full lg:border lg:px-4'>
              {navItem.name}
              <span className='absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-sky-600  to-transparent' />
            </span>
          )}
          {pathname !== navItem.link && (
            <span className='relative rounded-full py-2 text-sm font-medium sm:px-1 lg:px-4'>{navItem.name}</span>
          )}
        </Link>
      ))}
    </div>
  );
};
