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
    description: string;
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

  console.log('activeCard', activeCard);

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
              className='text-2xl font-bold text-slate-100'
            >
              {item.title}
            </motion.h2>
            <motion.p
              initial={{
                opacity: activeCard === index ? 1 : 0.3,
              }}
              animate={{
                opacity: activeCard === index ? 1 : 0.3,
              }}
              className='text-kg text-slate-300 max-w-sm mt-10'
            >
              {item.description}
            </motion.p>
          </div>
        ))}
        <div className='h-20' />
      </div>
      <div
        className={cn(
          'hidden lg:block h-64 w-84 rounded-md bg-white sticky top-32 right-32 shadow-2xl shadow-zinc-500 dark:shadow-indigo-500',
          contentClassName,
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </div>
  );
};
