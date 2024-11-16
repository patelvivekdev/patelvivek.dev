import { FloatingNav } from '@/components/navbar/FloatingNav';
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
    <nav>
      <FloatingNav navItems={links} />
      <MobileNav navItems={links} />
      <CommandContainer />
    </nav>
  );
};

export default Navbar;
