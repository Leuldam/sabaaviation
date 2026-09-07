"use client";

import { motion, AnimatePresence } from 'framer-motion';
import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface AnimatedLayoutProps {
  children: ReactNode;
}

const AnimatedLayout: React.FC<AnimatedLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
};

export default AnimatedLayout;
