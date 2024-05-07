import { FloatingNav } from '@/components/navbar/FloatingNav';
import MobileNav from '@/components/navbar/MobileNav';

const links = [
  { link: '/', name: 'Home' },
  { link: '/projects', name: 'Projects' },
  { link: '/blog', name: 'Blogs' },
  { link: '/tag', name: 'Tags' },
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
