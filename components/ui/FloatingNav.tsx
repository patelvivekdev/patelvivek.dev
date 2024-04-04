"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from 'next/navigation'
import Link from "next/link";

export const FloatingNav = ({
	navItems,
}: {
	navItems: {
		name: string;
		link: string;
	}[];
}) => {

	const pathname = usePathname()

	return (
		<div
			className={"flex max-w-fit fixed top-8 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] px-4 py-2  items-center justify-center space-x-4"}
		>
			{navItems.map((navItem: any, idx: number) => (
				<Link
					key={`link=${idx}`}
					href={navItem.link}
					className={cn(
						"relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
					)}
				>
					{pathname === navItem.link && (
						<span className="lg:border sm:text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white lg:px-4 sm:px-1 py-2 lg:rounded-full">
							{navItem.name}
							<span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-sky-600 to-transparent  h-px" />
						</span>
					)}
					{pathname !== navItem.link && (
						<span className="text-sm font-medium relative lg:px-4 sm:px-1 py-2 rounded-full">
							{navItem.name}
						</span>
					)}
				</Link>
			))}
		</div >
	);
};
