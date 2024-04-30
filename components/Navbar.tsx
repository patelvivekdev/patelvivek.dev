import { FloatingNav } from '@/components/ui/FloatingNav';
import MobileNav from './MobileNav';

const links = [
  { link: '/', name: 'Home' },
  { link: '/projects', name: 'Projects' },
  { link: '/blog', name: 'Blogs' },
  { link: '/snippet', name: 'Snippets' },
  { link: '/contact', name: 'Contact' },
];

const Navbar = () => {
  return (
    <nav>
      <FloatingNav navItems={links} />
      <MobileNav navItems={links} />
    </nav>
  );
};

export default Navbar;
