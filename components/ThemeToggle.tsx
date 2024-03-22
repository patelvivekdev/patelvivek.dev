'use client'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
	const { theme, setTheme } = useTheme()
	const [loaded, setLoaded] = useState(false);
	useEffect(() => {
		setLoaded(true);
	}, [setLoaded]);
	return (
		<button
			aria-label="Toggle Dark Mode"
			type="button"
			className="rounded-xl fixed right-4 md:right-10 bottom-10 bg-black/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5  hover:bg-black/50 backdrop-blur transition  dark:bg-zinc-900/90 dark:ring-sky-500 dark:hover:ring-white/20"
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				stroke="currentColor"
				className="h-4 w-4 text-white dark:text-teal-500"
			>
				{
					loaded ? (
						theme === "dark" ? (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
							/>) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
							/>
						)
					) : (
						<></>
					)
				}
			</svg>
		</button>
	)
}