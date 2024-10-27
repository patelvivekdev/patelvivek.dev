import { FloatingNav } from '@/components/navbar/FloatingNav';
import { Suspense } from 'react';
import MobileNav from '@/components/navbar/MobileNav';
import { CommandContainer } from '../Command/CommandContainer';

const links = [
  { link: '/', name: 'Home' },
  { link: '/projects', name: 'Projects' },
  { link: '/blog', name: 'Blogs' },
  { link: '/snippet', name: 'Snippets' },
  { link: '/tag', name: 'Tags' },
  { link: '/contact', name: 'Contact' },
];

const Navbar = async () => {
  return (
    <Suspense fallback={null}>
      <nav>
        <FloatingNav navItems={links} />
        <MobileNav navItems={links} />
        <CommandContainer />
      </nav>
    </Suspense>
  );
};

export default Navbar;
