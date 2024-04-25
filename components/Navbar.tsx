import { FloatingNav } from '@/components/ui/FloatingNav';

const links = [
  { link: '/', name: 'Home' },
  { link: '/projects', name: 'Projects' },
  { link: '/blog', name: 'Blogs' },
  { link: '/contact', name: 'Contact' },
];

const Navbar = () => {
  return (
    <nav>
      <FloatingNav navItems={links} />
    </nav>
  );
};

export default Navbar;
