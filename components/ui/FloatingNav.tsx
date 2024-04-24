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
        'fixed inset-x-0 top-8 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4 rounded-full dark:bg-neutral-50 px-4 py-2 bg-neutral-950'
      }
    >
      {navItems.map((navItem: any, idx: number) => (
        <Link
          key={`link=${idx}`}
          href={navItem.link}
          className={cn('relative flex items-center space-x-1 dark:text-neutral-950 hover:underline text-neutral-50')}
        >
          {pathname === navItem.link && (
            <span className='relative dark:border-neutral-950 py-2 font-bold dark:text-neutral-950 border-white text-neutral-50 sm:px-1 sm:text-sm lg:rounded-full lg:border lg:px-4'>
              {navItem.name}
            </span>
          )}
          {pathname !== navItem.link && (
            <span className='relative rounded-full py-2 text-sm font-bold sm:px-1 lg:px-4'>{navItem.name}</span>
          )}
        </Link>
      ))}
    </div>
  );
};
