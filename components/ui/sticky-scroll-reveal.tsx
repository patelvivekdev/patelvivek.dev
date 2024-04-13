'use client';
import React, { useRef } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: React.ReactNode | any;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div className='my-32 grid grid-cols-1 sm:grid-cols-3'>
      <div className='sm:col-span-2 flex flex-col items-start mx-auto px-4' ref={ref}>
        {content.map((item, index) => (
          <div key={item.title + index} className='mb-20'>
            <motion.h2
              initial={{
                opacity: activeCard === index ? 1 : 0.3,
              }}
              animate={{
                opacity: activeCard === index ? 1 : 0.3,
              }}
              className='text-2xl font-bold dark:text-slate-100 text-gray-800 mb-4'
            >
              {item.title}
            </motion.h2>
            <motion.div
              initial={{
                opacity: activeCard === index ? 1 : 0.3,
              }}
              animate={{
                opacity: activeCard === index ? 1 : 0.3,
              }}
              className='text-lg dark:text-slate-100 text-gray-800 mb-4  max-w-xs lg:max-w-md  mt-10'
            >
              {item.description}
            </motion.div>
          </div>
        ))}
        <div className='h-20' />
      </div>
      <div
        className={cn(
          'hidden md:block h-64 w-84 rounded-md sticky top-32 sm:right-16 md:right-20 lg:right-28 shadow-2xl shadow-zinc-500 dark:shadow-indigo-500',
          contentClassName,
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </div>
  );
};
