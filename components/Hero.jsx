"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <>
      <div className="mt-32 sm:mt-40">
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
					absolute inset-auto right-1/2 overflow-visible 
					h-28 sm:h-36 md:h-40 lg:h-56
					w-1/2
					dark:bg-gradient-conic dark:from-white/65 dark:via-transparent dark:to-transparent dark:text-white dark:[--conic-position:from_70deg_at_center_top] 
					bg-gradient-conic from-black via-transparent to-transparent text-black [--conic-position:from_70deg_at_center_top]"
        ></motion.div>
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
          className="absolute inset-auto left-1/2
		  			h-28 sm:h-36 md:h-40 lg:h-56
		  			w-1/2 
					dark:bg-gradient-conic dark:from-transparent dark:via-transparent dark:to-white/65 dark:text-white dark:[--conic-position:from_290deg_at_center_top]
					bg-gradient-conic from-transparent via-transparent to-black text-black [--conic-position:from_290deg_at_center_top]"
        ></motion.div>
      </div>
      <motion.h1
        initial={{ opacity: 0.3, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-3 sm:mt-8 z-50 py-4 text-center font-medium tracking-tight"
      >
        <span className="flex flex-col items-center justify-center">
          <p className="text-xl sm:text-3xl md:text-4xl lg:text-7xl ">
            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent">
              Hey, I'm Vivek Patel
            </span>
            <span>👋</span>
          </p>
          <p className="text-lg sm:text-2xl md:text-3xl lg:text-5xl">
            <span>
              <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent">
                A web developer who loves photography.
              </span>
            </span>
          </p>
        </span>
      </motion.h1>
    </>
  );
}
