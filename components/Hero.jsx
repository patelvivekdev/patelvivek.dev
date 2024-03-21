"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
	return (
		<div className="h-screen w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center">
			<div className="absolute pointer-events-none inset-0 flex items-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
			<div className="mt-40">
				<motion.div
					initial={{ opacity: 0.3 }}
					whileInView={{ opacity: 1 }}
					transition={{
						delay: 0.3,
						duration: 1,
						ease: "easeInOut",
					}}
					style={{
						backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
					}}
					className="
					absolute inset-auto right-1/2 lg:h-56 h-36 overflow-visible 
					lg:w-[30rem]  w-[10rem] 
					dark:bg-gradient-conic dark:from-white dark:via-transparent dark:to-transparent dark:text-white dark:[--conic-position:from_45deg_at_center_top] 
					bg-gradient-conic from-black via-transparent to-transparent text-black [--conic-position:from_45deg_at_center_top]"
				>
				</motion.div>
				<motion.div
					initial={{ opacity: 0.3 }}
					whileInView={{ opacity: 1 }}
					transition={{
						delay: 0.3,
						duration: 1,
						ease: "easeInOut",
					}}
					style={{
						backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
					}}
					className="absolute inset-auto left-1/2 lg:h-56 h-36 lg:w-[30rem] w-[10rem] 
					dark:bg-gradient-conic dark:from-transparent dark:via-transparent dark:to-white dark:text-white dark:[--conic-position:from_315deg_at_center_top]
					bg-gradient-conic from-transparent via-transparent to-black text-black [--conic-position:from_315deg_at_center_top]"
				></motion.div>
			</div>
			<motion.h1
				initial={{ opacity: 0.3, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.3,
					duration: 0.8,
					ease: "easeInOut",
				}}
				className="mt-10 py-4 bg-clip-text text-center font-medium tracking-tight text-white md:text-4xl z-50"
			>
				Vivek Patel
			</motion.h1>
		</div>
	);
}
