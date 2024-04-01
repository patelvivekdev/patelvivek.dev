"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <>
      <div className="mt-32 sm:mt-40">
        <div
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="
					absolute inset-auto right-1/2 overflow-visible 
					h-28 sm:h-36 md:h-40 lg:h-56
					w-1/2
					dark:bg-gradient-conic dark:from-white/65 dark:via-transparent dark:to-transparent dark:text-white dark:[--conic-position:from_70deg_at_center_top] 
					bg-gradient-conic from-black via-transparent to-transparent text-black [--conic-position:from_70deg_at_center_top]"
        ></div>
        <div
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2
		  			h-28 sm:h-36 md:h-40 lg:h-56
		  			w-1/2 
					dark:bg-gradient-conic dark:from-transparent dark:via-transparent dark:to-white/65 dark:text-white dark:[--conic-position:from_290deg_at_center_top]
					bg-gradient-conic from-transparent via-transparent to-black text-black [--conic-position:from_290deg_at_center_top]"
        ></div>
      </div>
      <h1 className="mt-3 sm:mt-8 z-50 py-4 text-center font-medium tracking-tight">
        <span className="flex flex-col items-center justify-center">
          <p className="text-xl sm:text-3xl md:text-4xl lg:text-7xl ">
            <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent">
              Hey, I&rsquo;m Vivek Patel
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
      </h1>
    </>
  );
}
