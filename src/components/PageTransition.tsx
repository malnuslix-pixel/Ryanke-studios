'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// Pure opacity fade transition so position: fixed elements lock to the viewport without containing block traps
const pageVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const pageTransition = {
  type: 'tween',
  ease: [0.25, 0.46, 0.45, 0.94],
  duration: 0.35,
};

const reducedMotionTransition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.2,
};

export const PageTransition = ({ children, className = '' }: PageTransitionProps) => {
  const prefersReducedMotion = useReducedMotion();

  // Scroll to top on mount
  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch {}
  }, []);

  return (
    <motion.div
      initial={false}
      animate="enter"
      exit="exit"
      variants={prefersReducedMotion ? {
        initial: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 },
      } : pageVariants}
      transition={prefersReducedMotion ? reducedMotionTransition : pageTransition}
      className={`will-change-[opacity] ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Stagger container for page content
export const PageContent = ({ children, className = '' }: PageTransitionProps) => {
  return (
    <motion.div
      initial={false}
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
