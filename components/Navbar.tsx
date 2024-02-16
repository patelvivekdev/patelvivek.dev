'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link";

const links = [
	{ href: "/projects", label: "projects" },
	{ href: "/about", label: "about" },
	{ href: "/contact", label: "contact" },
	{ href: "/skills", label: "skills" },
];

const Navbar = () => {
	const pathname = usePathname()
	return (
		<nav className="bg-base-300 py-4">
			<div className="navbar px-8 mx-auto max-w-6xl flex-col sm:flex-row">
				<Link href="/">
					Vivek Patel
				</Link>
				<ul className="menu menu-horizontal md:ml-8">
					{links.map(({ href, label }) => (
						<li key={`${href}${label}`}>
							<Link href={href} className={`${pathname === href ? 'active' : ''}`} >
								{label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav >

	)
}

export default Navbar