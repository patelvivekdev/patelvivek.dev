import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const Footer = () => {
  // find the current year
  const year = new Date().getFullYear();

  return (
    <footer className='border-t-2 bg-white text-gray-900 border-indigo-500 dark:bg-neutral-800 dark:text-white'>
      <div className='flex items-center justify-around py-4'>
        <div>
          <p className='text-base font-semibold'>© {year} Vivek Patel | Made with ❤️ Next js</p>
        </div>
      </div>
      <ThemeToggle />
    </footer>
  );
};

export default Footer;
