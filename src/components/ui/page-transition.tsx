'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    hidden: { 
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
    },
    enter: { 
      opacity: 1,
      y: 0,
    },
    exit: { 
      opacity: 0,
      y: prefersReducedMotion ? 0 : -20,
    },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{
          duration: prefersReducedMotion ? 0.15 : 0.3,
          ease: [0.0, 0.0, 0.2, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
