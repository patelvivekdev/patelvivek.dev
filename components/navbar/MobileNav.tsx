'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function MobileNav({
  navItems,
}: {
  navItems: {
    name: string;
    link: string;
  }[];
}) {
  const pathname = usePathname();
  return (
    <header className='flex h-16 items-center justify-between bg-white px-4 text-gray-900 shadow-md shadow-gray-300 dark:bg-neutral-800 dark:text-white md:hidden md:px-6'>
      <Link className='flex items-center gap-2 py-4 md:py-0' href='/'>
        <span className='text-lg font-semibold'>Vivek Patel</span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button className='rounded-full' size='icon' variant='ghost'>
            <MenuIcon className='h-6 w-6' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          className='w-full max-w-xs bg-white p-6 text-neutral-800 dark:bg-neutral-800 dark:text-white'
          side='left'
        >
          <div className='mb-6 flex items-center justify-between'>
            <Link className='flex items-center gap-2' href='/'>
              <span className='text-lg font-semibold'>Vivek Patel</span>
            </Link>
            <SheetClose asChild>
              <Button className='rounded-full' size='icon' variant='ghost'>
                <span className='sr-only'>Close navigation menu</span>
              </Button>
            </SheetClose>
          </div>
          <nav className='grid gap-4'>
            {navItems.map((item) => (
              <SheetClose asChild key={item.link}>
                <Link
                  className='flex items-center gap-2 text-lg font-normal text-neutral-800 dark:text-white'
                  href={item.link}
                >
                  {item.link === pathname && (
                    <span className='font-bold'> {item.name}</span>
                  )}
                  {item.link !== pathname && <span>{item.name}</span>}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
