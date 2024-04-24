import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const Footer = () => {
  // find the current year
  const year = new Date().getFullYear();

  return (
    <footer className='border-t-2'>
      <div className='flex items-center justify-around py-4'>
        <div>
          <p className='text-base font-semibold'>© {year} Vivek Patel | Made with ❤️ Next js</p>
        </div>
        {/* <div>
					<Link href="/about" className="text-sm font-semibold">
						About
					</Link>
				</div> */}
      </div>
      <ThemeToggle />
    </footer>
  );
};

export default Footer;
