'use client';

import { useScroll, useSpring } from 'framer-motion';
import { motion } from 'framer-motion';

export default function Progress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  return <motion.div className='progress-bar' style={{ scaleX }} />;
}
