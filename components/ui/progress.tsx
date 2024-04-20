'use client';

import { useScroll, useSpring } from 'framer-motion';
import { motion } from 'framer-motion';

export default function Progress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  return (
    <motion.div className='fixed top-0 left-0 right-0 h-[8px] origin-[0%] bg-[#f47067] dark:bg-[#80d1a9]' style={{ scaleX }} />
  );
}
