import { FloatingNav } from "@/components/ui/FloatingNav";

const links = [
	{ link: "/", name: "Home" },
	{ link: "/projects", name: "Projects" },
	{ link: "/about", name: "About me" },
	{ link: "/contact", name: "Contact" },
	{ link: "/blog", name: "Blogs" },
];

const Navbar = () => {
	return (
		<nav>
			<FloatingNav
				navItems={links}
			/>
		</nav>

	)
}

export default Navbar