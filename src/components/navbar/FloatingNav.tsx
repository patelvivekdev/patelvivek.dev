'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../ui/button';

export const FloatingNav = ({
  navItems,
}: {
  navItems: {
    name: string;
    link: string;
  }[];
}) => {
  const pathname = usePathname();

  const handleClick = () => {
    // fire KeyboardEvent command + k
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
    });
    document.dispatchEvent(event);
  };

  return (
    <div className='fixed inset-x-0 top-8 z-[5000] mx-auto hidden max-w-fit items-center justify-center space-x-4 rounded-full bg-neutral-950 px-4 py-2 dark:bg-neutral-50 md:flex'>
      {navItems.map((navItem: any, idx: number) => (
        <Link
          key={`link=${idx}`}
          href={navItem.link}
          className={cn(
            'relative flex items-center space-x-1 text-neutral-50 hover:text-indigo-500 hover:underline dark:text-neutral-950 dark:hover:text-indigo-500',
          )}
        >
          {pathname === navItem.link && (
            <span className='relative border-indigo-500 py-2 text-sm font-bold text-neutral-50 dark:border-neutral-950 dark:text-neutral-950 md:rounded-full md:border md:px-4'>
              {navItem.name}
            </span>
          )}
          {pathname !== navItem.link && (
            <span className='relative rounded-full py-2 text-sm font-bold md:px-4'>
              {navItem.name}
            </span>
          )}
        </Link>
      ))}
      <Button
        className={cn(
          'relative flex justify-between rounded-full border-2 py-2 text-neutral-50 hover:border-indigo-500 hover:text-indigo-500 dark:text-neutral-950 dark:hover:text-indigo-500',
        )}
        onClick={handleClick}
      >
        <span className='mr-2 text-xl'>⌘</span>
        <span>K</span>
      </Button>
    </div>
  );
};
